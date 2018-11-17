import lombok.*;

@Data
class Record {
    @NonNull private int x;
    @NonNull private float y;
    @NonNull private float r;

    @Setter(AccessLevel.NONE)
    @NonNull
    private boolean hit;
}
