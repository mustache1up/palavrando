<template>
  <div class="flex flex-row">
    <Letra v-for="(letra, letraIndex) in tentativa.split('')" :key="letraIndex" :letra="letra"/>
  </div>
</template>

<script setup>
import Letra from "./Letra.vue";
const props = defineProps(["tentativa"]);
</script>

<style>
</style>
