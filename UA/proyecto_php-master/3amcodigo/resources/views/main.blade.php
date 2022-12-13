<!DOCTYPE hml>

<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charse="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>3amCodigo</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat|Roboto:300,400,700">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('css/responsive.css') }}">
    </head>

    <body>
   
         @include('partials.nav')

        <div class="hero container">
            <div class="hero-copy">
                <h1>Aprende a programar con ejemplos prácticos</h1>
                <p>La experiencia nos ha llevado a diseñar este tipo de manual, en el que cada
                    una de las funciones se ejercita mediante la realización de un ejercicio práctico.
                </p>
            </div>
        </div>



        <footer>
            <div class="footer-content container">
                <div class="made-with">Made by saav</div>
                <ul>
                    <il></il>
                    <il><a href=""><i class="fa fa-globe"></i></a></il>
                        <il><a href=""><i class="fa fa-youtube"></i></a></il>
                        <il><a href=""><i class="fa fa-github"></i></a></il>
                        <il><a href=""><i class="fa fa-twitter"></i></a></il>
                </ul>
            </div>
        </footer>

    </body>



</html>