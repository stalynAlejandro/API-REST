#Evaluador modificado del profesor

declare -i CONTADOR_CORRECTO=0
declare -i CONTADOR_INCORRECTO=0
PRUEBAS_INCORRECTAS=""
for FILE in */*.cpp ; do
	echo -n "Evaluando $FILE..."
	cp $FILE tad.cpp
	cd ..
	make
	cd src
	../tad > $FILE.out
	diff -b -B -i $FILE.out $FILE.sal
	if [ "$?" == "0" ]; then
		CONTADOR_CORRECTO=$CONTADOR_CORRECTO+1
		echo "OK"
	else
		CONTADOR_INCORRECTO=$CONTADOR_INCORRECTO+1
		PRUEBAS_INCORRECTAS=$PRUEBAS_INCORRECTAS"# "$FILE"\n"
		echo "ERROR"
	fi
done

echo ""
echo "###############################################################"
echo "# Pruebas correctas:   $CONTADOR_CORRECTO"
echo "# Pruebas incorrectas: $CONTADOR_INCORRECTO"
if [ $CONTADOR_INCORRECTO -gt 0 ]; then
	echo -e "# Pruebas con resultados incorrectos:\n#"
	echo -e $PRUEBAS_INCORRECTAS"#"
fi
echo "###############################################################"
