package Juego;

import java.io.*;

public class Laberinto {
	// Formato del laberinto:
	// numero_filas (los laberintos son cuadrados)
	// array de numero_filasxnumero filas donde:
	// 		1 - pared del laberinto
	//		0 - espacio libre
	// (x_pacman, y_pacman)
	// (x_fantasma1, y_fantasma1)
	// ..
	// (x_fantasma4, y_fantasma4)
	
	final static int ARRIBA = 7;
	final static int ABAJO = 6;
	final static int DERECHA = 8;
	final static int IZQUIERDA = 5;
	
	private boolean correcto;
	
	private int m_tam; // Tamaño del laberinto 
	private int m_laberinto[][]; // Paredes del laberinto
	private int m_posiciones[][]; // Posiciones de los personajes
								  // m_posiciones[0] -> posicion (x,y) de pacman
								  // m_posiciones[1..4] -> posicion (x,y) de los 4 fantasmas
	private int m_posicionesIniciales[][]; // Copia de las posiciones originales para poder restaurarlas
	
	public int numFantasmas = 4;
	
	public Laberinto(File fic)
	{
		StreamTokenizer st;
		int y,x;
		int i,j;
		
		correcto = true;
		
		try {
			st = new StreamTokenizer(new FileReader(fic));
			// Lectura del tamaño e incialización del laberinto
			st.nextToken();
			if (st.ttype != st.TT_NUMBER)
			{
				correcto = false;
				return;
			}
			m_tam = (int)st.nval;
		    m_laberinto = new int[m_tam][m_tam];
			// Se lee la disposición del laberinto (paredes)
		    for (y=0;y<m_tam;y++)
		    	for (x=0;x<m_tam;x++)
		    	{
		    		st.nextToken();
		    		if (st.ttype != st.TT_EOF && st.ttype == st.TT_NUMBER &&
		    			((int)st.nval == 0 || (int)st.nval ==1))
		    			m_laberinto[x][y] = (int)st.nval;
		    		else
		    		{
		    			correcto = false;
		    			return;
		    		}
		    	}
			// Posición de pacman
			m_posiciones = new int[5][2];
			m_posicionesIniciales = new int[5][2];
			for (i=0;i<5;i++)
			{
				for (j=0;j<2;j++)
				{
					st.nextToken();
					if (st.ttype != st.TT_EOF && st.ttype == st.TT_NUMBER && 
							!((int)st.nval < 0 || (int)st.nval >= m_tam))
					{
						m_posiciones[i][j] = (int)st.nval;
						m_posicionesIniciales[i][j] = (int)st.nval;
					}
					else
					{
						correcto = false;
						return;
					}
				}
			}
			
			// Posición de los fantasmas
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	
	// Restaurar las posiciones iniciales de los personajes
	public void restaurarPosiciones()
	{
		int i,j;
		
		for (i=0;i<5;i++)
			for (j=0;j<2;j++)
				m_posiciones[i][j] = m_posicionesIniciales[i][j];
	}
	
	// Constructor de copia
	public Laberinto(Laberinto l)
	{
		int i,j;
		
		this.numFantasmas = l.numFantasmas;
		this.m_tam = l.tam();
		this.m_laberinto = new int[m_tam][m_tam];
		for (i=0;i<this.m_tam;i++)
			for (j=0;j<this.m_tam;j++)
				this.m_laberinto[i][j] = l.m_laberinto[i][j];
		
		this.m_posiciones = new int[5][2];
		for (i=0;i<5;i++)
			for (j=0;j<2;j++)
				this.m_posiciones[i][j] = l.m_posiciones[i][j];
	
	}
	
	// Devuelve la posición de pacman
	public int[] obtenerPosicionPacman()
	{
		return m_posiciones[0];
	}
	
	// Devuelve la posición del fantasma indicado como parámetro (1-4)
	public int[] obtenerPosicionFantasma(int f)
	{
		return m_posiciones[f];
	}
	
	// Devuelve las posiciones de todos los personajes
	public int[][] obtenerPosicionPersonajes()
	{
		return m_posiciones;
	}
	
	// Mueve a Pacman en el laberinto. Devuelve alguno de estos valores:
	// 0 - el movimiento se ha realizado correctamente
	// -1 - el movimiento no se ha podido realizar porque Pacman intentaba desplazarse a una pared
	// 1 - el fantasma 1 ha atrapado a pacman
	// 2 - el fantasma 2 ha atrapado a pacman
	// 3 - el fantasma 3 ha atrapado a pacman
	// 4 - el fantasma 4 ha atrapado a pacman
	public int moverPacman(int movimiento)
	{
		int x=0,y=0;
		switch(movimiento)
		{
		case ARRIBA:
			x = m_posiciones[0][0];
			y = m_posiciones[0][1] - 1;
			break;
		case ABAJO:
			x = m_posiciones[0][0];
			y = m_posiciones[0][1] + 1;
			break;
		case DERECHA:
			x = m_posiciones[0][0] + 1;
			y = m_posiciones[0][1];
			break;
		case IZQUIERDA:
			x = m_posiciones[0][0]-1;
			y = m_posiciones[0][1];
			break;
		}
		
		if (m_laberinto[x][y] != 1)
		{
			m_posiciones[0][0] = x;
			m_posiciones[0][1] = y;
			if (x == m_posiciones[1][0] && y == m_posiciones[1][1]) return 1;
			if (x == m_posiciones[2][0] && y == m_posiciones[2][1] && numFantasmas > 1) return 2;
			if (x == m_posiciones[3][0] && y == m_posiciones[3][1] && numFantasmas > 2) return 3;
			if (x == m_posiciones[4][0] && y == m_posiciones[4][1] && numFantasmas > 3) return 4;
			return 0;
		}
		
		return -1;
	}
	
	// Mueve el fantasma pasado como primer parametro por el laberinto. 
	// Se puede devolver uno de los siguientes valores:
	// 0 - el movimiento se ha realizado correctamente
	// 1 - el movimiento se ha realizado correctamente y ademas se ha acabado en la misma casilla que pacman
	// -1 - no se pudo realizar el movimiento porque se chocó contra un muro
	public int moverFantasma(int f, int movimiento)
	{
		int x=0,y=0;
		
		switch(movimiento)
		{
		case ARRIBA:
			x = m_posiciones[f][0];
			y = m_posiciones[f][1] - 1;
			break;
		case ABAJO:
			x = m_posiciones[f][0];
			y = m_posiciones[f][1] + 1;
			break;
		case DERECHA:
			x = m_posiciones[f][0] + 1;
			y = m_posiciones[f][1];
			break;
		case IZQUIERDA:
			x = m_posiciones[f][0]-1;
			y = m_posiciones[f][1];
			break;
		}
		
		if (m_laberinto[x][y] != 1)
		{
			m_posiciones[f][0] = x;
			m_posiciones[f][1] = y;
			if (x == m_posiciones[0][0] && y == m_posiciones[0][1]) return f;
			return 0;
		}
		
		return -1;
	}
	
	// Indica si el laberinto ha sido correctamente leido de disco
	public boolean esCorrecto()
	{
		return correcto;
	}
	
	public int obtenerPosicion(int x, int y)
	{
		return m_laberinto[x][y];
	}
	
	// Devuelve el tamaño del tablero
	public int tam()
	{
		return m_tam;
	}
}
