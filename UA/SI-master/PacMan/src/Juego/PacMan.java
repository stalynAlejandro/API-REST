package Juego;

public class PacMan implements Runnable {
	int mov = Laberinto.DERECHA; // Movimiento a devolver al programa principal
	boolean m_terminado; 
	Laberinto m_laberinto;
	public int controlador;
	Aestrella m_aestrella = new Aestrella(true);
	
	public synchronized boolean isDone()
	{
		return m_terminado;
	}
	
	public synchronized void isDone(boolean t)
	{
		m_terminado = t;
	}	
	
	public void asignarLaberinto(Laberinto l)
	{
		m_laberinto = new Laberinto(l);
	}
	
	public void run()
	{
		mov = m_aestrella.run(controlador, m_laberinto);
		isDone(true);
	}
}
