<template>
  <div class="teclado">
    <div v-for="(linha, indiceLinha) in buttonRows" :key="indiceLinha" class="teclado-linha">
      <button v-for="(tecla, indiceTecla) in linha" :key="indiceTecla"
        class="teclado-tecla"
        :data-status="tecla.status"
        :data-type="tecla.tipo"
        @click.prevent="tecla.acao"
        @mousedown.prevent=""
      >
        {{ tecla.texto }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        linhasLayout: [
          "QWERTYUIOP   ",
          "ASDFGHJKL <",
          "ZXCVBNM >"
        ]
      };
    },

    computed: {
      buttonRows() {
        return this.linhasLayout.map(linhaTeclas => {
          return linhaTeclas.split("").map(letra => {
            if (letra === " ") {
              return {
                tipo: "espacador",
                acao: null,
                texto: null,
              };
            } else if (letra === ">") {
              return {
                tipo: "enviar",
                acao: this.enviar,
                texto: "enviar",
              };
            } else if (letra === "<") {
              return  {
                tipo: "backspace",
                acao: this.backspace,
                texto: "<",
              };
            } else {
              return {
                tipo: null,
                acao: this.letra.bind(this, letra),
                texto: letra,
                status: "desconhecido",
              };
            }
          });
        });
      },
    },

    methods: {
      letra(letra) {
        this.$emit("letra", letra);
      },

      backspace() {
        this.$emit("backspace");
      },

      enviar() {
        this.$emit("enviar");
      },
    }
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