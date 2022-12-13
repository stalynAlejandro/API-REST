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
            <span>Algoritmos Voraces</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Algoritmos Voraces</h1>
            <p>
            Es una estrategia que se caracteriza por su sencillez y que puede ser aplicada a muchos problemas, especialmente los de optimización.
            <br>
            <br>
            Dado <i>n</i> entradas, el método consiste en obtener un subconjunto de éstas, que satisfaga una determinada restricción. La restricción viene definida en el problema, o es parte del problema.
            <br>
            Los conjuntos que cumplan con las restricciones diremos que son soluciones <i>prometedoras.</i> 
            <br>
            La mejor solución de este conjunto será la solución óptima. 
            <br>
            <br>
            Para saber si podemos aplicar esta técnica, estos elementos han de estar presentes en el problema: 
            <br>
            &nbsp;&nbsp; - Un conjunto de <i>candidatos</i>, que corresponden a las <i>n</i> entradas del problema.
            <br>
            &nbsp;&nbsp; - Una <i>función selección</i> que en cada momento determine el candidato idóneo para formar la solución &nbsp;&nbsp;de entre los que aún no han sido seleccionados ni rechazados.
            <br>
            &nbsp;&nbsp; - Una función que compruebe si un subconjunto de candidatos es <i>prometedor</i>. Por prometedor nos &nbsp;&nbsp;referimos a los subconjuntos que podemos seguir añadiendo candidatos y podemos encontrar una &nbsp;&nbsp;solución.
            <br>
            &nbsp;&nbsp; - Una <i>función objetivo</i> que determine el valor de la solución hallada. 
            <br>
            &nbsp;&nbsp; - Una función que compruebe si un subconjunto es solución al problema, sea óptima o no.
            <br>
            <br>
            <br>
            Con estos elementos podemos resumir como funcionan los algoritmos voraces: 
            <br>
            &nbsp; <b>1.</b> Para resolver el problema mediante <i>algoritmos voraces</i> se trata de encontrar un subconjunto de &nbsp;&nbsp;candidatos tales que, cumpliendo las restricciones del problema, consituya la solución óptima. 
            <br>
            &nbsp; <b>2.</b> Se trabaja por etapas, en cada etapa se toma una decisión. Se toma la decisión que parece mejor &nbsp;&nbsp;en esa etapa, sin considerar las consecuencias futuras. La idea es que se escoge el candidato óptimo &nbsp;&nbsp;local, suponiendo que esto construirá la solución óptima global.
            <br>
            &nbsp; <b>3.</b> Antes de añadir un candidato a la solución que se está construyendo, se comprueba si es &nbsp;&nbsp;<i>prometedor</i> al añadirlo. En caso afirmativo se añade, sinos se descarta y no se vuelve a considerar.
            <br>
            &nbsp; <b>4.</b> Cada vez que se incluye un candidato se comprueba si el conjunto obtenido es solución.

            <br>
            <br>
            <br>

            Resumiendo, los algoritmos voraces construyen la solución en etapas sucesivas, tratando siempre de tomar la decisión óptima para cada etapa. Aquí se plantea el esquema general: 
            <br><br>
            <code>
                C++
            </code>
            <br>
            Hasta ahora hemos visto que los algortimos voraces son muy fáciles de implementar y producen soluciones eficientes. Pero hay que decir que no todos los problemas admiten esta estrategia. De hecho, la búsquedad de óptimos locales no tiene por que conducir siempre  un óptimo global. Es decir que estos algorimos no garantizan que siempre se encuentre la solución óptima.
            <br><br>
            Aquí radica la dificultad de estos algoritmos. En encontrar la <i>función de selección</i> que nos garantice que el candidato escogido o rechazado en un momento determinado es el que ha de formar parte o no de la solución óptima sin posibilidad de reconsiderar dicha decisión.
            <br><br>
            Debido a su eficiencia, este tipo de algoritmos se utiliza en casos donde no es necesariamente encontrar la solución óptima. También hay circunstancias, en donde nos interesa conseguir cuanto antes una solución al problema y, a partir de la información suministrada por ella, conseguir la óptima más rápidamente (ej. técnica de <i><a href="/algoritmos/estrategia/ramypoda">Ramificación y Poda</a></i> )






















            @include('algoritmos.centralbar_1')


            </p>

        </div>

        @include('algoritmos.sidebar')



    </div>



@endsection