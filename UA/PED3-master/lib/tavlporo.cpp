//STALYN ALEJANDRO ALCOCER VALENCIA, DNI:20947870E
#include "tavlporo.h"
#include "math.h"


/*.................................TNODOAVL...........................................*/
//Constructor TNodo
TNodoAVL::TNodoAVL(){

	this->item =  TPoro();
	this->iz = TAVLPoro();
	this->de = TAVLPoro();
	this->fe = 0;
}

//Constructor de copia
TNodoAVL::TNodoAVL(const TNodoAVL &nodo){
	if(this != &nodo){ //Si es diferente llamo al destructor.
		(*this).~TNodoAVL();
		this->item = TPoro(nodo.item);
		this->iz = nodo.iz;
		this->de = nodo.de;
		this->fe = nodo.fe;
	}	
	
}

//Destructor
TNodoAVL::~TNodoAVL(){
	this->item = TPoro();
	this->iz =  TAVLPoro();
	this->de =  TAVLPoro();
	this->fe = 0;
}

//Sobrecarga del operador asignación
TNodoAVL & TNodoAVL::operator = (const TNodoAVL &nodo){
	if(this == &nodo) return *this;
	else{
		(*this).~TNodoAVL();
		this->item = TPoro(nodo.item);
		this->iz = nodo.iz;
		this->de = nodo.de;
		return *this;
	}
}

/*.................................TAVLPORO...........................................*/
//Constructor por defecto
TAVLPoro::TAVLPoro(){
	this->raiz = NULL;
}

//Constructor de copia 
TAVLPoro::TAVLPoro(const TAVLPoro &avl){
	if(this == &avl){
		(*this).~TAVLPoro();

	}
	if(!avl.EsVacio())this->raiz = new TNodoAVL(*avl.raiz);
	else this->raiz = NULL;
}

//Destructor 
TAVLPoro::~TAVLPoro(){
	if(this->raiz != NULL){
		delete raiz;
		this->raiz = NULL;
	}
	this->raiz = NULL;
}

//Sobrecarga del operador de asignación
TAVLPoro & TAVLPoro::operator = (const TAVLPoro &avl){
	if(this == &avl) return *this;
	else{
		(*this).~TAVLPoro();
		if(!avl.EsVacio()) this->raiz = new TNodoAVL(*avl.raiz);
		return *this;
	}
}

//Sobrecarga del operador igualdad
bool TAVLPoro::operator == (const TAVLPoro &avl)const{
	bool iguales = ((*this).Nodos() == avl.Nodos()) ? true : false;
	if(iguales){
		TVectorPoro v1, v2;
		v1 = avl.Inorden();
		v2 = (*this).Inorden();
		for(int i = 0; i <= v1.Longitud() && iguales; i++){
			iguales = false;
			for(int j = 1; j <= v2.Longitud(); j++){
				iguales = true;
			}
		}
	}
	return iguales;
}

//Sobrecarga del operador desigualdad
bool TAVLPoro::operator != (const  TAVLPoro &avl)const{
	return !(*this == avl);
}

//Devuelve TRUE si el árbol está vacío, FALSE en caso contrario
bool TAVLPoro::EsVacio()const{
	if(this->raiz == NULL)return true;
	return false;
}

//Inserta el elemento TPoro en el árbol
bool TAVLPoro::Insertar(const TPoro &poro){
	bool crece = false;
	if(Buscar(poro)) return false;
	else return InsertarAux(poro, crece); 
}

