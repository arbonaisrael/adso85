<?php
	/*
	* Cargamos la conexión unicamente se raliza en este archivo ya que sera el primero en cargar * el index
	*/
	
	class PacientesCtrl
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

			$comando = "SELECT pacientes.id_cedula as id_cedula,
			                   pacientes.nombres as nombres, 
			                   pacientes.apellidos as apellidos,
			                   pacientes.fec_nac as fec_nac, 
			                   pacientes.edad as edad, 
			                   pacientes.genero as genero, 
			                   pacientes.telefono as telefono, 
			                   pacientes.direccion as direccion,
			                   pacientes.id_barrio as barrio,
			                   pacientes.id_ciudad as ciudad,
			                   pacientes.tp_paciente as tp_paciente, 
			                   pacientes.seguridad_social as seguridad_social,
			                   barrios.nombre as nombarrio,
			                   ciudades.nombre as nomciudad 			 
			                   FROM ((pacientes INNER JOIN barrios ON pacientes.id_barrio = barrios.id_barrio) 
			                                    INNER JOIN ciudades ON pacientes.id_ciudad = ciudades.id_ciudad)";  
			$sentencia = $pdo->prepare($comando);
			if ($sentencia->execute ()) {
				$resultado = $sentencia->fetchAll ( PDO::FETCH_ASSOC );
				if ($resultado) {
					$obj->respuesta = array(
							"Estado" => 1,
							"Pacientes" => $resultado
						);		
				} else {
					$obj->respuesta = null;
				}
			} else
				$obj->respuesta = null;
		}

		private static function Registrar($obj){
			$paciente = $_POST['datos'];
			$pdo = ConexionDB::obtenerInstancia()->obtenerDB();
			$validar = "SELECT pacientes.id_cedula FROM pacientes 
			WHERE pacientes.id_cedula = '".$paciente['id_cedula']."'";
			$sentencia_validar = $pdo->prepare($validar);
			if ($sentencia_validar->execute ()) {
				$resultado_validar = $sentencia_validar->fetch(PDO::FETCH_OBJ);
				if ($resultado_validar) {
					$obj->respuesta = array(
							'Estado' => 2,
							'Mensaje'=>'Paciente ya esta registrado'
						);
				} else {
					$insert = "INSERT INTO pacientes (
					           pacientes.id_cedula,
			                   pacientes.nombres, 
			                   pacientes.apellidos,
			                   pacientes.fec_nac, 
			                   pacientes.edad, 
			                   pacientes.genero, 
			                   pacientes.telefono, 
			                   pacientes.direccion, 
			                   pacientes.id_barrio, 
			                   pacientes.id_ciudad,
			                   pacientes.tp_paciente, 
			                   pacientes.seguridad_social) 
			                   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
					$sentencia = $pdo->prepare ( $insert );
					$sentencia->bindParam ( 1, $paciente['id_cedula']);
					$sentencia->bindParam ( 2, $paciente['nombres']);
					$sentencia->bindParam ( 3, $paciente['apellidos']);
					$sentencia->bindParam ( 4, $paciente['fec_nac']);
					$sentencia->bindParam ( 5, $paciente['edad']);
					$sentencia->bindParam ( 6, $paciente['genero']);
					$sentencia->bindParam ( 7, $paciente['telefono']);
					$sentencia->bindParam ( 8, $paciente['direccion']);
					$sentencia->bindParam ( 9, $paciente['id_barrio']);
					$sentencia->bindParam ( 10, $paciente['id_ciudad']);
					$sentencia->bindParam ( 11, $paciente['tp_paciente']);
					$sentencia->bindParam ( 12, $paciente['seguridad_social']);
					$resultado = $sentencia->execute ();
					if($resultado){
						$obj->respuesta = array(
								"Estado" =>1,
								"Mensaje"=>"Paciente Creado Con Exito"
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
			$paciente = $_POST['datos'];
			$pdo = ConexionDB::obtenerInstancia()->obtenerDB();

			$comando = "UPDATE pacientes SET 
			            pacientes.id_cedula = ?,
			            pacientes.nombres = ?, 
			            pacientes.apellidos = ?,
			            pacientes.fec_nac = ?, 
			            pacientes.edad = ?, 
			            pacientes.genero = ?, 
			            pacientes.telefono = ?, 
			            pacientes.direccion = ?, 
			            pacientes.id_barrio = ?, 
			            pacientes.id_ciudad = ?,
			            pacientes.tp_paciente = ?, 
			            pacientes.seguridad_social = ?
			            WHERE pacientes.id_cedula = ?";
			$sentencia = $pdo->prepare ( $comando );
			$sentencia->bindParam ( 1, $paciente['id_cedula']);
			$sentencia->bindParam ( 2, $paciente['nombres']);
			$sentencia->bindParam ( 3, $paciente['apellidos']);
			$sentencia->bindParam ( 4, $paciente['fec_nac']);
			$sentencia->bindParam ( 5, $paciente['edad']);
			$sentencia->bindParam ( 6, $paciente['genero']);
			$sentencia->bindParam ( 7, $paciente['telefono']);
			$sentencia->bindParam ( 8, $paciente['direccion']);
			$sentencia->bindParam ( 9, $paciente['id_barrio']);
			$sentencia->bindParam ( 10, $paciente['id_ciudad']);
			$sentencia->bindParam ( 11, $paciente['tp_paciente']);
			$sentencia->bindParam ( 12, $paciente['seguridad_social']);
			$sentencia->bindParam ( 13, $paciente['id_cedula']);

			$resultado = $sentencia->execute ();
			if($resultado){
				$obj->respuesta = array(
						"Estado" =>1,
						"Mensaje"=>"Paciente Actualizado Con Exito"
					);
		}
}
 }
 ?>