<template>
  <h1>PALAVRANDO</h1>
  <Tabuleiro />
</template>

<script setup>
import _ from "lodash";
import { reactive, provide } from "vue";

import Tabuleiro from "./components/Tabuleiro.vue";

const estado = reactive({
  palavra: "ARTIGO",
  max_tentativas: 6,
  tentativas: []
});
provide("estado", estado);

</script>

<style>
</style>
