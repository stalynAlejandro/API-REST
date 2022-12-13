---------------------------------------------------------------------------------
:::::::::::::::::::::::::::::::::::: ADABOOST :::::::::::::::::::::::::::::::::::
---------------------------------------------------------------------------------

El objetivo de esta práctica es implementar el algoritmo ADABOOST para construir
un sistema de aprendizaje y decir qué tipo pertenece la imagen que le pasemos. 

Tipos : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

En este caso vamos a clasificar dígitos. Hay 10 tipos [0..9] números. 

La plantilla que se nos proporciona nos permite coger imágenes de una BBDD. 

El sistema va a ser capaz de distinguir dígitos manuscritos. Se ha implementado 
un sistema de aprendizaje automatizado supervisado. 

La salida obtenida por el algoritmo ADABOOST está formada por una serie de clasificadores
más sencillos cuyo objetivo es obtener un error algo menor que una clasficación aleatoria. 

El conjunto de estos clasificadores débiles forman un clasificador fuerte. Realizaremos 
un clasificador fuerte para cada dígito. El conjunto de los clasificadores fuertes
correspondientes a cada dígito formarán el clasificador final, encargado de distinguir
entre las imágenes que se le pasan. 


Al final se hará una serie de pruebas para saber el porcentaje de aciertos y como podemos 
mejorar este. 


Dada una cantidad de imágenes, un clasificador puede aprender de ellas y así clasificar
automáticamente las futuras imágenes. Estos clasificadores (débiles) on construidos a partir
de una característica de los objetos, en este caso será un pixel de las imágenes. 

ADABOOST propone entrenar de forma iterativa ua serie de clasificadores sencillos, al que 
llamamos conjunto de entrenamiento, de tal modo que cada nuevo clasificador preste mayor
atención a los datos clasificados errónamente. Para esto itera cada nuevo clasificador en 
función del número de pruebas que queramos realizar a cada clasificador, asignándole un peso. 

Para conseguir que cada nuevo clasificador preste mayor atención a los datos más erróneos
cada clasificador débil va a tenr una característica que almacena el error. Esta trata de una 
función que pondera la importancia de cada error en función de la confianza que tengamos en 
el durante el entrenamiento. 


----------------------------------------
:::::::::: CLASIFICADOR DÉBIL ::::::::::
----------------------------------------

Se encarga de generar el hiperplano de 28 * 28 dimensiones. Con valores que van
desde -1 a 1. 

Luego se genera el valor independiente del plano con número aleatorios entre 0 y 255. 

Objetos que representan una clasificaicón poco fiable de los tipos. La forma en que clasifican
el espacio es dividir el espacio de la imagen en dos partes. Y especificar que los objetos 
que quedan a un lado se van a clasificar según la clase y los objetos de una clase en el otro
lado. 


Una forma para distinguir los lados en los que se divide el espacio, es generar de 
forma aleatoria un número que es positivo o negativo. 

En caso que la dirección sea +1 la clasificación correcta se encontrará a la izquierda.

En caso que la dirección sea -1 la clasificación correcta se encontrará a la derecha. 

------------------------------------------------------------
    boolean resultado = false;

    if( direccion == 1 ){
        
        if( umbral < imagen.getImagenData()[pixel] ) resultado = true;
    
    }else{
        
        if( umbral < imagen.getImagenData()[pixel] ) resultado = true;
        
    }

    return resultado;
------------------------------------------------------------


Esto será usado por el clasificador débil para aplicarlo a un conjunto de imágenes de 
entrenamiento. 


Para cada imagen empleada para entrenar el débil, se usa el código anterior. 

La función aplicarClasificadorDebil queda de la siguiente forma:


------------------------------------------------------------

    ArrayList<Boolean> clasificacion = new ArrayList();

    boolean aux;

    for( int i = 0; i < entrenamiento.size(); i++ ){
         
        Imagen img = (Imagen)entrenamiento.get(i);

        aux = h (img);

        clasificacion.add(aux);
        
    }

    return clasificacion;

------------------------------------------------------------

Para concluir con la explicación voy a enseñar la forma en que obtengo el error y la
confianza a partir de este. 

Una vez obtenida la clasificación que da el clasificador débil sobre una imágenes de 
entrenamiento. Esta es comparada con la clasificación real de imágenes. Para ello
comparamos ambas listas y en caso de obtener una mala clasificación por parte del 
débil tendremos un error, este es ponderado en función del peso de cada imagen. 

Una vez obtenido el error del débil, podemos obtener la confianza de este en función
del error. El código que representa el cálculo del error y de la confianza es el 
siguiente. 


------------------------------------------------------------

ArrayList<Boolean> clasificacion = this.aplicarClasificadorDebil(aprendizaje);

for( int i = 0; i < clasificacion.size(); ++i ){
    
    if( !clasificacion.get(i).equals(correcto.get(i)) ) error += aprendizaje.get(i).getPeso();
    
}


confianza = 0.5f * (float)Math.log10(1.0f - error) / error;

------------------------------------------------------------


















/*
//Cargador MNIST de SI
MNISTLoader ml = new MNISTLoader();
ml.loadDBFromPath("./mnist_1000");

//Accedo a las imagenes de dígito 1
ArrayList d0imgs = ml.getImageDatabaseForDigit(1);

//Y cojo la tercera imagen del dígito 1
Imagen img = (Imagen) d0imgs.get(2);

//La invierto para ilustrar como acceder a los pixels
byte imageData[] = img.getImageData();
for (int i = 0; i < imageData.length; i++){

    imageData[i] = (byte) (255 - imageData[i]);
    System.out.print(Byte2Unsigned(imageData[i])+ ",");
}

//Muestro la imagen invertida
MostrarImagen imgShow = new MostrarImagen();
imgShow.setImage(img);
imgShow.mostrar();
*/









            
            ArrayList<Boolean> clasificados = cDebil.aplicarDebil(entrenamiento);
            
            
            //Actualizar los pesos de las imágenes.
            float z = 0.0f;
            float num = 0.0f;
            float peso = 0.0f;
            
            for( int j = 0; j < entrenamiento.size(); j++ ){
                
                System.out.println(" get Peso j : " + j + " : " + entrenamiento.get(j).getPeso() );
                
                
                peso = entrenamiento.get(j).getPeso();
                
                if( clasificados.get(j).equals(correctos.get(j))) num = peso * (float)Math.pow(Math.E, -cDebil.getConfianza());
                else num = peso * (float)Math.pow(Math.E, cDebil.getConfianza());
                
                
                entrenamiento.get(j).setPeso(num);
                
                z += num;
                
                
               //System.out.println("\n\n\t" + z + " " + num + " " + peso + " ");

            }
            
            
            
            //Normalizar pesos.
            for( int j = 0; j < entrenamiento.size(); j++ ){
                
                peso = entrenamiento.get(j).getPeso() / z;
                entrenamiento.get(j).setPeso(peso);
                
            }
            



