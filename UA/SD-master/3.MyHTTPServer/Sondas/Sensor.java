import java.io.Serializable;
import java.rmi.*;
import java.rmi.server.*;

public class Sensor extends UnicastRemoteObject implements InterfazSensores, Serializable{
	private int volumen = 0;
	private int led = 0;
	private String ultimaFecha = "s";
	
	public Sensor() throws RemoteException{
		super();
	}

	public void setVolumen(int vol){
		volumen = vol;
	}

	public void setUltimaFecha(String fecha){
		ultimaFecha = fecha;
	}

	public void setLed(int l){
		led = l;
	}
	
	public int getVolumen(){
		return volumen;
	}
	
	public String getFecha(){
		return ultimaFecha;
	}
	
	public int getLed(){
		return led;
	}
}




