<template>
  <div class="font-extrabold text-4xl h-16 w-16 text-center p-2 m-2 bg-black text-white border-4 border-dashed">
    {{ letra }}
  </div>
</template>

<script setup>
const props = defineProps(["letra"]);
</script>

<style>
</style>
