#include "tvectorporo.h"

// El constructor por defecto crea un vector de dimensión 0 (puntero interno a NULL, no se reserva.
TVectorPoro::TVectorPoro(): dimension(0),datos(NULL),error(){}

//Si la dimensión es menor o igual que 0, se creará un vector de dimensión 0.
TVectorPoro::TVectorPoro(int dim){

  if(dim < 0) {
	this->dimension = 0;
	this->datos = NULL;
  }
  else
  {
    this->dimension = dim;
    this->datos = new TPoro[dimension];
  }
}

//Constructor de copia
TVectorPoro::TVectorPoro(const TVectorPoro &vectorPoro){
  this->datos = NULL;
  copiarObjeto(vectorPoro);
}

//Destructor
TVectorPoro::~TVectorPoro(){
  dimension = 0;
  delete[] datos;
  datos = NULL;
}

//Métodos
//Sobrecarga del operador asignación
TVectorPoro & TVectorPoro:: operator = (const TVectorPoro &vectorPoro){
  if(*this == vectorPoro){
    return *this;
  }else{
    (*this).~TVectorPoro();
    copiarObjeto(vectorPoro);
    return *this;
  }
}

//Sobrecarga operador igualdad
bool TVectorPoro::operator == (const TVectorPoro &vectorPoro){
  bool datosIgual = true;
  bool dimIgual = (this->dimension == vectorPoro.dimension) ? true : false;

  if(dimIgual){
    for(int i = 0;  i < this->dimension; i++)
      if(this->datos[i] != vectorPoro.datos[i]) datosIgual = false;
  }
  return (datosIgual && dimIgual);
}

//Sobrecarga del operador desigualdad
bool TVectorPoro::operator !=( const TVectorPoro &vectorPoro){
  return !(*this == vectorPoro);
}

//Sobrecarga del operador corchete (parte IZQUIERDA)
TPoro & TVectorPoro::operator [] (int i){
 if((i > 0 && i <= dimension)){
   return datos[i-1];
  }else{
    return error;
  }
}

//Sobrecarga del operador corchete (parte DERECHA)
TPoro TVectorPoro::operator [] (int i) const{
 if((i > 0 && i <= dimension)){
   return datos[i-1];
  }else{
    return error;
  }
}

//Devuelve la cantidad de posiciones ocupadas (no vacias del vector)
int TVectorPoro::Cantidad()const{
  int cantidad = 0;
  for(int i = 0 ; i < dimension ; i++)
    if(!datos[i].EsVacio())cantidad++;

  return cantidad;
}

int TVectorPoro::Longitud()const{
  return dimension;
}
//Redimensionar el vector TPoro
bool TVectorPoro::Redimensionar(int newDim){
  if(newDim <= 0 || newDim == dimension) return false;
  else{
    TPoro *newPoro = new TPoro[newDim];
    if(newDim > dimension)
      for(int i = 0 ; i < dimension ; i++) newPoro[i] = datos[i];
    else
      for(int i = 0 ; i < newDim ; i++) newPoro[i] = datos[i];

    dimension = newDim;
    delete[] datos;
    datos = newPoro;
  }
  return true;
}

void TVectorPoro::copiarObjeto(const TVectorPoro &vectorPoro){
  this->dimension = vectorPoro.dimension;

  if(datos != NULL){
    delete[] datos;
    datos = NULL;
  }

  this->datos = new TPoro[this->dimension];
  this->error = vectorPoro.error;
  for(int i = 0 ;  i < this->dimension  ; i++) this->datos[i] = vectorPoro.datos[i];
}

ostream & operator << ( ostream &os, const TVectorPoro & vectorPoro ){
  os << "[" ;
  if (vectorPoro.dimension > 0){
    for(int i = 1 ; i < vectorPoro.dimension + 1; i++){
      os << i << " " << vectorPoro[i];
      if(i < vectorPoro.dimension) os << " ";
    }
  }
  os << "]";
  return os;
}
