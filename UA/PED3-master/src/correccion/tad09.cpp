/************************************************************
** BORRADO  HOJAS y NODO CON 2 HIJOS
*************************************************************/

#include <iostream>
#include "tavlporo.h"

using namespace std;

int
main()
{
  TAVLPoro arb1;

  TPoro p1(1,2,1,(char *) "rojo");
  TPoro p2(1,2,2,(char *) "rojo");
  TPoro p3(1,2,3,(char *) "rojo");
  TPoro p4(1,2,4,(char *) "rojo");
  TPoro p5(1,2,5,(char *) "rojo");
  TPoro p6(1,2,6,(char *) "rojo");
  TPoro p7(1,2,7,(char *) "rojo");
  TPoro p8(1,2,8,(char *) "rojo");
  TPoro p9(1,2,9,(char *) "rojo");
  TPoro p10(1,2,10,(char *) "rojo");
  TPoro p11(1,2,11,(char *) "rojo");

  arb1.Insertar(p5);
  arb1.Insertar(p3);
  arb1.Insertar(p8);
  arb1.Insertar(p2);
  arb1.Insertar(p7);
  arb1.Insertar(p4);
  arb1.Insertar(p10);
  arb1.Insertar(p1);
  arb1.Insertar(p6);
  arb1.Insertar(p9);
  arb1.Insertar(p11);

/************************************************************
** BORRADO  COMPLEJO I 
*************************************************************/
  arb1.Borrar(p4);
  arb1.Borrar(p8);
  arb1.Borrar(p6);
/************************************************************
** BORRADO  COMPLEJO II 
*************************************************************/
  arb1.Borrar(p5);
  arb1.Borrar(p2);
  arb1.Borrar(p1);
  arb1.Borrar(p7);


  cout<<arb1.Raiz()<<endl; 
  cout<<arb1.Preorden()<<endl;

 return 0;
}

