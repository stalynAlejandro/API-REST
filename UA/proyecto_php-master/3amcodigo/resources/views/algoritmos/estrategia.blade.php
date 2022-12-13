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
            <span>Estrategias</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Estrategias</h1>
            <p>
            Saber elegir bien una estrategia ante un problema es importante para un buen programador porque va a aumentar sus posibilidades de encontrar la solución óptima y además hacerlo en menos tiempo.
            <br><br>
            Vamos a ver las familias más importantes de problemas algorítmicos y estudiar diferentes esquemas o paradigmas de diseño aplicables para resolverlos.
            <br><br>
            Estas familias de problemas junto con las técnicas de diseño de algoritmo han sido muy estudiadas por científicos de la computación. Ahora nos van a servir para aprender a resolver problemas teniendo el criterio suficiente para elegir una
            <i>técnica de diseño</i>  o estrategia adecuada.
            <br>
            <br>


            @include('algoritmos.centralbar_1')


            </p>

        </div>

        @include('algoritmos.sidebar')



    </div>



@endsection