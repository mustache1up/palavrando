<template>
  <div class="flex flex-row">
    <Letra v-for="(letra, letraIndex) in letras" :key="letraIndex" :letra="letra"/>
  </div>
</template>

<script setup>
import _ from "lodash";
import { computed } from "vue";
import Letra from "./Letra.vue";
const props = defineProps(["tentativa"]);
const letras = computed(() => {
  var zip = _.zip(props.tentativa.palavra.split(""), props.tentativa.resultado.split(""));
  var letras = _.map(zip, ([caractere, resultado]) => {
    return {caractere, resultado};
  });
  return letras;
});

</script>

<style>
</style>
