<?php

    class Conexion{

        function __construct(){
            $this->conectar();
        }

        function __destruct(){
            $this->cerrar();
        }

        public function conectar(){
            // importar los parametrsos de la conexion
            require_once 'parametros.php';

            // conexion con el driver MYSQLI
            $conn = mysqli_connect(db_servidor,db_usuario, db_contrasena,db_base)
            or die ("Error de conexion en la base de datos...");

            // retornar la conexion de la base de datos
            return $conn;
        }

        public function cerrar(){
            // cerrar la conexion de la base de datos
            mysqli_close($this->conectar());
        }
            
    }

?>