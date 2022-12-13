package Sensor;
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface RemoteInterface extends Remote{
	
	String getNombre() throws RemoteException;
	String getFecha() throws RemoteException;
	int getVolumen() throws RemoteException;
	int getLed() throws RemoteException;
	void setLed(int led) throws RemoteException;
	
}
