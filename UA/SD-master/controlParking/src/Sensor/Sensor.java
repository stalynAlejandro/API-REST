package Sensor;

import Sensor.RemoteInterface;
import java.rmi.registry.Registry;
import java.rmi.registry.LocateRegistry;
import java.rmi.Naming;
import java.rmi.RMISecurityManager;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

import javax.swing.plaf.synth.SynthSeparatorUI;

import java.io.*;


public class Sensor extends UnicastRemoteObject implements RemoteInterface, Serializable {
	
	private static RegistradorInterface registroInterface;
	private static Registry registry;
	
	private final String nombre;
	
	
	public String ultimaFecha;
	public int volumen, led;
	
	
	Sensor(String file) throws RemoteException
	{
		
		this.nombre = file.substring(0, file.lastIndexOf('.'));
		try
		{
			readSensor(file);
		}
		catch(Exception e)
		{
			System.err.println("Error leer " + this.nombre + " : " + e.toString());
			e.printStackTrace();
		}
	}
	
	@Override
	public String getNombre() throws RemoteException { return this.nombre; }
	
	@Override
	public int getVolumen() throws RemoteException { return volumen; }

	@Override
	public String getFecha() throws RemoteException { return ultimaFecha; }

	@Override
	public int getLed() throws RemoteException { return led; }
	
	@Override
	public void setLed(int led) throws RemoteException {
		this.led = led;
		saveSensor(nombre);
	}

	
	private int readSensor(String file) throws Exception{
		String sr;
		BufferedReader br = new BufferedReader(new FileReader(file));

		while( (sr = br.readLine()) != null )
		{
			String[] item = sr.split("=");
			if(item[0].compareTo("Volumen") == 0 )		this.volumen = Integer.parseInt(item[1]);
			if(item[0].compareTo("UltimaFecha") == 0 )  this.ultimaFecha = item[1];
			if(item[0].compareTo("Led") == 0 ) 			this.led = Integer.parseInt(item[1]);
		}
		
		return 0; //OK
	}


	private int saveSensor(String file) 
	{
		FileWriter fw = null;
		String sr;
		try 
		{
			fw = new FileWriter(new File(nombre));
			sr = "Volumen=" + volumen + "\nUltimaFecha=" + ultimaFecha + "\nLed" + led;
			fw.write(sr);
			fw.close();
		}
		catch(Exception e)
		{
			System.err.println("Error guardar " + this.nombre + " : " + e.toString());
			e.printStackTrace();
			return -1; //NOT OK.
		}	
		return 0; //OK.
	}

	@Override
	public String toString() {
		return "Sensor [nombre = " + this.nombre + ", volumen = " + this.volumen + ", led = " + this.led + ", ultimaFecha = " + this.ultimaFecha
				+ "]";
	}
	
	public static void main(String[] args) throws Exception{
		
		if(args.length >= 3) 
		{
			registry = LocateRegistry.getRegistry(args[0], Integer.parseInt(args[1]));
			Sensor sensor = new Sensor(args[2]);
			registroInterface = (RegistradorInterface) registry.lookup(Registrador.NOMBRE);
			registroInterface.registrarSensor(sensor);
			System.out.println(">> " + sensor.getNombre() + " registrado.");
            System.out.print("Pulsa ENTER para desregistrar " + sensor.getNombre());
            new BufferedReader(new InputStreamReader(System.in)).readLine();
            System.out.println("...");
            registroInterface.desregistrardoSensor(sensor);
            System.exit(0);
		}
		else
		{
			System.out.println("ERROR ARGUMENTOS: <IP> <PORT> <FILENAME>");
		}
	
	}


}







