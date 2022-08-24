<?php
    require_once 'conexion/Conexion.php';
    
    if (!empty($_POST)){
        $db = new Conexion();

        $myUser = $_POST['usu'];
        $myPassword = $_POST['cla'];

        $sql = "select login,clave from usuarios where login = '$myUser';";

        $queryExc = mysqli_query($db->conectar(),$sql);

        $registro = mysqli_fetch_array($queryExc);

        if ($registro){
            if ($myPassword == $registro['clave']){
                header('location:menu.php');
            } else {
                print("
                    <script>
                        alert('La contraseña es incorrecta..');
                    </script>"
                );
            }

        } else {
            print("
                    <script>
                        alert('El usuario no existe..');
                    </script>"
            );
        }

    }

?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Interfases</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/fonts/ionicons.min.css">
    <link rel="stylesheet" href="assets/css/Login-Form-Dark.css">

</head>

<body>

    <div class="login-dark ">
        <form action="?" method="POST">
            <h2 class="sr-only">Login</h2>
            <div class="illustration"> <i class="icon ion-ios-body-outline"></i></div>
            <div class="form-group"><input class="form-control" type="text" name="usu" placeholder="Usuario"></div>
            <div class="form-group"><input class="form-control" type="password" name="cla" placeholder="Contraseña"></div>
            <div class="form-group"><input class="btn btn-primary btn-block" type="submit" name="ingresar" value="Ingresar"></div>
            <a href="#" class="forgot">Olvido su Usuario o Contraseña</a>
        </form>
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>