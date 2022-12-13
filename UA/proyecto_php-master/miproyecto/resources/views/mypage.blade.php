

@extends('layouts.app')

@section('title', 'Page Title')

@section('sidebar')
    @parent

    <p> This is appended to the master sidebar.</p>

@endsection

@section('content')
    <div class="felx-center position-ref full-height">
        <div class="content">
            <div class="tile m-b">
                Users - Orders - Products
            </div>
            <div class="container">
                @yield('content')
                <h1>Hola : {{$name ?? 'default'}}</h1>
            </div>
        </div>
    </div>

@endsection
