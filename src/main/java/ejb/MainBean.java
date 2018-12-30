package ejb;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Stateful
@SessionScoped
@LocalBean
public class MainBean implements Serializable {

    public int validate(BigDecimal x, BigDecimal y, BigDecimal r) {
        return ((x.compareTo(BigDecimal.valueOf(-2.0)) >= 0
                && x.compareTo(BigDecimal.valueOf(2.0)) <= 0) ? 0 : 1)
                +
                ((y.compareTo(BigDecimal.valueOf(-3.0)) >= 0
                        && y.compareTo(BigDecimal.valueOf(5.0)) <= 0) ? 0 : 2)
                +
                ((r.compareTo(BigDecimal.valueOf(0.0)) >= 0
                        && r.compareTo(BigDecimal.valueOf(2.0)) <= 0) ? 0 : 4);
    }


    public boolean isInsideArea(BigDecimal x, BigDecimal y, BigDecimal r) {
        boolean result = false;

        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) >= 0)
            result = x.abs().compareTo(r) <= 0
                    && y.compareTo(r.divide(BigDecimal.valueOf(2), RoundingMode.HALF_UP)) <= 0;

        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0)
            result |= x.multiply(x)
                    .add(y.multiply(y))
                    .compareTo(
                            r.multiply(r).divide(BigDecimal.valueOf(4), RoundingMode.HALF_UP)
                    ) <= 0;

        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0)
            result |= x.subtract(y)
                    .compareTo(
                            r.divide(BigDecimal.valueOf(2), RoundingMode.HALF_UP)
                    ) <= 0;

        return result;
    }
}
