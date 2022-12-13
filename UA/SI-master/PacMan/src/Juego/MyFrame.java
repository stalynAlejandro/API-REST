package Juego;

import java.awt.Frame;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;


public class MyFrame extends Frame implements WindowListener {
		public MyFrame(String s)
		{
			super(s);
			addWindowListener(this);
		}
		static final long serialVersionUID=10;
		
		public void windowActivated(WindowEvent e){}
		public void windowDeactivated(WindowEvent e){}
		public void windowOpened(WindowEvent e){}
		public void windowClosing(WindowEvent e){ System.exit(0); }
		public void windowClosed(WindowEvent e){}
		public void windowIconified(WindowEvent e) {}
		public void windowDeiconified(WindowEvent e) {}
		public void windowMaximizing(WindowEvent e) {}
}

