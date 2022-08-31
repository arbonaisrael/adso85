<?php

    /* 
    * Cargamos los controladores
    */


    
    /*
    * Definimos que sera una aplicacion de tipo JSON
    * Permitimos el acceso a todos los clientes
    * Permitimos que los clientes usen POST
    */

    header ( 'content-type: application/json; charset=utf-8' );
    header ( 'Access-Control-Allow-Origin: *' );
    header ( 'Access-Control Allow-Methods: POST' );





?>