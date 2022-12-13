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
            <span>Eficiencia</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Eficiencia</h1>
            <p>
            Para analizar con rigor la eficiencia de los algoritmos se necesita estudiar 
            diferentes conceptos como:
            <br>
            <br> &nbsp; &nbsp; - Eficiencia en tiempo y espacio.
            <br> &nbsp; &nbsp; - Utilizar criterios asintóticos.
            <br> &nbsp; &nbsp; - Calcular complejidades temporales y espaciales.

            <br>
            <br> Por último, comparando estos resultados, podremos elegir que algoritmo es mejor para el problema que estamos resolviendo.

            <br><br>
            Antes de empenzar a estudiar a fondo estos puntos, tenemos que tener claro sobre lo que estamos trabjando. Por ejemplo, ya hemos dicho que un algoritmo es una serie finita de pasos que expresan la resolución a un problema. También tenemos que tener claro, que los recursos que se consumen al ejecutar un algoritmo son tiempo y memoria. Por eso al hablar de complejidades: 
            <br><br>
            &nbsp; &nbsp; - Tiempo: Complejidad Temporal.
            <br>&nbsp; &nbsp; - Memoria: Complejidad Espacial.


            <br><br>
            Ahora ya podemos responder a ciertas preguntas que surgen al estudiar la eficiencia de los algoritmos: 

            <br><br>&nbsp; &nbsp;<b>- ¿Qué es la Complejidad Algorítmica?</b> Es una medida de los recursos que necesita un algoritmo para resolver un problema. Como ya sabemos, los recursos se separán en dos (tiempo y memoria). Por lo tanto la complejidad algorítmica puede ser la consideración de las dos complejidades mencionadas antes, la complejidad temporal y la complejidad espacial.
            <br><br>&nbsp; &nbsp;<b>- ¿Qué es el tiempo de ejecución de un algoritmo?</b>
            Al tratar de caracterizar la eficiencia de un algoritmo en términos del tiempo de ejecución, es importante cuantificar el número de operaciones o pasos que el algoritmo requiere. Si se considera que cada uno de estos pasos es una unidad básica de cálculo, entonces el tiempo de ejecución de un algoritmo se puede expresar como el número de pasos necesarios para resolver el problema.
            <br><br>&nbsp; &nbsp;<b>- ¿Cuál es el tamaño de un problema?</b> Tomando un ejemplo muy sencillo.
            <br><br>
            <code>
    int suma(int n){
        int resultado = 0;  //Variable acumuladora. Inicia en 0

        for(unsigned i = 0; i < n; i++){ //Bucle se ejecuta n veces
            resultado += i; 
        }

        return resultado; //Devuelve la variable acumuladora
    }       

            </code>
            <br>
            En la función <b>suma</b> el número de instrucciones de asignación es 1 (<b>
            resultado = 0 </b>) más el valor de <b>n</b> (<b>el número de veces que se ejecuta: resultado += i</b>). Podemos denotar esta operación en una función <b>T(n) = 1 + n.</b>
            El parámetro <b>n</b> a menudo se denomina el "tamaño del problema".
            <br>
            Se puede resumir en una frase: "T(n) es el tiempo que tarda el algoritmo, en resolver 
            un problema de tamaño n. Siendo T(n) = 1 + n. Es decir, tarda n pasos más 1."

            <br><br>Para profundizar más sobre el cálculo de complejidades: 
            <a style="font-size:16px; color:#8B008B;" href="/algoritmos/eficiencia/cotas">Cotas de complejidad</a>


            </p>



        </div>

        @include('algoritmos.sidebar')



    </div>



@endsection