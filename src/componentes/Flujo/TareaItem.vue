<template>
  <div class="tarea-item" :style="{ borderLeftColor: estadoColor }">
    <div class="tarea-header">
      <h3>{{ tarea.titulo }}</h3>
      <span class="estado-badge" :style="{ backgroundColor: estadoColor }">
        {{ estadoNombre }}
      </span>
    </div>
    
    <p class="descripcion">{{ tarea.descripcion }}</p>
    
    <div class="tarea-info">
      <span class="usuario">👤 {{ usuarioNombre }}</span>
      <span class="fecha" v-if="tarea.fechaVencimiento">
        📅 {{ formatearFecha(tarea.fechaVencimiento) }}
      </span>
    </div>
    
    <div class="tarea-acciones">
      <button @click="editarTarea" class="btn btn-primary">Editar</button>
      <button @click="eliminarTarea" class="btn btn-danger">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Tarea, Usuario, Estado } from '@/types'

interface Props {
  tarea: Tarea
  usuarios: Usuario[]
  estados: Estado[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  editar: [tarea: Tarea]
  eliminar: [id: number]
}>()

const usuarioNombre = computed(() => {
  const usuario = props.usuarios.find(u => u.id === props.tarea.usuarioId)
  return usuario?.nombre || 'Sin asignar'
})

const estadoNombre = computed(() => {
  const estado = props.estados.find(e => e.id === props.tarea.estadoId)
  return estado?.nombre || 'Desconocido'
})

const estadoColor = computed(() => {
  const estado = props.estados.find(e => e.id === props.tarea.estadoId)
  return estado?.color || '#999'
})

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES')
}

const editarTarea = () => {
  emit('editar', props.tarea)
}

const eliminarTarea = () => {
  if (confirm('¿Está seguro de que desea eliminar esta tarea?')) {
    emit('eliminar', props.tarea.id)
  }
}
</script>

<style scoped>
.tarea-item {
  background: white;
  border-left: 4px solid;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.tarea-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.tarea-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tarea-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.estado-badge {
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.descripcion {
  color: #666;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.5;
}

.tarea-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #555;
}

.usuario, .fecha {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.tarea-acciones {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #2196F3;
  color: white;
}

.btn-primary:hover {
  background-color: #1976D2;
}

.btn-danger {
  background-color: #F44336;
  color: white;
}

.btn-danger:hover {
  background-color: #DA190B;
}
</style>
