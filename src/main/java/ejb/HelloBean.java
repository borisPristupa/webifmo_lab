package ejb;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;

@Stateful
@RequestScoped
@LocalBean
@Path("sayHello")
public class HelloBean {
    @EJB
    UtilBean utilBean;

    @GET
    @Path("{name: [^a-hA-H][a-zA-Z0-9]*}")
    public String sayHello(@PathParam("name") String name) {
        return "Hello " + utilBean.name(name);
    }

    @GET
    @Path("{name: [a-hA-H][a-zA-Z0-9]*}")
    public String sayHelloTrue(@PathParam("name") String name) {
        return "Welcome " + utilBean.name(name);
    }

    @POST
    public String greetPost(@FormParam("name") String name){
        return "Hi, " + utilBean.name(name);
    }
}
//смело) предлаагю пройтись по пунктам с сайта с самого начало, тк у меня не пошло(