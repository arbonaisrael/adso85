<?php

    /**
     * Cargamos la conexion unicamente se realiza en este archivo, 
     * ya que serta el primero en cargar * index
     */

     require_once 'Datos/ConexionDB.php';

     class UsuariosCtrl {

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
                case 'Logear':
                    return self::Logear($this);
                    break;
                default:
                    $this->respuesta = array(
                        'Estado'  => 2,
                        'Mensaje' => 'No se reconoce el metodo del recurso'
                    );

            }
        }

        private static function Logear($obj){
            $usuario = $_POST['datos'];
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
            $sql = "SELECT u.usuario,u.clave,u.rol FROM usuarios as u WHERE u.usuario = '".$usuario['username']. "' AND
            u.clave = '".$usuario['clave']."' AND u.estado = 1";

            $sentencia = $pdo->prepare($sql);

            if ($sentencia->execute()){
                $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
                if($resultado){
                    $obj->respuesta = array(
                        "Estado" => 1,
                        "Mensaje" => "Bienvenida",
                        "Usuario" => $resultado
                    );
                } else {
                    $obj->respuesta = array(
                        'Estado'  => 2,
                        'Mensaje' => 'Error de verificación de datos'
                    );
                }
            } else {
                $obj->respuesta = null;
            }

        }

        private static function Listar($obj){
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();

            $sql = "SELECT
                    usuarios.usuario as usuario,
                    usuarios.clave as clave,
                    usuarios.rol as rol,
                    usuarios.estado as estado
                    FROM usuarios;";

            $sentencia = $pdo->prepare($sql);
            
            if ($sentencia->execute()){
                $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
                if($resultado){
                    $obj->respuesta = array(
                        "Estado" => 1,
                        "Usuarios" => $resultado
                    );
                } else {
                    $obj->respuesta = null;
                }
            } else {
                $obj->respuesta = null;
            }           
        }

        private static function Registrar($obj){

			$usuario = $_POST['datos'];
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();
			$validar_usuario = "SELECT usuarios.Usuario, usuarios.Clave, usuarios.Rol, usuarios.Estado FROM usuarios WHERE usuarios.Usuario = '".$usuario['username']."'";
			$sentencia_validar_usuario = $pdo->prepare($validar_usuario);
			if ($sentencia_validar_usuario->execute ()) {
				$resultado_validar_usuario = $sentencia_validar_usuario->fetch ( PDO::FETCH_OBJ );
				if ($resultado_validar_usuario) {
					$obj->respuesta = array(
							'Estado' => 2,
							'Mensaje'=>'El usuario ya esta registrado'

						);
				} else {
					$insert = "INSERT INTO usuarios (usuarios.Usuario , usuarios.Clave , usuarios.Estado, usuarios.Rol) VALUES (?,?,?,?)";
					$sentencia = $pdo->prepare ( $insert );
					$sentencia->bindParam ( 1, $usuario['username'] );
					$sentencia->bindParam ( 2, $usuario['clave'] );
					$sentencia->bindParam ( 3, $usuario['estado'] );
					$sentencia->bindParam ( 4, $usuario['rol'] );

					$resultado = $sentencia->execute ();
					if($resultado){
						$obj->respuesta = array(
								"Estado" =>1,
								"Mensaje"=>"Usuario Creado Con Exito"
						);
					}
				}
			} else {
                $obj->respuesta = array(
                    "Estado" => 2,
                    "Mensaje"=>"Error Inesperado"
                );
            }
			
		} 

        private static function Actualizar($obj){
			$usuario = $_POST['datos'];
            $pdo = ConexionDB::obtenerInstancia()->obtenerDB();

			$comando = "UPDATE usuarios SET usuarios.Clave = ?, usuarios.Estado=?, usuarios.Rol = ? WHERE usuarios.Usuario = ?";
			$sentencia = $pdo->prepare ( $comando );
			$sentencia->bindParam ( 1, $usuario['clave'] );
			$sentencia->bindParam ( 2, $usuario['estado'] );
			$sentencia->bindParam ( 3, $usuario['rol'] );
			$sentencia->bindParam ( 4, $usuario['username'] );

			$resultado = $sentencia->execute ();
			if($resultado){
				$obj->respuesta = array(
						"Estado" =>1,
						"Mensaje"=>"Usuario Actualizado Con Exito"
					);
			}
		}

    }

?>