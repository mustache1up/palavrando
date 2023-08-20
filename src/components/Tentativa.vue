<template>
  <div class="flex flex-row">
    <Letra v-for="(letra, indiceLetra) in letras" :key="indiceLetra" 
        :letra="letra" :editavel="tentativa.editavel" :indiceLetra="indiceLetra"/>
  </div>
</template>

<script setup>
import _ from "lodash";
import { computed } from "vue";
import Letra from "./Letra.vue";
const props = defineProps(["tentativa"]);

const resultado = (letras, palavraCerta) => {
  var resultado = [];  
  letras.forEach((caractere, index) => {
    if(!caractere || props.tentativa.editavel ) {
      resultado.push("");
      return;
    }

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
  var zip = _.zip(props.tentativa.letras, resultado(props.tentativa.letras, "ARTIGO"));
  var letras = _.map(zip, ([caractere, resultado]) => {
    return {caractere, resultado};
  });
  return letras;
});

</script>

<style>
</style>
