package Controller;

import MyHTTPServer.HTTPServer;
import Sensor.Registrador;
import Sensor.RemoteInterface;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.util.StringTokenizer;
import java.rmi.AccessException;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Controller extends Thread implements Runnable{
	
	private static Registry registry;
	private Socket connect; 
	
	Controller(Socket c){
		this.connect = c;
	}
	
	public static void main(String[] args) {
		try
		{
			ServerSocket c_Server = new ServerSocket(HTTPServer.CONTROLLER_PORT);
			System.out.println("Controller active in: " + HTTPServer.CONTROLLER_IP + " : " + HTTPServer.CONTROLLER_PORT);
			
			while(true)
			{
				Socket c_Client = c_Server.accept();
				Controller controller = new Controller(c_Client);
				Thread thread = new Thread(controller);
				thread.start();
			}
		}
		catch(Exception e)
		{
			System.err.println("ERROR CONTROLLER : " + e.getMessage());
		}
	}


	@Override
	public void run() {
		
		BufferedReader br = null;
		String ask = "";
		String ans = "";
				
		try
		{
			ask = readSocketServer();
			registry = LocateRegistry.getRegistry(HTTPServer.REGISTRY_IP, HTTPServer.REGISTRY_PORT);
			String[] s = ask.split("&");
			String respuesta = "";	
			
			if(s[1].contains("all"))
			{
				int i = 0;
				while(i <= 4)
				{
					i++;
					try
					{
						String sensorNombre = "Sensor/Sensor"+String.valueOf(i);
						System.out.println("NOMBRE SENSOR: " + sensorNombre);
						Object remoteObject = registry.lookup(sensorNombre);
						if(remoteObject instanceof RemoteInterface) 
						{
							RemoteInterface sensor = (RemoteInterface) remoteObject;
							respuesta += "Sensor"+i+"<br>";
							respuesta += String.valueOf(sensor.getVolumen()) + "<br>" ;
							respuesta += sensor.getFecha() + "<br>";
							if(sensor.getLed() == 0) respuesta += "LIBRE";
							else respuesta += "OCUPADA";
							respuesta += "<br><br>";
							
							System.out.println(".............................................");
							System.out.println("RESPUESTA: " + respuesta);
							System.out.println(".............................................");

						}					
					}
					catch(NotBoundException e)
					{
						respuesta += " ";
					}
				}
				
			}
			else if(!s[2].contains("set"))
			{
				String[] num = s[0].split("="); //num[1] será el número del sensor.
				
				try
				{
					Object remoteObject = registry.lookup("Sensor/Sensor" + num[1]);
					if(remoteObject instanceof RemoteInterface) {
						
						RemoteInterface sensor = (RemoteInterface) remoteObject;
						if(s[1].contains("volumen")) 
						{
							respuesta = String.valueOf(sensor.getVolumen());
						}
						else if(s[1].contains("fecha"))
						{
							respuesta = sensor.getFecha();
						}
						else if(s[1].contains("led"))
						{
							if(sensor.getLed() == 0) respuesta = "LIBRE";
							else respuesta = "OCUPADA";
						}							
						
					}
							
				}
				catch(NotBoundException e)
				{
					respuesta = "SENSOR NO ENCONTRADO!";
				}

			}
			else if(s[2].contains("set"))
			{
				
				String[] numSensor = s[1].split("=");
				String[] setValue = s[2].split("=");
				int value = Integer.parseInt(setValue[1].trim());
				try
				{
					Object remoteObject = registry.lookup("Sensor/Sensor" + numSensor[1]);
					if(remoteObject instanceof RemoteInterface) {
						
						RemoteInterface sensor = (RemoteInterface) remoteObject;
						sensor.setLed(value);
						
					}
							
				}
				catch(NotBoundException e)
				{
					respuesta = "SENSOR NO ENCONTRADO!";
				}
			}
			
			System.out.println("Respuesta : " + respuesta);
			
			
			writeSocketServer(respuesta);
			
		}
		catch(IOException ex)
		{
			System.out.println("[002] " + ex.toString());
			ex.printStackTrace();
		}
		
		
	}
	
	private void writeSocketServer(String respuesta) throws IOException{
		
		System.out.println("RESPUESTA: " + respuesta);
		

		PrintWriter flujo = new PrintWriter(connect.getOutputStream());
		flujo.println(respuesta);
		flujo.println();
		flujo.flush();

		
		return;
	}
	
	private String readSocketServer() throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(connect.getInputStream()));
		StringBuilder sb = new StringBuilder();
		String s;
		
		while( ( s = br.readLine() ) != null && !s.equals("") )
		{
			sb.append(s).append("\n");
			
		}
		
		return sb.toString();
	}
	
	
}

































