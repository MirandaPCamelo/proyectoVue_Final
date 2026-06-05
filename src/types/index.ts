export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}
export interface Proyecto {
  id: number;
  titulo: string;
  propietarioId: number;
}
export type Estado = "pendiente" | "en-progreso" | "finalizado";
export interface Tarea {
  id: number;
  proyectoId: number;
  titulo: string;
  asignadoA: number;
  estado: Estado;
}
