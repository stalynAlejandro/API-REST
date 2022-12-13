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
            <a href="/algoritmos/estrategia">Estrategias</a>
            <i class="fa fa-chevron-right breadcrumb-separator"></i>
            <span>Divide y Vencerás</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Divide y Vencerás</h1>
            <p>
            Esta técnica consiste en resolver un problema a partir de la solución de subproblemas del mismo tipo, pero de menor tamaño. 
            <br>
            En otras palabras, consiste en dividir el problema (Grande) en subproblemas (Pequeños) y resolver estos subproblemas y después "juntar" la solución.
            <br>
            <br>
            Para implementar está técnica de diseño vamos a seguir tres pasos: 
            <br>
            <br>
            &nbsp;&nbsp; - <b>División</b>. Se plantea el problema de manera que podamos dividirlo en partes iguales. De un problema grande se sacan subproblemas del mismo tipo, pero de menor tamaño. 
            <br>
            <br>
            &nbsp;&nbsp; - <b>Resolución</b>. Se resuelven independientemente los subproblemas. Se pueden resolver de forma recursiva o directamente si son problemas elementales. De todas formas el resolver estos subproblemas será más fácil que resolver el problema original, debido a que el tamaño de estos es estrictamente menor. 
            <br>El tamaño del problema original se denomina <b>n</b>.
            <br>El número de subproblemas obtenidos se suele denominar <b>k</b>.
            <br>El tamaño de un subproblema se denomina <b>n<b style= "font-size: 12px;" >k</b></b>.    
            <br>
            <br>
            &nbsp;&nbsp; - <b>Combinar</b>. Combinamos las soluciones obtenidas en el paso anterior, así obtenemos la solución del problema original.
            <br>
            <br>
            <code>
                Esquema del algoritmo
            </code>
            <br>
            La eficiencia del algoritmo resultante va a depender de dos factores: el número de los subproblemas (k) y del tamaño de estos (nk). Para que sea eficiente, el número k debe ser pequeño e idependiente de una entrada determinada. 
            <br>
            <br>
            Otros aspecto muy importante al utilizar <i>Divide y Vencerás</i> para diseñar algoritmos, es conseguir que los subproblemas sean independientes, es decir que no se solapen entre ellos. El solapamiento provocaría que el tiempo de ejecución aumente considerablemente, en muchos hasta llegar a complejidades cuadráticas (n^2), como el caso de QuickSort,  o incluso exponenciales (2^n).
            <br>
            <br>
            Los algoritmos diseñados por <i>Divide y Vencerás</i> que utilizan un diseño recursivo por un lado tienen mayor legibilidad, lo que ayuda a mantener el código. Sin embargo, los diseños recursivos conllevan normalmente  un mayor tiempo de ejecución que los iterativos, además de la complejidad espacial que puede representar el uso de la pila de recursión.
            <br>
            <br>
            Dado que el diseño utilizando <i>Divice y Vencerás</i> provoca algoritmos recursivos, podemos expresar su tiempo de ejecución con la siguiente ecuación de recurrencia: 
            <br>
            <br>
            <pre>     
             | cn^k               si 1 <= n < b
        T(n)-|
             | aT(n/b) + cn^k     si n >= b

    Donde:
        - a     : Representa el número de subproblemas.
        - n/b   : Es el tamaño de los subproblemas.
        - cn^k  : Representa el coste de descomponer el problema original.
            </pre>
            <br>
            La solución a esta función puede alcanzar distintas complejidades: 
            <br>
            <br>
            <pre>

             |  O(n^k)              si a < b^k          
        T(n)-|  O(n^k * log n )     si a = b^k
             |  O(n^log a)          si a > b        
            </pre>
            <br>
            Las diferencias surgen de los distintos valores que pueden tomar <i>a</i> y <i>b</i>, que en definitiva determinan el número de subproblemas y su tamaño. Lo importante es observar que en todos los casos la complejidad es de orden polinómico o polilogarítmico pero nunca exponencial, frente a los algoritmos recursivos que en muchos casos alcanzan complejidades exponenciales.

            <br>
            <br>
            Dos algoritmos de ordenación que se diseñaron en base a la estrategia <i>Divide y Vencerás</i> son MergeSort y QuickSort. Sobre estos algoritmos vamos a señalar la diferencia de esfuerzo que realizan en sus fases de división y combinaicón. La división de QuickSort es costosoa, pero una vez ordenados los dos subvectores la combinación es inmediata. Sin embargo, la división que realiza MergeSort consiste simplemente en considerar la mitad de los elementos, mientras que su proceso de combinación es costoso.





            @include('algoritmos.centralbar_1')


            </p>

        </div>

        @include('algoritmos.sidebar')



    </div>



@endsection