<template>
  <div class="vista-flujo">
    <div class="header">
      <h1>📋 Gestión de Tareas</h1>
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn btn-primary">
        {{ mostrarFormulario ? 'Ocultar Formulario' : 'Nueva Tarea' }}
      </button>
    </div>

    <!-- Formulario para crear/editar -->
    <FormularioTarea
      v-if="mostrarFormulario"
      :tarea-edicion="tareaEnEdicion"
      :usuarios="usuarios"
      :estados="estados"
      @guardar="guardarTarea"
      @cancelar="cancelarEdicion"
    />

    <!-- Filtros -->
    <FiltroTareas
      :usuarios="usuarios"
      :estados="estados"
      @filtrar="aplicarFiltros"
    />

    <!-- Estado de carga/error -->
    <div v-if="cargando" class="mensaje-carga">
      ⏳ Cargando tareas...
    </div>

    <div v-if="error" class="mensaje-error">
      ❌ Error: {{ error }}
    </div>

    <!-- Listado de tareas -->
    <div v-if="!cargando && tareasFiltradas.length === 0" class="mensaje-vacio">
      📭 No hay tareas para mostrar
    </div>

    <div v-if="!cargando && tareasFiltradas.length > 0" class="tareas-lista">
      <p class="contador">{{ tareasFiltradas.length }} tarea(s) encontrada(s)</p>
      <TareaItem
        v-for="tarea in tareasFiltradas"
        :key="tarea.id"
        :tarea="tarea"
        :usuarios="usuarios"
        :estados="estados"
        @editar="iniciarEdicion"
        @eliminar="eliminarTarea"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FormularioTarea from './FormularioTarea.vue'
import TareaItem from './TareaItem.vue'
import FiltroTareas from './FiltroTareas.vue'
import { TareaService } from '@/servicios/tareaService'
import { UsuarioService } from '@/servicios/usuarioService'
import { EstadoService } from '@/servicios/estadoService'
import type { Tarea, Usuario, Estado } from '@/types'

// Estados reactivos
const tareas = ref<Tarea[]>([])
const usuarios = ref<Usuario[]>([])
const estados = ref<Estado[]>([])
const cargando = ref(false)
const error = ref('')
const mostrarFormulario = ref(false)
const tareaEnEdicion = ref<Tarea | null>(null)

// Filtros
const filtrosActivos = ref<{
  usuarioId?: number
  estadoId?: number
}>({})

// Computed: tareas filtradas
const tareasFiltradas = computed(() => {
  return tareas.value.filter(tarea => {
    if (filtrosActivos.value.usuarioId && tarea.usuarioId !== filtrosActivos.value.usuarioId) {
      return false
    }
    if (filtrosActivos.value.estadoId && tarea.estadoId !== filtrosActivos.value.estadoId) {
      return false
    }
    return true
  })
})

// Métodos
const cargarDatos = async () => {
  cargando.value = true
  error.value = ''
  
  try {
    const [tareasData, usuariosData, estadosData] = await Promise.all([
      TareaService.obtenerTodas(),
      UsuarioService.obtenerTodos(),
      EstadoService.obtenerTodos()
    ])
    
    tareas.value = tareasData
    usuarios.value = usuariosData
    estados.value = estadosData
  } catch (err) {
    error.value = 'No se pudieron cargar los datos. Asegúrate de que json-server está ejecutándose en el puerto 3001'
    console.error(err)
  } finally {
    cargando.value = false
  }
}

const guardarTarea = async (tarea: Omit<Tarea, 'id'> & Partial<{ id: number }>) => {
  try {
    if (tareaEnEdicion.value) {
      // Actualizar
      const tareaActualizada = await TareaService.actualizar(tareaEnEdicion.value.id, tarea)
      const indice = tareas.value.findIndex(t => t.id === tareaEnEdicion.value!.id)
      if (indice !== -1) {
        tareas.value[indice] = tareaActualizada
      }
    } else {
      // Crear nueva
      const tareaNueva = await TareaService.crear(tarea)
      tareas.value.push(tareaNueva)
    }
    
    mostrarFormulario.value = false
    cancelarEdicion()
  } catch (err) {
    error.value = 'Error al guardar la tarea'
    console.error(err)
  }
}

const iniciarEdicion = (tarea: Tarea) => {
  tareaEnEdicion.value = tarea
  mostrarFormulario.value = true
}

const cancelarEdicion = () => {
  tareaEnEdicion.value = null
}

const eliminarTarea = async (id: number) => {
  try {
    await TareaService.eliminar(id)
    tareas.value = tareas.value.filter(t => t.id !== id)
  } catch (err) {
    error.value = 'Error al eliminar la tarea'
    console.error(err)
  }
}

const aplicarFiltros = (filtros: { usuarioId?: number; estadoId?: number }) => {
  filtrosActivos.value = filtros
}

// Lifecycle hook: cargar datos cuando el componente se monta
onMounted(() => {
  cargarDatos()
})
</script>

<style scoped>
.vista-flujo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f9f9f9;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
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

.btn-primary {
  background-color: #2196F3;
  color: white;
}

.btn-primary:hover {
  background-color: #1976D2;
}

.mensaje-carga,
.mensaje-error,
.mensaje-vacio {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.mensaje-carga {
  background-color: #E3F2FD;
  color: #1976D2;
}

.mensaje-error {
  background-color: #FFEBEE;
  color: #C62828;
}

.mensaje-vacio {
  background-color: #F5F5F5;
  color: #666;
}

.tareas-lista {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
}

.contador {
  color: #666;
  margin: 0 0 1rem 0;
  font-weight: bold;
}
</style>
