Algoritmo arreglo_multidimenciones
	Definir datos Como Caracter
	Dimension matriz[10,10]
	
	Para i = 0 Hasta 9 Con Paso 1 Hacer
		Para k = 0 Hasta 9 Con Paso 1 Hacer
			matriz[i,k] = 1
		Fin Para
	Fin Para
	
	datos = ' '
	Para i = 0 Hasta 9 Con Paso 1 Hacer
		Escribir matriz[i,0], ' - ',matriz[i,1], ' - ',matriz[i,2], ' - ',matriz[i,3], ' - ',matriz[i,4]
	Fin Para
	
	
FinAlgoritmo