bool TAVLPoro::InsertarAux(const TPoro &poro, bool &crece){
	bool creceIz, creceDe;

	if((*this).EsVacio()){
		TNodoAVL *avlNodo = new TNodoAVL();
		avlNodo->item = poro;
		this->raiz = avlNodo;
		crece = true;

	}else{
		 crece = creceIz = creceDe = false;
		if(poro.Volumen() < this->raiz->item.Volumen() ){
			this->raiz->iz.InsertarAux(poro, creceIz);
			crece = creceIz;
		}else{
			this->raiz->de.InsertarAux(poro, creceDe);
			crece = creceDe;
		}
	}

	if(crece){
		if( ((creceIz) && (this->raiz->fe == 1) )|| 
			((creceDe) && (this->raiz->fe == -1) )){
			crece = false;
			this->raiz->fe = 0;

		}else if( (creceIz) && (this->raiz->fe == 0) ){
			this->raiz->fe = -1;

		}else if( (creceDe) && (this->raiz->fe == 0)){
			this->raiz->fe = 1;

		}else if( (creceIz) && (this->raiz->fe == -1) ){
			(*this).EquilibrarIzquierda();
			crece = false;

		}else if( (creceDe) && (this->raiz->fe == 1) ){
			(*this).EquilibrarDerecha();
			crece = false;
		}
	}
	return true;
}

void TAVLPoro::EquilibrarIzquierda(){
	TAVLPoro *auxJ, *auxK;
	int i = 0;

	if(this->raiz->iz.raiz->fe == -1){ //ROTACIÓN II
		auxJ = new TAVLPoro(this->raiz->iz);
		this->raiz->iz = auxJ->raiz->de;
		auxJ->raiz->de = *this;
		auxJ->raiz->fe = 0;
		auxJ->raiz->de.raiz->fe = 0;
		this->raiz = auxJ->raiz;

	}else{ 							//ROTACIÓN ID

		//cout << "[ID]" << endl;
		auxJ = new TAVLPoro(this->raiz->iz);
		auxK = new TAVLPoro(auxJ->raiz->de);
		i = auxK->raiz->fe;

		this->raiz->iz = auxK->raiz->de;
		auxJ->raiz->de = auxK->raiz->iz;
		auxK->raiz->iz = *auxJ;
		auxK->raiz->de = *this;
		auxK->raiz->de.raiz->fe = 0;

		switch(i){
			case -1:
					auxK->raiz->iz.raiz->fe = 0;
					auxK->raiz->de.raiz->fe = 1;
					break;
			case 1:	
					auxK->raiz->iz.raiz->fe = -1;
					auxK->raiz->de.raiz->fe = 0;

					break;
			case 0:
					auxK->raiz->iz.raiz->fe = 0;
					auxK->raiz->de.raiz->fe = 0;
					break;
		}
		this->raiz = auxK->raiz;
	}
}

void TAVLPoro::EquilibrarDerecha(){
	TAVLPoro *auxJ, *auxK;
	int i = 0;

	if(this->raiz->de.raiz->fe == 1){ //ROTACIÓN DD
		auxJ = new TAVLPoro(this->raiz->de);
		this->raiz->de = auxJ->raiz->iz;
		auxJ->raiz->iz = *this;
		auxJ->raiz->fe = 0;
		auxJ->raiz->iz.raiz->fe = 0;
		this->raiz = auxJ->raiz;

	}else{ 							//ROTACIÓN DI
		auxJ = new TAVLPoro(this->raiz->de);
		auxK = new TAVLPoro(auxJ->raiz->iz);
		i = auxK->raiz->fe;

		this->raiz->de = auxK->raiz->iz;
		auxJ->raiz->iz = auxK->raiz->de;
		auxK->raiz->de = *auxJ;
		auxK->raiz->iz = *this;
		auxK->raiz->iz.raiz->fe = 0;

		switch(i){
			case -1:
					auxK->raiz->de.raiz->fe = 0;
					auxK->raiz->iz.raiz->fe = -1;
					break;
			case 1:	
					auxK->raiz->de.raiz->fe = 1;
					auxK->raiz->iz.raiz->fe = 0;

					break;
			case 0:
					auxK->raiz->de.raiz->fe = 0;
					auxK->raiz->iz.raiz->fe = 0;
					break;
		}
		this->raiz = auxK->raiz;
	}
}



