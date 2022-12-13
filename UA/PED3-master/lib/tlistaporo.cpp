#include "tlistaporo.h"

//---------------TListaNodo---------------------------------------------
//Constructor
TListaNodo::TListaNodo():e(), anterior(NULL), siguiente(NULL){}
//Constructor de copia
TListaNodo::TListaNodo(const TListaNodo &listaNodo){
  copiarObjeto(listaNodo);
}
//Destructor
TListaNodo::~TListaNodo(){
  /*delete[] anterior;
  delete[] siguiente;*/
  siguiente = NULL;
  anterior = NULL;
}
//Sobrecarga del operador de asignación.
TListaNodo & TListaNodo::operator = (const TListaNodo &listaNodo){
  if( this == &listaNodo) return *this;
  else
    (*this).~TListaNodo();
    copiarObjeto(listaNodo);
    return *this;
}
//Función propia
void TListaNodo::copiarObjeto(const TListaNodo &listaNodo){
  delete[]anterior;
  delete[]siguiente;
  this->e = listaNodo.e;
  this->anterior = listaNodo.anterior;
  this->siguiente = listaNodo.siguiente;
}
//----------------------------------------------------------------------

//---------------TListaPosicion-----------------------------------------
//Constructor.
TListaPosicion::TListaPosicion():pos(NULL){}

//Constructor de copia.
TListaPosicion::TListaPosicion(const TListaPosicion &listaPosicion){
  this->pos = NULL;
  this->pos = listaPosicion.pos;
}

//Destructor.
TListaPosicion::~TListaPosicion(){
  //delete[] pos;
  this->pos = NULL;
}

//Sobrecarga de operador de asignación.
TListaPosicion & TListaPosicion::operator = (const TListaPosicion &listaPosicion){
  if(*this == listaPosicion) return *this;
  else
    (*this).~TListaPosicion();
    this->pos = listaPosicion.pos;
    return *this;
}
//Métodos
//Dos posiciones son iguales si apuntan a la misma posición de la lista.
bool TListaPosicion::operator == (const TListaPosicion &listaPosicion)const{
  if(this->pos == listaPosicion.pos) return true;
  else return false;
}

//Devuleve la posición anterior
TListaPosicion TListaPosicion::Anterior()const{

  TListaPosicion listaPos;
  listaPos.pos = pos->anterior;

  return listaPos;

}

//Devuleve la posición siguiente
TListaPosicion TListaPosicion::Siguiente()const{
  TListaPosicion listaPos;
  listaPos.pos = pos->siguiente;
  return listaPos;
}

//Devuelve TRUE si la posición no apunta a una lista, FALSE en caso contrario.
bool TListaPosicion::EsVacia()const{
  if(this->pos == NULL){
    return true;
  }
  return false;
}
//----------------------------------------------------------------------


//---------------TListaPoro---------------------------------------------
//Constructor
TListaPoro::TListaPoro():primero(NULL), ultimo(NULL){}
//Constructor de copia
TListaPoro::TListaPoro(const TListaPoro &listaPoro){
  primero = ultimo = NULL;

  TListaPosicion listapos = listaPoro.Primera();
  for(int i = 0 ; i < listaPoro.Longitud(); i++){
    Insertar(listapos.pos->e);
    listapos = listapos.Siguiente();
  }
}

//Destructor
TListaPoro::~TListaPoro(){
  while(!Primera().EsVacia()) {
		TListaPosicion aux = Primera();
		Borrar(aux);
	}
}

//Sobrecarga del operador asignación
TListaPoro & TListaPoro::operator = (const TListaPoro &listaPoro){
  primero = ultimo = NULL;

  TListaPosicion listapos = listaPoro.Primera();
  for(int i = 0 ; i < listaPoro.Longitud(); i++){
    (*this).Insertar(listapos.pos->e);
    listapos = listapos.Siguiente();
  }

  return *this;
}

