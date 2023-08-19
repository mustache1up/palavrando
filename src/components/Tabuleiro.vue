<template>
  <Tentativa v-for="(tentativa, tentativaIndex) in estado.tentativas" :key="tentativaIndex" :tentativa="tentativa"/>
</template>

<script setup>
import { inject } from "vue";
import Tentativa from "./Tentativa.vue";

const estado = inject("estado");
</script>

<style>
</style>
