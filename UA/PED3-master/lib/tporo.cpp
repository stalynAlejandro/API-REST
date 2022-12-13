#include "tporo.h"

//Constructor por defecto
TPoro::TPoro():x(0), y(0), volumen(0), color(NULL){}

//Constructor a partir de una posición y un volumen
TPoro::TPoro(int x, int y, double volumen){
	Posicion(x, y);
	Volumen(volumen);
	Color(NULL);
}

//Constructor a partir de una posicion, un volumen y un color
TPoro::TPoro(int x, int y, double volumen,const char *color){
	Posicion(x, y);
	Volumen(volumen);
	Color(color);
}

//Constructor de copia
TPoro::TPoro(const TPoro &poro){
	Posicion(poro.PosicionX(), poro.PosicionY());
	Volumen(poro.Volumen());
	Color(poro.Color());
}

//Destructor
TPoro::~TPoro(){
	x = y = 0;
	volumen = 0.0;
	delete[] color;
	color = NULL;
}

//Sobrecarga del operador asignación
TPoro & TPoro::operator = (const TPoro &poro){
	if(*this == poro){
		return *this;
	}else{
		(*this).~TPoro();
		Posicion(poro.PosicionX(), poro.PosicionY());
		Volumen(poro.Volumen());
		Color(poro.Color());
		return *this;
	}
}

//Sobrecarga del operador igualdad
bool TPoro::operator == (const TPoro &poro){


	bool colorIgual = ((Color() == NULL && poro.Color() == NULL) || (Color()  != NULL &&
	 poro.Color() != NULL && strcmp(Color() , poro.Color()) == 0 )) ? true : false;

	bool datosIgual = (PosicionX() == poro.PosicionX() && PosicionY() == poro.PosicionY() &&
	 Volumen() == poro.Volumen()) ? true : false;

	return (colorIgual && datosIgual);
}

//Sobrecarga del operador desigualdad
bool TPoro::operator != (const TPoro &poro){
	return !(*this == poro);
}

//Métodos
//Modifica la posición
void TPoro::Posicion(int x, int y){
	this->x = x;
	this->y = y;
}

//Modifica el volumen
void TPoro::Volumen(double volumen){
	 this->volumen = volumen;
}

//Modifica el color
void TPoro::Color(const char *color){

	this->color = NULL;
	if(this->color != NULL){
		delete[] color;
		this->color = NULL;
	}

	if(color != NULL){
		this->color = new char[strlen(color) + 1];
		for(int i = 0 ; i <= strlen(color) ; i++) this->color[i] = tolower(color[i]);
	}

}

//Devuelve la coordenada x de la posición
int TPoro::PosicionX() const { return this->x; }

//Devuelve la coordenada y de la posición
int TPoro::PosicionY() const { return this->y; }

//Devuelve el volumen
double TPoro::Volumen() const { return this->volumen; }

//Devuelve el color
char* TPoro::Color() const { return this->color; }

//EsVacio
bool TPoro::EsVacio()const{
	return (x == 0 && y == 0 && volumen == 0.0 && color == NULL) ? true : false;
}

//Función amiga.
ostream & operator<<( ostream &os, const TPoro & poro )
{
	if( !poro.EsVacio() ){
		os.setf(ios::fixed);
		os.precision(2);
		os << "(" << poro.x << ", " << poro.y << ") " << poro.volumen << " ";

		if( poro.color != NULL ){
			os << poro.color;
		}else{
			os << "-";
		}
	}else{
		os << "()";
	}

	return os;
}
