import java.rmi.*;
import java.io.*;
import java.net.*;


public class main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("...MAIN...");

		String host;
		String port;

		ClienteRMI cliente = new ClienteRMI();
		Servidor servidor = new Servidor();


		if(args.lenght < 2){
			System.out.println("Debe indicar la dirección del servidor...");
			return;
		}

		host = args[0];
		port = args[1];

		while(true)
		{
			cliente.pedirOperacion(host, port);
		}





	}

}

