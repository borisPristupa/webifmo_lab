package stateful;

import entity.ClientEntity;

public class ClientStateful {
    private ClientEntity clientEntity;
    private String sessionId;
    private String message;

    public ClientEntity getClientEntity() {
        return clientEntity;
    }

    public void setClientEntity(ClientEntity clientEntity) {
        this.clientEntity = clientEntity;
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

    @Override
    public String toString() {
        return "{" +
                "user: " + clientEntity +
                ", sessionId: " + (null == sessionId ? null : "'" + sessionId + "'") +
                ", message:" + (null == message ? null : "'" + message + "'")+
                '}';
    }
}
