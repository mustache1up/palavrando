<template>
  <div class="font-extrabold text-4xl h-16 w-16 text-center p-2 m-2  text-stone-800 border-4 border-dashed" 
    :class="{'bg-gray-300': letra.resultado === 'N', 
           'bg-yellow-300': letra.resultado === 'T', 
           'bg-green-300': letra.resultado === 'C', }">
    {{ letra.caractere }}
  </div>
</template>

<script setup>
const props = defineProps(["letra"]);
</script>

<style>
</style>
