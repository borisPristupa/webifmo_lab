import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

import java.sql.*;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

class DBConnectivity {
    private Connection connection;
    private Session session;

    private void createSSHTunnel() {
        String SSHHost = "helios.cs.ifmo.ru";
//        String SSHUser = "s243882";
//        String SSHPassword = "uxm700";
        String SSHUser = "s245094";
        String SSHPassword = "ekq341"; //TODO make safe
        int SSHPort = 2222;

        String remoteHost = "pg";
        int localPort = 1234;
        int remotePort = 5432;

        try {
            JSch jsch = new JSch();
            session = jsch.getSession( SSHUser, SSHHost, SSHPort );
            session.setPassword( SSHPassword );
            session.setConfig( "StrictHostKeyChecking", "no" );
            session.connect();
            int assignedPort = session.setPortForwardingL( localPort, remoteHost, remotePort );
            System.out.println( "localhost:" + assignedPort + " -> " + remoteHost + ":" + remotePort );
        } catch ( Exception e ) {
            System.err.print( e );
        }
    }


    static DBConnectivity connect() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");

        DBConnectivity connectivity = new DBConnectivity();
        connectivity.createSSHTunnel();

//        if (System.getProperty("os.name").contains("Linux") ||
//                System.getProperty("os.name").contains("Windows")) {
//            connectivity.connection = DriverManager.getConnection("jdbc:postgresql:webifmo",
//                    "boris", "boris");
//        } else {
            connectivity.connection = DriverManager.getConnection("jdbc:postgresql://localhost:1234/studs",
                    "s245094", "ekq341");
//        }

        return connectivity;
    }

    void close() {
        try {
            connection.close();
            session.disconnect();
        } catch (SQLException ignored) {
        }
    }

    List<Record> getRecords() throws SQLException {
        float x, y, r;
        boolean hit;

        List<Record> records = new LinkedList<Record>();

        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT x, y, r, hit FROM record ORDER BY id ASC");


        while (resultSet.next()) {
            x = resultSet.getFloat(1);
            y = resultSet.getFloat(2);
            r = resultSet.getFloat(3);
            hit = resultSet.getBoolean(4);

            records.add(new Record(x, y, r, hit));
        }

        return records;
    }

    void addRecord(int id, Record record) throws SQLException {
        PreparedStatement statement = connection.prepareStatement("INSERT INTO record VALUES (?, ?, ?, ?, ?)");

        statement.setInt(1, id);
        statement.setFloat(2, record.getX());
        statement.setFloat(3, record.getY());
        statement.setFloat(4, record.getR());
        statement.setBoolean(5, record.isHit());

        statement.executeUpdate();
    }
}
