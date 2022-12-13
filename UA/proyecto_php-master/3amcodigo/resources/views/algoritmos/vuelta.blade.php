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
            <span>Vuelta Atrás</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Vuelta Atrás</h1>
            <p>
            Esta técnica se puede utilizar en un gran número de problemas, muy especialmente en aquellos de optimización.
            <br><br>
            Hay problemas que la única forma de resolverlos es a través de un estudio exhaustivo de un conjunto conocido a priori de posibles soluciones, en las que tratamos de encontrar una o todas las soluciones y por tanto también la óptima.
            <br><br>
            Para llevar a cabo este estudio exhaustivo, el diseño <i>Vuelta Atrás</i> proporciona una manera sistemática de generar todas las posibles soluciones siempre que dichas soluciones sean susceptibles de resolverse en etapas.
            <br><br>
            En su forma básica la <i>Vuelta Atrás</i> se asemeja a un recorrido en profundidad dentro de un árbol cuya existencia sólo es implícita, y que denominaremos <i>árbol de expansión</i>. 
            <br><br>
            Este árbol es conceptual y sólo haremos uso de su organización como tal, en donde cada nodo de nivel <i>k</i> representa una parte de la solución y está formado por <i>k</i> etapas que se suponen ya realizadas. Sus hijos son las prolongaciones posibles al añadir una nueva etapa. Para examinar el conjunto de posibles soluciones es suficiente recorrer este árbol construyendo soluciones parciales a medida que se avanza en el recorrido.
            <br><br>
            En este recorrido pueden suceder dos cosas. La primera es que tenga éxito si, procediendo de esta manera, se llega a una solución (una hoja del árbol). Si lo único que buscabamos era una solución al problema, el algoritmo finaliza aquí. Ahora bien  si lo que buscabamos eran todas las soluciones o la mejor de entre todas ellas, el algoritmo seguirá explorando el árbol en búsquedad de soluciones alternativas. 
            <br><br>
            Por otra parte, el recorrido no tiene éxito si en alguna etapa la solución parcial construida hasta el momento no se puede completar; nos encontramos en lo que llamamos <i>nodos fracaso.</i>. En tal caso, el algoritmo vuelve atrás (de ahí su nombre) en su recorrido eliminando los elementos que se hubiera añadido en cada etapa a partir de ese nodo. En este retroceso, si existe uno o más caminos aún no explorados que puedan conducir a solución, el recorrido del árbol continúa por ellos.
            <br><br>
            En líneas generales, un problema puede resolverse con un algoritmo <i>Vuelta Atrás</i> cuando la solución puede expresarse como una <i>n-tupla </i>[<i>x1, x2,...xn</i>], donde cada una de las componentes <i>xi</i> de este vector es elegida en cada etapa, de entre un conjunto finito de valores. Cada etapa representará un nivel en el árbol de expansión.
            <br><br>





















            </p>



            <div class="centralbar">
                @include('algoritmos.centralbar_1')
                @include('algoritmos.centralbar_2')
            </div>
        </div>

    @include('algoritmos.sidebar')

    </div>


@endsection