//import lombok.Data;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.sql.SQLException;
import java.util.concurrent.ConcurrentLinkedQueue;

//@Data
@ManagedBean
@ApplicationScoped
public class RecordBean {
    private float x;
    private float y;
    private float r;
    private ConcurrentLinkedQueue<Record> records;

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
//        throw new NullPointerException();
        this.y = y;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public ConcurrentLinkedQueue<Record> getRecords() {
        return records;
    }

    public void setRecords(ConcurrentLinkedQueue<Record> records) {
        this.records = records;
    }

    public void addRecord() {
        /*
        throw new NullPointerException();
         /*/
        Record newRecord = new Record(x, y, r, isInsideArea(x, y, r));

        try {
            DBConnectivity connectivity = DBConnectivity.connect();

            if (null == records) {
                records = connectivity.getRecords();
            }
            connectivity.addRecord(records.size() + 1, newRecord);
            connectivity.close();

        } catch (SQLException e) {
            records = new ConcurrentLinkedQueue<Record>();
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            records = new ConcurrentLinkedQueue<Record>();
            e.printStackTrace();
        }

        records.add(newRecord);
        //*/
    }

    private boolean isInsideArea(float x, float y, float r) {
        boolean result = false;

        if (x <= 0 && y >= 0)
            result = -x <= r && y <= r / 2;

        if (x <= 0 && y <= 0)
            result |= x * x + y * y <= r * r / 4;

        if (x >= 0 && y <= 0)
            result |= x - y <= r / 2;

        return result;
    }
}