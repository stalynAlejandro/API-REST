package Juego;

public class Juego implements Runnable {
	
	public boolean m_terminado = false;
	public String mensaje;
	Laberinto m_laberinto;
	MiCanvas dibujo;
	int m_tiempoMaximo = 2000; // 2 segundos como tiempo máximo para realizar un movimiento
	
	// Constantes para el tipo de controlador
	final static int ALEATORIO = 0;
	final static int AESTRELLA = 1;
	
	private int controladorPacman = 0;
	private int controladorFantasmas = 0;
	boolean terminar = false;
	
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
	
	public void asignarCanvas(MiCanvas d)
	{
		dibujo = d;
	}
	
	public void modificarControladorPacman(int nuevo)
	{
		controladorPacman = nuevo;
	}
	
	public void modificarControladorFantasmas(int nuevo)
	{
		controladorFantasmas = nuevo;
	}
	
	public void run() {
            int numMovimientos = 0;
		
            int personaje;
            Thread hilo;
            long timeStart, elapsed = 0;
            int movCorrecto;
            // Creacion de los personajes
            // En este punto donde se pueden cambiar las clases por las creadas por el alumno
            PacMan p = new PacMan();
            Fantasma fantasmas[] = new Fantasma[5]; 
            fantasmas[1] = new Fantasma(1);
            fantasmas[2] = new Fantasma(2);
            fantasmas[3] = new Fantasma(3);
            fantasmas[4] = new Fantasma(4);
    	
            dibujo.actualizarPosicionPersonajes(m_laberinto.obtenerPosicionPersonajes());
    	
            // Establece los controladores
            p.controlador = controladorPacman;
            for (int i=1;i<5;i++)
    		fantasmas[i].controlador = controladorFantasmas;
    	
            while (!terminar)
            {		
    		// MOVIMIENTO DE PACMAN
    		numMovimientos++;
    		if (500 - elapsed > 0)
    		try {
                    Thread.currentThread().sleep(500 - elapsed);	
    		} catch (Exception e) {System.out.println(e);}
                
                
    		p.isDone(false);
    		p.asignarLaberinto(m_laberinto);
		hilo = new Thread(p);
		hilo.start();
		
		timeStart = System.currentTimeMillis() ;
		elapsed = 0;

		while(!p.isDone() && (elapsed<m_tiempoMaximo))
		{
			elapsed = System.currentTimeMillis() - timeStart;
		}
		movCorrecto = m_laberinto.moverPacman(p.mov);
		if (partidaTerminada(0,numMovimientos,movCorrecto))
			terminar = true;
		
		// MOVIMIENTO DE LOS FANTASMAS
		personaje = 1;
		if (500 - elapsed > 0)
			try {
				Thread.currentThread().sleep(500 - elapsed);	
    		       } catch (Exception e) {System.out.println(e);}
			while (!terminar && personaje <= m_laberinto.numFantasmas)
			{
				fantasmas[personaje].isDone(false);
				fantasmas[personaje].asignarLaberinto(m_laberinto);
				hilo = new Thread(fantasmas[personaje]);
				hilo.start();
				
				timeStart = System.currentTimeMillis();
				elapsed = 0;
				
				while (!fantasmas[personaje].isDone() && (elapsed<m_tiempoMaximo))
				{
					elapsed = System.currentTimeMillis() - timeStart;
				}
				
				movCorrecto = m_laberinto.moverFantasma(personaje,fantasmas[personaje].mov);
				if (partidaTerminada(personaje,numMovimientos,movCorrecto))
					terminar = true;
				
				personaje++;
			}
		
            }
            isDone(true);
	}


//Funcion que comprueba las condiciones de terminacion:
// - que se haya hecho un movimiento incorrecto
// - que uno de los fantasmas haya capturado a pacman
// Se dibuja también el movimiento
private boolean partidaTerminada(int personaje, int numMovimientos,int movCorrecto)
{
	
	// Condicion de terminacion - movimiento incorrecto
	int posiciones[][] = m_laberinto.obtenerPosicionPersonajes();
	if (movCorrecto == -1)
	{
		if (personaje == 0)
			mensaje = new String("ERROR - Pacman intentó mover a una posición incorrecta");
		else 
			mensaje = new String("ERROR - El fantasma " + personaje + " intentó mover a una posición incorrecta");
		return true;
	}
	
	// Dibujo del movimiento
	dibujo.actualizarPosicionPersonajes(posiciones);
	
	// Condición de terminación - Pacman capturado
	if (movCorrecto>0)
	{
		if (numMovimientos == 1)
			mensaje = new String("El fantasma " + movCorrecto + " ha capturado a Pacman en tan solo 1 movimiento");
		else
			mensaje = new String("El fantasma " + movCorrecto + " ha capturado a Pacman en " + numMovimientos + " movimientos");
		return true;
	}
		
	return false;
}

public void parar(){
    terminar=true;
}
}
