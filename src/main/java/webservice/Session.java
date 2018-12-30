package webservice;

import ejb.SessionBean;
import entity.ClientEntity;
import entityservice.ClientService;
import stateful.ClientStateful;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("auth")
public class Session {
    @EJB
    private SessionBean sessionBean;

    @EJB
    ClientService clientService;

    private String logIn(ClientEntity client) {
        String sessionId = MyApplication.registerSessionBean(sessionBean);
        sessionBean.setClient(client);
        sessionBean.setSessionId(sessionId);
        return sessionId;
    }

    @GET
    @Path("reg")
    @Produces({MediaType.APPLICATION_JSON})
    public Response register(@QueryParam("login") String login,
                             @QueryParam("password") String password) {
        ClientStateful client = clientService.register(login, password);
        if (null != client.getClientEntity()) {
            client.setSessionId(logIn(client.getClientEntity()));
        }

        return Response
                .status(Response.Status.OK)
                .entity(client.toString())
                .build();
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response auth(@QueryParam("login") String login,
                         @QueryParam("password") String password) {
        Optional<ClientEntity> clientOptional = clientService.findByLogin(login);
        ClientStateful client = new ClientStateful();

        if (clientOptional.isPresent()) {
            String sessionId = MyApplication.findSessionByClientId(clientOptional.get().getId());
            if (null != sessionId) {
                client.setSessionId(sessionId);
                client.setClientEntity(clientOptional.get());
                client.setMessage("Already authorized");
            } else {
                client = clientService.auth(login, password);
                if (null != client.getClientEntity())
                    client.setSessionId(logIn(client.getClientEntity()));
            }
        } else {
            client.setMessage("No such user " + login);
        }

        return Response
                .status(Response.Status.OK)
                .entity(client.toString())
                .build();
    }

    @GET
    @Path("exit")
    @Produces({MediaType.APPLICATION_JSON})
    public Response exit(@QueryParam("login") String login) {

        Optional<ClientEntity> clientEntity = clientService.findByLogin(login);

        if (clientEntity.isPresent()) {
            String sessionId = MyApplication.findSessionByClientId(clientEntity.get().getId());
            if (null != sessionId) {
                MyApplication.removeSessionBean(sessionId);
            }
        }
        return Response
                .status(Response.Status.OK)
                .entity(null)
                .build(); //TODO replace this stub to something useful
    }

    @POST
    @Path("reg")
    @Produces({MediaType.APPLICATION_JSON})
    public Response registerPOST(@FormParam("login") String login,
                                 @FormParam("password") String password){
        return register(login, password);
    }

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    public Response authPOST(@FormParam("login") String login,
                         @FormParam("password") String password) {
        return auth(login, password);
    }

    @POST
    @Path("exit")
    @Produces({MediaType.APPLICATION_JSON})
    public Response exitPOST(@FormParam("login") String login) {
        return exit(login);
    }
}
