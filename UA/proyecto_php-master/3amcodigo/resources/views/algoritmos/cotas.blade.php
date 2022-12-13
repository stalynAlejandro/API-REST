@extends('layout')

@section('title', 'Algoritmos')

@section('extra-css')

@endsection

@section('content')

    <div class="breadcrumbs">
        <div class="container">
            <a href="/">Principal</a>
            <i class="fa fa-chevron-right breadcrumb-separator"></i>
            <a href="/algoritmos">Algoritmos</a>
            <i class="fa fa-chevron-right breadcrumb-separator"></i>
            <a href="/algoritmos/eficiencia">Eficiencia</a>
            <i class="fa fa-chevron-right breadcrumb-separator"></i>
            <span>Cotas de Complejidad</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Cotas de Complejidad</h1>
            <p>
            Hay casos donde al resolver un problema, con un mismo tamaño <b>n</b>, aparecen diferentes casos. 
            <br>
            Veamos un ejemplo. En la siguiente función se pasan como parámetros, un vector y un número. La función busca el número en este vector y cuando lo encuentra lo devuelve, si no lo encuentra devuelve un -1.
            <br><br>
            <code>
    int buscar(vector<int> &vec, int i){
        for(unsigned i = 0; i < vec.size(); i++){
            if( vec[i] == z){
                return i;
        }
        return -1;
    }
            </code>            
            <br>
            El tamaño del problema es el tamaño del vector <b> n = vec.size() </b> sin ninguna duda. Pero al resolver el problema tenemos diferentes escenarios. Tenemos un <b>mejor caso</b> y un <b>peor caso.</b>
            <br><br>
            El mejor caso es cuando el primer número del vector es igual al número que buscamos. Lo que al contar pasos seria:  
            <br><br>
            <pre>
                
    for(unsigend i = 0 -> 1 paso. 
    i < vec.size()     -> 1 paso. 
    i++                -> 0 pasos. 
    v[i] == 0          -> 1 paso. 

    En total = 1 + 1 + 1 = 3 pasos.
    Esto seria el mejor caso, por que el número de pasos a dar es el más bajo. 

            </pre>

            <br><br>
            Pero en el peor caso sería cuando el número no se encuentra en el vector, y tiene que iterar por todo el vector.
            <br><br>
            <pre>
                
    for(unsigend i = 0 -> 1 paso. 
    i < vec.size()     -> n + 1 pasos. 
    i++                -> n pasos. 
    v[i] == 0          -> n pasos. 

    En total = 1 + (n + 1) + n + n = 3n + 2 pasos.
    Siendo n el tamaño del problema = tamaño del vector.
    Este seria el peor caso, por que el número de pasos a dar es el más alto. 
            </pre>

            <br><br>
            Para clasificar los diferentes casos que aparecen utilizamos las cotas:
            <br>
            &nbsp;&nbsp; - Mejor Caso = Cota Inferior <b>Ci(n)</b><br>
            &nbsp;&nbsp; - Peor Caso  = Cota Superior <b>Cs(n)</b><br>
            &nbsp;&nbsp; - Caso Promedio = Cota Promedio <b>Cm(n)</b>   

            <br><br>
            Utilizando las cotas, en el ejemplo anterior seria así: 
            <br>
            &nbsp;&nbsp; - La cota inferior es Ci(n) = 3.
            <br>
            &nbsp;&nbsp; - La cota superior es Cs(n) = 3n + 2.
            <br>
            &nbsp;&nbsp; - El coste promedio es difícil de evaluar a priori. Hace falta conocer la distribución de probabilidad de entrada. Hay que enfatizar que el coste promedio NO es la media de la cota inferior y de la superior. Pero no nos va a hacer falta para comparar dos algoritmos. Con las otras dos cotas, nos sobra.

            <br><br>
            También tiene que quedar claro que todas estas funciones son respecto al tamaño del problema <b>n</b>.
            <br><br>
            
            Nuestro objetivo es mostrar cómo cambia el tiempo de ejecución del algoritmo con respecto al tamaño del problema. Resulta que el número exacto de operaciones no es tan importante como determinar la parte más dominante de la funcion T(n). En otras palabras, a medida que el problema se hace más grande, una parte de la función T(n) tiende a dominar la parte restante. Este término dominante es lo que, al final, se utiliza para la comparación. 
            <br><br>    
            Entonces para el estudio de tamaños grandes de problema utilizamos el <b>Análisis asintótico</b>. Esta notación proporciona una aproximación útil al número real de pasos en el cálculo. 
            <br><br>
            En el siguiente post se explica el  
            <a style="font-size:16px; color:#8B008B;" href="/algoritmos/eficiencia/analisis">Análisis Asintótico</a> 
            </p>




        </div>

        @include('algoritmos.sidebar')



    </div>



@endsection