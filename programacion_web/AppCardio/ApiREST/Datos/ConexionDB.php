<?php

    /**
     * Clase que envuelve una instacia de la clase PDO
     * para el manejo de la base de modelo
     */

     require_once "parametros.php";

     class ConexionDB {


        /**
         * Unica instancia de la clase
         */
        private static $db = null;

        /**
         * Instancia de PDO
         */
        private static $pdo;

        final private function __construct(){
            try {
                // Crear nueva conexion PDO
                self::obtenerDB();
            } catch (PDOException $e){
                // Manejo de excepciones
            }
        }

        public static function obtenerInstancia(){
            if (self::$db == null){
                self::$db = new self();
            }

            return self::$db;
        }

        public function obtenerDB(){
            if(self::$pdo == null){
                self::$pdo = new PDO(
                    'mysql:dbname=' . BASE_DE_DATOS .
                    ';host =' . NOMBRE_HOST .';',
                    USUARIO,
                    CONTRASENA,
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                    // Habilitar las excepciones
                    self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }

            return self::$pdo;
        }

        final protected function __clone(){

        }


        function __destructor(){
            self::$pdo = null;
        }

        
     }




?>