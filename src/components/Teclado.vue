<template>
    <div class="keyboard">
      <div class="keyboard-row" v-for="(row, rowIndex) in buttonRows" :key="rowIndex">
        <button
          v-for="(btn, btnIndex) in row" :key="btnIndex"
          class="keyboard-key"
          :data-status="btn.status"
          :data-type="btn.action.name"
          @click.prevent="btn.action.callable"
          @mousedown.prevent=""
        >
          <span>
            {{ btn.value }}
          </span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
 
    export default {
      data() {
        return {
          lines: [
            "QWERTYUIOP   ",
            "ASDFGHJKL <",
            "ZXCVBNM >"
          ]
        };
      },
  
      computed: {
        buttonRows() {
          return this.lines.map(line => {
            return line.split("").map(char => {
              if (char === " ") {
                return {
                  action: { name: "espacador", callable: null },
                  value: null,
                };
              } else if (char === ">") {
                return {
                  action: { name: "enviar", callable: this.enviar },
                  value: "enviar",
                };
              } else if (char === "<") {
                return  {
                  action: { name: "backspace", callable: this.backspace },
                  value: "<",
                };
              } else {
                return {
                  action: { name: null, callable: this.letra.bind(this, char) },
                  value: char,
                  status: "correta",
                };
              }
            });
          });
        },
      },
  
      methods: {
        letra(char) {
          this.$emit("letra", char);
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
    .keyboard-row {
      padding: 0;
      margin: 0;
      text-align: center;
    }
  
    .keyboard-key {
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
  
    .keyboard-key:hover {
      background: #E0E0E0;
    }
  
    .keyboard-key:active {
      background: #777;
      color: #FFF;
      box-shadow: inset 0 1px 4px rgba(#000, 0.1);
    }

    .keyboard-key[data-type="enviar"] {
      padding: 0 8px;
    }  

    .keyboard-key[data-type="espacador"] {
      min-width: 2px;
      width: 2px;
      padding: 0;
      background: none;
      color: none;
    }

    .keyboard-key[data-status="correta"] {
      background: #7F7;
      color: #000;
    }
  </style>