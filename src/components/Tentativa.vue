<template>
  <div class="flex flex-row">
    <Letra v-for="(letra, indiceLetra) in letras" :key="indiceLetra" 
        :letra="letra" :editavel="tentativa.editavel" :indiceLetra="indiceLetra" />
  </div>
</template>

<script setup>
import _ from "lodash";
import { computed, inject } from "vue";
import Letra from "./Letra.vue";
const estado = inject("estado");
const props = defineProps(["tentativa"]);

const resultado = (letrasTentativa, letrasCerta) => {
  var resultado = ["", "", "", "", "", ""];  
  if( props.tentativa.editavel ) {
    return resultado;
  }
  resultado = ["N", "N", "N", "N", "N", "N"];  
  letrasTentativa.forEach((caractere, index) => {
    if(caractere === letrasCerta[index]) {
      resultado[index] = "C";
      letrasCerta[index] = "";
    }
  });
  letrasTentativa.forEach((caractere, index) => {
    if(letrasCerta.includes(caractere)) {
      resultado[index] = "T";
      letrasCerta[letrasCerta.indexOf(caractere)] = "";
    }
  });
  return resultado;
};

const letras = computed(() => {
  var zip = _.zip(props.tentativa.letras, resultado(props.tentativa.letras, [...estado.letrasCerta]));
  var letras = _.map(zip, ([caractere, resultado]) => {
    return {caractere, resultado};
  });
  return letras;
});

</script>

<style>
</style>
