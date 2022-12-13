@extends('layout')

@section('title', 'Algoritmos')

@section('extra-css')

@endsection

@section('content')

    <div class="breadcrumbs">
        <div class="container">
            <a href="/">Principal</a>
            <i class="fa fa-chevron-right breadcrumb-separator"></i>
            <span>Algoritmos</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Análisis y Diseño de Algoritmos</h1>
            <p>Una definición para <strong>Algoritmo</strong> podria ser: Un conjunto ordenado 
            y finito de operaciones que nos permiten hallar la solución a un problema. En el campo 
            de la computación un algoritmo funciona correctamente cuando termina en un tiempo determinado 
            (no se cuelga) y devuelve un resultado correcto.
            <br><br>
            Hay dos maneras de plantear la solución a un problema mediante algoritmos: 
            <br>&nbsp;&nbsp; <b>- Fuerza bruta</b>. Cuando los algoritmos solo nos solucionan un problema y no se 
            pueden generalizar, es decir, que no nos sirven para resolver otros problemas.
            <br>&nbsp;&nbsp; <b>- Paradigmas</b>. Es la manera correcta para diseñar algoritmos. Se utiliza metodologías,
            esquemas, estrategias, etc. Esto nos permite reutilizar los algoritmos, adaptarlos a diferentes problemas,
            y por cada instanciación de un esquema general se obtiene un algoritmo diferente.  A la larga, nos va ahorrar
            trabajo y problemas.

            <br><br>En el siguiente post se estudian las estrategias más habituales para resolver problemas con algoritmos:  

            <a style="font-size:16px; color:#8B008B;" href="/algoritmos/estrategia">Estrategias algorítmicas</a>

            </p>

            <p><br><b>¿Por qué es importante estudiar y analizar los algoritmos?</b> Hay muchas cosas 
            a tener en cuenta a la hora de programar, como la interfaz (lo que va a ver el usuario), 
            la seguridad, el mantenimiento y la eficiencia. En la <strong>enficiencia</strong> es 
            donde tener algoritmos bien diseñados y pensados nos van a ser necesarios. Diseñar los algoritmos, antes de ponerse a escribir
            código, hará que el código sea más claro, esté mejor estructurado, sea fácil de usar y sobretodo que sea más eficiente.
            <br><br><b>¿Por qué preocuparse por la eficiencia?</b> Sobretodo por que hará que nuestro
            programa (app, web, videojuego, etc.) vaya mucho mas rápido. A nadie le gusta esperar. Imaginemos
            por un momento una página web que tarda en cargar las páginas, un editor de imágenes que tarda mucho 
            en aplicar filtros o un videojuego que en cargar la partida tarda demasiado, los tres ejemplos cumplen
            con su objetivo. Pero si no lo hacen con el suficiente rendimiento que esperan los usuarios NO sirven.
            <br><br><b>¿Como saber que algoritmo es más eficiente?</b> Entendemos por eficiencia de un algoritmo 
            la cantidad de <b>recursos</b> de cómputo que requiere, es decir, cuál es su <b>tiempo de ejecución</b> y qué
            <b>cantidad de memoria utiliza</b>. 
            <br>&nbsp; &nbsp; <b>-</b> El tiempo que tarda un algoritmo en resolver un problema se le llama: <b> coste en tiempo</b>. 
            <br>&nbsp; &nbsp; <b>-</b> A la cantidad de memoria que un algoritmo utiliza se le llama: <b> coste espacial </b>. 
            <br><br>Por lo tanto, el algoritmo más eficiente será el que tarde menos en ejecutarse y el que utilize menos memoria.
            
            <br><br>
            Vamos a ver un ejemplo, para tener claro la diferencia entre dos algoritmos que resuelven el mismo problema y cual es mejor.
            <br>
            La siguente función resuelve un problema sencillo: Calcular la suma de los <b>n</b> primeros números.

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
            Ahora veamos el siguiente código. Al principio parece extraño, pero después de analizarlo podemos ver que esta función está haciendo lo mismo que la anterior. La razón por la que esto no es obvio es la deficiente codificación. No se usa buenos nombres para facilitar la lectura de código y hay instrucciones que no son necesarias.

            <code>
    int func(int variable){
        int cosa = 0;  
        int otra = cosa;

        for(unsigned i = 0; i < variable; i++){ 
            otra = cosa;
            cosa = cosa + i; 
        }

        return cosa; 
    }          

            </code>

            <br>
            En este caso se puede ver que a simple vista un algoritmo es mejor que otro, solo por la legibilidad y las instrucciones que sobran. Pero en este curso estamos más interasados en caracterizar el propio algoritmo. 
            <br>
            El ánalisis de algoritmos se ocupa de compararlos con base en la cantidad de recursos computacionales (tiempo y espacio) que utiliza cada algoritmo. 

            <br><br>En el siguiente post se estudia más profundamente la eficiencia de los algoritmos:  

            <a style="font-size:16px; color:#8B008B;" href="/algoritmos/eficiencia">Eficiencia de los algoritmos</a>

            </p>



            <div class="centralbar">
                @include('algoritmos.centralbar_1')
                @include('algoritmos.centralbar_2')


            </div>


        </div>

    @include('algoritmos.sidebar')

    </div>




































@endsection