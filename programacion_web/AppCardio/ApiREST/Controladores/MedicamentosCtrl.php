<?php
	/*
	* Cargamos la conexión unicamente se raliza en este archivo ya que sera el primero en cargar * el index
	*/
	
	class MedicamentosCtrl
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
						medicamentos.id_medicamento AS id_medicamento,
					    medicamentos.nombre AS nombre
						FROM
						medicamentos";
			$sentencia = $pdo->prepare($comando);
			if ($sentencia->execute()) {
				$resultado = $sentencia->fetchAll ( PDO::FETCH_ASSOC );
				if ($resultado) {
					$obj->respuesta = array(
							"Estado" => 1,
							"Medicamento" => $resultado
						);
				} else {
					$obj->respuesta = null;
				}
			} else
				$obj->respuesta = null; 
		}

		private static function Registrar($obj){
			$medicamento = $_POST['datos'];
			$pdo = ConexionDB::obtenerInstancia()->obtenerDB();
			$validar = "SELECT medicamentos.id_medicamento, medicamentos.nombre FROM medicamentos 
			WHERE medicamentos.id_medicamento = '".$medicamento['id_medicamento']."'";
			$sentencia_validar = $pdo->prepare($validar);
			if ($sentencia_validar->execute ()) {
				$resultado_validar = $sentencia_validar->fetch(PDO::FETCH_OBJ);
				if ($resultado_validar) {
					$obj->respuesta = array(
							'Estado' => 2,
							'Mensaje'=>'El medicamento ya esta registrado'
						);
				} else {
					$insert = "INSERT INTO medicamentos (medicamentos.id_medicamento, medicamentos.nombre) VALUES (?,?)";
					$sentencia = $pdo->prepare ( $insert );
					$sentencia->bindParam ( 1, $medicamento['id_medicamento']);
					$sentencia->bindParam ( 2, $medicamento['nombre']);
					$resultado = $sentencia->execute ();
					if($resultado){
						$obj->respuesta = array(
								"Estado" =>1,
								"Mensaje"=>"Medicamento Creado Con Exito"
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
			$medicamento = $_POST['datos'];
			$pdo = ConexionDB::obtenerInstancia()->obtenerDB();

			$comando = "UPDATE medicamentos SET medicamentos.id_medicamento = ?, medicamentos.nombre = ? WHERE medicamentos.id_medicamento = ?";
			$sentencia = $pdo->prepare ( $comando );
			$sentencia->bindParam ( 1, $medicamento['id_medicamento'] );
			$sentencia->bindParam ( 2, $medicamento['nombre'] );
			$sentencia->bindParam ( 3, $medicamento['id_medicamento'] );
		
			$resultado = $sentencia->execute ();
			if($resultado){
				$obj->respuesta = array(
						"Estado" =>1,
						"Mensaje"=>"Medicamento Actualizado Con Exito"
					);
			}
		}  

 }

 ?>