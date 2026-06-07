<template>
  <div class="formulario-tarea">
    <h2>{{ esEdicion ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
    
    <form @submit.prevent="guardarTarea">
      <div class="grupo-formulario">
        <label for="titulo">Título:</label>
        <input
          id="titulo"
          v-model="formulario.titulo"
          type="text"
          placeholder="Ingrese el título de la tarea"
          required
        />
      </div>

      <div class="grupo-formulario">
        <label for="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          v-model="formulario.descripcion"
          placeholder="Ingrese la descripción"
          rows="4"
        ></textarea>
      </div>

      <div class="grupo-formulario">
        <label for="usuario">Asignado a:</label>
        <select id="usuario" v-model.number="formulario.usuarioId" required>
          <option value="" disabled>Seleccione un usuario</option>
          <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
            {{ usuario.nombre }}
          </option>
        </select>
      </div>

      <div class="grupo-formulario">
        <label for="estado">Estado:</label>
        <select id="estado" v-model.number="formulario.estadoId" required>
          <option value="" disabled>Seleccione un estado</option>
          <option v-for="estado in estados" :key="estado.id" :value="estado.id">
            {{ estado.nombre }} 
          </option>
        </select>
      </div>

      <div class="grupo-formulario">
        <label for="fecha">Fecha de Vencimiento:</label>
        <input
          id="fecha"
          v-model="formulario.fechaVencimiento"
          type="date"
        />
      </div>

      <div class="acciones">
        <button type="submit" class="btn btn-success">
          {{ esEdicion ? 'Actualizar' : 'Crear' }}
        </button>
        <button type="button" @click="cancelar" class="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Tarea, Usuario, Estado } from '@/types'

interface Props {
  tareaEdicion?: Tarea | null
  usuarios: Usuario[]
  estados: Estado[]
}

interface FormularioTarea {
  titulo: string
  descripcion: string
  usuarioId: number | string
  estadoId: number | string
  fechaVencimiento: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  guardar: [tarea: Omit<Tarea, 'id'> & Partial<{ id: number }>]
  cancelar: []
}>()

const formulario = ref<FormularioTarea>({
  titulo: '',
  descripcion: '',
  usuarioId: '',
  estadoId: '',
  fechaVencimiento: ''
})

const esEdicion = computed(() => !!props.tareaEdicion)

// Cargar datos cuando hay una tarea en edición
watch(
  () => props.tareaEdicion,
  (tarea) => {
    if (tarea) {
      formulario.value = {
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        usuarioId: tarea.usuarioId,
        estadoId: tarea.estadoId,
        fechaVencimiento: tarea.fechaVencimiento || ''
      }
    }
  }
)

const guardarTarea = () => {
  const nuevaTarea = {
    ...(esEdicion.value && props.tareaEdicion ? { id: props.tareaEdicion.id } : {}),
    titulo: formulario.value.titulo,
    descripcion: formulario.value.descripcion,
    usuarioId: Number(formulario.value.usuarioId),
    estadoId: Number(formulario.value.estadoId),
    fechaVencimiento: formulario.value.fechaVencimiento || undefined,
    fechaCreacion: props.tareaEdicion?.fechaCreacion || new Date().toISOString().split('T')[0]
  }
  
  emit('guardar', nuevaTarea as any)
  limpiarFormulario()
}

const cancelar = () => {
  limpiarFormulario()
  emit('cancelar')
}

const limpiarFormulario = () => {
  formulario.value = {
    titulo: '',
    descripcion: '',
    usuarioId: '',
    estadoId: '',
    fechaVencimiento: ''
  }
}
</script>

<style scoped>
.formulario-tarea {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.formulario-tarea h2 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grupo-formulario {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

input,
select,
textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.acciones {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

.btn-success {
  background-color: #4CAF50;
  color: white;
}

.btn-success:hover {
  background-color: #388E3C;
}

.btn-secondary {
  background-color: #9E9E9E;
  color: white;
}

.btn-secondary:hover {
  background-color: #757575;
}
</style>
