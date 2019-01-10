package entityservice;

import entity.ClientEntity;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import java.util.List;

@Stateful
@LocalBean
public class ClientService {

    @PersistenceContext(unitName = "pu", type = PersistenceContextType.EXTENDED)
    private EntityManager em;

    public ClientEntity auth(String login, String password) throws DBException, ClientException {
        findByLogin(login);
        try {
            return findByLoginAndPassword(login, password);
        } catch (DBException | ClientException pe) {
            throw pe;
        } catch (Exception e) {
            throw new ClientException("Wrong password");
        }
    }

    public ClientEntity register(String login, String password) throws DBException, ClientException {
        try {
            findByLogin(login);
        } catch (DBException e) {
            e.printStackTrace();
            throw e;
        } catch (Exception e) {
            ClientEntity clientEntity = new ClientEntity();
            clientEntity.setLogin(login);
            clientEntity.setPassword(password);
            try {
                em.persist(clientEntity);
                em.flush();
            } catch (Exception pe) {
                e.printStackTrace();
                throw new DBException("DB exception");
            }
            return clientEntity;

        }

        throw new ClientException("User " + login + " is already registered");
    }

    public List findAll() {
        return em.createQuery("SELECT c FROM ClientEntity c").getResultList();
    }

    public ClientEntity findByLogin(String login) throws DBException, ClientException {
        try {
            List l = em.createQuery("SELECT c FROM ClientEntity c WHERE c.login = :login")
                    .setParameter("login", login)
                    .getResultList();

            if (l.isEmpty()) {
                throw new ClientException("No such user " + login);
            }
            return (ClientEntity) l.get(0);
        }catch (ClientException ce) {
            throw ce;
        } catch (Exception e) {
            e.printStackTrace();
            throw new DBException("DB exception");
        }
    }

    public ClientEntity findByLoginAndPassword(String login, String password) throws DBException, ClientException {
        try {
            List l = em.createQuery("SELECT c FROM ClientEntity c " +
                    "WHERE c.login=:login AND FUNCTION('md5', :password) = c.password")
                    .setParameter("login", login)
                    .setParameter("password", password)
                    .getResultList();

            if (l.isEmpty()) throw new ClientException("Wrong login/password");
            return (ClientEntity) l.get(0);
        } catch (ClientException ce) {
            throw ce;
        } catch (Exception e) {
            e.printStackTrace();
            throw new DBException("DB exception");
        }
    }


}
