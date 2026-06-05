<template>
  <form @submit.prevent="onEnviar">
    <input v-model="modelo.titulo" placeholder="Título de la tarea" />

    <select v-model.number="modelo.proyectoId">
      <option disabled value="">Selecciona proyecto</option>
      <option v-for="p in proyectos" :key="p.id" :value="p.id">{{ p.titulo }}</option>
    </select>

    <select v-model.number="modelo.asignadoA">
      <option disabled value="">Selecciona usuario</option>
      <option v-for="u in usuarios" :key="u.id" :value="u.id">{{ u.nombre }}</option>
    </select>

    <button type="submit">Crear tarea</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { Usuario, Proyecto, Tarea } from "../../types";
import { crearTarea } from "../../servicios/api";

const props = defineProps<{ usuarios: Usuario[]; proyectos: Proyecto[] }>();
const emit = defineEmits<() => void>();

const modelo = reactive<Partial<Tarea>>({
  titulo: "",
  proyectoId: undefined,
  asignadoA: undefined,
  estado: "pendiente"
});

async function onEnviar() {
  await crearTarea(modelo);
  emit("guardado");
  modelo.titulo = "";
  modelo.proyectoId = undefined;
  modelo.asignadoA = undefined;
}
</script>
