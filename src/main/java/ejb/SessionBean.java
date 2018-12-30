package ejb;

import entity.ClientEntity;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;

@SessionScoped
@LocalBean
@Stateful
public class SessionBean implements Serializable {
    private ClientEntity client = null;
    private String sessionId = null;

    public void setClient(ClientEntity client) {
        this.client = client;
    }

    public ClientEntity getClient() {
        return client;
    }


    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}


