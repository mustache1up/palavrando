<template>
  <div class="h-screen w-screen bg-gray-800 flex flex-col items-center justify-center">
    <h1 class="text-5xl font-extrabold mb-14 text-stone-200">
      PALAVRANDO
    </h1>
    <Tabuleiro :tentativas="estado.tentativas" @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
    <Teclado :statusLetras="estado.statusLetras" class="mt-5" @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, provide, watch, computed } from "vue";

import Teclado from "./components/Teclado.vue";
import Tabuleiro from "./components/Tabuleiro.vue";
import palavrasValidas from "./assets/palavrasValidas.js";
import normaliza from "./assets/normaliza.js";

const estado = reactive({
  palavra: "??????",
  letrasCerta: [],
  maxTentativas: 3,
  tentativas: [],
  indiceLetraSelecionada: 0,
  indiceTentativaAtual: 0,
  statusLetras: {}
});
provide("estado", estado);

const tentativaVazia = () => {
  return {
    letras: new Array(6).fill(""),
    // resultado: new Array(6).fill(""),
  };
};

estado.palavra = palavrasValidas.palavrasValidas[Math.floor(Math.random()*palavrasValidas.palavrasValidas.length)];
estado.palavra = estado.palavra.toUpperCase();
// estado.palavra = "SACRAS";
estado.letrasCerta = normaliza(estado.palavra);

estado.tentativas = Array.from({length: estado.maxTentativas}, () => tentativaVazia());

const tentativaAtual = computed(() => {
  return estado.tentativas[estado.indiceTentativaAtual];
});

const backspace = () => {
  if (!tentativaAtual.value) {
    return;
  }
  tentativaAtual.value.letras[estado.indiceLetraSelecionada] = "";
  estado.indiceLetraSelecionada = _.clamp(estado.indiceLetraSelecionada - 1, 0, tentativaAtual.value.letras.length - 1);
};

const letra = (letra) => {
  if (!tentativaAtual.value) {
    return;
  }
  tentativaAtual.value.letras[estado.indiceLetraSelecionada] = letra;
  estado.indiceLetraSelecionada = _.clamp(estado.indiceLetraSelecionada + 1, 0, tentativaAtual.value.letras.length - 1);
};

watch(() => estado.indiceLetraSelecionada, (indice) => {
  const x = document.getElementsByName("tentativa");
  const tentativaAtualElement = x[x.length - 1];
  tentativaAtualElement.children[indice].focus(); // TODO: focar ao iniciar
}, {
  flush: "post",
});

const fazTentativa = () => {

  if (!tentativaAtual.value) {
    return;
  }

  const palavraTentativa = tentativaAtual.value.letras.join("");

  if (tentativaAtual.value.letras.includes("")) {
    return;
  }

  const palavraSemAcentuacao = normaliza(estado.palavra);

  if (!palavrasValidas.palavrasValidas.map((s) => normaliza(s)).includes(palavraTentativa)) {
    alert("A tentativa precisa constar no dicionário.\n\nTente outra palavra.");
    return;
  }

  tentativaAtual.value.resultado = computaResultado(tentativaAtual.value.letras, [...estado.letrasCerta]);

  tentativaAtual.value.letras.forEach((caractere, indice) => {
    const resultado = tentativaAtual.value.resultado[indice];
    if(resultado === "C") {
      estado.statusLetras[caractere] = resultado;
      return;
    }
    if(resultado === "T" && estado.statusLetras[caractere] !== "C") {
      estado.statusLetras[caractere] = resultado;
      return;
    }
    if(resultado === "N" && ! estado.statusLetras[caractere]) {
      estado.statusLetras[caractere] = resultado;
      return;
    }
  });

  if (palavraTentativa === palavraSemAcentuacao) {
    alert("ACERTOU! A palavra é " + estado.palavra);
    estado.indiceTentativaAtual = undefined;
    return;
  }

  if (estado.indiceTentativaAtual == estado.maxTentativas - 1) {
    alert("Acabaram as tentativas!");
    estado.indiceTentativaAtual = undefined;
    return;
  }

  estado.indiceTentativaAtual++;
  estado.indiceLetraSelecionada = 0;
};

const computaResultado = (letrasTentativa, letrasCerta) => {
  var resultado = new Array(6).fill("");  
  letrasTentativa.forEach((caractere, index) => {
    if(caractere === letrasCerta[index]) {
      resultado[index] = "C";
      letrasCerta[index] = "";
    } else if(letrasCerta.includes(caractere)) {
      resultado[index] = "T";
      letrasCerta[letrasCerta.indexOf(caractere)] = "";
    } else {
      resultado[index] = "N";
    }
  });
  return resultado;
};


</script>

<style>
</style>
