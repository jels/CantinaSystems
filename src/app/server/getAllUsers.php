<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "conexion.php";
$sentencia = $bd->query("SELECT u.id_users, u.user_name, u.user_nombre, u.user_apellido, e.acronimoEntidad, n.acronimoNivel, u.user_estado FROM users u, entidades e, niveles n WHERE u.idEntidad=e.idEntidad AND u.idNivel=n.idNivel;");
$mascotas = $sentencia->fetchAll(PDO::FETCH_OBJ);
echo json_encode($mascotas);
?>