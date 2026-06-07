<template>
  <div class="filtros">
    <h3>Filtrar Tareas</h3>
    
    <div class="grupo-filtro">
      <label for="filtro-usuario">Por Usuario:</label>
      <select
        id="filtro-usuario"
        v-model.number="usuarioSeleccionado"
        @change="aplicarFiltros"
      >
        <option :value="0">Todos</option>
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.nombre }}
        </option>
      </select>
    </div>

    <div class="grupo-filtro">
      <label for="filtro-estado">Por Estado:</label>
      <select
        id="filtro-estado"
        v-model.number="estadoSeleccionado"
        @change="aplicarFiltros"
      >
        <option :value="0">Todos</option>
        <option v-for="estado in estados" :key="estado.id" :value="estado.id">
          {{ estado.nombre }}
        </option>
      </select>
    </div>

    <button @click="limpiarFiltros" class="btn btn-secondary">
      Limpiar Filtros
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Usuario, Estado } from '@/types'

interface Props {
  usuarios: Usuario[]
  estados: Estado[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  filtrar: [filtros: { usuarioId?: number; estadoId?: number }]
}>()

const usuarioSeleccionado = ref(0)
const estadoSeleccionado = ref(0)

const aplicarFiltros = () => {
  const filtros: { usuarioId?: number; estadoId?: number } = {}
  
  if (usuarioSeleccionado.value !== 0) {
    filtros.usuarioId = usuarioSeleccionado.value
  }
  
  if (estadoSeleccionado.value !== 0) {
    filtros.estadoId = estadoSeleccionado.value
  }
  
  emit('filtrar', filtros)
}

const limpiarFiltros = () => {
  usuarioSeleccionado.value = 0
  estadoSeleccionado.value = 0
  emit('filtrar', {})
}
</script>

<style scoped>
.filtros {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filtros h3 {
  margin: 0 0 1rem 0;
  color: #333;
}

.grupo-filtro {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.9rem;
}

select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

select:focus {
  outline: none;
  border-color: #2196F3;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.btn-secondary {
  background-color: #9E9E9E;
  color: white;
}

.btn-secondary:hover {
  background-color: #757575;
}
</style>
