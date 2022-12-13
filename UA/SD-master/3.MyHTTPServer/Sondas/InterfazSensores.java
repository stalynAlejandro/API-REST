import java.io.Serializable;
import java.rmi.*;
import java.rmi.server.*;
import java.lang.*;

public interface InterfazSensores extends Remote{	

	public void setVolumen(int vol) throws java.rmi.RemoteException;
	public void setUltimaFecha(String fecha) throws java.rmi.RemoteException;
	public void setLed(int led) throws  java.rmi.RemoteException;

	public int getVolumen() throws java.rmi.RemoteException;
	public String getFecha() throws java.rmi.RemoteException;
	public int getLed() throws java.rmi.RemoteException;

}