//Devuelve TRUE si el elemento TPoro está en el árbol
bool TAVLPoro::Buscar(const TPoro &poro)const{
	if(this->raiz == NULL) return false;
	if((*this).Raiz() == poro) return true;
	if(poro.Volumen() < (*this).raiz->item.Volumen()) return (*this).raiz->iz.Buscar(poro);
	else return (*this).raiz->de.Buscar(poro);
}

//Borra un elemento TPoro del árbol AVL
bool TAVLPoro::Borrar(const TPoro &poro){
	bool deCrece = false;
	if(!Buscar(poro)) return false;
	else return BorrarAux(poro, deCrece);
}

bool TAVLPoro::BorrarAux(const TPoro &poro, bool &deCrece){	
	bool deCreceDe = false;
	bool deCreceIz = false;
	bool borrar = true;

	if(this->Raiz() == poro){
		if(this->Nodos() == 1 && this->NodosHoja() == 1){ //En un nodo hoja. 
			this->~TAVLPoro();
			deCrece = true;
			
		}else{

			deCreceDe = deCreceIz = deCrece = false;

			if( (!(*this).raiz->de.EsVacio() && (*this).raiz->iz.EsVacio()) //Si te un fill.
	 		 || ((*this).raiz->de.EsVacio() && !(*this).raiz->iz.EsVacio()) ){

				TAVLPoro *auxAbb = new TAVLPoro();
				
				if(!(*this).raiz->iz.EsVacio()){
					*auxAbb = (*this).raiz->iz; //Decrece por la iz.
					deCreceIz = true;
				}
				
				if(!(*this).raiz->de.EsVacio()){

					*auxAbb = (*this).raiz->de;	
					deCreceDe = true;
				}	

				(*this).raiz = auxAbb->raiz;
				deCrece = true;

			}else{
				//Puntero Auxiliar
				TAVLPoro *auxAbb;
				//El puntero auxiliar apunta al dirección de memoria, de la izquierda del abb.
				auxAbb = &((*this).raiz->iz);
				//Apuntando a dirección de memoria, busco el árbol que está mas a la derecha.
				while( !(*auxAbb).raiz->de.EsVacio() ) auxAbb = &((*auxAbb).raiz->de);
				//Asigno el item que va a ser suistituido.
				(*auxAbb).raiz->fe = (*auxAbb).raiz->iz.Altura() - (*this).raiz->de.Altura();
				(*this).raiz->item = (*auxAbb).raiz->item;
				(*this).raiz->fe =  (this->raiz->iz.Altura()) - (this->raiz->de.Altura());
				//LLamo al destructor del árbol. Del árbol sustituido. Más grande de la izquierda.
				if( (*auxAbb).Nodos() == 1 ){
					//No tiene hijos.
					(*auxAbb).~TAVLPoro();
					deCrece = true;

				}else{
					//Tiene hijos. LLamada recursiva.
					(*auxAbb).BorrarAux((*auxAbb).raiz->item, deCreceIz);
					deCrece = deCreceIz;
				}
			}
		}
	}
	
	if(!deCrece){
		if(!(*this).raiz->de.EsVacio()&&(*this).raiz->de.Buscar(poro)){
			(*this).raiz->de.BorrarAux(poro, deCreceDe);
			deCrece = deCreceDe;
		} 
		if(!(*this).raiz->iz.EsVacio()&&(*this).raiz->iz.Buscar(poro)){
			(*this).raiz->iz.BorrarAux(poro, deCreceIz);		
			deCrece = deCreceIz;
		} 
	}

	if(deCrece){
		if( (deCreceIz && this->raiz->fe == -1) 
			|| (deCreceDe && this->raiz->fe == 1) ){
		
			deCrece = false;
			this->raiz->fe = 0;

		}else if( deCreceIz && this->raiz->fe == 0 ){
			this->raiz->fe = 1;
		
		}else if( deCreceDe && this->raiz->fe == 0 ){
			this->raiz->fe = -1;
		
		}else if( deCreceDe && this->raiz->fe == -1 ){
			this->EquilibrarIzquierdaBorrar(deCrece);
		
		}else if( deCreceIz && this->raiz->fe == 1 ){
			this->EquilibrarDerechaBorrar(deCrece);
	
		}
	}
	return borrar;
}

