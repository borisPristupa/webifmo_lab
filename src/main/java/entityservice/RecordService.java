package entityservice;

import entity.RecordEntity;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Stateful
@LocalBean
public class RecordService {
    @PersistenceContext(unitName = "pu", type = PersistenceContextType.EXTENDED)
    private EntityManager em;

    public List<RecordEntity> findAllByClientId(Integer clientId) {
        return em.createQuery("SELECT r FROM RecordEntity r WHERE r.clientByClientId.id=:id", RecordEntity.class)
                .setParameter("id", clientId)
                .getResultList()
                .stream()
                .sorted(Comparator.comparingInt(RecordEntity::getId))
                .collect(Collectors.toList());
    }

    public void writeRecord(RecordEntity recordEntity) {
        em.persist(recordEntity);
    }

    public void clearAllByClientId(Integer clientId) {
        for (RecordEntity recordEntity: findAllByClientId(clientId)) {
            em.remove(recordEntity);
        }
    }

}
