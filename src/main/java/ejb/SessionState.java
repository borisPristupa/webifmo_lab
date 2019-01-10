package ejb;

import entity.ClientEntity;

import java.io.Serializable;

public class SessionState implements Serializable {
    private ClientEntity clientEntity = null;
    private String sessionId = null;

    private String message = null;


    public void setClientEntity(ClientEntity clientEntity) {
        this.clientEntity = clientEntity;
    }

    public ClientEntity getClientEntity() {
        return clientEntity;
    }


    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void set(String message) {
        this.message = message;
        this.clientEntity = null;
        this.sessionId = null;
    }

    public void set(ClientEntity clientEntity, String sessionId) {
        this.clientEntity = clientEntity;
        this.sessionId = sessionId;
        this.message = null;
    }

    @Override
    public String toString() {
        return "{" +
                "\"user\": " + clientEntity +
                ", \"sessionId\": " + (null == sessionId ? null : '"' + sessionId + '"') +
                ", \"message\":" + (null == message ? null : '"' + message + '"') +
                '}';
    }
}


