<template>
  <div class="h-screen w-screen bg-cyan-200 flex flex-col items-center justify-center">
    <h1 class="text-5xl font-extrabold mb-14">
      PALAVRANDO
    </h1>
    <Tabuleiro />
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, provide } from "vue";

import Tabuleiro from "./components/Tabuleiro.vue";

const estado = reactive({
  palavra: "ARTIGO",
  max_tentativas: 6,
  tentativas: ["CAFONA", "ARTIGO", "", "", "", ""]
});
provide("estado", estado);

</script>

<style>
</style>
