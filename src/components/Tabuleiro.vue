<template>
  <Tentativa v-for="(tentativa, tentativaIndex) in estado.tentativas" :key="tentativaIndex" :tentativa="tentativa"/>
</template>

<script setup>
import { defineProps } from "vue";
import Tentativa from "./Tentativa.vue";
const props = defineProps(["estado"]);
</script>

<style>
</style>
