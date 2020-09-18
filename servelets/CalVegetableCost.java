// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

// Extend HttpServlet class
public class CalVegetableCostpackage com.david.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Hashtable;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;


/**
 * Servlet implementation class CalVegetableCost
 */

public class CalVegetableCost extends HttpServlet {

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
        {
              //Get parameters
            String quantity = request.getParameter("quantity");
            String name = request.getParameter("name");
            String price = request.getParameter("price");


            //Get Connection
            try {
                Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
            } catch (ClassNotFoundException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            System.out.println("Found a driver");
            Connection dbConnect = null;
            try {
                dbConnect = getConnection("localhost", 7001);
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (NamingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }


       

        }





public Connection getConnection(String server, int port)
        throws SQLException, NamingException {
    Context ctx = null;
    Hashtable ht = new Hashtable();
    ht.put(Context.INITIAL_CONTEXT_FACTORY,"weblogic.jndi.WLInitialContextFactory");
    ht.put(Context.PROVIDER_URL, "t3://"+server+":"+port);
    ctx = new InitialContext(ht);
    DataSource ds = (javax.sql.DataSource) ctx.lookup ("localmysql");
    Connection conn =  ds.getConnection();
    //conn.setAutoCommit( true );
    return conn;
}    





} extends HttpServlet {

   // Method to handle GET method request.
   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      
       int qty= Integer.parseInt(quantity);
       int prc= Integer.parseInt(price);
       int tot=qty*prc;
       Vegetable vegetable = new Vegetable(tot);
        String vegetableJsonString = this.gson.toJson(employee);
 
        PrintWriter out = response.getWriter();
        // Set response content type
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(vegetableJsonString);
        out.flush();  

   }

   // Method to handle POST method request.
   public void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

      doGet(request, response);
   }
}