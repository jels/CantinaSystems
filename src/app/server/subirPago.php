<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "syscomedor";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

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



//$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR
//
//$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE
//
//$nombre = $params->nombre;
//$nombreArchivo = $params->nombreArchivo;
//$archivo = $params->base64textString;
//$archivo = base64_decode($archivo);
//
//$filePath = $_SERVER['DOCUMENT_ROOT']."/PruebasAngular/".$nombreArchivo;
//file_put_contents($filePath, $archivo);
//
//
//class Result {}
//// GENERA LOS DATOS DE RESPUESTA
//$response = new Result();
//
//$response->resultado = 'OK';
//$response->mensaje = 'SE SUBIO EXITOSAMENTE';
//
//header('Content-Type: application/json');
//echo json_encode($response); // MUESTRA EL JSON GENERADO */

?>