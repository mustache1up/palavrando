<template>
  <h1 class="text-5xl font-extrabold mt-5 mb-8 text-stone-200 font-mplus-extra-bold">
    PALAVRANDO
  </h1>
  <Tabuleiro :tentativas="estado.tentativas" />
  <Teclado :statusLetras="estado.statusLetras" class="mt-8"
      @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
  <TecladoFisico @avanca="avanca" @limpa="limpa"
      @enviar="fazTentativa" @letra="letra" @backspace="backspace" />
</template>

<script setup>
import _ from "lodash";
import { reactive, provide, ref, onMounted } from "vue";

import Teclado from "@/components/Teclado.vue";
import TecladoFisico from "@/components/TecladoFisico.vue";
import Tabuleiro from "@/components/Tabuleiro.vue";
import palavrasValidas from "@/assets/palavrasValidas.js";
import palavrasFrequentes from "@/assets/palavrasFrequentes.js";
import normaliza from "@/assets/normaliza.js";

const estado = reactive({
  palavra: "",
  maxTentativas: 6,
  tentativas: [],
  letraSelecionada: {},
  tentativaAtual: {},
  statusLetras: {}
});
provide("estado", estado);

const tentativaVazia = () => {
  return {
    letras: Array.from({length: estado.palavra.length}, letraVazia),
    animacoes: {
      invalida: false,
      correta: false,
    }
  };
};

const letraVazia = () => {
  return {
    caractere: "",
    resultado: "desconhecido",
    animacoes: {
      pulsa: false,
    }
  };
};

const palavrasBoas = _.intersection(palavrasValidas, palavrasFrequentes);
const indiceAleatorio = Math.floor(Math.random() * palavrasBoas.length);
estado.palavra = palavrasBoas[indiceAleatorio];
// estado.palavra = "SACRAS";
estado.palavra = estado.palavra.toUpperCase();
estado.tentativas = Array.from({length: estado.maxTentativas}, tentativaVazia);
estado.tentativaAtual = estado.tentativas[0];
estado.letraSelecionada = estado.tentativaAtual.letras[0];

const dicionario = _(palavrasValidas).keyBy((s) => normaliza(s));

const backspace = () => {
  if (!estado.letraSelecionada.caractere) {
    avanca(-1);
  }
  limpa();
};

const letra = (letra) => {
  estado.letraSelecionada.caractere = letra;
  estado.letraSelecionada.animacoes.pulsa = true;
  avanca(1);
};

const limpa = () => {
  estado.letraSelecionada.caractere = "";
  estado.letraSelecionada.animacoes.pulsa = true;
};

const avanca = (offset) => {
  let indice = estado.tentativaAtual.letras.indexOf(estado.letraSelecionada);
  indice = _.clamp(indice + offset, 0, estado.tentativaAtual.letras.length - 1);
  estado.letraSelecionada = estado.tentativaAtual.letras[indice];
};

const fazTentativa = () => {

  if (!estado.tentativaAtual) {
    return;
  }

  const palavraTentativa = _(estado.tentativaAtual.letras).map((letra) => letra.caractere).join("");

  if (_(estado.tentativaAtual.letras).some({"caractere": ""})) {

    estado.tentativaAtual.animacoes.invalida = true;
    console.log("A tentativa ter todas letras preenchidas.");
    return;
  }

  const palavraDoDicionario = dicionario.get(palavraTentativa);

  if (!palavraDoDicionario) {

    estado.tentativaAtual.animacoes.invalida = true;
    console.log("A tentativa precisa constar no dicionário.");
    return;
  }

  computaResultado();

  atualizaStatusLetras();

  _.zip(estado.tentativaAtual.letras, [...palavraDoDicionario]).forEach(([letra, letraPalavraDicionário]) => {
    letra.caractere = letraPalavraDicionário;
    letra.animacoes.pulsa = true;
  });
  
  const palavraSemAcentuacao = normaliza(estado.palavra);

  if (palavraTentativa === palavraSemAcentuacao) {

    estado.tentativaAtual.animacoes.correta = true;
    console.log("Você acertou! A palavra é " + estado.palavra);
    estado.tentativaAtual = undefined;
    estado.letraSelecionada = undefined;
    return;
  }

  const indiceTentativaAtual = estado.tentativas.indexOf(estado.tentativaAtual);

  if (indiceTentativaAtual >= estado.maxTentativas - 1) {
    console.log("Acabaram as tentativas! A palavra é " + estado.palavra);
    estado.tentativaAtual = undefined;
    estado.letraSelecionada = undefined;
    return;
  }

  estado.tentativaAtual = estado.tentativas[indiceTentativaAtual + 1];  ;
  estado.letraSelecionada = estado.tentativaAtual.letras[0];
};

const computaResultado = () => {
  const letrasCerta = [...normaliza(estado.palavra)];
  estado.tentativaAtual.letras.forEach((letra, indiceLetra) => {
    if(letra.caractere === letrasCerta[indiceLetra]) {
      letra.resultado = "correta";
      letrasCerta[indiceLetra] = "";
    }
  });
  estado.tentativaAtual.letras.forEach((letra) => {
    if(letra.resultado === "desconhecido" && letrasCerta.includes(letra.caractere)) {
      letra.resultado = "presente";
      letrasCerta[letrasCerta.indexOf(letra.caractere)] = "";
    }
  });
  estado.tentativaAtual.letras.forEach((letra) => {
    if(letra.resultado === "desconhecido") {
      letra.resultado = "ausente";
    }
  });
};

const atualizaStatusLetras = () => {
  estado.tentativaAtual.letras.forEach(letra => {
    if(letra.resultado === "correta") {
      estado.statusLetras[letra.caractere] = letra.resultado;
      return;
    }
    if(letra.resultado === "presente" && estado.statusLetras[letra.caractere] !== "correta") {
      estado.statusLetras[letra.caractere] = letra.resultado;
      return;
    }
    if(letra.resultado === "ausente" && ! estado.statusLetras[letra.caractere]) {
      estado.statusLetras[letra.caractere] = letra.resultado;
      return;
    }
  });
};

</script>
