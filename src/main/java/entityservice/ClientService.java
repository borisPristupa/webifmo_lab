package entityservice;

import entity.ClientEntity;
import stateful.ClientStateful;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import java.util.List;
import java.util.Optional;

@Stateful
@LocalBean
public class ClientService {

    @PersistenceContext(unitName = "pu", type = PersistenceContextType.EXTENDED)
    private EntityManager em;

    public ClientStateful auth(String login, String password) {
        Optional<ClientEntity> client = findByLogin(login);
        ClientStateful clientStateful = new ClientStateful();
        clientStateful.setSessionId(null);

        if (client.isPresent()) {
            client = findByLoginAndPassword(login, password);

            if (client.isPresent()) {
                clientStateful.setClientEntity(client.get());
                clientStateful.setMessage(null);
                return clientStateful;
            } else {
                clientStateful.setClientEntity(null);
                clientStateful.setMessage("Wrong password");
                return clientStateful;
            }
        } else {
            clientStateful.setClientEntity(null);
            clientStateful.setMessage("No such user " + login);
            return clientStateful;
        }
    }

    public ClientStateful register(String login, String password) {
        Optional<ClientEntity> client = findByLogin(login);
        ClientStateful clientStateful = new ClientStateful();

        if (client.isPresent()) {
            clientStateful.setMessage("User " + login + " is already registered");
        } else {
            ClientEntity clientEntity = new ClientEntity();
            clientEntity.setLogin(login);
            clientEntity.setPassword(password);
            em.persist(clientEntity);
            em.flush();

            clientStateful.setClientEntity(clientEntity);
        }
        return clientStateful;
    }

    public List findAll() {
        return em.createQuery("SELECT c FROM ClientEntity c").getResultList();
    }

    public Optional<ClientEntity> findByLogin(String login) {
        List l = em.createQuery("SELECT c FROM ClientEntity c WHERE c.login = :login")
                .setParameter("login", login)
                .getResultList();

        return l.isEmpty()
                ? Optional.empty()
                : Optional.ofNullable((ClientEntity) l.get(0));
    }

    public Optional<ClientEntity> findByLoginAndPassword(String login, String password) {
        List l = em.createQuery("SELECT c FROM ClientEntity c " +
                "WHERE c.login=:login AND FUNCTION('md5', :password) = c.password")
                .setParameter("login", login)
                .setParameter("password", password)
                .getResultList();

        return l.isEmpty()
                ? Optional.empty()
                : Optional.ofNullable((ClientEntity) l.get(0));
    }


}
