//STALYN ALEJANDRO ALCOCER VALENCIA DNI: 20947870E
#include "tabbporo.h"
/*....................TNodoABB...............................*/
//Constructor
TNodoABB::TNodoABB():item(), iz(), de(){}

//Constructor de copia
TNodoABB::TNodoABB(const TNodoABB &nodoAbb){
	item = nodoAbb.item;
	iz = nodoAbb.iz;
	de = nodoAbb.de;
}

//Destructor
TNodoABB::~TNodoABB(){
	this->item = TPoro();
	this->iz = TABBPoro();
	this->de = TABBPoro();
}

//Sobrecarga del operador de asignación
TNodoABB & TNodoABB::operator = ( const TNodoABB &nodoAbb){
	if( this == &nodoAbb) return *this;
	else{
		(*this).~TNodoABB();
		this->item = TPoro(nodoAbb.item);
		this->iz = nodoAbb.iz;
		this->de = nodoAbb.de;
		return *this;
	}
}
/*...........................................................*/

/*....................TABBPoro...............................*/
//Constructor
TABBPoro::TABBPoro(){
	this->nodo = NULL;
}

//Constructor de copia
TABBPoro::TABBPoro(const TABBPoro &abbPoro){
	if(this == &abbPoro){
		(*this).~TABBPoro();
	}
	if(!abbPoro.EsVacio())this->nodo = new TNodoABB(*abbPoro.nodo);
}

//Destructor
TABBPoro::~TABBPoro(){
	if(this->nodo != NULL){
		delete nodo;
		this->nodo = NULL;
	}
	this->nodo = NULL;
}

//Sobrecarga del operador asignación
TABBPoro & TABBPoro::operator = (const TABBPoro &abbPoro){
	if(this == &abbPoro) return *this;
	else{
		(*this).~TABBPoro();
		if(!abbPoro.EsVacio())this->nodo = new TNodoABB(*abbPoro.nodo);
		return *this;
	}
}

//Sobrecarga del operador igualdad.
/* 8.En el operador '==', dos árboles son iguales si poseen los mismos elementos
independientemente de la esturctura interna del árbol (No se exige que la
estructura de ambos sea la misma).*/
bool TABBPoro::operator == (const TABBPoro &abbPoro){
	bool iguales = ((*this).Nodos() == abbPoro.Nodos()) ? true : false;
	//Recorrer los dos árboles
	if(iguales){
		TVectorPoro v1, v2;
		v1 = abbPoro.Inorden();
		v2 = (*this).Inorden();
		for(int i = 1; i <= v1.Longitud() && iguales; i++){
			iguales = false;
			for(int j = 1; j <= v2.Longitud(); j++){
				if( v1[i] == v2[j]){
					iguales = true;
				}
			}
		}
	}
	return iguales;
}

//Devuelve TRUE si el arbol está vacío
bool TABBPoro::EsVacio()const{
	if(this->nodo == NULL) return true;
	return false;
}

//Inserta el elemento en el árbol
bool TABBPoro::Insertar(const TPoro &poro){
	if((*this).EsVacio()){
		TNodoABB *abbNodo = new TNodoABB();
		abbNodo->item = poro;
		this->nodo = abbNodo;
		return true;
	}else{
		if((*this).nodo->item.Volumen() != poro.Volumen()){
			if(poro.Volumen() < this->nodo->item.Volumen()){
				return this->nodo->iz.Insertar(poro);
			}else{
				return this->nodo->de.Insertar(poro);
			}
		}
		return false;
	}
}

