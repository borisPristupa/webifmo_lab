package webservice;

import ejb.SessionState;
import entity.ClientEntity;
import entityservice.ClientService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("auth")
public class Session {
    private SessionState sessionState = new SessionState();

    @EJB
    ClientService clientService;

    private String logIn(ClientEntity client) {
        String sessionId = MyApplication.registerSessionBean(sessionState);
        sessionState.set(client, sessionId);
        return sessionId;
    }

    @GET
    @Path("reg")
    @Produces({MediaType.APPLICATION_JSON})
    public Response register(@QueryParam("login") String login,
                             @QueryParam("password") String password) {
        ClientEntity client;
        try {
            client = clientService.register(login, password);
            sessionState.set(client, logIn(client));
        } catch (Exception e) {
            sessionState.set(e.getMessage());
        }
        return Response
                .status(Response.Status.OK)
                .entity(sessionState.toString())
                .build();
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response auth(@QueryParam("login") String login,
                         @QueryParam("password") String password) {
        ClientEntity client;
        try {
            client = clientService.findByLogin(login);
            String sessionId = MyApplication.findSessionByClientId(client.getId());
            if (null != sessionId) {
                sessionState.setSessionId(sessionId);
                sessionState.setClientEntity(client);
                sessionState.setMessage("Already authorized");
            } else {
                client = clientService.auth(login, password);
                sessionState.set(client, logIn(client));
            }
        } catch (Exception e) {
            sessionState.set(e.getMessage());
        }

        return Response
                .status(Response.Status.OK)
                .entity(sessionState.toString())
                .build();
    }

    @GET
    @Path("exit")
    @Produces({MediaType.APPLICATION_JSON})
    public Response exit(@QueryParam("login") String login) {

        ClientEntity clientEntity;
        try {
            clientEntity = clientService.findByLogin(login);
            String sessionId = MyApplication.findSessionByClientId(clientEntity.getId());
            if (null != sessionId) {
                MyApplication.removeSessionBean(sessionId);
            }
            sessionState.set(clientEntity, sessionId);
        } catch (Exception e) {
            sessionState.set(e.getMessage());
        }

        return Response
                .status(Response.Status.OK)
                .entity(sessionState.toString())
                .build();
    }

    @POST
    @Path("reg")
    @Produces({MediaType.APPLICATION_JSON})
    public Response registerPOST(@FormParam("login") String login,
                                 @FormParam("password") String password) {
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
