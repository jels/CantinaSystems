<?php
$contraseña = "Csystem.23";
$usuario = "u909736353_csystem";
$nombre_base_de_datos = "u909736353_csystem";
try {
    return new PDO('mysql:host=sql569.main-hosting.eu;dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
} catch (Exception $e) {
    echo "Ocurrió algo con la base de datos: " . $e->getMessage();
}

?>