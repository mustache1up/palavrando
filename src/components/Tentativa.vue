<template>
  <div class="flex flex-row">
    <div v-for="(letra, indiceLetra) in letras" :key="indiceLetra" 
      class="letra font-extrabold text-3xl h-14 w-14 text-center m-[2px] p-[6px]
        text-stone-800 border-[3px] border-stone-900 rounded-xl" 
      :data-selected="indiceTentativa === estado.indiceTentativaAtual && estado.indiceLetraSelecionada == indiceLetra ? 1 : 0"
      :data-status="letra.resultado" 
      @click="estado.indiceLetraSelecionada=indiceLetra"
    >{{letra.caractere}}</div>
  </div>
</template>

<script setup>
import _ from "lodash";
import { computed, inject } from "vue";
const estado = inject("estado");
const props = defineProps(["tentativa", "indiceTentativa"]);

const resultado = (letrasTentativa, letrasCerta) => {
  var resultado = new Array(6).fill("");  
  console.log(props.indiceTentativa);
  console.log(estado.indiceTentativaAtual);
  if( props.indiceTentativa === estado.indiceTentativaAtual ) {
    return resultado;
  }
  letrasTentativa.forEach((caractere, index) => {
    if(caractere === letrasCerta[index]) {
      resultado[index] = "C";
      letrasCerta[index] = "";
    } else if(letrasCerta.includes(caractere)) {
      resultado[index] = "T";
      letrasCerta[letrasCerta.indexOf(caractere)] = "";
    } else {
      resultado[index] = "N";
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
  background-color: rgb(130, 130, 130);
}

.letra[data-status='T']  {
  background-color: rgb(255, 252, 71);
}

.letra[data-status='C']  {
  background-color: rgb(63, 183, 63);
}
</style>
