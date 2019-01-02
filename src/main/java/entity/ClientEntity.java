package entity;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
//@Table(name = "client", schema = "s245094", catalog = "studs")
@Table(name = "client")
public class ClientEntity {
    private Integer id;
    private String login;
    private String password;
    private Collection<RecordEntity> recordsById;

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
    @Column(name = "login", nullable = false, length = -1)
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Basic
    @Column(name = "password", nullable = false, length = -1)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "{" +
                "\"id\":" + id +
                ", \"login\":\"" + login +
                "\"}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientEntity that = (ClientEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(login, that.login) &&
                Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, login, password);
    }

    @OneToMany(mappedBy = "clientByClientId", fetch = FetchType.EAGER)
    public Collection<RecordEntity> getRecordsById() {
        return recordsById;
    }

    public void setRecordsById(Collection<RecordEntity> recordsById) {
        this.recordsById = recordsById;
    }
}
