/************************************************************
** BUSCAR
*************************************************************/
#include <iostream>
#include "tavlporo.h"

using namespace std;

int
main()
{
  TAVLPoro arb1;


  TPoro c1(1,1,1,(char *)"rojo");
  TPoro c2(2,2,2,(char *)"rojo");
  TPoro c3(3,3,3,(char *)"rojo");
  TPoro c4(4,4,4,(char *)"rojo");
  TPoro c5(5,5,5,(char *)"rojo");
  TPoro c6(6,6,6,(char *)"rojo");
  TPoro otro(10,10,10,(char *)"rojo");


  arb1.Insertar(c5);
  arb1.Insertar(c2);
  arb1.Insertar(c3);
  arb1.Insertar(c1);
  arb1.Insertar(c6);

  if(arb1.Buscar(otro))
    cout << "Encontrado" << endl;
  else
    cout << "No encontrado" << endl;

  if(arb1.Buscar(c1))
    cout << "Encontrado" << endl;
  else
    cout << "No encontrado" << endl;

  return 0;
}
