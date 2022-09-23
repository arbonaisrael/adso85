<?php
	/*
	* Cargamos la conexión unicamente se raliza en este archivo ya que sera el primero en cargar * el index
	*/
	
	class CiudadesCtrl
	{
		public $respuesta = null;						
		function __construct($peticion){
			switch ($peticion[0]) {
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
							'Estado' => 2,
							'Mensaje'=>'No se reconoce el metodo del recurso'
						);
			}
		}

		private static function Listar($obj){
			
			$pdo = ConexionDB::obtenerInstancia()->obtenerDB();
			$comando = "SELECT
						ciudades.id_ciudad AS id_ciudad,
					    ciudades.nombre AS nombre
						FROM
						ciudades";
			$sentencia = $pdo->prepare($comando);
			if ($sentencia->execute()) {
				$resultado = $sentencia->fetchAll ( PDO::FETCH_ASSOC );
				if ($resultado) {
					$obj->respuesta = array(
							"Estado" => 1,
							"Ciudad" => $resultado
						);
				} else {
					$obj->respuesta = null;
				}
			} else
				$obj->respuesta = null; 
		}

		private static function Registrar($obj){
			$ciudad = $_POST['datos'];
			$pdo = ConexionDB::obtenerInstancia()->obtenerDB();
			$validar = "SELECT ciudades.id_ciudad, ciudades.nombre FROM ciudades 
			WHERE ciudades.id_ciudad = '".$ciudad['id_ciudad']."'";
			$sentencia_validar = $pdo->prepare($validar);
			if ($sentencia_validar->execute ()) {
				$resultado_validar = $sentencia_validar->fetch(PDO::FETCH_OBJ);
				if ($resultado_validar) {
					$obj->respuesta = array(
							'Estado' => 2,
							'Mensaje'=>'La ciudad ya esta registrado'
						);
				} else {
					$insert = "INSERT INTO ciudades (ciudades.id_ciudad, ciudades.nombre) VALUES (?,?)";
					$sentencia = $pdo->prepare ( $insert );
					$sentencia->bindParam ( 1, $ciudad['id_ciudad']);
					$sentencia->bindParam ( 2, $ciudad['nombre']);
					$resultado = $sentencia->execute ();
					if($resultado){
						$obj->respuesta = array(
								"Estado" =>1,
								"Mensaje"=>"Ciudad Creado Con Exito"
						);
					}
				}
			} else
				$obj->respuesta = array(
						"Estado" => 2,
						"Mensaje"=>"Error Inesperado"
					);
		}


		private static function Actualizar($obj){
			$ciudad = $_POST['datos'];
			$pdo = ConexionDB::obtenerInstancia()->obtenerDB();

			$comando = "UPDATE ciudades SET ciudades.id_ciudad = ?, ciudades.nombre = ? WHERE ciudades.id_ciudad = ?";
			$sentencia = $pdo->prepare ( $comando );
			$sentencia->bindParam ( 1, $ciudad['id_ciudad'] );
			$sentencia->bindParam ( 2, $ciudad['nombre'] );
			$sentencia->bindParam ( 3, $ciudad['id_ciudad'] );
		
			$resultado = $sentencia->execute ();
			if($resultado){
				$obj->respuesta = array(
						"Estado" =>1,
						"Mensaje"=>"Ciudad Actualizado Con Exito"
					);
			}
		}  
  }
 ?>