//Métdodo
bool TListaPoro::operator == (const TListaPoro &listaPoro){
  TListaPosicion iPos = listaPoro.Primera();
  TListaPosicion jPos = this->Primera();

  bool equals = true;

  if(this->Longitud() != listaPoro.Longitud()) return false;
  
  for(int i = 0 ; i < Longitud()  ; i++){
    if(iPos.pos->e != jPos.pos->e) return false;
  
    iPos = iPos.Siguiente();
    jPos = jPos.Siguiente();
  }

  return true;
}

/*El operador suma une los elementos de dos listas en una nueva lista (ordenada y sin repetidos).

El operador resta devuelve una lista nueva que contiene los elementos de la primera lista (operando
de la izquierda) que NO existen en la segunda lista (operando de la derecha).*/
TListaPoro TListaPoro::operator + (const TListaPoro &listaPoro){

  TListaPoro newLista;
  TListaPosicion listaUno, listaDos;
  listaUno = Primera();
  listaDos = listaPoro.Primera();


  for(int i = 0 ; i < Longitud() ; i++){
    newLista.Insertar(listaUno.pos->e);
    listaUno = listaUno.Siguiente();
  }

  for(int j = 0 ; j < listaPoro.Longitud(); j++){
    newLista.Insertar(listaDos.pos->e);
    listaDos =  listaDos.Siguiente();
  }

  return newLista;

}

/*El operador resta devuelve una lista nueva que contiene los elementos de
la primera lista (operandode la izquierda) que NO existen en la segunda lista
 (operando de la derecha).*/
TListaPoro TListaPoro::operator - (const TListaPoro &listaPoro){
  TListaPoro newLista;
  TListaPosicion listaUno, listaDos;
  listaUno = Primera();

  for(int i = 0 ; i < Longitud() ; i++){

    listaDos = listaPoro.Primera();
    bool found = false;

    for(int j = 0 ; j < listaPoro.Longitud(); j++){
      if(listaUno.pos->e == listaDos.pos->e) found = true;
      
      listaDos = listaDos.Siguiente();
    }

    if(found == false) newLista.Insertar(listaUno.pos->e);
    
    listaUno = listaUno.Siguiente();
  }

  return newLista;
}

bool TListaPoro::EsVacia() const {
  bool vacia = (this->primero == NULL && this->ultimo == NULL) ?  true : false;
  return vacia;
}


bool TListaPoro::Insertar(const TPoro &poro){
  //Mientras la lista no esté vacía.
  bool inserted = false;

  if(EsVacia()){

      InsertarVacio(poro);
      return true;
  }else{

    if(Buscar(poro)){
      //Si el poro ya existe no lo volvemos a insertar.
      return false;
    }
    //TListaPosicion listaPos = Ultima();
    if(Longitud() == 1){
        TListaPosicion posPrimera = Primera();

        if(poro.Volumen() >= posPrimera.pos->e.Volumen()){
          InsertarUltimo(poro);
          return true;
        }else{
          InsertarPrimero(poro);
          return true;
        }
    }

    TListaPosicion posPrimera = Primera();

    if(poro.Volumen() < posPrimera.pos->e.Volumen()){
      InsertarPrimero(poro);
      return true;
    }



    TPoro auxPoro = Ultima().pos->e;
    if(poro.Volumen() >= auxPoro.Volumen()){
      InsertarUltimo(poro);
      return true;
    }else{

      for(TListaPosicion i = Primera(); !i.EsVacia(); i = i.Siguiente()){
        if(i.pos->e.Volumen() > poro.Volumen()){
          InsertarMedio(poro, i);
          return true;
        }
      }
      return false;
    }
  }

}

void TListaPoro::InsertarVacio(const TPoro &poro){
  TListaNodo *nodoNuevo = new TListaNodo();
  nodoNuevo->e = poro;
  nodoNuevo->anterior = NULL;
  nodoNuevo->siguiente = NULL;
  primero = nodoNuevo;
  ultimo = nodoNuevo;
}

