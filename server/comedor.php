<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
//$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "syscomedor";
$servidor = "sql569.main-hosting.eu"; $usuario = "u909736353_csystem"; $contrasenia = "Csystem.23"; $nombreBaseDatos = "u909736353_csystem";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM empleados WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
if (isset($_GET["verdia"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT users.user_nombre, users.user_apellido, entidades.acronimoEntidad, niveles.acronimoNivel, niveles.cicloNivel, users.seccion_user, almuerzo.nombre_almuerzo FROM users, almuerzo, almuerzoxdia, entidades, niveles WHERE almuerzoxdia.id_users=users.id_users AND almuerzoxdia.id_almuerzo=almuerzo.id_almuerzo AND users.idEntidad=entidades.idEntidad AND users.idNivel=niveles.idNivel AND almuerzoxdia.dia_almuerzo=".$_GET["verdia"]);
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"DELETE FROM empleados WHERE id=".$_GET["borrar"]);
    if($sqlEmpleaados){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $correo=$data->correo;
        if(($correo!="")&&($nombre!="")){
            
    $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO empleados(nombre,correo) VALUES('$nombre','$correo') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $correo=$data->correo;
    
    $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE empleados SET nombre='$nombre',correo='$correo' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla empleados
date_default_timezone_set('America/Asuncion');
$fecha_actual = date("d");
echo $fecha_actual;
$sqlEmpleaados = mysqli_query($conexionBD,"SELECT users.user_nombre, users.user_apellido, entidades.acronimoEntidad, niveles.acronimoNivel, niveles.cicloNivel, users.seccion_user, almuerzo.nombre_almuerzo FROM users, almuerzo, almuerzoxdia, entidades, niveles WHERE almuerzoxdia.id_users=users.id_users AND almuerzoxdia.id_almuerzo=almuerzo.id_almuerzo AND users.idEntidad=entidades.idEntidad AND users.idNivel=niveles.idNivel AND almuerzoxdia.dia_almuerzo='$fecha_actual'");
if(mysqli_num_rows($sqlEmpleaados) > 0){
    $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
    echo json_encode($empleaados);
}
else{ echo json_encode([["success"=>0]]); }


?>