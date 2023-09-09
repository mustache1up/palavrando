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
import { reactive, provide, ref, onMounted } from "vue";

import Teclado from "./components/Teclado.vue";
import Tabuleiro from "./components/Tabuleiro.vue";
import palavrasValidas from "./assets/palavrasValidas.js";
import normaliza from "./assets/normaliza.js";

const estado = reactive({
  palavra: "??????",
  letrasCerta: [],
  maxTentativas: 6,
  tentativas: [],
  letraSelecionada: {},
  tentativaAtual: {},
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
estado.tentativaAtual = estado.tentativas[0];
estado.letraSelecionada = estado.tentativaAtual.letras[0];

const backspace = () => {
  if (!estado.letraSelecionada.caractere) {
    alteraLetraSelecionada(-1);
  }
  estado.letraSelecionada.caractere = "";
  estado.letraSelecionada.animacoes.pulsa = true;
};

const letra = (letra) => {
  estado.letraSelecionada.caractere = letra;
  estado.letraSelecionada.animacoes.pulsa = true;
  alteraLetraSelecionada(1);
};

const alteraLetraSelecionada = (offset) => {
  let indice = estado.tentativaAtual.letras.indexOf(estado.letraSelecionada);
  indice = _.clamp(indice + offset, 0, estado.tentativaAtual.letras.length - 1);
  estado.letraSelecionada = estado.tentativaAtual.letras[indice];
};

const fazTentativa = () => {

  if (!estado.tentativaAtual) {
    return;
  }

  const palavraTentativa = _(estado.tentativaAtual.letras).map((letra) => letra.caractere).join("");

  if (_.some(estado.tentativaAtual.letras, {"caractere": ""})) {

    estado.tentativaAtual.animacoes.invalida = true;
    console.log("A tentativa ter todas letras preenchidas.");
    return;
  }

  if (!palavrasValidas.palavrasValidas.map((s) => normaliza(s)).includes(palavraTentativa)) {

    estado.tentativaAtual.animacoes.invalida = true;
    console.log("A tentativa precisa constar no dicionário.");
    return;
  }

  computaResultado();

  atualizaStatusLetras();

  _(estado.tentativaAtual.letras).each((letra) => letra.animacoes.pulsa = true);

  const palavraSemAcentuacao = normaliza(estado.palavra);

  if (palavraTentativa === palavraSemAcentuacao) {

    estado.tentativaAtual.animacoes.correta = true;
    console.log("Você acertou! A palavra é " + estado.palavra);
    estado.tentativaAtual = undefined;
    estado.letraSelecionada = undefined;
    return;
  }

  const indiceTentativaAtual = estado.tentativas.indexOf(estado.tentativaAtual);

  if (indiceTentativaAtual == estado.maxTentativas - 1) {
    console.log("Acabaram as tentativas! A palavra é " + estado.palavra);
    estado.tentativaAtual = undefined;
    estado.letraSelecionada = undefined;
    return;
  }

  estado.tentativaAtual = estado.tentativas[indiceTentativaAtual + 1];  ;
  estado.letraSelecionada = estado.tentativaAtual.letras[0];
};

const computaResultado = () => {
  const letrasCerta = [...estado.letrasCerta];
  estado.tentativaAtual.letras.forEach((letra, index) => {
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

const atualizaStatusLetras = () => {
  estado.tentativaAtual.letras.forEach(letra => {
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
