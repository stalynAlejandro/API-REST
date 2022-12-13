import java.rmi.*;
import java.io.*;

public class ClienteRMI
{

	/*Crear nueva instancia del cliente_rmi*/
	public ClienteRMI(){}

	public String pedirValores(int op, String resultado, InterfazSensores objetoRemoto)
	{


		InputStreamReader ent = new InputStreamReader(System.in);
		BufferedReader buf = new BufferedReader(ent);

		try{
			
			switch(op){
				case 1:
					resultado = String.valueOf(objetoRemoto.getVolumen());
					break;
				case 2:
					resultado = String.valueOf(objetoRemoto.getFecha());
					break;
				case 3:
					resultado = String.valueOf(objetoRemoto.getLed());
					break;
				case 4:
					objetoRemoto.setLed(1);
					resultado = "LED encendida.";
					break;
				case 5:
					objetoRemoto.setLed(0);
					resultado = "LED apagada.";
					break;
				default: break;		
			}
			

		}
		catch(Exception exc)
		{
			System.out.println("[PEDIR VALORES] Error al realizar la operación " + exc);	
		}
	
		return resultado;
	}

	public void pedirOperacion(String host, String port)
	{
		int op;
		int salir = 0;
		String resultado = "";
		char respuesta = 'x';

		InterfazSensores objetoRemoto = null;
		InputStreamReader ent = new InputStreamReader(System.in);
		BufferedReader buf = new BufferedReader(ent);

		String servidor = "rmi://" + host + ":" + port + "/Sensor";

		try
		{
			System.setSecurityManager(new RMISecurityManager());
			objetoRemoto = (InterfazSensores) Naming.lookup(servidor);
		}
		catch(Exception ex)
		{
			System.out.println("Error al instanciar el objeto remoto " + ex);
			System.exit(0);
		}

		while(salir == 0)
		{
			op = 0;

			while(op != 1 && op != 2 && op != 3 && op != 4 && op != 5)
			{
				System.out.println("[1] GET VOLUMEN");
				System.out.println("[2] GET FECHA");
				System.out.println("[3] GET LED");
				System.out.println("[4] SET LED >> ON");
				System.out.println("[5] SET LED >> OFF");

				try
				{
					op = new Integer(buf.readLine()).intValue();
				}
				catch(Exception e)
				{	
					op = 0; 
				}
			}

			resultado = pedirValores(op, resultado, objetoRemoto);
			respuesta = 'x';

			while(respuesta != 's' && respuesta != 'n')
			{
				System.out.println("El resultado es: " + resultado);
				System.out.println("Desea realizar otra operación? [s,n]: ");

				try
				{
					respuesta = buf.readLine().charAt(0);
				}
				catch(Exception e)
				{
					respuesta = 'x';
				}
			}

			if(respuesta != 's')
			{
				salir = 1;
			}
		}

		objetoRemoto = null;
		return;
	}


	public void menu(String host, String port)
	{
		int opc = 0;
		InputStreamReader ent = new InputStreamReader(System.in);
		BufferedReader buf = new BufferedReader(ent);

		while(opc != 1 && opc != 2)
		{
			System.out.println("...................................");
			System.out.println(".............CLIENTE...............");
			System.out.println("[1] Realizar operación.");
			System.out.println("[2] Salir.");
			System.out.println("Indique la opción a realizar: ");

			try
			{
				opc = new Integer(buf.readLine()).intValue();
			}
			catch(Exception e)
			{
				opc = 0;
			}
		}

		if(opc == 1)
		{
			pedirOperacion(host, port);
		}
		else
		{
			System.exit(0);
		}

		return;
	}



	/*public static void main(String[] args)
	{

		String host;
		String port;

		ClienteRMI cr = new ClienteRMI();

		int i = 0;

		System.out.println("[CLIENTE]");
		if(args.length < 2)
		{
			try
			{
				System.out.println("Debe indicar la dirección del servidor");
			}
			catch(Exception e)
			{
				System.out.println("Error: " + e);
			}

			return;
		}

		host = args[0];
		port = args[1];

		while(i == 0)
		{
			cr.menu(host, port);
		}
	}*/
}
