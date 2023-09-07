<template>
  <div ref="container" class="container h-screen w-screen bg-gray-800 flex flex-col items-center justify-center">
    <div ref="contained" class="contained">
      <h1 class="text-5xl font-extrabold mb-14 text-stone-200 font-mplus-extra-bold">
        PALAVRANDO
      </h1>
      <Tabuleiro :tentativas="estado.tentativas" @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
      <Teclado :statusLetras="estado.statusLetras" class="mt-14" @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
    </div>
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, provide, watch, computed, ref, onMounted } from "vue";

import Teclado from "./components/Teclado.vue";
import Tabuleiro from "./components/Tabuleiro.vue";
import palavrasValidas from "./assets/palavrasValidas.js";
import normaliza from "./assets/normaliza.js";

const estado = reactive({
  palavra: "??????",
  letrasCerta: [],
  maxTentativas: 7,
  tentativas: [],
  indiceLetraSelecionada: 0,
  indiceTentativaAtual: 0,
  statusLetras: {}
});
provide("estado", estado);

const tentativaVazia = () => {
  return {
    letras: new Array(6).fill(""),
    resultado: new Array(6).fill(""),
    sacode: new Array(6).fill(false),
    invalida: false,
    correta: false,
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
  if (!tentativaAtual.value.letras[estado.indiceLetraSelecionada]) {
    estado.indiceLetraSelecionada = _.clamp(estado.indiceLetraSelecionada - 1, 0, tentativaAtual.value.letras.length - 1);
  }
  tentativaAtual.value.letras[estado.indiceLetraSelecionada] = "";
  tentativaAtual.value.sacode[estado.indiceLetraSelecionada] = true;
};

const letra = (letra) => {
  tentativaAtual.value.letras[estado.indiceLetraSelecionada] = letra;
  tentativaAtual.value.sacode[estado.indiceLetraSelecionada] = true;

  estado.indiceLetraSelecionada = _.clamp(estado.indiceLetraSelecionada + 1, 0, tentativaAtual.value.letras.length - 1);
};

watch(() => estado.indiceLetraSelecionada, (indice) => {
  const tentativaElementList = document.getElementsByName("tentativa");
  const tentativaAtualElement = tentativaElementList[tentativaElementList.length - 1];
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
  const tentativaAtualValue = tentativaAtual.value;

  if (!palavrasValidas.palavrasValidas.map((s) => normaliza(s)).includes(palavraTentativa)) {

    tentativaAtualValue.invalida = true;
    console.log("A tentativa precisa constar no dicionário. Tente outra palavra.");
    return;
  }

  tentativaAtualValue.resultado = computaResultado(tentativaAtualValue.letras, [...estado.letrasCerta]);

  tentativaAtualValue.letras.forEach((caractere, indice) => {
    const resultado = tentativaAtualValue.resultado[indice];
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

  tentativaAtualValue.sacode = new Array(6).fill(true);

  if (palavraTentativa === palavraSemAcentuacao) {

    tentativaAtualValue.correta = true;
    console.log("ACERTOU! A palavra é " + estado.palavra);
    estado.indiceTentativaAtual = undefined;
    return;
  }

  if (estado.indiceTentativaAtual == estado.maxTentativas - 1) {
    console.log("Acabaram as tentativas!");
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

const container = ref(null);
const contained = ref(null);

onMounted(() => {
  window.addEventListener("resize", resize);
  console.log(container);
  console.log(contained);
  resize();
});

const resize = () => {
  var scale = Math.min(
    container.value.offsetWidth / contained.value.offsetWidth,
    container.value.offsetHeight / contained.value.offsetHeight
  );

  contained.value.style.transform = ("scale(" + scale + ")");
};

</script>

<style>
.contained {
  text-align: center;
  position: relative;
  transform: scale(1);
  transform-origin: center center;
}
</style>
