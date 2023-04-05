<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "syscomedor";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Consulta obtiene los almuerzos que estan disponibles en el dia seleccionado por el usuario
if (isset($_GET["almuerzosDiarios"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"SELECT a.id_almuerzo, a.nombre_almuerzo FROM lista_de_almuerzos_mensuales l, almuerzo a WHERE a.id_almuerzo=l.id_almuerzo AND l.estado_almuerzo_mensual=1 AND l.fechaCompleta=".$_GET["almuerzosDiarios"]);
    if(mysqli_num_rows($sqlAlmuerzos) > 0){
        $almuerzosDiarios = mysqli_fetch_all($sqlAlmuerzos,MYSQLI_ASSOC);
        echo json_encode($almuerzosDiarios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Consulta los almuerzos que ya estan en el sistema para cada Mes ya sean los activos como los inactivos...
if (isset($_GET["almuerzosMensuales"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"SELECT l.id_lista_de_almuerzos_mensuales, a.id_almuerzo, a.nombre_almuerzo, l.dia_completo_almuerzo, l.estado_almuerzo_mensual FROM lista_de_almuerzos_mensuales l, almuerzo a WHERE a.id_almuerzo=l.id_almuerzo AND l.mes_lista_almuerzo=".$_GET["almuerzosMensuales"]." ORDER BY l.dia_lista_almuerzo");
    if(mysqli_num_rows($sqlAlmuerzos) > 0){
        $almuerzosDiarios = mysqli_fetch_all($sqlAlmuerzos,MYSQLI_ASSOC);
        echo json_encode($almuerzosDiarios);
        exit();
    }
    else{  echo json_encode(0); }
}

// Lista de los almuerzos que ya estan en el sistema sin importar su estado...
if (isset($_GET["listAlmuerzos"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"SELECT id_almuerzo, nombre_almuerzo, estado_almuerzo FROM almuerzo ORDER BY nombre_almuerzo ASC;");
    if(mysqli_num_rows($sqlAlmuerzos) > 0){
        $almuerzosDiarios = mysqli_fetch_all($sqlAlmuerzos,MYSQLI_ASSOC);
        echo json_encode($almuerzosDiarios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Lista de los almuerzos que ya estan en el sistema sin importar su estado...
if (isset($_GET["almuerzosUserMensual"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"SELECT ax.idalmuerzoxdia, a.nombre_almuerzo, ax.fecha_completa_almuerzo, ax.estado_ensalada, ax.estado_sopa, ax.estadoAlmuerzoEstudiante FROM almuerzo a, almuerzoxdia ax, users u WHERE a.id_almuerzo=ax.id_almuerzo AND u.id_users=ax.id_users AND ax.mes_almuerzo=".$_GET["mes"]." AND u.id_users=".$_GET["almuerzosUserMensual"]." ORDER BY ax.dia_almuerzo ASC;");
    if(mysqli_num_rows($sqlAlmuerzos) > 0){
        $almuerzosDiarios = mysqli_fetch_all($sqlAlmuerzos,MYSQLI_ASSOC);
        echo json_encode($almuerzosDiarios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//
if (isset($_GET["existeAlmuerzoDiarioUser"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"SELECT fecha_almuerzo FROM almuerzoxdia WHERE fecha_almuerzo='".$_GET["fecha"]."' AND id_users=".$_GET["existeAlmuerzoDiarioUser"]);
    if(mysqli_num_rows($sqlAlmuerzos) > 0){
        $almuerzos = true;
        echo json_encode($almuerzos);
        exit();
    }
    else{  
        $almuerzos = false;
        echo json_encode($almuerzos);
    }
}

//
if (isset($_GET["contarAlmuerzosDiariosMenu"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"SELECT COUNT(id_lista_de_almuerzos_mensuales) AS 'cantidad' FROM lista_de_almuerzos_mensuales  WHERE fechaCompleta='".$_GET["contarAlmuerzosDiariosMenu"]."'");
    $almuerzos = mysqli_fetch_array($sqlAlmuerzos);
    echo json_encode($almuerzos["cantidad"]);
}

// Inserta Almuerzos Diarios por alumno (en este es el caso que los padres podrían insertar sus almuerzos)
if(isset($_GET["insertarAlmuerzosDiarios"])){
    $data = json_decode(file_get_contents("php://input"));
    $idU=$data->idUser;
    $idAl=$data->idAlmuerzo;
    $fechaComple=$data->fechaCompleta;
    $fechaAl=$data->fechaAlmuerzo;
    $diaAl=$data->dia;
    $mesAl=$data->mes;
    $anhoAl=$data->anho;
    $opcionSopaAl=$data->opcionSopa;
    $opcionEnsaladaAl=$data->opcionEnsalada;
    $sql = mysqli_query($conexionBD,"INSERT INTO almuerzoxdia(idalmuerzoxdia, id_users, id_almuerzo, fecha_completa_almuerzo, dia_almuerzo, mes_almuerzo, ano_almuerzo, fecha_almuerzo, estadoAlmuerzoEstudiante, estado_sopa, estado_ensalada) VALUES (null,$idU,$idAl,'$fechaComple',$diaAl,$mesAl,$anhoAl,'$fechaAl',1,$opcionSopaAl,$opcionEnsaladaAl);");
    echo json_encode(["success"=>1]);
    exit();
}

//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["eliminarAlmuerzoMensualUsr"])){
    $sqlAlmuerzos = mysqli_query($conexionBD,"DELETE FROM almuerzoxdia WHERE idalmuerzoxdia=".$_GET["eliminarAlmuerzoMensualUsr"]);
    if($sqlAlmuerzos){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertarMenuMensual"])){
    $data = json_decode(file_get_contents("php://input"));
    $id_almuerzo=$data->id_almuerzo;
    $mes_lista_almuerzo=$data->mes_lista_almuerzo;
    $dia_lista_almuerzo=$data->dia_lista_almuerzo;
    $ano_lista_almuerzo=$data->ano_lista_almuerzo;
    $fechaCompleta=$data->fechaCompleta;
    $dia_completo_almuerzo=$data->dia_completo_almuerzo;
    $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO lista_de_almuerzos_mensuales(id_lista_de_almuerzos_mensuales, id_almuerzo, mes_lista_almuerzo, dia_lista_almuerzo, ano_lista_almuerzo, fechaCompleta, dia_completo_almuerzo, estado_almuerzo_mensual) VALUES (null,$id_almuerzo,$mes_lista_almuerzo,$dia_lista_almuerzo,$ano_lista_almuerzo,'$fechaCompleta','$dia_completo_almuerzo',1);");
    echo json_encode(["success"=>1]);
    exit();
}



// Consulta todos los registros de la tabla almuerzo, depediendo si estan activos. esta es la consulta que lanza la api automatica
if (isset($_GET["default"])){
    $sqlListarAlmuerzos = mysqli_query($conexionBD,"SELECT id_almuerzo, nombre_almuerzo FROM almuerzo WHERE estado_almuerzo=1 ORDER BY nombre_almuerzo ASC;");
    if(mysqli_num_rows($sqlListarAlmuerzos) > 0){
        $almuerzos = mysqli_fetch_all($sqlListarAlmuerzos,MYSQLI_ASSOC);
        echo json_encode($almuerzos);
    }
    else{ echo json_encode([["success"=>0]]); }
}

?>