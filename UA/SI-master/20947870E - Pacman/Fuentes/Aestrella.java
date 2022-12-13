package Juego;

import java.util.Date;
import java.util.Random;
import java.util.*;

public class Aestrella {
	
    public boolean pacman;
    public int numeroFantasma = 1;  
    
    //Camino
    char camino[][];    
    
    //Casillas expandidas
    int camino_expandido[][];    
    
    //Número de nodos expandidos
    int expandidos;     
    
    //Coste del camino
    double coste_total;

	
    Aestrella(boolean esPacman){
    	pacman = esPacman;         
    }
	
    void setNumFantasma(int num){
	numeroFantasma = num;
    }
	
    public int run(int controlador, Laberinto laberinto){
	int mov = 0;
		
	switch(controlador){
            case Juego.ALEATORIO:
			mov = aleatorio(laberinto);
			break;
            case Juego.AESTRELLA:
			mov = A(laberinto);
			break;
	}
		
	return mov;
    }
	
    // Genera un movimiento aleatorio a partir del mapa proporcionado
    int aleatorio(Laberinto laberinto){
       	boolean correcto = false;
	Random rnd = new Random();
	Date d = new Date();
	int mov = -1;
		
	rnd.setSeed(d.getTime());
		
	while (!correcto){
            Laberinto aux = new Laberinto(laberinto);
		
            mov = (int)(rnd.nextDouble() * 4) + 5;                        
            if (pacman){
		if (aux.moverPacman(mov) != -1)
                    correcto = true;
            }
            else {
                if (aux.moverFantasma(numeroFantasma,mov) != -1)
                    correcto = true;
            }
	}
		
	return mov;
    }
	
    // Genera un movimiento a partir del algoritmo A*
    int A(Laberinto laberinto){
	int mov = 0;
		
	if (pacman)
            mov = AestrellaPacman(laberinto);                        
        else                                      			
            mov = AestrellaFantasma(laberinto);
                		
	return mov;
	}
	
    //Inicializa las matrices camino y camino expandido
    void inic (int tam){
        
        camino= new char[tam][tam];    
        //Casillas expandidas
        camino_expandido= new int[tam][tam];    
        
        //Inicializa las variables camino y camino_expandidos donde el A* debe incluir el resultado
        for(int i=0;i<tam;i++)
                for(int j=0;j<tam;j++){
                    camino[j][i] = '.';
                    camino_expandido[j][i] = -1;
                }
        //Número de nodos expandidos
        expandidos=0;
    }   

    class Position{
        int x, y;
        
        Position(){
            this.x = 0;
            this.y = 0;
        }
        
        Position(int[] aX){
            this.x = aX[0];
            this.y = aX[1];
        }
        
        Position(int x, int y){
            this.x = x;
            this.y = y;
        }
    };

   
    class Nodo{
        Nodo padre;
        ArrayList<Nodo> vecinos = new ArrayList<>();
        Position pos;
        double f, h = 0;
        double g = 0;
        int mov = 0;
        int x, y;
        
        Nodo(){
            padre = null;
            pos = null;
            f = 0;
            h = 0;
            g = 0;
            mov = 0;
        }
        
        Nodo(Nodo p_Padre, int p_x, int p_y){
            padre = p_Padre;
            x = p_x;
            y = p_y;
            f = 0;
            h = 0;
            g = 0;
        }
        
        Nodo(Nodo n){
            this.padre = n.padre;
            this.pos = n.pos;
            this.f = n.f;
            this.g = n.g;
            this.h = n.h;
            this.x = n.x;
            this.y = n.y;
            this.mov = n.mov;
        }
        
        public void addVecinos(Laberinto lab){
            
            if(lab.obtenerPosicion(x+1, y) != 1){
                this.vecinos.add(new Nodo(this, x+1, y));
            }
            if(lab.obtenerPosicion(x-1, y) != 1){
                this.vecinos.add(new Nodo(this, x-1, y));
            }
            if(lab.obtenerPosicion(x, y+1) != 1){
                this.vecinos.add(new Nodo(this, x, y+1));
            }
            if(lab.obtenerPosicion(x, y-1) != 1){
                this.vecinos.add(new Nodo(this, x, y-1));
            }
      
        }
        
        public double calcularDistancia(Nodo nodoFinal){
            return heuristicaEuclidea(this, nodoFinal);
        }
        
        public boolean equals(Nodo otro){
            return (this.x == otro.x && this.y == otro.y);
        }
        
        public String toString(){
            String s = "[(" + this.x + "," + this.y + ") "+ this.f + "]";
            return s;
        }
    };
    