void TListaPoro::InsertarPrimero(const TPoro &poro){
  TListaNodo *nodoPrimero = new TListaNodo();
  nodoPrimero->e = poro;
  nodoPrimero->anterior = NULL;
  nodoPrimero->siguiente = primero;
  primero->anterior = nodoPrimero;
  primero = nodoPrimero;
}

void TListaPoro::InsertarUltimo(const TPoro &poro){
  TListaNodo *nodoUltimo = new TListaNodo();
  nodoUltimo->e = poro;
  nodoUltimo->anterior = ultimo;
  nodoUltimo->siguiente = NULL;
  ultimo->siguiente = nodoUltimo;
  ultimo = nodoUltimo;
}

void TListaPoro::InsertarMedio(const TPoro &poro, const TListaPosicion &listaPosicion){
  TListaNodo *nodoMedio = new TListaNodo();
  nodoMedio->e = poro;
  TListaPosicion posAnterior = listaPosicion.Anterior();
  posAnterior.pos->siguiente = nodoMedio;
  listaPosicion.pos->anterior = nodoMedio;
  nodoMedio->anterior = posAnterior.pos;
  nodoMedio->siguiente = listaPosicion.pos;
}


bool TListaPoro::Borrar(const TPoro &poro){
  if(!Buscar(poro)){
    //Si el poro no esta, no se puede borrar.
    return false;
  }
  //El código llega aquí por que si que está el poro.
  TListaPosicion listaPos = Primera();
  for(int i = 0 ; i < Longitud() ; i++){

    if(listaPos.pos->e == poro){
      Borrar(listaPos);
      return true;
    }

    listaPos = listaPos.Siguiente();
  }
return false;
}


bool TListaPoro::Borrar(const TListaPosicion &listaPosicion){
  if(listaPosicion.EsVacia()){
    //La posición es vacía.
    return false;
  }
  TListaPosicion lPrimera = Primera();
  TListaPosicion lUltima = Ultima();
  if( Longitud() == 1 && listaPosicion.pos->e == lPrimera.pos->e){
    BorrarUnico();
    return true;
  }
  else if(listaPosicion.pos->e == lPrimera.pos->e){
    BorrarPrimero(listaPosicion);
    return true;
  }else if(listaPosicion.pos->e == lUltima.pos->e){
    BorrarUltimo(listaPosicion);
    return true;
  }else{
    BorrarMedio(listaPosicion);
    return true;
  }
return false;


}

void TListaPoro::BorrarUnico(){
  primero = ultimo = NULL;
}


void TListaPoro::BorrarPrimero(const TListaPosicion &listaPosicion){
    TListaPosicion nuevaPrimera = Primera();
    nuevaPrimera = nuevaPrimera.Siguiente();
    primero = nuevaPrimera.pos;
    nuevaPrimera.pos->anterior = NULL;
    listaPosicion.pos->siguiente = NULL;
    listaPosicion.pos->anterior = NULL;
}

void TListaPoro::BorrarUltimo(const TListaPosicion &listaPosicion){
  TListaPosicion nuevaUltima = Ultima();
  nuevaUltima = nuevaUltima.Anterior();
  ultimo = nuevaUltima.pos;
  nuevaUltima.pos->siguiente = NULL;
  listaPosicion.pos-> siguiente = NULL;
  listaPosicion.pos-> anterior = NULL;
}

void TListaPoro::BorrarMedio(const TListaPosicion &listaPosicion){
  TListaPosicion posAnterior = listaPosicion.Anterior();
  TListaPosicion posSiguiente = listaPosicion.Siguiente();
  posAnterior.pos->siguiente = posSiguiente.pos;
  posSiguiente.pos->anterior = posAnterior.pos;
}


TPoro TListaPoro::Obtener(const TListaPosicion &listaPos) const{
  TPoro poro;
  TListaPosicion listaPosicion = Primera();
  for(int i = 1; i <= Longitud() ; i++){
    if(listaPosicion == listaPos){
      return listaPosicion.pos->e;
    }
    if(listaPosicion.EsVacia()){
       break;
    }
    listaPosicion = listaPosicion.Siguiente();
  }
return poro;
}


