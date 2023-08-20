<template>
  <div class="h-screen w-screen bg-gray-800 flex flex-col items-center justify-center">
    <h1 class="text-5xl font-extrabold mb-14 text-stone-200">
      PALAVRANDO
    </h1>
    <Tabuleiro :estado="estado" />
    <button @click="vai" class="rounded-lg bg-indigo-600 mt-6 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">VAI</button>
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, provide } from "vue";

import Tabuleiro from "./components/Tabuleiro.vue";

const estado = reactive({
  letras: "ARTIGO",
  maxTentativas: 6,
  tentativas: [
    {
      editavel: true,
      letras: ["", "", "", "", "", ""],
    },
  ]
});

estado.tentativaAtual = estado.tentativas[0];

const vai = () => {
  estado.tentativaAtual.editavel = false;
  const novo = {
    letras: ["", "", "", "", "", ""],
    editavel: true,
  };
  estado.tentativas.push(novo);
  estado.tentativaAtual = novo;
};

provide("estado", estado);

</script>

<style>
</style>
