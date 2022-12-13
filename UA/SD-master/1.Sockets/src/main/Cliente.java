package main;
import java.io.*;
import java.net.*;

public class Cliente {
	
	/*
	 * Lee datos del socket. Supone que se le pasa un buffer con hueco suficiente para los datos.
	 * Devuelve el número de bytes leídos, 0 si se cierra fichero y -1 si hay un error.
	 */
	public String leeSocket(Socket sk, String datos) {
		
		try
		{
			DataInputStream flujo = new DataInputStream(sk.getInputStream());
			datos = flujo.readUTF();
		}
		catch(Exception e) 
		{
			System.out.println("Error: " + e.toString());
		}
		return datos;
	}
	
	//Escribe datos en el socket cliente. 
	//Devuelve número de bytes escritos o -1 si hay error.
	public void escribeSocket(Socket sk, String datos) {
		try
		{
			DataOutputStream flujo = new DataOutputStream(sk.getOutputStream());
			flujo.writeUTF(datos);
		}
		catch(Exception e)
		{
			System.out.println("Error: " + e.toString());
		}
		return;
	}
	
	public int pedirNumeros(String op, String cadena, int res, Socket sckConServidor) {
		
		int op1 = 10;
		int op2 = 10;
		InputStreamReader isR = new InputStreamReader(System.in);
		BufferedReader br = new BufferedReader(isR);
		
		try 
		{
			while(op1 < 0 || op1 > 9)
			{
				System.out.println("Introduzca el primer operando [0 - 9]");
				op1 = Integer.parseInt(br.readLine());
			}
			while(op2 < 0 || op2 > 9)
			{
				System.out.println("Introduzca el primer operando [0 - 9]");
				op2 = Integer.parseInt(br.readLine());
			}
			
			//Forma la cadena para enviar la operación por el socket conectado con el servidor.
			cadena = op + ", " + op1 + "," + op2;
			escribeSocket(sckConServidor, cadena);
			
			//Una vez enviada la cadena, borra lo que había en la variable y se prepara para leer lo que 
			//el servidor va a enviar por el socket, sckConServidor.
			cadena = "";
			cadena = leeSocket(sckConServidor, cadena);
			
			//Transforma lo que lee en integer.
			res = Integer.parseInt(cadena);
		}
		catch(Exception e)
		{
			System.out.println("Error: " + e.toString());
		}
		
		return res;
		
	}
	
	
	public void pedirOperacion(String host, String puerto) {
		
		int operacion;
		int salir = 0;
		int resultado = 0;
		char respuesta = 'x';
		
		//Descriptor del socket y buffer para datos.
		String Cadena = "";
		String op = "";
		InputStreamReader isr = new InputStreamReader(System.in);
		BufferedReader br = new BufferedReader(isr);
		
		//Se abre la conexión con el servidor, pasando el nombre del ordenador y el servicio solicitado.
		try 
		{
			Socket skCliente = new Socket(host, Integer.parseInt(puerto));
			
			while(salir == 0) 
			{
				operacion = 0;
				
				while(operacion != 1 && operacion != 2) 
				{
					System.out.println("[1] Sumar");
					System.out.println("[2] Multiplicar");
					System.out.println("Indica la operación a realizar: ");
					operacion = Integer.parseInt(br.readLine());
				}
				
				if(operacion == 1) op = "suma";
				else op = "mult";
				
				resultado = pedirNumeros(op, Cadena, resultado, skCliente);
				respuesta = 'x';
				
				while(respuesta != 's' && respuesta != 'n') 
				{
					System.out.println("El resultado es: " + resultado);
					System.out.println("Desea realizar otra operación? [s,n]: ");
					respuesta = br.readLine().charAt(0);
					
				}
				
				if(respuesta != 's') 
				{
					salir = 1;
					
					//Se cierra el socket con el servidor.
					escribeSocket(skCliente, "fin");
					Cadena = leeSocket(skCliente, Cadena);
					resultado = Integer.parseInt(Cadena);
					
					if(resultado == -1) 
					{
						skCliente.close();
						System.out.println("Conexión cerrada.");
						System.exit(0);
					}
				}
				
				Cadena = "";
				op = "";
				
			}
		}
		catch(Exception e)
		{
			System.out.println("Error: " + e.toString());
		}
		return;
	}
	
	public void menu(String host, String puerto) 
	{
		int opc = 0;
		
		try
		{
			while(opc != 1 && opc != 2)
			{
				System.out.println("[1] Realizar operación\n");
				System.out.println("[2] Salir");
				InputStreamReader isr = new InputStreamReader(System.in);
				BufferedReader br = new BufferedReader(isr);
				opc = Integer.parseInt(br.readLine());
			}
		}
		catch(Exception e)
		{
			System.out.println("Error: " + e.toString());
		}
		return;
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Cliente cl = new Cliente();
		int i = 0;
		String host;
		String puerto;
		if (args.length < 2) {
			System.out.println ("Debe indicar la direccion del servidor y el puerto");
			System.out.println ("$./Cliente nombre_servidor puerto_servidor");
			System.exit(-1);
		}
		host = args[0];
		puerto = args[1];

		while(i==0)
		{
			cl.menu(host,puerto);
		}
	}

}










