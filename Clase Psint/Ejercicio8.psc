Algoritmo arreglo
	Definir num Como Entero 
	num = 5
	Dimension  lista[num] 
	
	Para i = 0 Hasta num - 1 Con Paso 1 Hacer
		Escribir "Ingrese el numero a lista", i
		leer lista[i]
	Fin Para
	
	Para i = 0 Hasta num - 1 Con Paso 1 Hacer
		Si (lista[i] > 100) Entonces
			Escribir lista[i]
		Fin Si
	Fin Para
FinAlgoritmo
