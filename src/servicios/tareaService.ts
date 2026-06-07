import axios from 'axios'
import type { Tarea } from '@/types'

const API_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL
})

export const TareaService = {
  obtenerTodas(): Promise<Tarea[]> {
    return api.get('/tareas').then(res => res.data)
  },

  obtenerPorId(id: number): Promise<Tarea> {
    return api.get(`/tareas/${id}`).then(res => res.data)
  },

  crear(tarea: Omit<Tarea, 'id'>): Promise<Tarea> {
    return api.post('/tareas', tarea).then(res => res.data)
  },

  actualizar(id: number, tarea: Partial<Tarea>): Promise<Tarea> {
    return api.patch(`/tareas/${id}`, tarea).then(res => res.data)
  },

  eliminar(id: number): Promise<void> {
    return api.delete(`/tareas/${id}`).then(() => undefined)
  }
}
