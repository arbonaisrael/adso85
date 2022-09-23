<?php

     class BarriosCtrl {

        public $respuesta = null;

        function __construct($peticion){
            switch ($peticion[0]){
                case 'Listar':
                    return self::Listar($this);
                    break;
                case 'Registrar':
                    return self::Registrar($this);
                    break;
                case 'Actualizar':
                    return self::Actualizar($this);
                    break;
                default:
                    $this->respuesta = array(
                        'Estado'  => 2,
                        'Mensaje' => 'No se reconoce el metodo del recurso'
                    );

            }
        }

        private static function Listar($obj){
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();

            $sql = "SELECT
                    barrios.id_barrio as id_barrio,
                    barrios.nombre as nombre
                    FROM barrios;";

            $sentencia = $pdo->prepare($sql);
            
            if ($sentencia->execute()){
                $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
                if($resultado){
                    $obj->respuesta = array(
                        "Estado" => 1,
                        "Barrios" => $resultado
                    );
                } else {
                    $obj->respuesta = null;
                }
            } else {
                $obj->respuesta = null;
            }           
        }

        private static function Registrar($obj){

			$barrio = $_POST['datos'];
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
			
			$insert = "INSERT INTO barrios (barrios.nombre) VALUES (?)";
            $sentencia = $pdo->prepare ( $insert );
            $sentencia->bindParam ( 1, $barrio['nombre'] );

            $resultado = $sentencia->execute ();
            if($resultado){
                $obj->respuesta = array(
                        "Estado" =>1,
                        "Mensaje"=>"Barrio Creado Con Exito"
                );
            } else {
                $obj->respuesta = array(
                    "Estado" => 2,
                    "Mensaje"=>"Error Inesperado"
                );
            }
			
		} 

        private static function Actualizar($obj){
			$barrio = $_POST['datos'];
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();

			$comando = "UPDATE barrios SET barrios.nombre = ? WHERE barrios.id_barrio = ?";
			$sentencia = $pdo->prepare ( $comando );
			$sentencia->bindParam ( 1, $barrio['nombre'] );
			$sentencia->bindParam ( 2, $barrio['id_barrio'] );

			$resultado = $sentencia->execute ();
			if($resultado){
				$obj->respuesta = array(
						"Estado" =>1,
						"Mensaje"=>"Barrio Actualizado Con Exito"
					);
			}
		}

    }

?>