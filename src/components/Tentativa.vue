<template>
  <div class="flex flex-row relative">
    <div v-for="(letra, indiceLetra) in tentativa.letras" :key="indiceLetra"
      class="letra text-5xl h-16 w-16 text-center m-[2px] p-[5px] font-mplus-black
        text-stone-800 border-[3px] border-stone-900 rounded-md" 
      :class="{ 
        animacao__pulsa: letra.animacoes.pulsa, 
        animacao__invalida: tentativa.animacoes.invalida 
      }" 
      :data-selected="estado.letraSelecionada == letra"
      :data-status="tentativa === estado.tentativaAtual ? 'atual' : letra.resultado" 
      @animationend="desligaAnimacoes($event.animationName, [tentativa, letra])"
      @click="letraClicada(tentativa, letra)"
    >
      {{letra.caractere}}
    </div>
    <Vue3Lottie v-if="tentativa.animacoes.correta" class="confetes" 
      :animationData="Confetes" :speed="0.8" :loop="false"
    />
  </div>
</template>

<script setup>
import _ from "lodash";
import { inject } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import Confetes from "@/assets/confetes.json";

const estado = inject("estado");
const props = defineProps(["tentativa"]);

const desligaAnimacoes = (animationName, objetosParaDesligarAnimacoes) => {
  const animacao = animationName.replace("animacao__", "");
  for(const objeto of objetosParaDesligarAnimacoes) {
    if(objeto.animacoes?.[animacao]) {
      objeto.animacoes[animacao] = false;
    }
  }
};

const letraClicada = (tentativa, letra) => {
  if (tentativa === estado.tentativaAtual) {
    estado.letraSelecionada = letra;
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

.letra[data-selected="true"] {
  border-color: rgba(253, 245, 230, 1);
  animation: blink 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}

.letra[data-status="atual"] {
  background-color: transparent;
  cursor: pointer;
}

.letra[data-status="ausente"] {
  --tentativa-color:  rgb(98, 98, 98);
}

.letra[data-status="presente"] {
  --tentativa-color:  rgb(160, 134, 19);
}

.letra[data-status="correta"] {
  --tentativa-color: rgb(52, 147, 52);
}

.letra.animacao__pulsa {
  animation: animacao__pulsa 0.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: scale(1);
}

.letra.animacao__invalida {
  animation: animacao__invalida .3s cubic-bezier(0.36, 0.07, 0.19, 0.97) 2;
  border-color: rgb(192, 34, 34);
}

@keyframes animacao__pulsa {
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 20px var(--tentativa-color);
    border-width: 0px;
  }
}

@keyframes animacao__invalida {
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

.animacao__pulsa:nth-child(n)[data-status="atual"] {
  animation-delay: 0s;
}

.animacao__pulsa:nth-child(n) {
  animation-delay: calc(0.08s * var(--nth-child-index));
}

.letra:nth-child(n)[data-status="atual"],
.letra.animacao__invalida:nth-child(n) {
  animation-delay: 0s;
  transition: border-color 0.1s ease-in-out,
}

.confetes {
  width: 400px !important;
  height: 400px !important;
  bottom: -150px;
  position: absolute;
  z-index: 100 0;
}
</style>
