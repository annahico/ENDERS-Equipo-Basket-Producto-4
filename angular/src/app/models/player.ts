export interface Player {
    id?: string;      // string porque Firebase genera IDs de tipo string, y opcional porque al crear un jugador nuevo aún no tiene id
    nombre: string;
    apellidos: string;
    posicion: string;
    edad: number;
    altura: number;
    foto: string;
    videos: string[];
}