//Borra el elemento del árbol. Mayor de la IZQUIERDA.
bool TABBPoro::Borrar(const TPoro &poro){
	if( !Buscar(poro) ) return false;
	if( (*this).Raiz() == poro ){
		if((*this).Nodos() == 1 && (*this).NodosHoja()  == 1){
			(*this).~TABBPoro();
			return true;
		}
		if( (!(*this).nodo->de.EsVacio() && (*this).nodo->iz.EsVacio())
	 		 || ((*this).nodo->de.EsVacio() && !(*this).nodo->iz.EsVacio()) ){

			TABBPoro *auxAbb = new TABBPoro();
			if(!(*this).nodo->iz.EsVacio())	*auxAbb = (*this).nodo->iz;
			if(!(*this).nodo->de.EsVacio())	*auxAbb = (*this).nodo->de;
			(*this).nodo = auxAbb->nodo;
			return true;
		}
		else{
			//Puntero Auxiliar
			TABBPoro *auxAbb;
			//El puntero auxiliar apunta al dirección de memoria, de la izquierda del abb.
			auxAbb = &((*this).nodo->iz);
			//Apuntando a dirección de memoria, busco el árbol que está mas a la derecha.
			while( !(*auxAbb).nodo->de.EsVacio() ) auxAbb = &((*auxAbb).nodo->de);
			//Asigno el item el item que va a ser suistituido.
			(*this).nodo->item = (*auxAbb).nodo->item;
			//LLamo al destructor del árbol. Del árbol sustituido. Más grande de la izquierda.
			if( (*auxAbb).Nodos() == 1 ){
				//No tiene hijos.
				(*auxAbb).~TABBPoro();
			}else{
				//Tiene hijos. LLamada recursiva.
				(*auxAbb).Borrar((*auxAbb).nodo->item);
			}
			return true;
		}
	}
	if(!(*this).nodo->de.EsVacio()&&(*this).nodo->de.Buscar(poro)) return (*this).nodo->de.Borrar(poro);
	if(!(*this).nodo->iz.EsVacio()&&(*this).nodo->iz.Buscar(poro)) return (*this).nodo->iz.Borrar(poro);
	return false;
}
//Devuelve TRUE  si el elemento está en el árbol
bool TABBPoro::Buscar(const TPoro &poro){
	if(this->nodo == NULL) return false;
	if((*this).Raiz() == poro) return true;

	if(poro.Volumen() < (*this).nodo->item.Volumen()) return (*this).nodo->iz.Buscar(poro);
	else return (*this).nodo->de.Buscar(poro);
}
//Devuelve el elemento en la raíz del árbol
TPoro TABBPoro::Raiz()const{
	TPoro poro;
	if(!(*this).EsVacio()) poro = nodo->item;
	return poro;
}
//Devuelve la altura del árbol (la altura de un árbol vacío es 0)
int TABBPoro::Altura()const{
	int i = 0;
	if(!(*this).EsVacio()){
		i = 1;
		if((*this).nodo->iz.Altura() > (*this).nodo->de.Altura()){
			i += (*this).nodo->iz.Altura();
		}else{
			i += (*this).nodo->de.Altura();
		}
	}
	return i;
}
//Devuelve el número de nodos del árbol(un árbol vacío posee 0 nodos)
int TABBPoro::Nodos()const{
	int i = 0;
	if(!(*this).EsVacio()){
		i++;
		if((*this).nodo->iz.EsVacio() && (*this).nodo->de.EsVacio()) return i;
		else{
			i += (*this).nodo->iz.Nodos() + (*this).nodo->de.Nodos();
			return i;
		}
	}
	return i;
}
//Devuelve el número de nodos hoja en el árbol (la raiz puede ser un nodo hoja)
int TABBPoro::NodosHoja()const{
	int i = 0;
	if(!(*this).EsVacio()){
		if((*this).nodo->iz.EsVacio() && (*this).nodo->de.EsVacio()) return 1;
		else return ((*this).nodo->iz.NodosHoja() + (*this).nodo->de.NodosHoja());
	}
	return i;
}
/*12.Los 4 recorridos devuelven un vector(TVectorPoro) en el que todas las posiciones
están ocupadas por los elementos del árbol(no pueden quedar posiciones sin asignar).
Si el árbol está vacío, se devuelve un vector vacío(vector de dimensión 0).*/
/*.........................RECORRIDO - INORDEN.............................*/
TVectorPoro TABBPoro::Inorden()const{
	//Posición en el vector que almacena el recorrido
	int pos = 1;
	//Vector del tamaño adecuado para almacenar todos los nodos
	TVectorPoro v((*this).Nodos());
	InordenAux(v, pos);
	return v;
}
void TABBPoro::InordenAux(TVectorPoro &v, int &pos)const{
	if( !(*this).EsVacio() ){
		(*this).nodo->iz.InordenAux(v, pos);
		v[pos++] = (*this).Raiz();
		(*this).nodo->de.InordenAux(v, pos);
	}
}
/*.........................RECORRIDO - PREORDEN.............................*/
TVectorPoro TABBPoro::Preorden()const{
	int pos = 1;
	TVectorPoro v((*this).Nodos());
	PreordenAux(v, pos);
	return v;
}
void TABBPoro::PreordenAux(TVectorPoro &v, int &pos)const{
	if( !(*this).EsVacio() ){
		v[pos++] = (*this).Raiz();
		(*this).nodo->iz.PreordenAux(v, pos);
		(*this).nodo->de.PreordenAux(v, pos);
	}
}
/*.........................RECORRIDO - POSTORDEN............................*/
TVectorPoro TABBPoro::Postorden()const{
	int pos = 1;
	TVectorPoro v((*this).Nodos());
	PostordenAux(v, pos);
	return v;
}
void TABBPoro::PostordenAux(TVectorPoro &v, int &pos)const{
	if( !(*this).EsVacio() ){
		(*this).nodo->iz.PostordenAux(v, pos);
		(*this).nodo->de.PostordenAux(v, pos);
		v[pos++] = (*this).Raiz();
	}
}
//Suma de dos ABB
/*15.En el operador '+' primero se tiene que sacar una copia del operando(árbol) de la
izquierda y a continuación insertar los elementos del operando(árbol) de la derecha
según su recorrido por INORDEN.
*/
TABBPoro TABBPoro::operator + (const TABBPoro &abbPoro){
	TABBPoro abb(abbPoro);
	TVectorPoro v;
	v = abb.Inorden();
	for(int i = 1; i <= v.Longitud(); i++) (*this).Insertar(v[i]);
	abb.~TABBPoro();
	return *this;
}

