<!DOCTYPE hml>

<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charse="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>3amCodigo | @yield('title', 'default')</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|Roboto:300,400,700">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('css/responsive.css') }}">

        @yield('extra-css')
    </head>

    <body class="@yield('body-class', '')">
     
        @include('partials.nav')

        @yield('content')

        @include('partials.footer')

        @yield('extra-js')

    </body>
<html>