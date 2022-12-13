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
            <span>Análisis Asintótico</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Análisis Asintótico</h1>
            <p>
            El Análisis Asintótico es el estudio de la complejidad algorítmica para tamaños grandes de problema. Por supesto se emplea la <b>notación asintótica.</b> 
            <br><br>
            Es necesario porque permite clasificar las funciones de complejidad de forma que podamos compararlas entre si fácilmente. Para ello se engloban funciones que "crecen de la misma forma".
            <br><br>
            Se definen tres tipos de notación:
            <br>&nbsp;&nbsp; - Notación Superior <b>O(n)</b> -> Cota Superior.
            <br>&nbsp;&nbsp; - Notación Inferior <b>Ω(n)</b> -> Cota Inferior.
            <br>&nbsp;&nbsp; - Notación Promedio <b>Θ(n)</b> -> Coste Exacto.
            <br>
            <br>
            Por ejemplo: En la siguente función se suma los n primeros números.
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
            La función suma tiene esta denotación: T(n) = 1 + n . A medida que n se hace grande, la constante 1 será cada vez menos significativa para el resultado final. Si estamos buscando una aproximación para T(n), entonces podemos despreciar el 1 y simplemente decir que el tiempo de ejecución es O(n). 

            <br>
            <br>
            Otro ejemplo. Supongamos que para otro algoritmo el número exacto de pasos es de T(n) = 5n^2 + 25n + 1005. Cuando n es pequeño, la constante 1005 parece ser la parte más dominante de la función. Sin embargo, a medida que n se hace más grande, el término n^2 se convierte en el más importante. De hecho cuando n es realmente grande, podemos ignorar los otros dos términos y concetrarnos en 5n^2. Además el coeficiente 5 se vuelve insignificante cuando n se hace grande. Podemos decir entonces que la función T(n) tiene un orden de magnitud n^2, o simplemente que es O(n^2).
            <br>
            El peor caso es cuando se da un conjunto de datos en particular, donde el algoritmo se comporta especialmente mal. 
            <br>
            <br>
            Las funciones de orde de magnitud más comunes, se muestran en la siguiente tabla. Están en orden ascendente para decir cuál de estas funciones es la parte dominante de cualquier función T(n).
            <br>
            <br>
            <code>

                    f(n)        Nombre
                  .........................
                    
                    1           constante

                    log n       logarítmica

                    n           lineal

                    n log n     log-lineal

                    n^2         cuadrática

                    n^3         cúbica

                    2^n         exponencial

            </code>


























            <!-- <a style="font-size:16px; color:#8B008B;" href="/algoritmos/eficiencia/analisis">Análisis Asintótico</a> -->
            </p>

        </div>

        @include('algoritmos.sidebar')



    </div>



@endsection