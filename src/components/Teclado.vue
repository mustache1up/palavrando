<template>
  <div class="teclado">
    <div v-for="(linha, indiceLinha) in buttonRows" :key="indiceLinha" class="teclado-linha">
      <button v-for="(tecla, indiceTecla) in linha" :key="indiceTecla"
        class="teclado-tecla font-mplus-extra-bold"
        :data-status="tecla.tipo === 'letra' ? statusLetras[tecla.texto] : ''"
        :data-type="tecla.tipo"
        @click.prevent="tecla.acao(tecla)"
        @mousedown.prevent=""
      >
        {{ tecla.texto }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["letra", "backspace", "enviar"]);
const props = defineProps(["statusLetras"]);

const linhasLayout = ref([
  "QWERTYUIOP   ",
  "ASDFGHJKL <",
  "ZXCVBNM >"
]);

const buttonRows = computed(() => {
  return linhasLayout.value.map(linhaTeclas => {
    return linhaTeclas.split("").map(caractere => {
      if (caractere === " ") {
        return {
          tipo: "espacador",
          acao: null,
          texto: null,
        };
      } else if (caractere === ">") {
        return {
          tipo: "enviar",
          acao: enviar,
          texto: "enviar",
        };
      } else if (caractere === "<") {
        return  {
          tipo: "backspace",
          acao: backspace,
          texto: "<",
        };
      } else {
        return {
          tipo: "letra",
          acao: letra,
          texto: caractere,
          status: "desconhecido",
        };
      }
    });
  });
});

const letra = (tecla) => {
  emit("letra", tecla.texto);
};

const backspace = () => {
  emit("backspace");
};

const enviar = () => {
  emit("enviar");
};
</script>

<style>
.teclado {
  text-align: center;
}

.teclado-tecla {
  border: none;
  outline: none;
  padding: 1px;
  min-height: 50px;
  min-width: 35px;
  margin: 0 2px;
  background: rgb(59, 59, 59);
  color: oldlace;
  cursor: pointer;
  font-size: inherit;
  border-radius: 5px;
}

.teclado-tecla[data-type="enviar"] {
  padding: 0 12px;
}  

.teclado-tecla[data-type="espacador"] {
  min-width: 2px;
  width: 2px;
  padding: 0;
  background: none;
  color: none;
}

.teclado-tecla[data-status="correta"] {
  background: rgb(52, 147, 52);
}

.teclado-tecla[data-status="presente"] {
  background: rgb(160, 134, 19);
}

.teclado-tecla[data-status="ausente"] {
  background: rgb(35, 35, 35);
  color: rgb(53, 53, 53);
}
</style>