/* Consultas para insertar directo a la Base de datos */

/* Insertar Entidades a la BD */

INSERT INTO `entidades`(`idEntidad`, `nombreEntidad`, `telefonoEntidad`, `acronimoEntidad`, `estadoEntidad`) 
VALUES (null,'Colegio Adventista de Asuncion','021 266255','CADA',1);

/* Insertar Niveles a la BD */

INSERT INTO `niveles`(`idNivel`, `nombreNivel`, `descripcionNivel`, `acronimoNivel`, `estadoNivel`) 
VALUES (null,'Pre-Jardin','Grado mas bajo','Pre-Jardin',1);

/* Obtener todos los datos de los usuarios por entidades y niveles de la BD */

SELECT * FROM users u, entidades e, niveles n WHERE u.idEntidad=e.idEntidad AND u.idNivel=n.idNivel;

/* Obtener los datos de los usuarios por entidades y niveles solo lo necesario de la BD */

SELECT u.id_users AS "idUser", u.user_name AS "userName", u.user_nombre AS "nombreUser", u.user_apellido AS "apellidoUser", e.acronimoEntidad AS "entidad", n.acronimoNivel AS "nivel" 
FROM users u, entidades e, niveles n WHERE u.idEntidad=e.idEntidad AND u.idNivel=n.idNivel;

/* Obtener los datos de los usuarios por entidades y niveles solo lo necesario de la BD */


/* Obtiene los datos por el dia que se solicite */
SELECT axd.fecha_almuerzo, axd.fecha_completa_almuerzo, 
CONCAT(u.user_nombre," ",u.user_apellido) AS 'nombre_completo', e.acronimoEntidad, n.acronimoNivel, 
n.cicloNivel, u.seccion_user, a.nombre_almuerzo, axd.estado_entregado 
FROM almuerzoxdia axd, almuerzo a, users u, entidades e, niveles n 
WHERE e.idEntidad=u.idEntidad AND n.idNivel=u.idNivel AND u.id_users=axd.id_users 
AND a.id_almuerzo=axd.id_almuerzo AND axd.fecha_almuerzo='20/4/2023' ORDER BY e.acronimoEntidad ASC;



