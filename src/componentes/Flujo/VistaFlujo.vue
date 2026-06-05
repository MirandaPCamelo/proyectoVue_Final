<template>
  <div>
    <h1>Flujo de Trabajo</h1>

    <label>
      Filtrar por estado:
      <select v-model="filtro">
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en-progreso">En progreso</option>
        <option value="finalizado">Finalizado</option>
      </select>
    </label>

    <FormularioTarea :usuarios="usuarios" :proyectos="proyectos" @guardado="recargar" />

    <ListaTareas
      v-if="tareas.length > 0"
      :tareas="tareasFiltradas"
      :usuarios="usuarios"
      :proyectos="proyectos"
      @borrarTarea="onBorrar"
      @editarTarea="onEditar"
    />
    <div v-else>No hay tareas.</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import type { Tarea, Usuario, Proyecto } from "../../types";
import { obtenerTareas, obtenerUsuarios, obtenerProyectos, eliminarTarea, actualizarTarea } from "../../servicios/api";
import ListaTareas from "./ListaTareas.vue";
import FormularioTarea from "./FormularioTarea.vue";

const tareas = ref<Tarea[]>([]);
const usuarios = ref<Usuario[]>([]);
const proyectos = ref<Proyecto[]>([]);
const filtro = ref<string>("");

async function cargarTodo() {
  const [rTareas, rUsuarios, rProyectos] = await Promise.all([obtenerTareas(), obtenerUsuarios(), obtenerProyectos()]);
  tareas.value = rTareas.data;
  usuarios.value = rUsuarios.data;
  proyectos.value = rProyectos.data;
}

onMounted(cargarTodo);

const tareasFiltradas = computed(() =>
  tareas.value.filter(t => (filtro.value ? t.estado === filtro.value : true))
);

function recargar() { cargarTodo(); }

async function onBorrar(id: number) {
  await eliminarTarea(id);
  await cargarTodo();
}

async function onEditar(tarea: Tarea) {
  await actualizarTarea(tarea.id, tarea);
  await cargarTodo();
}
</script>
