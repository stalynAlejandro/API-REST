package MyHTTPServer;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.Collections;
import java.util.Enumeration;

public class SocketServices {

	public static void sendMessage( Socket socket, String message ) throws IOException{
		
		DataOutputStream outputStream  =new DataOutputStream(socket.getOutputStream());
		outputStream.writeBytes(message);
	}
	
	
	public static String receiveMessage(Socket socket) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		StringBuilder sb = new StringBuilder();
		String s;
		
		while( ( s = br.readLine() ) != null && !s.equals("") )
		{
			sb.append(s).append("\n");
			
		}
		
		return sb.toString();
	}
	
	public static void displayIPAdresses() {
		try
		{
			System.out.println("Available IP's at this machine..");
			
			for(NetworkInterface network: Collections.list(NetworkInterface.getNetworkInterfaces()))
			{
				Collections
						.list(network.getInetAddresses()).stream()
						.filter(adress -> adress instanceof Inet4Address)
						.forEach(adress -> System.out.println("\t" + adress));
						
			}
			
		}
		catch(SocketException e)
		{
			System.out.println("ERROR: unable to display availabe ip's");
		}
	}
	
}
