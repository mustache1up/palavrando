<template>
  <input type="text"
    @keypress="$event.target.nextElementSibling?.focus()"
    class="font-extrabold text-4xl h-16 w-16 text-center p-2 m-2
             text-stone-800 border-4 border-stone-900 rounded-xl" 
    :class="{'bg-white': editavel || letra.resultado === '',
            'bg-gray-400': letra.resultado === 'N', 
            'bg-yellow-300': letra.resultado === 'T', 
            'bg-green-400': letra.resultado === 'C'}" 
    v-model="caractere"/>
</template>

<script setup>
import { ref, inject, watch } from "vue";
const estado = inject("estado");
const props = defineProps(["letra", "editavel"]);
const caractere = ref(props.letra.caractere);

watch(caractere, async (newCaractere, oldCaractere) => {
  console.log(oldCaractere);
  console.log(newCaractere);
  if (newCaractere === "") {
    console.log("CASO A");
    estado.tentativas[2].palavra[2] = "";
    caractere.value = "";
    return;
  }
  var novaLetra = newCaractere.charAt(newCaractere.length - 1).toUpperCase();
  if (!novaLetra.match("^[A-Z]$")) {
    console.log("CASO B");
    estado.tentativas[2].palavra[2] = "";
    caractere.value = "";
    return;
  }
  console.log("CASO C");
  estado.tentativas[2].palavra[2] = novaLetra;
  caractere.value = novaLetra;
  return;
});
</script>

<style>
</style>
