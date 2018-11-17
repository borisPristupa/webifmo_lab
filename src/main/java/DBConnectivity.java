import java.sql.*;
import java.util.concurrent.ConcurrentLinkedQueue;

class DBConnectivity {
    private Connection connection;

    static DBConnectivity connect() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");

        DBConnectivity connectivity = new DBConnectivity();

        if (System.getProperty("os.name").contains("Linux")) {
            connectivity.connection = DriverManager.getConnection("jdbc:postgresql:webifmo",
                    "boris", "boris");
        } else {
            connectivity.connection = DriverManager.getConnection("jdbc:postgresql://pg/studs",
                    "s245094", "yourpassword");
        }

        return connectivity;
    }

    void close() {
        try {
            connection.close();
        } catch (SQLException ignored) {
        }
    }

    ConcurrentLinkedQueue<Record> getRecords() throws SQLException {
        int x;
        float y, r;
        boolean hit;

        ConcurrentLinkedQueue<Record> records = new ConcurrentLinkedQueue<Record>();

        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT x, y, r, hit FROM record ORDER BY id ASC");


        while (resultSet.next()) {
            x = resultSet.getInt(1);
            y = resultSet.getFloat(2);
            r = resultSet.getFloat(3);
            hit = resultSet.getBoolean(4);

            records.add(new Record(x, y, r, hit));
        }

        return records;
    }

    void addRecord(Record record) throws SQLException {
        PreparedStatement statement = connection.prepareStatement("INSERT INTO record (x, y, r, hit) VALUES (?, ?, ?, ?)");

        statement.setInt(1, record.getX());
        statement.setFloat(2, record.getY());
        statement.setFloat(3, record.getR());
        statement.setBoolean(4, record.isHit());

        statement.executeUpdate();
    }
}
