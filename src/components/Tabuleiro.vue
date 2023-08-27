<template>
  <Tentativa tabIndex={0} name="tentativa" v-for="(tentativa, tentativaIndex) in tentativas" :key="tentativaIndex" :tentativa="tentativa" @keydown.capture.prevent="lida"/>
</template>

<script setup>
import Tentativa from "./Tentativa.vue";
import normaliza from "../assets/normaliza.js";

const props = defineProps(["tentativas"]);
const emit = defineEmits(["letra", "enviar", "backspace"]);

const lida = (event) => {
  const normalizado = normaliza(event.key);
  if(normalizado === "BACKSPACE") {
    emit("backspace"); 
    return;
  }
  if(normalizado === "ENTER") {
    emit("enviar"); 
    return;
  }
  if(normalizado.match("^[A-Z]$")) {
    emit("letra", normalizado);
  }
};
</script>

<style>
</style>
