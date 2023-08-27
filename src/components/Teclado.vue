<template>
  <div class="teclado">
    <div v-for="(linha, indiceLinha) in buttonRows" :key="indiceLinha" class="teclado-linha">
      <button v-for="(tecla, indiceTecla) in linha" :key="indiceTecla"
        class="teclado-tecla"
        :data-status="tecla.status"
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
          tipo: null,
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
  min-height: 40px;
  min-width: 25px;
  margin: 0 2px;
  background: #EEE;
  color: #666;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  border-radius: 2px;
}

.teclado-tecla:hover {
  background: #E0E0E0;
}

.teclado-tecla:active {
  background: #777;
  color: #FFF;
  box-shadow: inset 0 1px 4px rgba(#000, 0.1);
}

.teclado-tecla[data-type="enviar"] {
  padding: 0 8px;
}  

.teclado-tecla[data-type="espacador"] {
  min-width: 2px;
  width: 2px;
  padding: 0;
  background: none;
  color: none;
}

.teclado-tecla[data-status="correta"] {
  background: #7F7;
  color: #000;
}
</style>