    private int moveTo(ArrayList<Nodo> path){
        Nodo nodo = new Nodo(path.get(path.size() - 1));
        Nodo moveNodo = new Nodo(path.get(path.size() - 2));
        
        int x = nodo.x - moveNodo.x;
        int y = nodo.y - moveNodo.y;
        //System.out.println("x : " + x + ", y:" + y);
        if(x == 0 && y == 1){ return Laberinto.ARRIBA;}
        if(x == 1 && y == 0){ return Laberinto.IZQUIERDA;}
        if(x == -1 && y == 0){ return Laberinto.DERECHA;}
        if(x == 0 && y == -1){ return Laberinto.ABAJO;}
        
        return 0;
    }
    
    private int moveToPacman(ArrayList<Nodo> path ,Laberinto lab){
        
        Nodo nodo = new Nodo(path.get(path.size() - 1));
        Nodo moveNodo = new Nodo(path.get(path.size() - 2));
        //System.out.println("....................................................Mover");

        int x = nodo.x - moveNodo.x;
        int y = nodo.y - moveNodo.y;
               
        
        if(x == 0 && y == 1){ 
            //Arriba. 
            
            if(lab.obtenerPosicion(nodo.x, nodo.y+1) != 1){ //Abajo
                return Laberinto.ABAJO;
            }
            if(lab.obtenerPosicion(nodo.x+1, nodo.y) != 1){ //Derecha
                return Laberinto.DERECHA;
            }
            if(lab.obtenerPosicion(nodo.x-1, nodo.y) != 1){ //Izquierda
                return Laberinto.IZQUIERDA;
            }
            
            return Laberinto.ARRIBA;         
        }  
        
        if(x == 1 && y == 0){
            //Izquierda.
            if(lab.obtenerPosicion(nodo.x+1, nodo.y) != 1){ //Derecha
                return Laberinto.DERECHA;
            }
            
            if(lab.obtenerPosicion(nodo.x, nodo.y-1) != 1){ //Arriba
                return Laberinto.ARRIBA;
            }

            if(lab.obtenerPosicion(nodo.x, nodo.y+1) != 1){ //Abajo
                return Laberinto.ABAJO;
            }
            
            return Laberinto.IZQUIERDA; 
        } 
        
        if(x == -1 && y == 0){ 
            //Derecha.

            if(lab.obtenerPosicion(nodo.x-1, nodo.y) != 1){ //Izquierda
                return Laberinto.IZQUIERDA;
            }
            if(lab.obtenerPosicion(nodo.x, nodo.y-1) != 1){ //Arriba
                return Laberinto.ARRIBA;
            }

            if(lab.obtenerPosicion(nodo.x, nodo.y+1) != 1){ //Abajo
                return Laberinto.ABAJO;
            }
            
            return Laberinto.DERECHA;   
        } 
        
        if(x == 0 && y == -1){
            //Abajo.
            if(lab.obtenerPosicion(nodo.x, nodo.y-1) != 1){ //Arriba
                return Laberinto.ARRIBA;
            }
            if(lab.obtenerPosicion(nodo.x+1, nodo.y) != 1){ //Derecha
                return Laberinto.DERECHA;
            }
            if(lab.obtenerPosicion(nodo.x-1, nodo.y) != 1){ //Izquierda
                return Laberinto.IZQUIERDA;
            }   
            
            return Laberinto.ABAJO;
        } 
        
        
        return Laberinto.ARRIBA;
    }
    
    
    private double heuristicaUno(){
        return 1;
    }
    
    private double heuristicaEuclidea(Nodo inicio, Nodo destino){
        //Euclidea
        double x = (double)Math.pow(destino.x - inicio.x, 2);
        double y = (double)Math.pow(destino.y - inicio.y, 2);
        return (double)Math.sqrt(x + y);
    }
    
    private double heuristicaManhattan(Nodo inicio, Nodo destino){
        //Manhattan
        return (double)(Math.abs(inicio.x - destino.x) + (Math.abs(inicio.y - destino.y)));
    }
    
    private boolean containsPosition(int x , int y, ArrayList<Nodo> lista){
        //Buscamos si el la posición del nodo ya existe.
        for(Nodo n: lista){
            if(n.x == x && n.y == y) return true;
        }
       return false; 
    }
    
    
    private void removeNodoFromFrontera(int x, int y, ArrayList<Nodo> listaFrontera){
        for(Nodo n: listaFrontera){
            if(n.x == x && n.y == y){
                listaFrontera.remove(n);
            } 
        }
    }
    

