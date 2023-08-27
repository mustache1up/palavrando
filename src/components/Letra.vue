<template>
  <input type="text" :disabled="!editavel"
    @focus="estado.indiceLetraSelecionada=indiceLetra"
    class="font-extrabold text-3xl h-14 w-14 text-center m-[2px]
             text-stone-800 border-4 border-stone-900 rounded-xl" 
    :class="{'bg-white': editavel || letra.resultado === '',
            'bg-gray-400': !editavel && letra.resultado === 'N', 
            'bg-yellow-300': !editavel && letra.resultado === 'T', 
            'bg-green-400': !editavel && letra.resultado === 'C'}" 
    :value="letra.caractere"/>
</template>

<script setup>
import { ref, inject, watch, computed } from "vue";
const estado = inject("estado");
const props = defineProps(["letra", "editavel", "indiceLetra"]);
</script>

<style>
</style>
