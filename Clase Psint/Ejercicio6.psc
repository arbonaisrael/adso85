Algoritmo factorial
	Definir contador Como Entero
	Definir fac Como Entero
	Definir num Como Entero
	
	contador = 0
	fac = 1
	
	Escribir "Digite el número : "
	Leer num
	
	
	Mientras contador < num Hacer
		contador = contador + 1
		fac = fac * contador
	Fin Mientras
	
	Escribir "El factorial del numero ", num, " es : ", fac
FinAlgoritmo
