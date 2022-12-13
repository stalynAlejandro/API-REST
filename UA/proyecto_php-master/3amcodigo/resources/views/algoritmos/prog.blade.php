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
            <span>Programación Dinámica</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Programación Dinámica</h1>
            <p>
            Existe una serie de problemas que se pueden resolver mediante algoritmos recursivos. Sin embargo, el tiempo de ejecución aplicando recursividad puede llegar a ser de orden exponencial y por tanto no nos sirve esta solución. En estos casos la <i>Programación Dinámica</i> nos será de ayuda.
            <br>
            <br>
            Recordando la técnica de <i><a href="/algoritmos/estrategia/divide"> Divide y Vencerás</a></i> vimos como un problema grande se puede resolver dividiendo este problema en subproblemas de menor tamaño, resolviendo estos subproblemas y al final cominando la solución. El problema aparece cuando estos subproblemas no son independientes, sino que se solapan entre ellos; es cuando la solución recursiva no resulta eficiente. 
            <br>
            <br>
            En estos casos la <i>Programación Dinámica</i> ofrece una solución que consiste en resovler estos subproblemas una sola vez y guardar estas soluciones en una tabla para su utilización en iteraciones futuras.
            <br>
            <br>
            Donde tiene mayor aplicación la <i>Programación Dinámica</i> es en la resolución de problemas de optimización. En este tipo de problemas se pueden presentar distintas soluciones, cada una con un valor, y lo que se desea es encontrar la solución de valor óptimo (máximo o mínimo). La solución de problemas mediante esta técnica se basa en el llamado principio de <b>valor óptimo</b>, enunciado por Bellman en 1957 que dice: 
            <br>
            &nbsp; &nbsp; <i>"En una secuencia de decisiones óptima, toda subsecuencia ha de ser también óptima."</i>
            <br>
            <br>
            Para que un problema pueda ser abordado por esta técnica a de cumplir <b>dos condiciones</b>: 
            <br>
            La primera condición es que la solución al problema ha de ser alcanzada a través de una secuencia de decisiones, una encada iteración. La segunda condición es que dicha secuencia de decisiones ha de cumplir el principio óptimo.

            <br>
            <br>
            Pasos del diseño de un algoritmo según <i>Programaicón Dinámica</i> : 
            <br>
            &nbsp;&nbsp;<b>1.</b> Planteamiento de la solución como una sucesión de decisiones y verificación de que ésta cumple el &nbsp;&nbsp;principio de óptimo.
            <br>
            &nbsp;&nbsp;<b>2.</b> Definición recursiva de la solución.
            <br>
            &nbsp;&nbsp;<b>3.</b> Cálculo del valor de la solución óptima mediante una tabla en donde se almacenan soluciones a &nbsp;&nbsp;problemas parciales para reutilizar los cálculos.
            <br>
            &nbsp;&nbsp;<b>4.</b> Construcción de la solución óptima haciendo uso de la información contenida en la tabla anterior.







            @include('algoritmos.centralbar_1')


            </p>

        </div>

        @include('algoritmos.sidebar')



    </div>



@endsection