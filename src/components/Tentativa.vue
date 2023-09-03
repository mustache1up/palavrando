<template>
  <div class="flex flex-row">
    <div v-for="(letra, indiceLetra) in letras" :key="indiceLetra" 
      class="letra text-5xl h-16 w-16 text-center m-[2px] p-[5px] font-mplus-black
        text-stone-800 border-[3px] border-stone-900 rounded-md" 
      :class="{ pulse: letra.sacode, invalida: tentativa.invalida }" 
      :data-selected="indiceTentativa === estado.indiceTentativaAtual && estado.indiceLetraSelecionada == indiceLetra ? 1 : 0"
      :data-status="letra.resultado ? letra.resultado : indiceTentativa === estado.indiceTentativaAtual ? '' : 'O'" 
      @animationend="desligaAnimacoes($event.animationName, tentativa, indiceLetra)"
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

const desligaAnimacoes = (animationName, tentativa, indiceLetra) => {
  switch (animationName) {
    case "pulse":
      tentativa.sacode[indiceLetra] = false;
      break;
    case "treme":
      tentativa.invalida = false;
      break;
  }
};

</script>

<style>
.letra {
  color: oldlace;
  --tentativa-color: rgb(59, 59, 59);
  background-color: var(--tentativa-color);
  border-color: var(--tentativa-color);
}

.letra:nth-child(n) {
  transition: background-color 0.25s ease-in-out calc(0.08s * var(--nth-child-index)),
              border-color 0.25s ease-in-out calc(0.08s * var(--nth-child-index));
}

.letra[data-selected="1"] {
  border-color: rgba(253, 245, 230, 1);
  animation: blink 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}

.letra[data-status=''] {
  background-color: transparent;
  cursor: pointer;
}

.letra[data-status='N'] {
  --tentativa-color:  rgb(98, 98, 98);
}

.letra[data-status='T'] {
  --tentativa-color:  rgb(160, 134, 19);
}

.letra[data-status='C'] {
  --tentativa-color: rgb(52, 147, 52);
}

.letra.pulse {
  animation: pulse 0.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: scale(1);
}

.letra.invalida {
  animation: treme .3s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2;
  border-color: rgb(192, 34, 34);
}

@keyframes pulse {
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 20px var(--tentativa-color);
    border-width: 0px;
  }
}

@keyframes treme {
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 20px rgb(192, 34, 34);
  }
}

@keyframes blink {
  10%, 80% {
    border-color: rgba(253, 245, 230, 1);
  }
  50% {
    border-color: rgba(253, 245, 230, .5);
  }
}

.pulse:nth-child(n)[data-status=''] {
  animation-delay: 0s;
}

.pulse:nth-child(n) {
  animation-delay: calc(0.08s * var(--nth-child-index));
}

.letra:nth-child(n)[data-status=''],
.letra.invalida:nth-child(n) {
  animation-delay: 0s;
  transition: border-color 0.1s ease-in-out,
}

</style>
