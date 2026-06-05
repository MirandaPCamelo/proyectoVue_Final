<template>
  <ul>
    <li v-for="t in tareas" :key="t.id">
      <ItemTarea
        :tarea="t"
        :usuarios="usuarios"
        :proyectos="proyectos"
        @borrar="() => $emit('borrarTarea', t.id)"
        @guardar="(x) => $emit('editarTarea', x)"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Tarea, Usuario, Proyecto } from "../../types";
import { defineProps } from "vue";
import ItemTarea from "./ItemTarea.vue";

const props = defineProps<{
  tareas: Tarea[];
  usuarios: Usuario[];
  proyectos: Proyecto[];
}>();
</script>
