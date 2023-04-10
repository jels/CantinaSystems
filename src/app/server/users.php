<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "syscomedor";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

if (isset($_GET["ordenado"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT u.id_users, u.user_name, u.user_nombre, u.user_pass, u.user_apellido, e.acronimoEntidad, n.acronimoNivel, n.cicloNivel, u.user_estado FROM users u, entidades e, niveles n WHERE u.idEntidad=e.idEntidad AND u.idNivel=n.idNivel ORDER BY u.user_apellido ASC;");
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//borrar pero se le debe de enviar una clave ( para borrado )
if(isset($_GET["baja"])){
    $data = json_decode(file_get_contents("php://input"));
    $id_user=$data->id_user;
    $estado_user=$data->estado_user;
    $sqlUsuarios = mysqli_query($conexionBD,"UPDATE users SET user_estado = $estado_user WHERE id_users = $id_user");
    echo json_encode(["success"=>1]);
    exit();
}

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $user_name=$data->user_name;
    $user_pass=$data->user_pass;
    $user_rol=$data->user_rol;
    $user_foto="./assets/img/login.png";
    $user_estado=(int)"1";
    $user_apellido=$data->user_apellido;
    $user_nombre=$data->user_nombre;
    $idEntidad=(int)$data->idEntidad;
    $idNivel=(int)$data->idNivel;
    $seccion_user=$data->seccion_user;
        if(($user_name!="")&&($user_pass!="")&&($user_rol!="")&&($user_foto!="")&&($user_apellido!="")&&($user_nombre!="")&&($idEntidad!="")&&($idNivel!="")){
            
    $sqlUsuarios = mysqli_query($conexionBD,"INSERT INTO users(id_users, user_name, user_pass, user_rol, user_estado, user_foto, user_apellido, user_nombre, idEntidad, idNivel, seccion_user) VALUES (null, '$user_name', '$user_pass', '$user_rol', $user_estado, '$user_foto', '$user_apellido', '$user_nombre', $idEntidad, $idNivel, '$seccion_user'); ");

    echo json_encode(["success"=>1]);
        }
    exit();
}

//
if (isset($_GET["existeUser"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"SELECT u.id_users, u.user_rol, u.user_pass, u.user_name, u.user_nombre, u.user_apellido, u.user_foto, e.acronimoEntidad FROM users u, entidades e WHERE e.idEntidad=u.idEntidad AND u.user_estado=1 AND  u.user_name = '".$_GET["userName"]."' AND u.user_pass = '".$_GET["password"]."'");
    if(mysqli_num_rows($sqlAlmuerzos) > 0){
        $almuerzos = mysqli_fetch_all($sqlAlmuerzos,MYSQLI_ASSOC);
        echo json_encode($almuerzos);
        exit();
    }
    else{  echo json_encode(["0"]); }
}

// Consulta todos los registros de la tabla empleados
if(isset($_GET["getAllUsers"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT u.id_users, u.user_name, u.user_nombre, u.user_pass, u.user_apellido, e.acronimoEntidad, n.acronimoNivel, n.cicloNivel, u.user_estado FROM users u, entidades e, niveles n WHERE u.idEntidad=e.idEntidad AND u.idNivel=n.idNivel ORDER BY u.id_users ASC;");
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
    }
    else{ echo json_encode([["success"=>0]]); 
    }
}







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


?>
