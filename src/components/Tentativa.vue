<template>
  <div class="flex flex-row">
    <div v-for="(letra, indiceLetra) in letras" :key="indiceLetra" 
      class="letra font-extrabold text-3xl h-14 w-14 text-center m-[2px]
        text-stone-800 border-4 border-stone-900 rounded-xl" 
      :data-selected="tentativa.editavel && estado.indiceLetraSelecionada == indiceLetra ? 1 : 0"
      :data-status="letra.resultado" 
      @click="estado.indiceLetraSelecionada=indiceLetra"
    >{{letra.caractere}}</div>
  </div>
</template>

<script setup>
import _ from "lodash";
import { computed, inject } from "vue";
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
.letra[data-selected="1"] {
  border-color: green;
}

.letra[data-status='']  {
  background-color: white;
}

.letra[data-status='N']  {
  background-color: gray;
}

.letra[data-status='T']  {
  background-color: yellow;
}

.letra[data-status='C']  {
  background-color: green;
}
</style>
