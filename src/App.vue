<template>
  <div class="h-screen w-screen bg-gray-800 flex flex-col items-center justify-center">
    <h1 class="text-5xl font-extrabold mb-14 text-stone-200">
      PALAVRANDO
    </h1>
    <Tabuleiro :estado="estado" />
    <button @click="fazTentativa" class="rounded-lg bg-indigo-600 mt-6 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500
                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      VAI
    </button>
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, provide } from "vue";

import Tabuleiro from "./components/Tabuleiro.vue";
import palavrasValidas from "./assets/palavrasValidas.js";

const estado = reactive({
  palavra: "??????",
  maxTentativas: 20,
  tentativas: []
});

const tentativaVazia = () => {
  return {
    letras: ["", "", "", "", "", ""],
    editavel: true,
  };
};

estado.palavra = palavrasValidas.palavrasValidas[Math.floor(Math.random()*palavrasValidas.palavrasValidas.length)];

estado.tentativas.push(tentativaVazia());
estado.tentativaAtual = estado.tentativas[0];

const fazTentativa = () => {

  const palavraTentativa = estado.tentativaAtual.letras.join("");

  if (!palavrasValidas.palavrasValidas.includes(palavraTentativa)) {
    alert("A tentativa precisa constar no dicionário.\n\nTente outra palavra.");
    return;
  }

  estado.tentativaAtual.editavel = false;

  if (palavraTentativa === estado.palavra) {
    alert("ACERTOU!");
    return;
  }

  if (estado.tentativas.length >= estado.maxTentativas) {
    return;
  }

  const novo = tentativaVazia();

  estado.tentativas.push(novo);
  estado.tentativaAtual = novo;
};

provide("estado", estado);

</script>

<style>
</style>
