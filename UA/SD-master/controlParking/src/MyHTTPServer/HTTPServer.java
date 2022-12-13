package MyHTTPServer;

import Controller.Controller;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.util.StringTokenizer;


public class HTTPServer extends Thread implements Runnable{

	static final File ROOT = new File("./src");
	static final String DEFAULT_FILE = "index.html";
	static final String NOT_FOUND = "404.html";
	
	public static int MAX_CONNECTIONS=5;
	public static int HTTP_PORT=1025;
	public static String CONTROLLER_IP="172.20.42.150";
	public static int CONTROLLER_PORT=1026;
	public static String REGISTRY_IP="172.20.42.150";
	public static int REGISTRY_PORT=1099;
	
	
	
	static boolean MAX_REACHED = false;
	

	
	private Socket connect;
	
	public HTTPServer(Socket connect) throws Exception {
		
		this.connect = connect;
		
	}
	
	public static int readSettings(String file) throws Exception{
		String sr;
		BufferedReader br = new BufferedReader(new FileReader(file));

		while( (sr = br.readLine()) != null )
		{
			String[] item = sr.split("=");
			
			if(item[0].compareTo("MAX_CONNECTIONS") == 0 )		HTTPServer.MAX_CONNECTIONS = Integer.parseInt(item[1]);
			if(item[0].compareTo("HTTP_PORT") == 0 ) 			HTTPServer.HTTP_PORT = Integer.parseInt(item[1]);
			if(item[0].compareTo("CONTROLLER_IP") == 0 ) 		HTTPServer.CONTROLLER_IP = item[1];
			if(item[0].compareTo("CONTROLLER_PORT") == 0 ) 		HTTPServer.CONTROLLER_PORT = Integer.parseInt(item[1]);
			if(item[0].compareTo("REGISTRY_IP") == 0 ) 			HTTPServer.REGISTRY_IP = item[1];
			if(item[0].compareTo("REGISTRY_PORT") == 0 ) 		HTTPServer.REGISTRY_PORT = Integer.parseInt(item[1]);

		}
		
		return 0; //OK
	}
	
	public static void main(String[] args) throws InterruptedException{ 															//Args: HTTPServer.class <PORT> <MAX_CONNECTIONS>

		if(args.length <= 2) 
		{
			try 
			{
				readSettings("src/MyHTTPServer/settings.txt");
				ServerSocket socketServidor = new ServerSocket(HTTPServer.HTTP_PORT); 														//Parameter PORT to create server socket
				System.out.println("Server started. \nListening for connections on port: " + HTTPServer.HTTP_PORT);
				Thread thread = null;
				while(true) 
				{
					if(Thread.activeCount() <= MAX_CONNECTIONS)
					{
						Socket clientSocket = socketServidor.accept();
						HTTPServer myServer = new HTTPServer(clientSocket);
						thread = new Thread(myServer);
						thread.start();
					}	
				}	
			}
			catch(Exception e)
			{
				System.err.println("SERVER CONNECTION ERROR: " + e.getMessage());
			}	
		}
		else
		{
			System.err.println("ERROR ARGS: /.class <PORT> <MAX_CONNECTIONS> ");
		}
	}
	
	
	@Override
	public void run() { 																				//We manage our particular Client Connection
		
		BufferedReader br = null;			//BufferReader
		try
		{
			br = new BufferedReader(new InputStreamReader(connect.getInputStream()));						
			String[] input = new String(br.readLine()).split(" ");
			
			if(input[0].equals("GET") || input[0].equals("SET") )
			{
				if(input[1].equals("/")) input[1] += DEFAULT_FILE;
				if(input[1].contains("/controlSD"))servicioDinamico(input[1]);
				else servicioEstatico(input[1]);
				
			}
			else
			{
				sendMessageHTTPToClient(0, 405, null); //ERROR 404 FILE NOT FOUND

			}
		}
		catch(FileNotFoundException f)
		{
			String s = "/";
			s += NOT_FOUND;
			File file = new File(ROOT, s);
			int fileLength = (int)file.length();	
			byte[] fileData;
			try 
			{
				fileData = readFileData(file, fileLength);
				sendMessageHTTPToClient(fileLength, 404, fileData); 	// 404 FILE NOT FOUND
				
			} catch (IOException e) {
				System.err.println("ERROR IO EXCEPTION: " + e.getMessage());
			}
			
			System.err.println("ERROR FILE NOT FOUND: " + f.getMessage());
		}
		catch(IOException e)
		{
			System.err.println("ERROR IO EXCEPTION: " + e.getMessage());
		}
	}
	
