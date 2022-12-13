import java.rmi.*;
import java.rmi.server.*;
import java.rmi.registry.Registry.*;
import java.rmi.registry.LocateRegistry.*;
import java.net.*;
import java.io.*;

public class Registro{
	
	public static void main(String args[]){
		
		String URLRegistro;
		try{
			System.setSecurityManager(new RMISecurityManager());
			Sensor sensorRemoto = new Sensor();
			URLRegistro = "/Sensor";
			Naming.rebind(URLRegistro, sensorRemoto);
			System.out.println("Servidor de objeto preparado.");
		}
		catch(Exception ex){
			System.out.println(ex);
		}
	}
}
