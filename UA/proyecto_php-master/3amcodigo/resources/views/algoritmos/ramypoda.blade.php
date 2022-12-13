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
            <span>Ramificación y Poda</span>
        </div>
    </div> <!-- end breadcrumbs -->

    <div class="principal-section">

    @include('algoritmos.sidebar')

        <div class="container-info">
            <h1 class="stylish-heading">Ramificación y Poda</h1>
            <p>
            Este método de diseño de algoritmos es una variante del diseño <i>Vuelta Atrás</i>. Sin embargo, su particular importancia hace que sea causa de estudio. Los problemas de optimización son muy susceptibles de ser resueltos con esta técnica.
            <br><br>
            <i>Ramificación y Poda</i> al igual que <i>Vuelta Atrás</i> realiza una enumeración parcial del espacio de soluciones basándose en la generación de un árbol de expansión.
            <br><br>
            Una característica que hace especial a esta técnica, es la posibilidad de generar nodos siguiendo distintas estrategias. En su versión más sencilla puede seguir un recorrido en anchura (<i>LIFO</i>) o en profundidad (<i>FIFO</i>), o utilizando el cálculo de funciones de coste para seleccionar el nodo que en principio parace más prometedor (<i>LC</i>). 
            <br><br>
            Además de estas estrategias, la técnica de <i>Ramificación y Poda</i> utiliza cotas para podar aquellas ramas del árbol que no conducen a la solución óptima. Para ello calcula en cada nodo una cota del posible valor de aquellas soluciones alcanzables desde éste.
            
            Si la cota muestra que cualquiera de estas soluciones tiene que ser necesariamente peor que la mejor solución hallada hasta el momento no necesitamos seguir explorando por esa rama del árbol, lo que permite realizar el proceso de poda.
            <br><br>
            Definimos <i>nodo vivo</i> del árbol a un nodo con posibilidades de ser ramificado, es decir, que no ha sido probado. Para determinar en cada momento que nodo va a ser expandido y dependiendo de la estrategia de búsquedad seleccionada, necesitaremos almacenar todos los nodos vivos en alguna estructura que podamos recorrer. 
            <br><br>
            Como mencionamos anteriormente podemos seguir diferentes técnicas, respecto al tratamiento de los <i>nodos vivos</i>:
            <br>
            - Emplearemos una pila para almacenar los nodos que se han generado pero no han sido examinados &nbsp;en una búsqueda en profundidad (<i>LIFO</i>). 
            <br>
            - Las búsquedas en amplitud utilizan una cola (<i>FIFO</i>) para almacenar los nodos vivos de tal manera que &nbsp;van explorando nodos en el mismo orden en que son creados. 
            <br>
            - La estrategia de mínimo coste (<i>LC</i>) utiliza una función de coste para decidir en cada momento que &nbsp;nodo debe explorarse, con la esperanza de alcanzar o más rápidamente posible una solución más &nbsp;económica que la mejor encontrada hasta el momento. Utilizaremos en este caso una estructura de &nbsp;montículo (o cola de prioridades) para almacenar los nodos ordenados por su coste.
            <br><br>
            Básicamente, en un algoritmo de <i>Ramificación y Poda</i> se realizan tres etapas:
            <br>
            <b>1. Selección.</b> Se encarga de extraer un nodo de entre el conjunto de los nodos vivos. La forma de escogerlo va a depender de la estrategia de búsqueda que decidamos.
            <br>
            <b>2. Ramificación.</b> Se construyen los posibles nodos hijos del nodo seleccionado en el paso anterior. 
            <br>
            <b>3. Poda.</b> Se eliminan algunos de los nodos creados en la etapa anterior. Esto contribuye a disminuir el espacio de búsquedad y así atenuar la complejidad de estos algoritmos basados en la exploración de un árbol de posibilidades. Aquellos nodos no podados pasan a formar parte del conjunto de <i>nodos vivos</i>, y se comienza de nuevo por el proceso de <b>selección.</b>
            <br><br>
            El algoritmo finaliza cuando se encuentra la solución, o bien cuando se agota el conjunto de nodos vivos.
            <br><br>
            Para cada nodo del árbol dispondremos de una función de coste que nos estime el valor óptimo de la solución si continuáramos por ese camino. De esta manera, si la cota que se obtiene para un nodo, es peor que una solución ya obtenida por otra rama, podemos podar esa rama pues no es interesante seguir por ella. Es evidente que no podremos realizar ninguna poda hasta que hayamos encontrado alguna solución. Por supuesto, las funciones de coste han de ser crecietnes respecto a la profundidad del árbol, es decir, si <i>h</i> es una función de coste entonces <i>h(n) <= h(n')</i> para todo <i>n'</i> nodo descendiente de <i>n</i>.
            <br><br>
            En consecuencia, y a la vista de todo esto, podemos afirmar que lo que le da valor a esta técnica es la posibilidad de disponer de distintas estrategias de exploración del árbol y de acotar la búsqueda de la solución, que en definitivase traduce en eficiencia. La dificultad está en encontrar una buena <i>función de coste</i> : que garantice la poda y que su cálculo no sea muy costoso.
            <br><br>
            Inicialmente, y antes de proceder a la poda de nodos, tendremos que disponer del coste de la mejor solución encontrada hasta el momento. Un buen recurso es tomar como mejor solución inicial la obtenida de un <i>algoritmo voraz</i>, que como sabemos no encuentra siempre la solución óptima, pero sí una cercana.
            <br><br>
            Una ventaja adicional que tiene esta técnica sobre las demás, es la posibilidad de ejecutar estos algoritmos en paralelo. Debido a que disponen de un conjunto de nodos vivos sobre el que se efectúan las tres etapas del algoritmo antes mencionadas, nada impide tener más de un proceso trabajando sobre este conjunto, extrayendo nodos, expandiéndolos y realizando la poda. 
            El disponer de algoritmos paralelizables (<i>Ramificación-Poda y Vuelta Atrás</i>) es muy importante en muchas aplicaciones en las que es necesario abordar los problemas de forma paralela para resolverlos en tiempos razonables, debido a su complejidad íntriseca.
            <br><br>
            Sin embargo, todo tiene un precio, sus requerimientos de memoria son mayores que los de los algoritmos de <i>Vuelta Atrás</i>. Ya que no se puede disponer de una estructura global donde ir construyendo la solución, puesto que el proceso de construcción deja de ser tan "ordenado" como antes. Ahora se necesita que ada nodo sea autónomo, en el sentido que ha de contener toda la información necesaria para realizar los procesos de bifurcación y poda, y para reconstruir la solución encontrada hasta el momento.





















            </p>


            <div class="centralbar">
                @include('algoritmos.centralbar_1')
                @include('algoritmos.centralbar_2')
            </div>
        </div>

    @include('algoritmos.sidebar')

    </div>


@endsection