export interface Usuario {
    id_users: any,
    user_name: string,
    user_pass: string,
    user_rol: string,
    user_estado: string,
    user_foto: string,
    user_apellido: string,
    user_nombre: string,
    idEntidad: string,
    idNivel: string,
    seccion_user: string
}

export interface bajaUser {
    id_user: number,
    estado_user: number
}