	private void servicioEstatico(String request) throws IOException {
		
		File file = new File(ROOT, request);
		int fileLength = (int)file.length();	
		byte[] fileData = readFileData(file, fileLength);
		sendMessageHTTPToClient(fileLength, 200, fileData); //OK
	}
	
	
	private void servicioDinamico(String request) throws IOException {

		Socket controllerSocket = null;
		try
		{
			controllerSocket = new Socket(HTTPServer.CONTROLLER_IP, HTTPServer.CONTROLLER_PORT);
			messageToController(controllerSocket, request);
			System.out.println("servicioDinámico: " + request);
			String ans = receiveMessageFromController(controllerSocket);
			
			 File file = new File(ROOT, DEFAULT_FILE); 
			 BufferedReader br = new BufferedReader(new FileReader(file)); 
			 
			 char h = '"';
			 String st; 
			 String res = "";
			 String stt = "<label id="+h+"respuesta"+h+">"+ans+"</label>";
			 while ((st = br.readLine()) != null)
			 {
				 if(st.contains("respuesta"))res += stt;
				 else res += st; 	 
			 }
			 
			byte[] b = res.getBytes();
			sendMessageHTTPToClient(res.length(), 200, b);
			if(ans.contains("error"))sendMessageHTTPToClient(0, 404, null);	//404 : NOT FOUND
			controllerSocket.close();
		}
		catch(IOException e)
		{
			System.out.println("ERROR 409");
			sendMessageHTTPToClient(0, 409, null);	//409 : CONTROLLER CONEXION FAILED
		}
	}
	
	private void messageToController(Socket s_controller, String request) throws IOException{
		PrintWriter out = new PrintWriter(s_controller.getOutputStream());
		out.println(request);
		out.println(); 																								// Blank line between headers and content, very important !
		out.flush(); 
	}
	
	private String receiveMessageFromController(Socket s_controller) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(s_controller.getInputStream()));
		StringBuilder sb = new StringBuilder();
		String s;
		while( ( s = br.readLine() ) != null && !s.equals("") )sb.append(s).append("\n");

		return sb.toString();
	}
	
	
	private void sendMessageHTTPToClient(int fileLength, int cod, byte[] fileData) throws IOException {
		
		PrintWriter out = null;
		DataOutputStream bw = null;			
		try
		{
			bw = new DataOutputStream(connect.getOutputStream());
			out = new PrintWriter(connect.getOutputStream());
			
			if(cod == 200)//OK
			{
				out.println("HTTP/1.1 200 OK");		//We send HTTP Headers with data to client
				out.println("Server: HTTPServer by STALYN ALEJNDRO : 1.0");
				out.println("Date: " + new Date());
				out.println("Content-type: " + "text/html");
				out.println("Content-length: " + fileLength);
			}
			else if(cod == 404)//FILE NOT FOUND
			{
				out.println("HTTP/1.1 404 File Not Found");	
				out.println("Server: HTTPServer by STALYN ALEJNDRO : 1.0");
				out.println("Date: " + new Date());
				out.println("Content-type: " + "text/html");
				out.println("Content-length: " + fileLength);
			}
			else if(cod == 405)//METHOD NOT ALLOWED
			{
				out.println("HTTP/1.1 405 METHOD_NOT_ALLOWED");														//We send HTTP Headers with data to client
				out.println("Server: HTTPServer by STALYN ALEJNDRO : 1.0");
				out.println("Date: " + new Date());
				out.println("Content-type: " + "text/html");
				out.println("Content-length: " + fileLength);
			}
			else if(cod == 409)//CONTROLLER CONEXIÓN LOST
			{
				out.println("HTTP/1.1 409 CONTROLLER_CONEXION_LOST");														//We send HTTP Headers with data to client
				out.println("Server: HTTPServer by STALYN ALEJNDRO : 1.0");
				out.println("Date: " + new Date());
				out.println("Content-type: " + "text/html");
				out.println("Content-length: " + fileLength);
			}
			out.println(); 	// Blank line between headers and content, very important !
			out.flush(); 	// Flush character output stream buffer
			bw.write(fileData, 0, fileLength);		
			bw.flush();
			
		}
		catch(IOException e)
		{
			System.err.println("ERROR SEND MESSAGE: " + e.getMessage());
		}
		finally
		{
			
			try {
				bw.close();
				out.close();
			} catch (IOException e) {
				System.err.println("ERROR .CLOSE(): " + e.getMessage());
			}
			
		}
	}
	
	
	private byte[] readFileData(File file, int fileLength) throws IOException{
		
		FileInputStream fileIn = null;
		byte[] fileData = new byte[fileLength];
		
		try
		{
			fileIn = new FileInputStream(file);
			fileIn.read(fileData);
		}
		finally
		{
			if(fileIn != null)
			{
				fileIn.close();
			}
		}
		
		return fileData;
		
	}
}
