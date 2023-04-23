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
    $sqlPagos = mysqli_query($conexionBD,"SELECT p.id_pago, u.user_nombre, u.user_apellido, e.acronimoEntidad, n.acronimoNivel, p.fecha_pago, p.monto_pago FROM pagos p, users u, entidades e, niveles n WHERE u.id_users=p.id_users AND e.idEntidad=u.idEntidad AND n.idNivel=u.idNivel ORDER BY p.fecha_pago DESC;");
    if(mysqli_num_rows($sqlPagos) > 0){
        $pagos = mysqli_fetch_all($sqlPagos,MYSQLI_ASSOC);
        echo json_encode($pagos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

?>
