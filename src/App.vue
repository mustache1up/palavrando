<template>
  <div class="h-screen w-screen bg-gray-800 flex flex-col items-center justify-center">
    <h1 class="text-5xl font-extrabold mb-14 text-stone-200">
      PALAVRANDO
    </h1>
    <Tabuleiro :tentativas="estado.tentativas" @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
    <Teclado class="mt-5" @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, provide, watch } from "vue";

import Teclado from "./components/Teclado.vue";
import Tabuleiro from "./components/Tabuleiro.vue";
import palavrasValidas from "./assets/palavrasValidas.js";
import normaliza from "./assets/normaliza.js";

const estado = reactive({
  palavra: "??????",
  palavraSemAcentuacao: "??????",
  letrasCerta: [],
  maxTentativas: 20,
  tentativas: [],
  indiceLetraSelecionada: 0,
});

const tentativaVazia = () => {
  return {
    letras: ["", "", "", "", "", ""],
    editavel: true,
  };
};

estado.palavra = palavrasValidas.palavrasValidas[Math.floor(Math.random()*palavrasValidas.palavrasValidas.length)];
estado.palavra = estado.palavra.toUpperCase();
estado.palavra = "SACRAS";
estado.palavraSemAcentuacao = normaliza(estado.palavra);
estado.indiceLetraSelecionada = 0;

estado.tentativas.push(tentativaVazia());
estado.tentativaAtual = estado.tentativas[0];
estado.tentativaAtual = estado.tentativas[0];

const backspace = () => {
  estado.tentativaAtual.letras[estado.indiceLetraSelecionada] = "";
  estado.indiceLetraSelecionada = _.clamp(estado.indiceLetraSelecionada - 1, 0, estado.tentativaAtual.letras.length - 1);
};

const letra = (letra) => {
  estado.tentativaAtual.letras[estado.indiceLetraSelecionada] = letra;
  estado.indiceLetraSelecionada = _.clamp(estado.indiceLetraSelecionada + 1, 0, estado.tentativaAtual.letras.length - 1);
};

watch(() => estado.indiceLetraSelecionada, (indice) => {
  const x = document.getElementsByName("tentativa");
  const tentativaAtual = x[x.length - 1];
  tentativaAtual.children[indice].focus(); // TODO: focar ao iniciar
}, {
  flush: "post",
});

const fazTentativa = () => {

  const palavraTentativa = estado.tentativaAtual.letras.join("");

  if (estado.tentativaAtual.letras.includes("")) {
    return;
  }

  if (palavraTentativa === estado.palavraSemAcentuacao) {
    alert("ACERTOU! A palavra é " + estado.palavra);
    estado.tentativaAtual.editavel = false; // TODO: nao pode ser editaval depois de acertar
    return;
  }

  if (!palavrasValidas.palavrasValidas.map((s) => normaliza(s)).includes(palavraTentativa)) {
    alert("A tentativa precisa constar no dicionário.\n\nTente outra palavra.");
    return;
  }

  estado.tentativaAtual.editavel = false;

  if (estado.tentativas.length == estado.maxTentativas) {
    alert("Acabaram as tentativas!");
    return;
  }

  const novo = tentativaVazia();

  estado.tentativas.push(novo);
  estado.tentativaAtual = novo;
  estado.indiceLetraSelecionada = 0;
};

provide("estado", estado);

</script>

<style>
</style>
