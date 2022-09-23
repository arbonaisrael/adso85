<?php

    /* 
    * Cargamos los controladores
    */

    require_once 'Controladores/UsuariosCtrl.php';
    require_once 'Controladores/BarriosCtrl.php';
    require_once 'Controladores/CiudadesCtrl.php';
    require_once 'Controladores/MedicamentosCtrl.php';
    require_once 'Controladores/PacientesCtrl.php';

    
    /*
    * Definimos que sera una aplicacion de tipo JSON
    * Permitimos el acceso a todos los clientes
    * Permitimos que los clientes usen POST
    */

    header ( 'content-type: application/json; charset=utf-8' );
    header ( 'Access-Control-Allow-Origin: *' );
    header ( 'Access-Control-Allow-Methods: POST' );

    $respuesta;
    $instancia;

    if (isset($_GET['PATH_INFO'])){
        $peticion = explode ( '/', $_GET['PATH_INFO']);
        $recurso = array_shift($peticion); // obtener el recurso a solicitar

        $recursos_existentes = array(
            'UsuariosCtrl',
            'BarriosCtrl',
            'CiudadesCtrl',
            'MedicamentosCtrl',
            'PacientesCtrl'
        ); // Definimos los recursos existentes y validamos que la solicitud exista

        if (in_array($recurso, $recursos_existentes)){
            // Por seguridad validamos el metodo para que sea post
            $metodo = strtolower($_SERVER['REQUEST_METHOD']);
            if($metodo == 'post'){
                // enrutamos a donde la peticion lo desee
                switch($recurso){
                    case 'UsuariosCtrl':
                        $instancia = new UsuariosCtrl($peticion);
                        break;
                    case 'BarriosCtrl':
                        $instancia = new BarriosCtrl($peticion);
                        break;
                    case 'CiudadesCtrl':
                        $instancia = new CiudadesCtrl($peticion);
                        break;
                    case 'MedicamentosCtrl':
                        $instancia = new MedicamentosCtrl($peticion);
                        break;
                    case 'PacientesCtrl':
                        $instancia = new PacientesCtrl($peticion);
                        break;
                }

                $respuesta = $instancia->respuesta;
            } else {
                $respuesta = array(
                    'Estado' => 2,
                    'Mensaje' => 'No se reconocio el metodo'
                );
            }

        } else {
            $respuesta = array(
                'Estado' => 2,
                'Mensaje' => 'No se reconocio el recurso'
            );
        } 

    } else {
        $respuesta = array(
            'Estado' => 2,
            'Mensaje' => 'No se reconocio la petición'
        );
    }

    print(json_encode($respuesta));

?>