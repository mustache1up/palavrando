<template>
  <div type="text" :data-selected="editavel && estado.indiceLetraSelecionada==indiceLetra ? 1 : 0"
    @focus="estado.indiceLetraSelecionada=indiceLetra"
    class="font-extrabold text-3xl h-14 w-14 text-center m-[2px]
             text-stone-800 border-4 border-stone-900 rounded-xl" 
    :class="{'bg-white': editavel || letra.resultado === '',
            'bg-gray-400': !editavel && letra.resultado === 'N', 
            'bg-yellow-300': !editavel && letra.resultado === 'T', 
            'bg-green-400': !editavel && letra.resultado === 'C'}" 
  >{{letra.caractere}}</div>
</template>

<script setup>
import { inject } from "vue";
const estado = inject("estado");
const props = defineProps(["letra", "editavel", "indiceLetra"]);
</script>

<style>
div[data-selected="1"] {
  border-color: green;
}
</style>
