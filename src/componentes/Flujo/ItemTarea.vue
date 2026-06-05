<template>
  <div class="item-tarea">
    <h3>{{ tarea.titulo }}</h3>
    <div>Proyecto: {{ tituloProyecto }}</div>
    <div>Asignado a: {{ nombreUsuario }}</div>

    <div>
      Estado:
      <select v-model="local.estado">
        <option value="pendiente">pendiente</option>
        <option value="en-progreso">en-progreso</option>
        <option value="finalizado">finalizado</option>
      </select>
    </div>

    <button @click="$emit('guardar', local)">Guardar</button>
    <button @click="$emit('borrar')">Eliminar</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import type { Tarea, Usuario, Proyecto } from "../../types";
const props = defineProps<{ tarea: Tarea; usuarios: Usuario[]; proyectos: Proyecto[] }>();

const local = reactive({ ...props.tarea });

const tituloProyecto = computed(() => props.proyectos.find(p => p.id === local.proyectoId)?.titulo ?? "—");
const nombreUsuario = computed(() => props.usuarios.find(u => u.id === local.asignadoA)?.nombre ?? "—");
</script>