//Resta de dos ABB
/*
16.En el operador '-' se recorre el operando(árbol) de la izquierda por INORDEN y si
el elemento NO está en el operando(árbol) de la derecha, se inserta en el árbol resultante
(incialmente vacío) y el proceso se repite para todos los elementos del operando de la
izquierda.*/
TABBPoro TABBPoro::operator - (const TABBPoro &abbPoro){
	TABBPoro auxAbb;
	TVectorPoro v;
	if(!abbPoro.EsVacio()){
		v = abbPoro.Inorden();
		for(int i = 1; i <= v.Longitud(); i++){
			if( !((*this).Buscar(v[i])) ){
				auxAbb.Insertar(v[i]);
			}
		}
	}
	(*this).~TABBPoro();
	return auxAbb;
}

//Sobrecarga del operador de salida <<
/*13.El operador SALIDA muestra el recorrido por NIVELES del ABB, con el formato
pedido en el CUADERNILLO 1 para la clase TVectorPoro.*/
ostream & operator << (ostream &os,const TABBPoro &abb){
	abb.Imprimir(os);
	return os;
}

void TABBPoro::Imprimir(ostream &os)const{
	int i = 1;
	queue<TABBPoro> cola;
	TABBPoro *auxAbb = new TABBPoro((*this));
	cola.push(*auxAbb);
	os << "[";
	while(!cola.empty()){
		*auxAbb = cola.front();
		if((*this).Raiz() != auxAbb->Raiz()) os << " ";
		os << i << " " << auxAbb->Raiz();
		i++;
		cola.pop();
		if(!(auxAbb->nodo->iz.EsVacio())) cola.push(auxAbb->nodo->iz);
		if(!(auxAbb->nodo->de.EsVacio())) cola.push(auxAbb->nodo->de);
	}
	os << "]";
}


/*...........................................................*/
/*
	ACLARACIONES
1. Se permite amistad entre las clases TABBPoro y TNodoABB.

2. La forma de emplear los métodos AUXILIARES para las ordenaciones,
es, por ejemplo, para el caso en INORDEN:

	//Devuelve el recorrido en inorden
	TVectorPoro TABBPoro::Inorden(){

		//Posición en el vector que almacena el recorrido
		int posicion = 1;

		//Vector del tamaño adecuado para almacenar todos los nodos
		TVectorPoro v(Nodos());
		InordenAux(v, posicion);
		return v;
	}

	De este modo se reduce el coste de crear múltiples objetos de tipo
	TVectorPoro, ya que solo se emplea uno durante el cálculo del recorrido.

3.Los TPoro en el árbol están ordenados en función del volumen.

4.Para simplificar los algoritmos, el árbol NO puede contener elementos
con el mismo volumen. Por tanto, solo se podrá insertar 1 TPoro vacío, al no
poder repetirse el volumen en el árbol.

5.El Consturctor de Copia tiene que realizar una copia exacta duplicando
todos los nodos del árbol.

6.El Destructor tiene que liberar toda la memoria que ocupe el árbol.

7.Si se asigna un árbol a un árbol no vacío, se destruye el árbol incial.
La Asignación tiene que realizar una copia exacta duplicando todos los nodos
del árbol.

8.En el operador '==', dos árboles son iguales si poseen los mismos elementos
independientemente de la esturctura interna del árbol (No se exige que la
estructura de ambos sea la misma).

9.Insertar devuelve TRUE si el elemento se puede insertar y FALSE en caso
contrario (por ejemplo, porque el elemento a insertar ya existe en el árbol)

10.Borrar devuelve el TRUE si el elemento se puede borrar y FALSE en caso
contrario (por ejemplo, porque no existe en el árbol). El criterio de borrado
es sustituir por el mayor de la izquierda.

11.Raiz devuelve el TPoro raíz del árbol. Si el árbol está vacío, devuelve un
TPoro vacío.

12.Los 4 recorridos devuelven un vector(TVectorPoro) en el que todas las posiciones
están ocupadas por los elementos del árbol(no pueden quedar posiciones sin asignar).
Si el árbol está vacío, se devuelve un vector vacío(vector de dimensión 0).

13.El operador SALIDA muestra el recorrido por NIVELES del ABB, con el formato
pedido en el CUADERNILLO 1 para la clase TVectorPoro.

14.Para implementar el recorido por NIVELES hace falta utilizar una estructura de tipo
COLA de punteros ABB. Para implementar el uso de la estructura, el alumno puede emplear
elementos que considere oportunos. Algunas opciones son:
	14.1 Estrcuturas "queue" pre-definidas en las STL consultar 'cplusplus/queue' y 'push'
	14.1 Una adaptación de las estructuras TListaPoro para que se comporte como COLA
	de putneros a ABB.

15.En el operador '+' primero se tiene que sacar una copia del operando(árbol) de la
izquierda y a continuación insertar los elementos del operando(árbol) de la derecha
según su recorrido por INORDEN.

16.En el operador '-' se recorre el operando(árbol) de la izquierda por INORDEN y si
el elemento NO está en el operando(árbol) de la derecha, se inserta en el árbol resultante
(incialmente vacío) y el proceso se repite para todos los elementos del operando de la
izquierda.

*/
