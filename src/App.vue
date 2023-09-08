<template>
  <div ref="container" class="h-screen w-screen bg-gray-800 flex flex-col items-center justify-center">
    <div ref="contained" id="contained">
      <h1 class="text-5xl font-extrabold mt-5 mb-8 text-stone-200 font-mplus-extra-bold">
        PALAVRANDO
      </h1>
      <Tabuleiro :tentativas="estado.tentativas"
          @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
      <Teclado :statusLetras="estado.statusLetras" class="mt-8"
          @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
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
  maxTentativas: 6,
  tentativas: [],
  indiceLetraSelecionada: 0,
  indiceTentativaAtual: 0,
  statusLetras: {}
});
provide("estado", estado);

const tentativaVazia = () => {
  return {
    letras: Array.from({length: estado.palavra.length}, () => {
      return {
        caractere: "",
        resultado: "",
        animacoes: {
          pulsa: false,
        }
      };
    }),
    animacoes: {
      invalida: false,
      correta: false,
    }
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
  if (!tentativaAtual.value.letras[estado.indiceLetraSelecionada].caractere) {
    estado.indiceLetraSelecionada = _.clamp(estado.indiceLetraSelecionada - 1, 0, tentativaAtual.value.letras.length - 1);
  }
  tentativaAtual.value.letras[estado.indiceLetraSelecionada].caractere = "";
  tentativaAtual.value.letras[estado.indiceLetraSelecionada].animacoes.pulsa = true;
};

const letra = (letra) => {
  tentativaAtual.value.letras[estado.indiceLetraSelecionada].caractere = letra;
  tentativaAtual.value.letras[estado.indiceLetraSelecionada].animacoes.pulsa = true;

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

  const palavraTentativa = _(tentativaAtual.value.letras).map((letra) => letra.caractere).join("");

  if (_.some(tentativaAtual.value.letras, {"caractere": ""})) {

    tentativaAtual.value.animacoes.invalida = true;
    console.log("A tentativa ter todas letras preenchidas.");
    return;
  }

  const palavraSemAcentuacao = normaliza(estado.palavra);

  if (!palavrasValidas.palavrasValidas.map((s) => normaliza(s)).includes(palavraTentativa)) {

    tentativaAtual.value.animacoes.invalida = true;
    console.log("A tentativa precisa constar no dicionário.");
    return;
  }

  computaResultado(tentativaAtual.value);

  tentativaAtual.value.letras.forEach(letra => {
    const caractere = letra.caractere;
    const resultado = letra.resultado;
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

  _(tentativaAtual.value.letras).each((letra) => letra.animacoes.pulsa = true);

  if (palavraTentativa === palavraSemAcentuacao) {

    tentativaAtual.value.animacoes.correta = true;
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

const computaResultado = (tentativaAtualValue) => {
  const letrasCerta = [...estado.letrasCerta];
  tentativaAtualValue.letras.forEach((letra, index) => {
    const caractere = letra.caractere;
    if(caractere === letrasCerta[index]) {
      letra.resultado = "C";
      letrasCerta[index] = "";
    } else if(letrasCerta.includes(caractere)) {
      letra.resultado = "T";
      letrasCerta[letrasCerta.indexOf(caractere)] = "";
    } else {
      letra.resultado = "N";
    }
  });
};

const container = ref(null);
const contained = ref(null);
const scale = ref(1);

const redimensiona = () => {
  const widthProportion = container.value.offsetWidth / contained.value.offsetWidth;
  const heightProportion = container.value.offsetHeight / contained.value.offsetHeight;
  scale.value = Math.min(widthProportion, heightProportion);
};

onMounted(() => {
  window.addEventListener("resize", redimensiona);
  redimensiona();
});

</script>

<style>
#contained {
  text-align: center;
  position: relative;
  transform: scale(v-bind(scale));
  transform-origin: center center;
  padding: 8px;
}
</style>
