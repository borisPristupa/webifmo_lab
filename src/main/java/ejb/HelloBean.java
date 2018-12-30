package ejb;

import webservice.MyApplication;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.enterprise.context.SessionScoped;
import javax.ws.rs.*;
import java.io.Serializable;
import java.util.Optional;

@Stateful
@SessionScoped
@Path("sayHello")
@LocalBean
public class HelloBean implements Serializable {

    @GET
    public String greet(@QueryParam("sessionId") String sessionId) {
        Optional<SessionBean> sessionBean = MyApplication.getSessionBean(sessionId);
        return sessionBean.map(session
                -> "Hello " + session.getClient().getLogin())
                .orElse("Sorry, you need do authorization");
    }

//    @GET
//    public String[] greetEveryone() {
//        List clients = dbBean.getClients();
//        String[] names = new String[clients.size()];
//        for (int i = 0; i < names.length; i++) {
//            names[i] = "Hello, " + utilBean.name(((ClientEntity) clients.get(i)).getLogin());
//        }
//
//        return names;
//    }

    @POST
    public String greetPost(@FormParam("name") String name) {
        return "Hi, " + name;
    }
}