<template>
  <input type="text" :disabled="!editavel"
    @keypress="$event.target.nextElementSibling?.focus()"
    class="font-extrabold text-4xl h-16 w-16 text-center p-2 m-2
             text-stone-800 border-4 border-stone-900 rounded-xl" 
    :class="{'bg-white': editavel || letra.resultado === '',
            'bg-gray-400': !editavel && letra.resultado === 'N', 
            'bg-yellow-300': !editavel && letra.resultado === 'T', 
            'bg-green-400': !editavel && letra.resultado === 'C'}" 
    v-model="caractere"/>
</template>

<script setup>
import { ref, inject, watch } from "vue";
const estado = inject("estado");
const props = defineProps(["letra", "editavel", "indiceLetra"]);
const caractere = ref(props.letra.caractere);

watch(caractere, async (newCaractere, oldCaractere) => {
  if (newCaractere === "") {
    estado.tentativaAtual.letras[props.indiceLetra] = "";
    caractere.value = "";
    return;
  }
  var novaLetra = newCaractere;
  if (newCaractere.length > oldCaractere.length) {
    novaLetra = newCaractere.replace(oldCaractere, "");
  }
  novaLetra = novaLetra.normalize("NFKD").replace(/\p{Diacritic}/gu, "").toUpperCase();
  if (!novaLetra.match("^[A-Z]$")) {
    estado.tentativaAtual.letras[props.indiceLetra] = "";
    caractere.value = "";
    return;
  }
  estado.tentativaAtual.letras[props.indiceLetra] = novaLetra;
  caractere.value = novaLetra;
  return;
});
</script>

<style>
</style>
