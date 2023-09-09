<template>
  <Tentativa v-for="(tentativa, indiceTentativa) in tentativas" :key="indiceTentativa" 
    :tentativa="tentativa" tabIndex={0}
  />
</template>

<script setup>
import Tentativa from "./Tentativa.vue";
const props = defineProps(["tentativas"]);
</script>

<style>
</style>
