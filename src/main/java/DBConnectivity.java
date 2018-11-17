import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

import java.sql.*;
import java.util.concurrent.ConcurrentLinkedQueue;

class DBConnectivity {
    private Connection connection;
    private Session session;

    private void createSSHTunnel() {
        String SSHHost = "se.ifmo.ru";
        String SSHUser = "s243882";
        String SSHPassword = "uxm700";
        int SSHPort = 2222;

        String remoteHost = "pg";
        int localPort = 5432;
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
            connectivity.connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/studs",
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
