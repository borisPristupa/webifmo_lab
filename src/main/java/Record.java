//import lombok.*;

//@Data
public class Record {
//    @NonNull private int x;
//    @NonNull private float y;
//    @NonNull private float r;

    //    @Setter(AccessLevel.NONE)
//    @NonNull
    private float x;
    private float y;
    private float r;

    boolean hit;

    public Record(float x, float y, float r, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
    }

    public float getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
