@extends('layout')

@section('title', 'Algoritmos')

@section('extra-css')

@endsection

@section('content')

    <div class="breadcrumbs">
        <div class="container">
        <a href="/">Principal</a>
            <i class="fa fa-chevron-right breadcrumb-separator"></i>
            <span>C++</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('c++.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">C++</h1>
            <p>Una definición para <strong>Algoritmo</strong> podria ser: Un conjunto ordenado 
            y finito de operaciones que permiten hallar la solución a un problema. 
            En la vida cuotidiana todos utilizamos algoritmos sin darnos cuenta. 
        </div>

    @include('c++.sidebar')

    </div>


@endsection