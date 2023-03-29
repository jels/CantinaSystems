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


