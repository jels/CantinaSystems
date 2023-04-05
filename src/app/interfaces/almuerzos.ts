export interface Almuerzo {
    id_almuerzo: number;
    nombre_almuerzo: string;
    descripcion_almuerzo: string;
    foto_almuerzo: string;
    estado_almuerzo: number;
}

export interface AlmuerzoMensual {
    id_lista_de_almuerzos_mensuales: any,
    id_almuerzo: number,
    mes_lista_almuerzo: number,
    dia_lista_almuerzo: number,
    ano_lista_almuerzo: number,
    fechaCompleta: string,
    dia_completo_almuerzo: string,
    estado_almuerzo_mensual: number
}

export interface ListAlmuerzos {
    id_almuerzo: string;
    nombre_almuerzo: string;
}

export interface newAlmuerzo {
    idUser: number;
    idAlmuerzo: number;
    fechaExtendida: string
    dia: number;
    mes: number;
    anho: number;
    fechaResumida: Date;
    estadoAlmuerzo: number;
    opcionSopa: number;
    opcionEnsalada: number;
}

export interface listaAlmuerzosDiariosUsuario {
    idalmuerzoxdia: number,
    fecha_completa_almuerzo: string,
    nombre_almuerzo: string,
    estadoAlmuerzoEstudiante: number,
    estado_ensalada: number,
    estado_sopa: number
}


