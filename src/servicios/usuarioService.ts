import axios from 'axios'
import type { Usuario } from '@/types'

const API_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL
})

export const UsuarioService = {
  obtenerTodos(): Promise<Usuario[]> {
    return api.get('/usuarios').then(res => res.data)
  },

  obtenerPorId(id: number): Promise<Usuario> {
    return api.get(`/usuarios/${id}`).then(res => res.data)
  }
}
