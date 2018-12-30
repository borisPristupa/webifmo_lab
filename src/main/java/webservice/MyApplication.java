package webservice;

import ejb.DBBean;
import ejb.HelloBean;
import ejb.SessionBean;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.*;

@ApplicationPath("/app")
public class MyApplication extends Application {
    private static HashMap<String, SessionBean> sessionBeanHashMap = new HashMap<>();
    public static int SESSION_ID_LENGTH = 24;

    public static Optional<SessionBean> getSessionBean(String id) {
        return Optional.ofNullable(sessionBeanHashMap.get(id));
    }

    public static String registerSessionBean(SessionBean sessionBean) {
        Random random = new Random();
        StringBuilder key;
        do {
            key = new StringBuilder();
            for (int i = 0; i < SESSION_ID_LENGTH; i++) {
                int r = random.nextInt(52);
                char c = (char) (65 + r % 26 + r / 26 * (97 - 65));
                key.append(c);
            }
        } while (sessionBeanHashMap.containsKey(key.toString()));

        sessionBeanHashMap.put(key.toString(), sessionBean);

        return key.toString();
    }

    public static void removeSessionBean(String id) {
        sessionBeanHashMap.remove(id);
    }

    public static String findSessionByClientId(Integer clientId) {
        for (HashMap.Entry<String, SessionBean> entry : sessionBeanHashMap.entrySet()) {
            if (entry.getValue().getClient().getId().equals(clientId)) {
                return entry.getKey();
            }
        }
        return null;
    }

    public Set<Class<?>> getClasses() {
        Set<Class<?>> s = new HashSet<>();
        s.add(Session.class);
        s.add(DBBean.class);
        s.add(HelloBean.class);
        s.add(Main.class);
        return s;
    }
}
