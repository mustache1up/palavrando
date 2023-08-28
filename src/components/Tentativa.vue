<template>
  <div class="flex flex-row">
    <div v-for="(letra, indiceLetra) in letras" :key="indiceLetra" 
      class="letra font-extrabold text-3xl h-14 w-14 text-center m-[2px] p-[6px]
        text-stone-800 border-[3px] border-stone-900 rounded-xl" 
      :class="{ pulse: letra.sacode }" 
      :data-selected="indiceTentativa === estado.indiceTentativaAtual && estado.indiceLetraSelecionada == indiceLetra ? 1 : 0"
      :data-status="letra.resultado ? letra.resultado : indiceTentativa === estado.indiceTentativaAtual ? '' : 'N'" 
      @click="estado.indiceLetraSelecionada=indiceLetra"
    >{{letra.caractere}}</div>
  </div>
</template>

<script setup>
import _ from "lodash";
import { computed, inject } from "vue";
const estado = inject("estado");
const props = defineProps(["tentativa", "indiceTentativa"]);

const letras = computed(() => {
  var zip = _.zip(props.tentativa.letras, props.tentativa.resultado, props.tentativa.sacode);
  var letras = _.map(zip, ([caractere, resultado, sacode]) => {
    return {caractere, resultado, sacode};
  });
  return letras;
});

</script>

<style>
.letra:nth-child(n) {
  transition: background-color 0.25s ease-in-out calc(0.08s * var(--nth-child-index));
}

.letra[data-selected="1"] {
  border-color: green;
}

.letra[data-status='']  {
  background-color: rgb(52, 51, 61, .5);
}

.letra[data-status='N']  {
  background-color: rgb(52, 51, 61, .5);
}

.letra[data-status='T']  {
  background-color: rgb(255, 252, 71);
}

.letra[data-status='C']  {
  background-color: rgb(63, 183, 63);
}

.pulse {
  animation: pulse 0.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: scale(1);
}

@keyframes pulse {
  50% {
    transform: scale(1.2);
  }
}

.pulse:nth-child(n)[data-status=''] {
  animation-delay: 0s;
}

.pulse:nth-child(n) {
  animation-delay: calc(0.08s * var(--nth-child-index));
}

</style>
