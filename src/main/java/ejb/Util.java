package ejb;

import javax.ejb.Local;

@Local
public interface Util {
    String name(String name);
}