void TAVLPoro::EquilibrarIzquierdaBorrar(bool &decrece){
	TAVLPoro *auxJ, *auxK;
	int i = 0;

	if(this->raiz->iz.raiz->fe == -1){ //ROTACIÓN II
		auxJ = new TAVLPoro(this->raiz->iz);
		this->raiz->iz = auxJ->raiz->de;
		auxJ->raiz->de = *this;
		auxJ->raiz->fe = 0;
		auxJ->raiz->de.raiz->fe = 0;
		this->raiz = auxJ->raiz;
		decrece = true;

	}else if(this->raiz->iz.raiz->fe == 0){
		auxJ = new TAVLPoro(this->raiz->iz);
		this->raiz->iz = auxJ->raiz->de;
		auxJ->raiz->de = *this;
		auxJ->raiz->fe = 1;
		auxJ->raiz->de.raiz->fe = 1;
		this->raiz = auxJ->raiz;
		decrece = false;

	}else{ 							//ROTACIÓN ID
		auxJ = new TAVLPoro(this->raiz->iz);
		auxK = new TAVLPoro(auxJ->raiz->de);
		i = auxK->raiz->fe;

		this->raiz->iz = auxK->raiz->de;
		auxJ->raiz->de = auxK->raiz->iz;
		auxK->raiz->iz = *auxJ;
		auxK->raiz->de = *this;
		auxK->raiz->de.raiz->fe = 0;
		decrece = true;

		switch(i){
			case -1:
					auxK->raiz->iz.raiz->fe = 0;
					auxK->raiz->de.raiz->fe = 1;
					break;
			case 1:	
					auxK->raiz->iz.raiz->fe = -1;
					auxK->raiz->de.raiz->fe = 0;

					break;
			case 0:
					auxK->raiz->iz.raiz->fe = 0;
					auxK->raiz->de.raiz->fe = 0;
					break;
		}
		this->raiz = auxK->raiz;
	}
}

void TAVLPoro::EquilibrarDerechaBorrar(bool &decrece){
	TAVLPoro *auxJ, *auxK;
	int i = 0;

	if(this->raiz->de.raiz->fe == 1){ //ROTACIÓN DD
		auxJ = new TAVLPoro(this->raiz->de);
		this->raiz->de = auxJ->raiz->iz;
		auxJ->raiz->iz = *this;
		auxJ->raiz->fe = 0;
		auxJ->raiz->iz.raiz->fe = 0;
		this->raiz = auxJ->raiz;
		decrece = true;
	}
	else if(this->raiz->de.raiz->fe == 0){
		auxJ = new TAVLPoro(this->raiz->de);
		this->raiz->de = auxJ->raiz->iz;
		auxJ->raiz->iz = *this;
		auxJ->raiz->fe = -1;
		auxJ->raiz->iz.raiz->fe = -1;
		this->raiz = auxJ->raiz;
		decrece = false;
	}
	else{ 							//ROTACIÓN DI
		auxJ = new TAVLPoro(this->raiz->de);
		auxK = new TAVLPoro(auxJ->raiz->iz);
		i = auxK->raiz->fe;
		this->raiz->de = auxK->raiz->iz;
		auxJ->raiz->iz = auxK->raiz->de;
		auxK->raiz->de = *auxJ;
		auxK->raiz->iz = *this;
		auxK->raiz->iz.raiz->fe = 0;
		decrece = true;

		switch(i){
			case -1:
					auxK->raiz->de.raiz->fe = 0;
					auxK->raiz->iz.raiz->fe = -1;
					break;
			case 1:	
					auxK->raiz->de.raiz->fe = 1;
					auxK->raiz->iz.raiz->fe = 0;

					break;
			case 0:
					auxK->raiz->de.raiz->fe = 0;
					auxK->raiz->iz.raiz->fe = 0;
					break;
		}
		this->raiz = auxK->raiz;
	}
}

