//STALYN ALEJANDRO ALCOCER VALENCIA DNI: 20947870E
#ifndef _TABBPoro_
#define _TABBPoro_
#include <iostream>
#include <queue>
#include "tvectorporo.h"
using namespace std;
class TNodoABB;
class TABBPoro{
friend class TNodoABB;
friend ostream & operator << (ostream &,const TABBPoro &);
private:
	//Puntero al nodo
	TNodoABB *nodo;
	//AUXILIAR: Devuelve el recorrido en inorden
	void InordenAux(TVectorPoro &, int &)const;
	//AUXILIAR: Devuelve el recorrido en preorden
	void PreordenAux(TVectorPoro &, int &)const;
	//AUXILIAR: Devuleve el recorrido en postorden
	void PostordenAux(TVectorPoro &, int &)const;
	//AUXILIAR: Imprimri;
	void Imprimir(ostream &)const;

public:
	//Constructor
	TABBPoro();
	//Consturctor de copia
	TABBPoro(const TABBPoro &);
	//Destructor
	~TABBPoro();
	//Sobrecarga del operador asignación
	TABBPoro & operator = (const TABBPoro &);
	//Métodos del operador igualdad
	bool operator == (const TABBPoro &);
	//Devuelve TRUE si el árbol está vacío, FALSE en caso contrario
	bool EsVacio() const ;
	//Inserta el elemento en el árbol
	bool Insertar(const TPoro &);
	//Borra el elemento en el árbol
	bool Borrar(const TPoro &);
	//Devuelve TRUE si el elemento está en el árbol
	bool Buscar(const TPoro &);
	//Devuelve el elemento en la raíz del árbol
	TPoro Raiz()const;
	//Devuelve la altura del árbol (la altura de un árbol vacío es 0)
	int Altura()const;
	//Devuelve el número de nodos del árbol (un árbol vacío posee 0 nodos)
	int Nodos()const;
	//Devuelve el número de nodos hoja en el árbol (la raíz puede ser nodo hoja)
	int NodosHoja()const;
	//Devuelve el recorrido en inorden
	TVectorPoro Inorden()const;
	//Devuelve el recorrido en preorden
	TVectorPoro Preorden()const;
	//Devuelve el recorrido en postrden
	TVectorPoro Postorden()const;
	//Devuelve el recorrido en niveles
	TVectorPoro Niveles()const;
	//Suma de dos ABB
	TABBPoro operator + (const TABBPoro &);
	//Resta de dos ABB
	TABBPoro operator - (const TABBPoro &);
};

class TNodoABB{
friend class TABBPoro;
private:
	//Subárbol izquierdo y derecho
	TABBPoro iz, de;
	//El elemento del nodo
	TPoro item;
public:
	//Constructor por defecto
	TNodoABB();
	//Constructor de copia
	TNodoABB(const TNodoABB &);
	//Destructor
	~TNodoABB();
	//Sobrecarga del operador de asignación
	TNodoABB & operator = (const TNodoABB &);
};


#endif
