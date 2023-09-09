<template>
  <Tentativa v-for="(tentativa, indiceTentativa) in tentativas" :key="indiceTentativa" 
    :tentativa="tentativa" :indiceTentativa="indiceTentativa" 
    tabIndex={0} name="tentativa"
    @keydown.stop="teclaPressionada"
  />
</template>

<script setup>
import Tentativa from "./Tentativa.vue";
import normaliza from "../assets/normaliza.js";

const props = defineProps(["tentativas"]);
const emit = defineEmits(["letra", "enviar", "backspace", "limpa", "avanca"]);

const teclaPressionada = (event) => {
  const normalizado = normaliza(event.key);
  if(normalizado === "DELETE") {
    emit("limpa"); 
    return;
  }
  if(normalizado === "BACKSPACE") {
    emit("backspace"); 
    return;
  }
  if(normalizado === "ENTER") {
    emit("enviar"); 
    return;
  }
  if(normalizado === "ARROWLEFT") {
    emit("avanca", -1);
    return;
  }
  if(normalizado === "ARROWRIGHT" || normalizado === " ") {
    emit("avanca", 1);
    return;
  }
  if(normalizado.match("^[A-Z]$")) {
    emit("letra", normalizado);
    return;
  }
};
</script>

<style>
</style>
