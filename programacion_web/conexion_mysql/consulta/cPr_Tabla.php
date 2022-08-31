<?php
/*
    require_once '../conexion/Conexion.php';

    $db = new Conexion();

    $sql = "select id, nombre, pr_apellido, sg_apellido, estado from pr_tabla limit 100000";
    $resultado = mysqli_query($db->conectar(),$sql);

    while($registro = mysqli_fetch_array($resultado)){
        // $datos[] = $registro;

        $datos[] = array(
            $registro['id'],
            $registro['nombre'], 
            $registro['pr_apellido'],
            $registro['sg_apellido'],
            $registro['estado']
        );
    }

    $result = [
        "draw" => 0,
        "recordsTotal" => count($datos),
        "recordsFiltered" => count($datos),
        "data" => $datos
    ];

    print(json_encode($result));
    $db->cerrar();
*/
?>

<?php
 
    $table = 'pr_tabla';

    $primaryKey = 'id';

    $columns = array(
        array( 'db' => 'id',            'dt' => 'id' ),
        array( 'db' => 'nombre',        'dt' => 'nombre' ),
        array( 'db' => 'pr_apellido',   'dt' => 'pr_apellido' ),
        array( 'db' => 'sg_apellido',   'dt' => 'sg_apellido' ),
        array( 'db' => 'estado',        'dt' => 'estado' )
    );
 
    // SQL server connection information
    $sql_details = array(
        'user' => 'root',
        'pass' => '',
        'db'   => 'adso_85',
        'host' => 'localhost'
    );
 
    require( 'SSP.php' );
 
    echo json_encode(
        SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
    );

?>