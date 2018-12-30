package ejb;

import entity.ClientEntity;
import entity.RecordEntity;
import entityservice.ClientService;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.Serializable;
import java.util.List;

@Stateful
@Path("db_debug")
@LocalBean
public class DBBean implements Serializable {

    @PersistenceContext(unitName = "pu", type = PersistenceContextType.EXTENDED)
    private EntityManager em;

    @EJB
    ClientService clientService;

    @GET
    @Path("clients")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getClients() {
        StringBuilder res = new StringBuilder("[");
        List l = clientService.findAll();
        for (Object o : l) {
            res.append(o.toString()).append(", ");
        }
        return Response
                .status(Response.Status.OK)
                .entity(res.deleteCharAt(res.length() - 1).append(']').toString())
                .build();
    }

    @GET
    @Path("clients/{client}")
    public String getRecords(@PathParam("client") String login) {
        ClientEntity client = (ClientEntity) em.createQuery("SELECT c FROM ClientEntity c WHERE c.login=:login")
                .setParameter("login", login)
                .getResultList().get(0);
        em.flush();
        em.merge(client);

        StringBuilder res = new StringBuilder("Records of user " + client.toString() + ": <br>");
        for (RecordEntity record : client.getRecordsById()) {
            res.append(record.toString()).append("<br>");
        }
        return res.toString();
    }

}

