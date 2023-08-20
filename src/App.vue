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
import { reactive } from "vue";

import Tabuleiro from "./components/Tabuleiro.vue";

const estado = reactive({
  palavra: "ARTIGO",
  max_tentativas: 6,
  tentativas: [
    {
      palavra: "CAFONA",
      resultado: "NTNTNN",
    },{
      palavra: "ARTIGO",
      resultado: "CCCCCC",
    },{
      palavra: "      ",
      resultado: "      ",
    }
  ]
});

</script>

<style>
</style>
