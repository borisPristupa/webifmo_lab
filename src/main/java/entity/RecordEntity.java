package entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "record", schema = "s245094", catalog = "studs")
public class RecordEntity {
    private Integer id;
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private Boolean hit;
    private ClientEntity clientByClientId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "x", nullable = false, precision = 3)
    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    @Basic
    @Column(name = "y", nullable = false, precision = 3)
    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    @Basic
    @Column(name = "r", nullable = false, precision = 1)
    public BigDecimal getR() {
        return r;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    @Basic
    @Column(name = "hit", nullable = false)
    public Boolean getHit() {
        return hit;
    }

    public void setHit(Boolean hit) {
        this.hit = hit;
    }

    @Override
    public String toString() {
        return "{" +
                "\"id\":" + id +
                ", \"x\":" + x +
                ", \"y\":" + y +
                ", \"r\":" + r +
                ", \"hit\":'" + hit +
//                "\"clientId\":" + clientId +
                //"', \"errorMessage\": '" + errorMessage +
                "'}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecordEntity that = (RecordEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(x, that.x) &&
                Objects.equals(y, that.y) &&
                Objects.equals(r, that.r) &&
                Objects.equals(hit, that.hit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, x, y, r, hit);
    }

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id", nullable = false)
    public ClientEntity getClientByClientId() {
        return clientByClientId;
    }

    public void setClientByClientId(ClientEntity clientByClientId) {
        this.clientByClientId = clientByClientId;
    }
}
