<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR

$params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE

$enlaceArchivo = $params->enlaceArchivo;
$nombreArchivo = $params->nombreArchivo;
$archivo = $params->base64textString;
$archivo = base64_decode($archivo);

$filePath = $_SERVER['DOCUMENT_ROOT']."/assets/img/pagos/".$nombreArchivo;
file_put_contents($filePath, $archivo);

?>