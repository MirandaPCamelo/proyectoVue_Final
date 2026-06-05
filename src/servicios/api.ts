import axios from "axios";
import type { Tarea, Proyecto, Usuario } from "../types";
const api = axios.create({ baseURL: "http://localhost:3001" });

export const obtenerTareas = () => api.get<Tarea[]>("/tareas");
export const obtenerTarea = (id: number) => api.get<Tarea>(`/tareas/${id}`);
export const crearTarea = (payload: Partial<Tarea>) => api.post<Tarea>("/tareas", payload);
export const actualizarTarea = (id: number, payload: Partial<Tarea>) => api.put<Tarea>(`/tareas/${id}`, payload);
export const eliminarTarea = (id: number) => api.delete(`/tareas/${id}`);

export const obtenerProyectos = () => api.get<Proyecto[]>("/proyectos");
export const obtenerUsuarios = () => api.get<Usuario[]>("/usuarios");
