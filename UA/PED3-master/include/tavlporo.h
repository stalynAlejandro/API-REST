#ifndef _TAVLPORO_
#define _TAVLPORO_
#include <iostream>
#include <cstdlib>
#include <queue>
#include "tporo.h"
#include "tvectorporo.h"
#include "tlistaporo.h"
#include "tabbporo.h"

using namespace std;
class TNodoAVL;
class TAVLPoro;
class TAVLPoro{
friend class TNodoAVL;
//Sobrecarga del operador de salida
friend ostream & operator <<(ostream &, const TAVLPoro &);

private:
	//Puntero al nodo raiz
	TNodoAVL *raiz;
	//AUXILIAR: Devuelve el recorrido en inorden 
	void InordenAux(TVectorPoro &, int &)const;
	//AUXILIAR: Devuelve el recorrido en preorden
	void PreordenAux(TVectorPoro &, int &)const;
	//AUXILIAR: Devuelve el recorrido en postorden
	void PostordenAux(TVectorPoro &, int &)const;
	//AUXILIAR: Insertar
	bool InsertarAux(const TPoro &, bool &);
	//AUXILIAR: Borrar
	bool BorrarAux(const TPoro &, bool &);
	//AUXILIAR: EquilibrarIzquierda
	void EquilibrarIzquierda();
	//AUXILIAR: EquilibrarDerecha
	void EquilibrarDerecha();

	//AUXILIAR: EquilibrarIzquierda - (Cuando Borramos)
	void EquilibrarIzquierdaBorrar(bool &);
	//AUXILIAR: EquilibrarDerecha - (Cuando Borramos)
	void EquilibrarDerechaBorrar(bool &);
	
public:	
	//Constructor por defecto
	TAVLPoro();
	//Constructor de copia
	TAVLPoro(const TAVLPoro &);
	//Destructor
	~TAVLPoro();
	//Sobrecarga del operador asignación
	TAVLPoro & operator = (const TAVLPoro &);
	//Métodos
	//Sobrecarga del operador igualdad
	bool operator == (const TAVLPoro &)const;
	//Sobrecarga del operador desigualdad
	bool operator != (const TAVLPoro &)const;
	//Devuelve TRUE si el árbol está vacío, FALSE en caso contrario
	bool EsVacio()const;
	//Inserta el elemento TPoro en el árbol
	bool Insertar(const TPoro &);
	//Devuelve TRUE si el elemento TPoro está en el árbol
	bool Buscar(const TPoro &)const;
	//Borra un elemento TPoro del árbol AVL
	bool Borrar(const TPoro &);
	//Devuelve la altura del árbol. La altura de un árbol vacío es 0.
	int Altura()const;
	//Devuelve el elemento TPoro raíz del árbol AVL.
	TPoro Raiz()const;
	//Devuelve el número de nodos del árbol. Un árbol vacío son 0 nodos.
	int Nodos()const;
	//Devuelve el número de nodos hoja en el árbol. La raíz puede ser hoja. 
	int NodosHoja()const;
	//Devuelve el recorrido en Inorden sobre un vector 
	TVectorPoro Inorden()const;
	//Devuelve el recorrido en Preorden sobre un vector 
	TVectorPoro Preorden()const;
	//Devuelve el recorrido en Postorden sobre un vecor
	TVectorPoro Postorden()const;

	//BuscaAVL
	/*
	Devuelve un VECTOR DE ENTEROS del mismo tamaño que la lista
	pasada como parámetro. En cada posición v[i] del vector devuelto
	se debe guardar la siguiente información.                    
	*/

 	TVectorPoro BuscaAVL(TListaPoro &)const; 
};

class TNodoAVL{
friend class TAVLPoro;
private:
	//El elemento del nodo
	TPoro item;
	//Subárbol izquierdo y derecho
	TAVLPoro iz, de;
	//Factor de equilibrio
	int fe;

public:
	//Contructor por defecto
	TNodoAVL();
	//Constructor copia
	TNodoAVL(const TNodoAVL &);
	//Destructor
	~TNodoAVL();
	//Sobrecarga del operador asignación
	TNodoAVL & operator = (const TNodoAVL &);

};

#endif

/*
Archivos a entregar (incluyendo la función BuscaAVL) 
	indlude: tcalendario.h, tvectorcalendario.h, 
	tlistacalendario.h, tabbcalendario.h, tavlcalendario.h, 
	lib: tcalendario.cpp, tvectorcalendario.cpp, tlistacalendario.cpp, 
	tabbcalendario.cpp, tavlcalendario.cpp

Añadir la función int* BuscaAVL (TListaCAlendario &), que develuve un 
VECTOR DE ENTEROS del mismo tamaño que la lista 
pasada como parámetro. En cada posición v[i] del vector devuelto se debe
 guardar la siguiente información.
	
		0: Si el elemento que ocupa la posición 'i' en la lista 
		no se encuentra en el árbol.
		1: Si el elemento que ocupa la posición 'i' en la lista 
		se encuentra en un nodo que es hijo izquierdo de su nodo padre.
		2: Si el elemento que ocupa la posición 'i' en la lista 
		se encuentra en un nodo que es hijo derecho de su nodo padre. 
		3: Si el elemento que ocupa la posición 'i' en la lista 
		se encuentra en uno que es raíz del árbol. 

La lista pasada como parámetro se recorre de izquierda a derecha. 
Si la lista entrante es vacía: Devolver un puntero Nulo.
si el árbol es vacío: Devolver un vector del tamaño de la lista
conteniendo ceros en todas sus posiciones. 
*/










