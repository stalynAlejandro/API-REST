
package Juego;

import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
import java.io.*;
import java.net.*;


public class Principal extends JApplet implements ActionListener
{
	private final static String BOTON_CARGAR = new String(" Cargar laberinto ");
	private final static String BOTON_COMENZAR = new String("Comenzar");
	private final static String BOTON_DETENER = new String("Detener");
	
	private Button bLaberinto;
	private Button bComenzar;
	private Button bDetener;
	private JLabel statusBar;
	private MiCanvas dibujo;
	private JRadioButton r1, r2, r3, r4;
	private JRadioButton rPaleatorio, rPA;
	private JRadioButton rFaleatorio, rFA;
	private ButtonGroup bgNumFantasmas, bgControladorPacman, bgControladorFantasmas;
	
	int anchuraCelda, alturaCelda;
	
    GridBagLayout gridbag = new GridBagLayout();
    int sizeCanvas = 350;
    static final long serialVersionUID=11;
    
    File f_laberinto = null;
    Laberinto laberinto;
    int numFantasmas = 4;
    int controladorPacman = Juego.ALEATORIO, controladorFantasmas = Juego.ALEATORIO;
    boolean terminar = false; // Si se ha pulsado el botón detener
    
    // Variables necesarias para la lectura de imagenes
    URL base;
    Image personajes[] = new Image[5]; // 0 - pacman - 1 a  4- fantasmas  1 a 4
    
    Thread hilo;
    Juego juego;
    
    // Comprueba regularmente si la partida ha terminado, sin necesidad de que el usuario
    // tenga que pulsar el botón detener
    Timer timer = new Timer (250, new ActionListener () 
    		 { 
    		     public void actionPerformed(ActionEvent e) 
    		     { 
    		    	  if (juego.isDone()){
    		    		  detener();
                          }
    		      } 
    		 }); 

    public static void main(String []args)
    {
    	Principal pacman = new Principal(); 
	MyFrame myFrame = new MyFrame("Pacman A*"); 
	pacman.init();	
		

	myFrame.add(pacman);
		
	myFrame.setSize(510,420);
	myFrame.setResizable(false);
	myFrame.setVisible(true); 	
    }
    
