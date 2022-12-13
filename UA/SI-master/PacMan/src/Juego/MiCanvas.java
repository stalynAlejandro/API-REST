package Juego;

import java.awt.*;
import java.net.*;

public class MiCanvas extends Canvas{
	private Laberinto l;
	int anchuraCelda, alturaCelda;
	int borde, bordeMedio;
	
	// Variables utilizadas para dibujar a Pacman y los fantasmas
	Image personajes[] = new Image[5];
	int posicionesPersonajes[][] = new int[5][2];
	URL base;
	MediaTracker mt;
	
	public void asignarLaberinto(Laberinto lab, int anc, int alc, int size)
	{
		l = lab;
		anchuraCelda = anc;
		alturaCelda = alc;
		borde = size - anchuraCelda*l.tam();
		bordeMedio = borde/2;
		
	}
	
	public void asignarPersonajes(Image p[], int posiciones[][])
	{
		int i;
		
		mt = new MediaTracker(this);
		for (i=0;i<5;i++)
		{
			personajes[i] = p[i];
			mt.addImage(personajes[i],1);
			posicionesPersonajes[i][0] = posiciones[i][0];
			posicionesPersonajes[i][1] = posiciones[i][1];
		}
		// Se espera a que todas las imágenes estén cargadas
		try { 
			 mt.waitForAll(); 
		 } catch (InterruptedException  e) {}
	}
	
	public void actualizarPosicionPersonajes(int nuevasPosiciones[][])
	{
		int i;
		
		for (i=0;i<5;i++)
		{
			if (nuevasPosiciones[i][0] != posicionesPersonajes[i][0] || nuevasPosiciones[i][1] != posicionesPersonajes[i][1])
			if (i<=l.numFantasmas)
			{
				dibujarMovimiento(this.getGraphics(), i, posicionesPersonajes[i], nuevasPosiciones[i]);
				posicionesPersonajes[i][0] = nuevasPosiciones[i][0];
				posicionesPersonajes[i][1] = nuevasPosiciones[i][1];
			}
		}
	}
	
	public void dibujarMovimiento(Graphics g, int personaje, int anterior[], int posterior[])
	{		
                g.setColor(Color.BLACK);
		g.fillRect(bordeMedio + anterior[0]*anchuraCelda, bordeMedio + anterior[1]*alturaCelda, anchuraCelda, alturaCelda);
		g.drawImage(personajes[personaje],bordeMedio + posterior[0]*anchuraCelda, bordeMedio + posterior[1]*alturaCelda,anchuraCelda,alturaCelda,this);
	}
	
    public void dibujarLaberinto(Graphics g, Laberinto l)
    {
    	int i,j;
    	
    	g.setColor(Color.BLACK);
    	g.fillRect(bordeMedio,bordeMedio,anchuraCelda*l.tam(),alturaCelda*l.tam());
    	
    	g.setColor(Color.BLUE);
    	for (i=0;i<l.tam();i++)
    		for (j=0;j<l.tam();j++)
    			if (l.obtenerPosicion(i,j) == 1)
    				g.fillRect(bordeMedio + i*anchuraCelda, bordeMedio + j*alturaCelda, anchuraCelda, alturaCelda);
    }
    
    public void dibujarPersonajes(Graphics g)
    {
    	int i;
    	g.drawImage(personajes[0],bordeMedio + posicionesPersonajes[0][0]*anchuraCelda, bordeMedio + posicionesPersonajes[0][1]*alturaCelda,anchuraCelda,alturaCelda,this);
    	
    	for (i=1;i<=l.numFantasmas;i++)
    		g.drawImage(personajes[i],bordeMedio + posicionesPersonajes[i][0]*anchuraCelda, bordeMedio + posicionesPersonajes[i][1]*alturaCelda,anchuraCelda,alturaCelda,this); 	
    }
    
    public void paint(Graphics g)
    {
    	if (l != null) 
    	{
    		dibujarLaberinto(g,l);                
    		dibujarPersonajes(g);
    	}
    }

}