bool TListaPoro::Buscar(const TPoro &poro) const{
  TListaPosicion listaPosicion = Primera();
  for(int i = 1; i <= Longitud() ; i++){
    if(listaPosicion.pos->e == poro){
      return true;
    }
    if(listaPosicion.EsVacia()){
      return false;
    }
    listaPosicion = listaPosicion.Siguiente();
  }
  return false;
}

int TListaPoro::Longitud()const{
  int cont = 0;
  TListaPosicion listaPosicion = Primera();
    while(!listaPosicion.EsVacia()){
      cont++;
      listaPosicion = listaPosicion.Siguiente();
    }
  return cont;

}

TListaPosicion TListaPoro::Primera() const{
  TListaPosicion listaPosicion;
  listaPosicion.pos = this->primero;
  return listaPosicion;
}

TListaPosicion TListaPoro::Ultima() const{
  TListaPosicion listaPosicion;
  listaPosicion.pos = this->ultimo;
  return listaPosicion;
}

/*Devuelve una lista con los elementos TPoro comprendidos entre las posiciones n1 y n2 (ambas
incluidas) de la lista que invoca a la función. Los nodos comprendidos entre n1 y n2 (ambos incluidos)
deben borrarse de la lista que invoca a la función.
Cosas a tener en cuenta :

Se comienza a numerar las posiciones de la lista a partir de 1.
Si n2 sobrepasa la longitud de la lista invocante “por exceso” : se seleccionan sólo los
elementos contenidos entre n1 y la longitud de la lista.
Si n1 es menor o igual a 0: se seleccionan sólo los elementos contenidos entre la posición 1
de la lista y n2 .
Si n1 = n2 : devolverá una lista con 1 sólo elemento, extrayéndolo de la lista llamante.
Si n1 > n2 : devolverá una lista VACÍA sin modificar a la llamante, pues los límites no engloban
elemento alguno.
*/
TListaPoro TListaPoro::ExtraerRango(int n1, int n2){
  //L1 = < 1 4 5 6 7 8 >
  // L2 = L1.ExtraerRango(2, 4);

  //L1 = <>

  TListaPoro nuevaLista;

  int cont = 1;

  if(n1 <= 0){
    n1 = 1;
  }
  if(n2 > Longitud()){
    n2 = Longitud();
  }


  TListaPoro listaPoro(*this);

  for(TListaPosicion i = listaPoro.Primera(); !i.EsVacia() ; i = i.Siguiente()){
    if(cont >= n1 && cont<=n2){
      //cout << i.pos->e.Color() << "  // " ;
      nuevaLista.Insertar(i.pos->e);

      Borrar(i.pos->e);
    }
    cont++;
  }



  return nuevaLista;

}


ostream & operator<<(ostream & os, const TListaPoro & lista) {
  os << "(";
  TListaPosicion j = lista.Primera();
  for(int i = 1 ; i <= lista.Longitud() ; i++ ){
    os << lista.Obtener(j);
    if( i == lista.Longitud()){
      os << "";
    }else{
      os << " ";
    }
    j = j.Siguiente();
  }
	os << ")";
return os;

}