    void addComponent(Container cont, Component comp, int gridx, int gridy, int gridw, int gridh)
    {
    	GridBagConstraints gbc = new GridBagConstraints();
    	gbc.gridx = gridx;
        gbc.gridy = gridy;
        gbc.gridwidth = gridw;
        gbc.gridheight = gridh;
        gbc.fill=GridBagConstraints.BOTH;
        gridbag.setConstraints( comp,gbc );
        cont.add( comp );
    }
    
    
    public void init() {
    		//try {base = getCodeBase();} 
    		//catch (Exception e) {System.out.println(e);}
    		//System.out.println(base);
    		
    	try {
            Toolkit myTools = Toolkit.getDefaultToolkit(); 
            personajes[0] = myTools.getImage ("pacman.gif"); 
            personajes[1] = myTools.getImage("fantasma1.gif");
            personajes[2] = myTools.getImage("fantasma2.gif");
            personajes[3] = myTools.getImage("fantasma3.gif");
            personajes[4] = myTools.getImage("fantasma4.gif");
    	} catch (Exception e) { System.out.println(e);}
    	
            Container contentPane = getContentPane();
            // Botones
            bLaberinto = new Button(BOTON_CARGAR);
            bLaberinto.addActionListener(this);
            bComenzar = new Button(BOTON_COMENZAR);
            bComenzar.setEnabled(false);
            bComenzar.addActionListener(this);
            bDetener = new Button(BOTON_DETENER);
            bDetener.setEnabled(false);
            bDetener.addActionListener(this);
            // Etiquetas (incluyendo la barra de estado)
            JLabel lNumFantasmas = new JLabel("Número de fantasmas");
            lNumFantasmas.setHorizontalAlignment(SwingConstants.LEFT);
            JLabel lCPacman = new JLabel("Controlador Pacman");
            lCPacman.setHorizontalAlignment(SwingConstants.LEFT);
            JLabel lCFantasmas = new JLabel("Controlador fantasmas");
            lCFantasmas.setHorizontalAlignment(SwingConstants.LEFT);
            statusBar = new JLabel("Programa iniciado");
            statusBar.setText("Programa iniciado");
            statusBar.setHorizontalAlignment(SwingConstants.LEFT);
            // Radio buttons
            r1 = new JRadioButton("1",false);
            r1.addActionListener(this);
            r2 = new JRadioButton("2",false);
            r2.addActionListener(this);
            r3 = new JRadioButton("3",false);
            r3.addActionListener(this);
            r4 = new JRadioButton("4",true);
            r4.addActionListener(this);
            
            bgNumFantasmas = new ButtonGroup();
            bgNumFantasmas.add(r1);
            bgNumFantasmas.add(r2);
            bgNumFantasmas.add(r3);
            bgNumFantasmas.add(r4);
            
            rPaleatorio = new JRadioButton("Aleatorio",true);
            rPaleatorio.addActionListener(this);
            rPA = new JRadioButton("A*",false);
            rPA.addActionListener(this);
            
            bgControladorPacman = new ButtonGroup();
            bgControladorPacman.add(rPaleatorio);
            bgControladorPacman.add(rPA);
            
            rFaleatorio = new JRadioButton("Aleatorio ",true);
            rFaleatorio.addActionListener(this);
            rFA = new JRadioButton("A* ",false);
            rFA.addActionListener(this);
            
            bgControladorFantasmas = new ButtonGroup();
            bgControladorFantasmas.add(rFaleatorio);
            bgControladorFantasmas.add(rFA);
            // Canvas
            dibujo = new MiCanvas();
            dibujo.setSize(sizeCanvas,sizeCanvas);
            dibujo.setBackground(Color.WHITE);
            
            
            contentPane.setLayout(gridbag);

            addComponent(contentPane,bLaberinto,0,0,1,1);
            addComponent(contentPane,bComenzar,3,1,1,1);
            addComponent(contentPane,bDetener,3,2,1,1);
            addComponent(contentPane,lNumFantasmas,3,3,1,1);
            addComponent(contentPane,r1,3,4,1,1);
            addComponent(contentPane,r2,3,5,1,1);
            addComponent(contentPane,r3,3,6,1,1);
            addComponent(contentPane,r4,3,7,1,1);
            addComponent(contentPane,lCPacman,3,8,1,1);
            addComponent(contentPane,rPaleatorio,3,9,1,1);
            addComponent(contentPane,rPA,3,10,1,1);
            addComponent(contentPane,lCFantasmas,3,12,1,1);
            addComponent(contentPane,rFaleatorio,3,13,1,1);
            addComponent(contentPane,rFA,3,14,1,1);
            addComponent(contentPane,new JLabel(" "),3,16,1,1);
            addComponent(contentPane, dibujo, 0,1,3,16);
            addComponent(contentPane, statusBar,0,17,7,1);
    }
    
    
    public void actionPerformed(ActionEvent e) 
    {
    	String comando;
    	JFileChooser jfc;
    	
    	comando = e.getActionCommand();
    	if (comando.equals(BOTON_CARGAR))
    	{
    		jfc = new JFileChooser("./Mundos");
    		if (jfc.showOpenDialog(this)==JFileChooser.APPROVE_OPTION) {
       	  	 	f_laberinto = jfc.getSelectedFile();
       	  	 	laberinto = new Laberinto(f_laberinto);
       	  	 	laberinto.numFantasmas = numFantasmas;
       	  	 	if (laberinto.esCorrecto())
       	  	 	{
       	  	 		// Dibujo del laberinto
       	  	 		anchuraCelda = sizeCanvas/laberinto.tam();
       	  	 		alturaCelda = sizeCanvas/laberinto.tam();
       	  	 		dibujo.asignarLaberinto(laberinto,anchuraCelda,alturaCelda,sizeCanvas);
       	  	 		dibujo.asignarPersonajes(personajes, laberinto.obtenerPosicionPersonajes());
       	  	 		statusBar.setText("Laberinto cargado correctamente");
       	  	 		// Algunos botones ya pueden ser utilizados
       	  	 		bComenzar.setEnabled(true);
                                dibujo.asignarLaberinto(laberinto,anchuraCelda,alturaCelda,sizeCanvas); // puesto de prueba ***************
                                dibujo.update(dibujo.getGraphics());// puesto de prueba *****************************
       	  	 	}
       	  	 	else
       	  	 	{
       	  	 		JOptionPane.showMessageDialog(this,"El formato del fichero de laberinto es incorrecto");
       	  	 	}
      	  	 }
    	}
    	else if (comando.equals(BOTON_COMENZAR))
    	{
    		laberinto.restaurarPosiciones();
    		laberinto.numFantasmas = numFantasmas;
    		bLaberinto.setEnabled(false);
    		bDetener.setEnabled(true);
    		bComenzar.setEnabled(false);
    		r1.setEnabled(false);
    		r2.setEnabled(false);
    		r3.setEnabled(false);
    		r4.setEnabled(false);
    		rPaleatorio.setEnabled(false);
    		rPA.setEnabled(false);
    		rFaleatorio.setEnabled(false);
    		rFA.setEnabled(false);
    		terminar = false;
    		statusBar.setText("Juego iniciado");
    		
    		// A jugar!
    		juego = new Juego();
    		juego.asignarCanvas(dibujo);
    		juego.asignarLaberinto(laberinto);
    		juego.modificarControladorFantasmas(controladorFantasmas);
    		juego.modificarControladorPacman(controladorPacman);                
    		juego.isDone(false);
    		hilo = new Thread(juego);
    		hilo.start();
    		timer.start();
    		
    	}
    	else if (comando.equals(BOTON_DETENER))
    	{
    		detener();
    	}
    	else if (comando.equals("1"))
    	{
    		numFantasmas = 1;
    		if (laberinto != null)
    		{
    			laberinto.numFantasmas = numFantasmas;
    			laberinto.restaurarPosiciones();
    			dibujo.asignarLaberinto(laberinto,anchuraCelda,alturaCelda,sizeCanvas);
    			dibujo.update(dibujo.getGraphics());
    		}
    	
    	}
    	else if (comando.equals("2"))
    	{
    		numFantasmas = 2;
    		if (laberinto != null)
    		{
    			laberinto.numFantasmas = numFantasmas;
    			laberinto.restaurarPosiciones();
    			dibujo.asignarLaberinto(laberinto,anchuraCelda,alturaCelda,sizeCanvas);
    			dibujo.update(dibujo.getGraphics());
    		}
    	}
    	else if (comando.equals("3"))
    	{
    		numFantasmas = 3;
    		if (laberinto != null)
    		{
    			laberinto.numFantasmas = numFantasmas;
    			laberinto.restaurarPosiciones();
    			dibujo.asignarLaberinto(laberinto,anchuraCelda,alturaCelda,sizeCanvas);
    			dibujo.update(dibujo.getGraphics());
    		}
    	}
    	else if (comando.equals("4"))
    	{
    		numFantasmas = 4;
    		if (laberinto != null)
    		{
    			laberinto.numFantasmas = numFantasmas;
    			laberinto.restaurarPosiciones();
    			dibujo.asignarLaberinto(laberinto,anchuraCelda,alturaCelda,sizeCanvas);
    			dibujo.update(dibujo.getGraphics());
    		}
    	}
    	else if (comando.equals("Aleatorio "))
    	{
    		controladorFantasmas = Juego.ALEATORIO;
    	}
    	else if (comando.equals("A* "))
    	{
    		controladorFantasmas = Juego.AESTRELLA;
    	}
    	else if (comando.equals("Aleatorio"))
    	{
    		controladorPacman = Juego.ALEATORIO;
    	}
    	else if (comando.equals("A*"))
    	{
    		controladorPacman = Juego.AESTRELLA;
    	}
    }
    
    public void detener()
    {
    	timer.stop();
    	if (!juego.isDone())
    	{
    		juego.parar();               
    		statusBar.setText("Juego cancelado");
    	}
    	else
    	{
    		statusBar.setText(juego.mensaje);
    	}
    	
    	bLaberinto.setEnabled(true);
	bDetener.setEnabled(false);
	bComenzar.setEnabled(true);
	r1.setEnabled(true);
	r2.setEnabled(true);
	r3.setEnabled(true);
	r4.setEnabled(true);
	rPaleatorio.setEnabled(true);
	rPA.setEnabled(true);
	rFaleatorio.setEnabled(true);
	rFA.setEnabled(true);
	this.update(this.getGraphics());
    }

  
}