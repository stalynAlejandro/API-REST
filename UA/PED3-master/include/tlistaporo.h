#ifndef TLISTA_
#define TLISTA_

#include "tporo.h"
#include "tvectorporo.h"
#include <iostream>
#include <cstddef>
#include <string.h>
#include <stdio.h>
using namespace std;

class TListaNodo{

friend class TListaPosicion;
friend class TListaPoro;

private:
	//El elemento del nodo
	TPoro e;
	//El nodo anterior
	TListaNodo *anterior;
	//El nodo siguiente
	TListaNodo *siguiente;
	//Funcion propia
	void copiarObjeto(const TListaNodo &);

public:
	//Constructor
	TListaNodo();
	//Constructor de copia
	TListaNodo (const TListaNodo &);
	//Destructor
	~TListaNodo();
	//Sobrecarga del operador asignación
	TListaNodo & operator = (const TListaNodo &);

};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
class TListaPosicion{
	friend class TListaPoro;
private:
	//Para implementar la POSICIÓN a NODO de la LISTA de TPoro
	TListaNodo *pos;

public:
	//Constructor por defecto
	TListaPosicion();
	//Constructor de copia
	TListaPosicion(const TListaPosicion &);
	//Destructor
	~TListaPosicion();
	//Sobrecarga del operador asignación
	TListaPosicion & operator = (const TListaPosicion &);

	//Métodos
	//Sobrecarga del operador igualdad
	bool operator == (const TListaPosicion &)const;

	//Devuelve la posición anterior
	TListaPosicion Anterior()const;
	//Devuelve la posición siguiente
	TListaPosicion Siguiente()const;
	//Devuelve TRUE si la posición no apunta a una lista, FALSE en caso contrario
	bool EsVacia()const;
};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
class TListaPoro{

friend class TListaPosicion;

private:
	//Primer elemento de la lista
	TListaNodo *primero;
	//Ultimo elemento de la lista
	TListaNodo *ultimo;

	void BorrarUnico();
	void BorrarPrimero(const TListaPosicion &);
	void BorrarUltimo(const TListaPosicion &);
	void BorrarMedio(const TListaPosicion &);

	void InsertarMedio(const TPoro &, const TListaPosicion &);
	void InsertarVacio(const TPoro &poro);
	void InsertarPrimero(const TPoro &);
	void InsertarUltimo(const TPoro &);

public:
	//Constructor
	TListaPoro();
	//Constructor de copia
	TListaPoro(const TListaPoro &);
	//Destructor
	~TListaPoro();
	//Sobrecarga del operador asignación
	TListaPoro & operator = (const TListaPoro &);

	//Métodos
	//Sobrecarga del operador igualdad
	bool operator == (const TListaPoro &);
	//Sobrecarga del operador suma
	TListaPoro operator + (const TListaPoro &);
	//Sobrecarga del operador resta
	TListaPoro operator - (const TListaPoro &);
	//Devuelve true si la lista está vacía, false en caso contrario
	bool EsVacia() const;
	//Inserta el elemento en la lista
	bool Insertar(const TPoro &);
	//Busca y borra el elemento
	bool Borrar(const TPoro &);
	//Borra el elemento que ocupa la posición indicada
	bool Borrar(const TListaPosicion &);
	//Obtiene el elemento que ocupa la posición indicada
	TPoro Obtener(const TListaPosicion &) const;
	//Devuelve true si el elemento está en la lista, false en caso contrario
	bool Buscar(const TPoro &) const;
	//Devuelve la longitud de la lista
	int Longitud()const;
	//Devuelve la primera posición en la lista
	TListaPosicion Primera() const;
	//Devuelve la última posición en la lista
	TListaPosicion Ultima() const;
	//Extraer un rango de nodos de la lista
	TListaPoro ExtraerRango(int, int);

	//Funciones amigas
	//Sobrecarga del operador salida
	friend ostream & operator << (ostream &, const TListaPoro &);
};

#endif
