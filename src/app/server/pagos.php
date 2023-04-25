<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "syscomedor";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta los depositos realizados por los padres ordenando por fecha del ultimo deposito...
if (isset($_GET["consultarPagos"])){
    $sqlPagos = mysqli_query($conexionBD,"SELECT p.id_pago, u.user_nombre, u.user_apellido, e.acronimoEntidad, n.acronimoNivel, p.fecha_pago, p.monto_pago, p.foto_pago FROM pagos p, users u, entidades e, niveles n WHERE u.id_users=p.id_users AND e.idEntidad=u.idEntidad AND n.idNivel=u.idNivel ORDER BY p.fecha_pago DESC;");
    if(mysqli_num_rows($sqlPagos) > 0){
        $pagos = mysqli_fetch_all($sqlPagos,MYSQLI_ASSOC);
        echo json_encode($pagos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Consulta los depositos realizados por los padres ordenando por fecha del ultimo deposito...
if (isset($_GET["pagosXuser"])){
    $sqlPagos = mysqli_query($conexionBD,"SELECT * FROM pagos WHERE id_users=".$_GET["pagosXuser"]." ORDER BY fecha_pago DESC");
    if(mysqli_num_rows($sqlPagos) > 0){
        $pagos = mysqli_fetch_all($sqlPagos,MYSQLI_ASSOC);
        echo json_encode($pagos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["deudaTotalUsr"])){
    $sqlPagos = mysqli_query($conexionBD,"SELECT COUNT(idalmuerzoxdia)*16000 AS 'deuda' FROM almuerzoxdia WHERE id_users=".$_GET["deudaTotalUsr"]);
    $deuda = mysqli_fetch_array($sqlPagos);
    echo json_encode($deuda['deuda']);
}

if (isset($_GET["pagosTotalesUser"])){
    $sqlPagos = mysqli_query($conexionBD,"SELECT SUM(monto_pago) AS 'totales' FROM pagos WHERE id_users=".$_GET["pagosTotalesUser"]);
    $pago = mysqli_fetch_array($sqlPagos);
    echo json_encode($pago["totales"]);
}

//
if(isset($_GET["nuevoPago"])){
    $data = json_decode(file_get_contents("php://input"));
    $idUser=$data->idUser;
    $anho=$data->anho;
    $mes=$data->mes;
    $dia=$data->dia;
    $monto=$data->monto;
    $fechaCompleta=$data->fechaCompleta;
    $descripcion=$data->descripcion;
    $foto=$data->foto;  
    $sqlPagos = mysqli_query($conexionBD,"INSERT INTO pagos(id_pago, id_users, dia_pago, mes_pago, ano_pago, fecha_pago, monto_pago, descripcion_pago, foto_pago) VALUES (null,$idUser,$dia,$mes,$anho,'$fechaCompleta',$monto,'$descripcion','$foto');");
    echo json_encode(["success"=>1]);
    exit();
}

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["listarpagosuser"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM empleados WHERE id=".$_GET["listarpagosuser"]);
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}


?>
