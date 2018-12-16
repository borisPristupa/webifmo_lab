package ejb;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;

@Stateful
@LocalBean
public class UtilBean {

    private int i = 0;

    public String name(String name) {
        return name + "! " + i++;
    }

}
