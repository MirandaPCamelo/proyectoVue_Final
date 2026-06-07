import axios from 'axios'
import type { Estado } from '@/types'

const API_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL
})

export const EstadoService = {
  obtenerTodos(): Promise<Estado[]> {
    return api.get('/estados').then(res => res.data)
  },

  obtenerPorId(id: number): Promise<Estado> {
    return api.get(`/estados/${id}`).then(res => res.data)
  }
}
