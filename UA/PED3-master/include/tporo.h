#ifndef TPORO_
#define TPORO_

#include <iostream>
#include <cstddef>
#include <string.h>
#include <stdio.h>

using namespace std;


class TPoro{
//Clase amiga
friend class TNodoABB;
friend class TABBPoro;
//Funciones amigas
friend ostream & operator<<( ostream & os, const TPoro & poro );
private:
	//Coordenada x de la posición
	int x;
	//Coordenada y de la posición
	int y;
	//Volumen
	double volumen;
	//Color
	char *color;

public:
	//Constructor por defecto
	TPoro();
	//Constructor a partir de una posición y un volumen
	TPoro(int , int , double );
	//Constructor a partir de una posición, un volumen y un color
	TPoro(int , int , double ,const char *);
	//Constructor de copia
	TPoro(const TPoro &);
	//Destructor
	~TPoro();
	//Sobrecarga del operador asignación
	TPoro & operator = (const TPoro & );
	//Métodos
	//Sobrecarga del opearador igualdad
	bool operator == (const TPoro & );
	//Sobrecarga del operador desigualdad
	bool operator != (const TPoro & );
	//Modifica la posición
	void Posicion(int, int);
	//Modifica el volumen
	void Volumen(double);
	//Modifica el color
	void Color(const char *);
	//Devuelve la coordenada x de la posición
	int PosicionX() const;
	//Devuelve la coordenada y de la posición
	int PosicionY() const;
	//Devuelve el volumen
	double Volumen() const;
	//Devuelve el color
	char* Color() const;
	//Devuelve cierto si el poro está vacío
	bool EsVacio() const;
};

#endif
