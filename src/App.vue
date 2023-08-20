<template>
  <div class="h-screen w-screen bg-gray-800 flex flex-col items-center justify-center">
    <h1 class="text-5xl font-extrabold mb-14 text-stone-200">
      PALAVRANDO
    </h1>
    <Tabuleiro :estado="estado" />
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, provide } from "vue";

import Tabuleiro from "./components/Tabuleiro.vue";

const estado = reactive({
  palavra: "ARTIGO",
  maxTentativas: 6,
  tentativas: [
    {
      palavra: ["C", "A", "F", "O", "N", "A"],
      resultado: ["N", "T", "N", "T", "N", "N"],
    },{
      palavra: ["A", "R", "T", "I", "G", "O"],
      resultado: ["C", "C", "C", "C", "C", "C"],
    },{
      palavra: ["", "", "", "", "", ""],
      resultado: ["", "", "", "", "", ""],
      editavel: true,
    }
  ]
});

provide("estado", estado);

</script>

<style>
</style>
