/**
STALYN ALEJANDRO ALCOCER VALENCIA DNI:20947870

Introducción a PHP.

    Es un lenguaje de scripting.
    Permite mezclar código HTML y PHP en el mismo documento.

    El código PHP se procesa en el servidor. El cliente nunca
    podrá ver el código PHP.

    Necesita un servidor Web que soporte PHP. Ej APACHE.

    Se puede ejecutar en línea de comandos.

        $php fichero.php

    <?php.....?>  Inicio y fin de secciones de código PHP.

Variables.

    Se utiliza el símbolo $
        $variable = 15;
    
    No se especifica el tipo. 
    No es necesario declarar las variables.
    No tiene un tipo fijo.

    *notas:
    -En el tipo enteros no hay unsigned. 
    -Comillas simples:
        -se usa \
        -Las variables NO se interpretan
    
    -Comillas dobles:
        -se usa \n , \r , \t , ...
        -Sí que se interpreta variables
            "Hola $nombre"

Arrays.

    Se crean 
        $var = array();
        $var = [];

    Para asignar valor.
        $var[i] = 'hola';

    Para añadir un elemento al final.
        $var[] = 5;

    Arrays Indexados. 
        $miArray = array('Stalyn', 'Alejandro');
        $miArray[] = 'Alcocer';
        echo $miArray[1];  //Alejandro

    Arrays Asociativos.
        $notas = array('David' => 6, 'Joselyn' => 7);
        echo $notas['David'] //6
        $notas['Claudia'] = 8.5; //Añade otra entrada.

Operadores.
    Son los mismos (+, -, *, /, ++, --, &&, and, ||, or, xor ...)

    Comparación:
        (==)   Si son iguales en valor.
        (===)  Si tiene la misma referencia. 
        (!=)   Si son diferentes en valor.
        (!===) Si son diferente sen referencia.



Estructuras de Control.
    _____________________________________________________

    if($expresion){
        ...
    }elseif($expresion){
        ...
    }else{
        ...
    }
    _____________________________________________________
    _____________________________________________________

    switch($expresion)
    {
        case $valor1: ...
        break;
        case $valor2: ...
        break;
        default: ...
    }
    _____________________________________________________
    _____________________________________________________

    while($expresion){
        ...
    }
    _____________________________________________________
    _____________________________________________________

    for($i = 0 ; $i < $MAX ; $i++){
        ...
    }
    _____________________________________________________
    _____________________________________________________

    $miArray = array(1, 2, 3, 4);

    foreach($miArray as $valor){
        echo $valor;
    }

    $notas = array('David' => 1, 'Joselyn' => 2);

    foreach( $notas as $clave => $valor ){
        echo "$clave tiene $valor";
    }
    _____________________________________________________


Funciones.
    _____________________________________________________
    _____________________________________________________
        function suma($num1, $num2){
            return $num1 + $num2;
        }

        echo suma(1, 2);  //3
    _____________________________________________________
    _____________________________________________________
    Parámetros con valor por defecto.

        function f1( $x = "David" ){
            echo "Hola $x";
        }

        f1();           //"Hola David"
        f1("Stalyn")    //"Hola Stalyn"
    _____________________________________________________
    _____________________________________________________
    Parámetros por referencia con &.

        function f2( &$x){
            $x++;
        }

        $var = 1;
        f2($var);
        echo $var; //2
    _____________________________________________________
    Funciones predefinidas útiles.

    echo            //Imprime contendio
    print

    var_dump($var);  //Información de una variable
    print_r($var);

    isset($var);     //Determina si una var existe y tiene valor

    strlen($cadena); //Longitud de una cadena. String.

    count($lista);   //Núm. de elementos de un array.

    in_array($var, $arr);  //Devuelve true si se encuentra el valor
                        //de la variable en el array.
    _____________________________________________________


Clases.
    _____________________________________________________

        class Persona{

            private $nombre;

            //Constructor
            function __construct( $nombre, $edad = 0 ){
                $this->nombre = $nombre;
                $this->edad = $edad;
            }

            public function setNombre( $nombre ){
                $this->nombre = $nombre;
            }

            public function getNombre(){
                return $this->nombre;
            }

            public function toString(){
                echo $this->nombre . ' : ' . $this->edad . 'años';
                echo "$this->nombre : $this->edad años";
            }

        }
    _____________________________________________________

    _____________________________________________________

        $juan = new Persona();
        $juan->setNombre('Juan');
        echo $juan->getNombre();  //Juan
    _____________________________________________________

Herencia
    _____________________________________________________

            class Empleado extends Persona{
                
                private $empresa;

                function __construct( &nombre, $edad, $empresa ){

                    parent::__construct( $nombre, $edad );
                    $this->empresa = $empresa;

                }

            }
    _____________________________________________________
    _____________________________________________________

    $personas = array(
        new Persona("Stalyn", 22);
        new Empleado("David", 16, "UA");
    );
    _____________________________________________________



Interfaces
    _____________________________________________________

        interface IPrintable{
            public function print();
        }
    _____________________________________________________
    _____________________________________________________

        class Documento implements IPrintable{

            private $contenido;
            
            function __construct( $contenido ){
                $this->contentido = $contenido;
            }

            public function print(){
                echo $this->contendio;
            }

        }
    _____________________________________________________


Espacio de nombres

_____________________________________________________

        namespace es/dominio/miaplicacion;
_____________________________________________________

Se usan para usar funciones o clases definidas en otro
espacio de nombres. Es necesario incluir el archivo con
las definiciones require() o require_once();
_____________________________________________________

        require_once("util.php");
        es\dominio\Util\saluda("Juan");
_____________________________________________________

Se pueden asignar alias a los paquetes con use.
_____________________________________________________

        use es\dominio\Util as U;
        require_once("util.php");

        U\saluda("Juan");

        $var = new U\function();
_____________________________________________________

Si no se especifica con alias, use utiliza el último 
elemento del espacio de nombres.
_____________________________________________________

        use es\dominio\Util;
        require_once("util.php");

        Util/saluda("Juan");
_____________________________________________________

Se pueden importar class o funciones. En este caso se 
utilizan sin utilizar prefijo.
_____________________________________________________

        use es\dominio\Util\Log     //Importar classe Log
        
        use function es\dom\util\saluda   //Importar función saluda

        require_once("util.php");

        saluda("Juan");

        $var = new Log();
_____________________________________________________


























 */