    //////////////////////////////
    // A ESTRELLA PARA FANTASMA //
    //////////////////////////////
    int AestrellaFantasma(Laberinto laberinto){
        int result= -1; //Devuelve el movimiento a realizar         
        boolean encontrado=false;
        
        inic(laberinto.tam());        

        //Inicializo las dos listas que voy a utilizar.
        ArrayList<Nodo> listaInterior = new ArrayList<>();
        ArrayList<Nodo> listaFrontera = new ArrayList<>();

        //Guardo la posición de Inicio y el objetivo(Pacman)
        int[] posFantasma = laberinto.obtenerPosicionFantasma(numeroFantasma);
        int[] posPacman = laberinto.obtenerPosicionPacman();
       
        Nodo nodoInicial = new Nodo(null, posFantasma[0], posFantasma[1]);
        Nodo nodoFinal = new Nodo(null,posPacman[0], posPacman[1]);
        
        //Inicializo las listas. ListaInterior vacia y listaFrontera con el nodoInicial.       
        listaInterior.clear();           
        listaFrontera.add(nodoInicial);
        
        int cont = 0;
        expandidos = 0;
        
        while(!listaFrontera.isEmpty()){
                        
            //Elijo el nodo con f mas prometedor de listaFrontera
            int winner = 0;
            for(int i = 0; i < listaFrontera.size(); i++){
                if(listaFrontera.get(i).f < listaFrontera.get(winner).f){
                    winner = i;
                }
            }
            
            Nodo nodo = listaFrontera.get(winner);
            nodo.addVecinos(laberinto);
            
            //Si el hemos llegado al objetivo. Recreo el camino y lo guardo en 'path'
            if(nodo.equals(nodoFinal)){
                ArrayList<Nodo> path = new ArrayList<>();
                path.add(nodo);
                coste_total = nodo.f;
                while(nodo.padre != null){
                    
                    camino[nodo.y][nodo.x] = 'X';
                    path.add(nodo.padre);
                    nodo = nodo.padre;
                }
                camino[nodo.y][nodo.x] = 'X';
                encontrado = true;
                //Busco el movimiento que tiene que hacer.
                //System.out.println("Result: " + result);
                result = moveTo(path);
                break;
            }
            
            camino_expandido[nodo.y][nodo.x] = cont++;
            expandidos++;
            listaInterior.add(nodo);
            //removeNodoFromFrontera(nodo.x, nodo.y, listaFrontera);
            listaFrontera.remove(nodo);
            
            
            //Analizo los nodos vecinos, por si son más prometedores.
            for(int i = 0; i < nodo.vecinos.size(); i++){  
                Nodo vecino = nodo.vecinos.get(i);
                
                if(!containsPosition(vecino.x, vecino.y, listaInterior)){
                    
                    //double auxG = vecino.g + heuristicaEuclidea(vecino, nodo);
                    //double auxG = vecino.g + heuristicaUno();
                    double auxG = vecino.g + heuristicaManhattan(vecino, nodo);
                    
                    //System.out.println("auxG: " + auxG + ", vecino.g: " + vecino.g + ", " + nodo.g);
                    if(!containsPosition(vecino.x, vecino.y, listaFrontera)){

                     vecino.g = nodo.g + 1;
                     
                     //vecino.h = heuristicaEuclidea(nodo, nodoFinal);
                     //vecino.h = heuristicaUno();
                     vecino.h = heuristicaManhattan(nodo, nodoFinal);
                     
                     vecino.f = vecino.g + vecino.h;
                     vecino.padre = nodo;
                     listaFrontera.add(vecino);

                    }else if(auxG <= nodo.g){
                     vecino.padre = nodo;
                     vecino.g = auxG;
                     
                     
                     //vecino.h = heuristicaEuclidea(vecino, nodoFinal);
                     //vecino.h = heuristicaUno();
                     vecino.h = heuristicaManhattan(vecino, nodoFinal);
                     
                     vecino.f = vecino.g + vecino.h;
                    }                 
                }      
            }  
        }
   
        //Si ha encontrado la solución, es decir, el camino, muestra las matrices camino y camino_expandidos y el número de nodos expandidos
        if(encontrado){
            //Mostrar la solucion
            System.out.println("NO MODIFICAR ESTE FORMATO DE SALIDA");
            System.out.println("Coste del camino: "+coste_total);
            System.out.println("Nodos expandidos: "+expandidos);            
            System.out.println("Camino"); 
            mostrarCamino(camino, laberinto.tam());
            System.out.println("Camino explorado");
            mostrarCaminoExpandido(camino_expandido,laberinto.tam());            
        }
        return result;    
    }
	     
 

