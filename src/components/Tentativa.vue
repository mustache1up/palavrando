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

const resultado = (palavra, palavraCerta) => {
  var resultado = [];  
  palavra.split("").forEach((caractere, index) => {
    if(caractere === palavraCerta[index]) {
      resultado.push("C");
      return;
    }

    // TODO: marcar somente a qtd de vezes que a letra aparece
    if(palavraCerta.includes(caractere)) {
      resultado.push("T"); 
      return;
    }

    resultado.push("N");
  });
  return resultado;
};

const letras = computed(() => {
  var zip = _.zip(props.tentativa.palavra.split(""), resultado(props.tentativa.palavra, "ARTIGO"));
  var letras = _.map(zip, ([caractere, resultado]) => {
    return {caractere, resultado};
  });
  return letras;
});

</script>

<style>
</style>
