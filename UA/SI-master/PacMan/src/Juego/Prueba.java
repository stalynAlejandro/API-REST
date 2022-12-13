/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Juego;

import java.io.*;


public class Prueba {
    Laberinto laberinto;
    
     public static void main(String []args){
         //Recibe el mundo como parámetro y llama al A*
        File mundo;
        Prueba pr= new Prueba();
        
        if (args.length==0)
            mundo=new File ("Mundos/prueba.txt");
        else
            mundo=new File(args[0]);
        
        pr.probar(mundo);        
        
     }
     
     public void probar(File mundo){
        laberinto = new Laberinto(mundo);      
        Aestrella alg = new Aestrella(false);
        
        alg.setNumFantasma(1); //Un fantasma
        int sol=alg.AestrellaFantasma(laberinto);          
     }
}