    //////////////////////////////
    // A ESTRELLA PARA PACMAN //
    //////////////////////////////
    int AestrellaPacman(Laberinto laberinto){
	int result=0; //Devuelve el movimiento a realizar   
        
         //AQUI ES DONDE SE DEBE IMPLEMENTAR EL CODIGO PARA PACMAN
 
        //Inicializo las dos listas que voy a utilizar.
        ArrayList<Nodo> listaInterior = new ArrayList<>();
        ArrayList<Nodo> listaFrontera = new ArrayList<>();
        
        //Guardo la posición de Inicio y el objetivo(Pacman)
        int[] posPacman = laberinto.obtenerPosicionPacman();
        Nodo nodoInicial = new Nodo(null, posPacman[0], posPacman[1]);
        
        //Calculo que fantasma está más cerca. Para alejarme de él.        
        Nodo nodoFinal = null;
        double distMin = 1000;
        for(int i = 1 ; i <= laberinto.numFantasmas ; i++){
            int[] posFantasma = laberinto.obtenerPosicionFantasma(i);
            if( nodoInicial.calcularDistancia(new Nodo(null, posFantasma[0], posFantasma[1])) < distMin){
                nodoFinal = new Nodo(null, posFantasma[0], posFantasma[1]);
                distMin = nodoInicial.calcularDistancia(new Nodo(null, posFantasma[0], posFantasma[1]));
            }
        }
        
        //Inicializo las listas. ListaInterior vacia y listaFrontera con el nodoInicial.       
        listaInterior.clear();           
        listaFrontera.add(nodoInicial);

        while(!listaFrontera.isEmpty()){
            //Elijo el nodo con f mas prometedor de listaFrontera
            int winner = 0;
            for(int i = 0; i < listaFrontera.size(); i++){
                if(listaFrontera.get(i).f < listaFrontera.get(winner).f){
                    winner = i;
                }
            }
            
            Nodo nodo = listaFrontera.get(winner);
            nodo.addVecinos(laberinto);
            
            //Si el hemos llegado al objetivo. Recreo el camino y lo guardo en 'path'
            if(nodo.equals(nodoFinal)){
                ArrayList<Nodo> path = new ArrayList<>();
                path.add(nodo);

                while(nodo.padre != null){

                    path.add(nodo.padre);
                    nodo = nodo.padre;
                }

                //Busco el movimiento que tiene que hacer.
                //System.out.println("Result: " + result);
                result = moveToPacman(path , laberinto);
                break;
            }
            
            listaInterior.add(nodo);
            //removeNodoFromFrontera(nodo.x, nodo.y, listaFrontera);
            listaFrontera.remove(nodo);
             
            //Analizo los nodos vecinos, por si son más prometedores.
            for(int i = 0; i < nodo.vecinos.size(); i++){  
                Nodo vecino = nodo.vecinos.get(i);
                
                if(!containsPosition(vecino.x, vecino.y, listaInterior)){
                    
                    //double auxG = vecino.g + heuristicaEuclidea(vecino, nodo);
                    double auxG = vecino.g + heuristicaUno();
                    //double auxG = vecino.g + heuristicaManhattan(vecino, nodo);
                    
                    //System.out.println("auxG: " + auxG + ", vecino.g: " + vecino.g + ", " + nodo.g);
                    if(!containsPosition(vecino.x, vecino.y, listaFrontera)){

                     vecino.g = nodo.g + 1;
                     
                     //vecino.h = heuristicaEuclidea(nodo, nodoFinal);
                     vecino.h = heuristicaUno();
                     //vecino.h = heuristicaManhattan(nodo, nodoFinal);
                     
                     
                     vecino.f = vecino.g + vecino.h;
                     vecino.padre = nodo;
                     listaFrontera.add(vecino);

                    }else if(auxG <= nodo.g){
                     vecino.padre = nodo;
                     vecino.g = auxG;
                     
                     //vecino.h = heuristicaEuclidea(vecino, nodoFinal);
                     vecino.h = heuristicaUno();
                     //vecino.h = heuristicaManhattan(vecino, nodoFinal);
                     
                     vecino.f = vecino.g + vecino.h;
                    }                 
                }      
            }  
        }
        return result;
    }
    
    
    //Muestra la matriz que contendrá el camino después de calcular A*
    public void mostrarCamino(char camino[][], int tam){
        for (int i=0; i<tam; i++){ 
            for(int j=0;j<tam; j++){
                System.out.print(camino[i][j]+" ");
            }
            System.out.println();   
        }
    }
    
    //Muestra la matriz que contendrá el orden de los nodos expandidos despuÃ©s de calcular A*
    public void mostrarCaminoExpandido(int camino_exp[][], int tam){
        for (int i=0; i<tam; i++){
            for(int j=0;j<tam; j++){
                if(camino_exp[i][j]>-1 && camino_exp[i][j]<10)
                    System.out.print(" ");
                System.out.print(camino_exp[i][j]+" ");
            }
            System.out.println();   
        }
    } 
}