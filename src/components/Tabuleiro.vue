<template>
  <Tentativa name="tentativa" v-for="(tentativa, tentativaIndex) in tentativas" :key="tentativaIndex" :tentativa="tentativa" @keypress.prevent="lida"/>
</template>

<script setup>
import Tentativa from "./Tentativa.vue";
const props = defineProps(["tentativas"]);
const emit = defineEmits("letra, enviar");

const normaliza = (novaLetra) => {
  return novaLetra.normalize("NFKD").replace(/\p{Diacritic}/gu, "").toUpperCase();
};

const lida = (event) => {
  if(event.key === "ENTER") {
    emit("enviar"); 
    return;
  }
  emit("letra", normaliza(event.key));
};
</script>

<style>
</style>
