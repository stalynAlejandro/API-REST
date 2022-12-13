import java.rmi.*;
import java.io.*;
import java.net.*;
import java.lang.String;

public class Servidor{

	/*
	* Lee datos del socket. Supone que se la pasa un buffer con hueco suficiente para datos.
	* Devuelve el número de bytes leidos, 0 si se cierra el fichero y -1 si hay error.
	*/

	public String leeSocket(Socket p_sk, String p_Datos){

		try
		{
			//Transforma el contenido del socket en string.
			DataInputStream flujo = new DataInputStream(p_sk.getInputStream());
			p_Datos = new String();
			p_Datos = flujo.readUTF();
		}
		catch(Exception e)
		{
			System.out.println("Error: " + e.toString());
		}

		//Devulve la cadena leída.
		return p_Datos;
	}

	
	/*
	* Escribe dato en el socket cliente. Devuelve número de bytes escritos o -1 si hay erro.
	*/
	public void escribeSocket(Socket p_sk, String p_Datos){
		
		try
		{
			//Escribo p_Datos en el socket
			DataOutputStream flujo = new DataOutputStream(p_sk.getOutputStream());
			flujo.writeUTF(p_Datos);
		}
		catch(Exception e)
		{
			System.out.println("Error: " + e.toString());
		}
	
		return;
	}

	/*SUMAR*/
	public int sumar(int a, int b){
		return a+b;
	}


	/**/
	public int realizarOperacion(String cadena){
		
		int res = 0;
		String[] operacion = cadena.split(",");

		System.out.println("SRV: La operación es: " + operacion[0]);

		if(operacion.length != 1)
		{
			System.out.println("SRV: El operando 1 es " + operacion[1] + "y el operando 2 es " + operacion[2]);

			if(operacion[0].compareTo("suma") == 0){
				res = sumar(Integer.parseInt(operacion[1]), Integer.parseInt(operacion[2]));
			}
			else
			{
				res = -1;
			}


		System.out.println("SRV: El resultado es: " + res);

		}
		else
		{
			res = -1;
		}
		return res;
	}


	/*MAIN*/
	/*public static void main(String[] args){
		
		//Descripción de socket servidor y de socket con el cliente.
		int resultado = 0;
		String Cadena = "";
		String puerto = "";

		try
		{
			//Instanciamos la clase Servidor.
			Servidor sr = new Servidor();

			if(args.length < 1){
				//Si no se ha indicado el puerto.
				System.out.println("Debe indicar el puerto de escucha del servidor");
				System.out.println("$./Servidor puerto_servidor");
				System.exit(1);
			}

			//El puerto será el arg -> 0
			puerto = args[0];

			//Creamos el socket del Servidor con el puerto indicado, por donde el servidor escuchará.
			ServerSocket skServidor = new ServerSocket(Integer.parseInt(puerto));
			System.out.println("Escucho el puerto " + puerto);

			while(true)
			{
				//Se espera un cliente que quiera conectarse.
				//Creamos el socket cliente.
				Socket skCliente = skServidor.accept();
				System.out.println("Sirviendo cliente...");

				while(resultado != -1){ //Mientras resultado no de un erro(-1)

					//Se lee el socket del Cliente y se guarda en Cadena
					Cadena = sr.leeSocket(skCliente, Cadena);

					//Se escribe en pantalla la información que se ha recibido del cliente.
					//Se realiza las operaciones según la Cadena leida y se devuelve el resultado.
					//Socket Cliente.
					resultado = sr.realizarOperacion(Cadena);
					Cadena = Integer.toString(resultado);
					sr.escribeSocket(skCliente, Cadena);
					
				}
				skCliente.close();
				System.exit(0);
			}
		}
		catch(Exception e)
		{
			System.out.println("Error: " + e.toString());
		
		}


	}*/

}





































