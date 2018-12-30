package stateful;

import entity.RecordEntity;

import java.util.List;

public class RecordsStateful {
    private List<RecordEntity> recordEntities;
    private String message;

    public List<RecordEntity> getRecordEntities() {
        return recordEntities;
    }

    public void addRecordEntity(RecordEntity recordEntity) {
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
                "records: " + recordEntities +
                ", message:" + (null == message ? null : "'" + message + "'")+
                '}';
    }
}
