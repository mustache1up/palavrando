<script setup>
import { onMounted, onUnmounted } from "vue";
import normaliza from "@/assets/normaliza.js";
const emit = defineEmits(["letra", "enviar", "backspace", "limpa", "avanca"]);

const teclaPressionada = (event) => {
  const normalizado = normaliza(event.key);
  if(normalizado === "DELETE") {
    emit("limpa"); 
    return;
  }
  if(normalizado === "BACKSPACE") {
    emit("backspace"); 
    return;
  }
  if(normalizado === "ENTER") {
    emit("enviar"); 
    return;
  }
  if(normalizado === "ARROWLEFT") {
    emit("avanca", -1);
    return;
  }
  if(normalizado === "ARROWRIGHT" || normalizado === " ") {
    emit("avanca", 1);
    return;
  }
  if(normalizado.match("^[A-Z]$")) {
    emit("letra", normalizado);
    return;
  }
};

onMounted(() => document.addEventListener("keydown", teclaPressionada));
onUnmounted(() => document.removeEventListener("keydown", teclaPressionada));
</script>