//---------------------------------------------------------------------
/*
<<Aclaraciones TListaPosicion>>

  2.Sí que hay que comprobar (en concreto, para las operaciones Insertar, Borrar y Obtener
propias de TListaPoro), que el objeto TListaPosicion no es vacío.

  3.En "Anterior()" y "Siguiente()", si la posición actual es la primera o la última de la
lista, se tiene que devolver una posición vacía.

  5.En el operador igualdad, dos posiciones son iguales si apuntan a la misma posición de
  la lista.

<<Aclaraciones TListaPoro>>
  1.Se permite AMISTAD entre las clases TListaPosicion, TListaPoro y TListaNodo.

  2.La lista NO puede contener elementos repetidos. Si contiene un elemento TPoro vacío,
  NO podrá haber otro igual.

  3.La lista está ordenada de menor a mayor, de acuerdo al VOLUMEN del objeto TPoro que
  contiene  el nodo.

  4.El constructor por defecto crea una lista vacía.

  5.El constructor de copia tiene que realizar una copia exacta.

  6.El destructor tiene que liberar toda la memoria que ocupa la lista.

  7.Operador asignación, si se asigna una lista no vacía, se destruye la lista inicial. La
  asignación tiene que realizar una copia exacta.

  8.El operador suma une los elementos de dos listas en una nueva lista (ordenada y sin repetidos).
  9.El operador resta devuleve una lista nueva que contiene los elementos de la primera lista
  (operando de la izquierda) que NO exiten en la segunda lista (operando de la derecha).
  10.En INSERTAR, el nuevo elemento se inserta en la posición adecuada para que siga siendo
     una lista ordenada. En caso de que el elemento a insertar contenga un VOLUMEN igual a uno ya existente
     en la lista, el nuevo nodo se insertará DESPUÉS al que ya existía.
     Esta regla se seguirá cumpliendo a medida que se puedan insertar TPoros con igual VOLUMEN.
     Devuelve TRUE si el elemento se puede insertar y FALSE en caso contrario (por ejemplo,
     porque ya exista en la lista)
  11.En BORRAR, devuleve TRUE si el elemento se puede borrar y FALSE en caso contrario (porque el elemento
     no existe en la lista)
  12.En BORRAR, el paso por referencia es obligatorio, ya que una vez eliminado el elemnto la
    posición tiene que pasa a estar vacía (no asignada a ninguna lista).  Además, devuleve TRUE si el
    elemento se puede borrar y FALSE en caso contrario(porque la posición sea vacía).
  13.En OBTENER, si la posición está vacía se tiene que devolver un objeto TPoro vacío.
  14.LONGITUD devuleve el número de elementos que hay en la lista ("vacios" o "no vacíos")
  15.En PRIMERA y ULTIMA, si la lista está vacía se tiene que devolver una posición vacía.


  16.El OPERADOR SALIDA muestra el contenido de la lista desde la cabeza hasta el final de la lista.

Todo el contenido de la lista se muestra entre paréntesis “( )”.
Entre el paréntesis de apertura y el primer elemento y entre el último elemento y el paréntesis de cierre
NO tienen que aparecer espacios en blanco.
Cada elemento se tiene que separar del siguiente por un espacio en blanco (a continuación
del último elemento no se tiene que generar un espacio en blanco).
NO se tiene que generar un salto de línea al final.
Si la lista está vacía, se tiene que mostrar la cadena “()”
Ejemplo de operador salida:
TPoro p1(1,1,1);
TListaPoro l1;
l1.Insertar (p1);
cout << l1 ;

(La salida sería ) :

((1, 1) 1.00 -)

  17.EXTRAER RANGO.
  Devuelve una lista con los elementos TPoro comprendidos entre las posiciones n1 y n2 (ambas
incluidas) de la lista que invoca a la función. Los nodos comprendidos entre n1 y n2 (ambos incluidos)
deben borrarse de la lista que invoca a la función.
Cosas a tener en cuenta :

  Se comienza a numerar las posiciones de la lista a partir de 1.
  Si n2 sobrepasa la longitud de la lista invocante “por exceso” : se seleccionan sólo los
elementos contenidos entre n1 y la longitud de la lista.
  Si n1 es menor o igual a 0: se seleccionan sólo los elementos contenidos entre la posición 1
de la lista y n2 .
  Si n1 = n2 : devolverá una lista con 1 sólo elemento, extrayéndolo de la lista llamante.
  Si n1 > n2 : devolverá una lista VACÍA sin modificar a la llamante, pues los límites no engloban
elemento alguno.

Ejemplo (el ejemplo está hecho con números naturales por simplificación) :
Listas iniciales :
L1=<1 4 6 7 8>
L2=<>
Llamada a la función :
L2=L1.ExtraerRango(2,4)
Listas finales después de ejecutar la función :
L1=<1 8>
L2=<4 6 7>

*/
