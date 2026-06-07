export interface Estado {
  id: number;
  nombre: string;
  color: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estadoId: number;
  usuarioId: number;
  fechaCreacion: string;
  fechaVencimiento?: string;
}