//Devuelve la altura del árbol. La altura de un árbol vacío es 0.
int TAVLPoro::Altura()const{
	int i = 0;
	if(!(*this).EsVacio()){
		i = 1;
		if((*this).raiz->iz.Altura() > (*this).raiz->de.Altura()){
			i += (*this).raiz->iz.Altura();
		}else{
			i += (*this).raiz->de.Altura();
		}
	}
	return i;
}

//Devuelve el elemento TPoro raíz del árbol AVL.
TPoro TAVLPoro::Raiz() const{
	TPoro poro;
	if(!(*this).EsVacio()) poro = raiz->item;
	return poro;
}

//Devuelve el número de nodos del árbol. Un árbol vacío son 0 nodos. 
int TAVLPoro::Nodos()const{
	int i = 0;
	if(!(*this).EsVacio()){
		i = 1;
		if((*this).raiz->iz.EsVacio() && (*this).raiz->de.EsVacio())return i;
		else{
			i += (*this).raiz->iz.Nodos() + (*this).raiz->de.Nodos();
			return i;
		}
	}
	return i;
}

//Devuelve el número de nodos hoja en el árbol. La raíz puede ser hoja. 
int TAVLPoro::NodosHoja()const{
	int i = 0;
	if(!(*this).EsVacio()){
		if((*this).raiz->iz.EsVacio() && (*this).raiz->de.EsVacio())return 1;
		else return ((*this).raiz->iz.NodosHoja() + (*this).raiz->de.NodosHoja());
	}
	return i;
}

//Devuelve el recorrido en Inorden
TVectorPoro TAVLPoro::Inorden()const{
	int pos = 1;
	TVectorPoro v((*this).Nodos());
	InordenAux(v, pos);
	return v;
}

void TAVLPoro::InordenAux(TVectorPoro &v, int &pos)const{
	if(!(*this).EsVacio()){
		(*this).raiz->iz.InordenAux(v, pos);
		v[pos++] = (*this).Raiz();
		(*this).raiz->de.InordenAux(v, pos);
	}
}

//Devuelve el recorrido en Preorden
TVectorPoro TAVLPoro::Preorden()const{
	int pos = 1;
	TVectorPoro v((*this).Nodos());
	PreordenAux(v, pos);
	return v;
}

//PreordenAux
void TAVLPoro::PreordenAux(TVectorPoro &v, int &pos)const{
	if(!(*this).EsVacio()){
		v[pos++] = (*this).Raiz();
		(*this).raiz->iz.PreordenAux(v, pos);
		(*this).raiz->de.PreordenAux(v, pos);
	}
}

//Devuelve el recorrido en Postorden
TVectorPoro TAVLPoro::Postorden()const{
	int pos = 1;
	TVectorPoro v((*this).Nodos());
	PostordenAux(v, pos);
	return v;
}

//PostordenAux
void TAVLPoro::PostordenAux(TVectorPoro &v, int &pos)const{
	if(!(*this).EsVacio()){
		(*this).raiz->iz.PostordenAux(v, pos);
		(*this).raiz->de.PostordenAux(v, pos);
		v[pos++] = (*this).Raiz();
	}
}

ostream & operator << (ostream &os,const TAVLPoro &avl){
	os << avl.Inorden();
	return os;
}

TVectorPoro TAVLPoro::BuscaAVL(TListaPoro &lista)const{
	TVectorPoro v(lista.Longitud());

	

	return v;
}


/*
0: Si el elemento que ocupa la posición 'i' en la lista 
no se encuentra en el árbol.
1: Si el elemento que ocupa la posición 'i' en la lista 
se encuentra en un nodo que es hijo izquierdo de su nodo padre.
2: Si el elemento que ocupa la posición 'i' en la lista 
se encuentra en un nodo que es hijo derecho de su nodo padre. 
3: Si el elemento que ocupa la posición 'i' en la lista 
se encuentra en uno que es raíz del árbol. 
*/






