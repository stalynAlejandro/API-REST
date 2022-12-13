#ifndef TVECTORPORO_
#define TVECTORPORO_

#include "tporo.h"
#include <iostream>
#include <cstddef>
#include <string.h>
#include <stdio.h>
using namespace std;

class TVectorPoro{

//Sobrecarga del operador de salida
friend ostream & operator << ( ostream &, const TVectorPoro &);

private:
	//Dimension del vector
	int dimension;
	//Datos del vector
	TPoro *datos;
	//Para cuando haya error en el operator[]
	TPoro error;
	//Funciones Propias
	void copiarObjeto(const TVectorPoro &);


public:
	//Constructor por defecto
	TVectorPoro();
	//Constructor a partir de una dimensión
	TVectorPoro(int);
	//Constructor de copia
	TVectorPoro(const TVectorPoro &);
	//Destructor
	~TVectorPoro();

	//Métodos
	//Sobrecarga del operador asignación
	TVectorPoro & operator = (const TVectorPoro &);
	//Sobrecarga de operador igualdad
	bool operator == (const TVectorPoro &);
	//Sobrecarga del operador desigualdad
	bool operator != (const TVectorPoro &);
	//Sobrecarga del operador corchete (parte IZQUIERDA)
	TPoro & operator [] (int);
	//Sobrecarga del operador corchete (parte DERECHA)
	TPoro operator [] (int) const;
	//Devuelve la Longitud(dimension) del vector
	int Longitud()const;
	//Devuelve la cantidad de posiciones ocupadas (no vacías) en el vector
	int Cantidad()const;
	//REDIMENSIONAR el vector de TPoro
	bool Redimensionar(int);

};

#endif
