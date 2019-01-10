package stateful;

import entity.RecordEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RecordsStateful {
    private List<RecordEntity> recordEntities;
    private String message;

    public Optional<List<RecordEntity>> getRecordEntities() {
        return Optional.ofNullable(recordEntities);
    }

    public void addRecordEntity(RecordEntity recordEntity) {
        recordEntities = Optional.ofNullable(recordEntities).orElse(new ArrayList<>());
        recordEntities.add(recordEntity);
    }

    public void setRecordEntities(List<RecordEntity> recordEntities) {
        this.recordEntities = recordEntities;
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
                "\"records\": " + recordEntities +
                ", \"message\":" + (null == message ? null : '"' + message + '"')+
                '}';
    }
}
