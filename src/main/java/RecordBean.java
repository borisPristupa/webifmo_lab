//import lombok.Data;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import java.io.IOException;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

//@Data
public class RecordBean {
    private float x;
    private float y;
    private float r;
    private boolean hit;
    private List<Record> records;

    private String errorMessage ="";

    public String getErrorMessage( ){
        return errorMessage;
    }
    public boolean isHit() {
        return hit;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = Math.round(x * 1000) / 1000F;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = Math.round(y * 1000) / 1000F;
    }

    public float getR() {
        if (r == 0) r = 0.1F;
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public List<Record> getRecords() {
        if (null == records) {
            try {
                DBConnectivity connectivity = DBConnectivity.connect();
                records = connectivity.getRecords();
                connectivity.close();
            } catch (SQLException e) {
                records = new LinkedList<Record>();
                e.printStackTrace();
                errorMessage = "Ошибка базы данных";
            } catch (ClassNotFoundException e) {
                records = new LinkedList<Record>();
                e.printStackTrace();
            }

        }
        return records;
    }

    public void setRecords(LinkedList<Record> records) {
        this.records = records;
    }

    public void addRecord() {
        if (r <= 0.09F) {
            r = 0.1F;
            return;
        }

        hit = isInsideArea(x, y, r);
        Record newRecord = new Record(x, y, r, hit);

        try {
            DBConnectivity connectivity = DBConnectivity.connect();

            if (null == records) {
                    records = connectivity.getRecords();
            }
            connectivity.addRecord(records.size() + 1, newRecord);
            connectivity.close();

        } catch (SQLException e) {
            records = new LinkedList<Record>();
            e.printStackTrace();
            errorMessage = "Ошибка базы данных";
        } catch (ClassNotFoundException e) {
            records = new LinkedList<Record>();
            e.printStackTrace();
        }

        records.add(newRecord);
        for (Record record : records) {
            System.out.println("x = " + record.getX());
        }

    }

    public boolean checkArea() {
        return hit = isInsideArea(x, y, r);
    }

    public boolean isInsideArea(float x, float y, float r) {
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