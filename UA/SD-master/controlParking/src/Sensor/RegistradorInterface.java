package Sensor;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;

public interface RegistradorInterface extends RemoteInterface{

	public void registrarSensor(RemoteInterface sensor) throws RemoteException;
	public void desregistrardoSensor(RemoteInterface sensor) throws RemoteException;
	
}
