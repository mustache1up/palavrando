<template>
    <div class="keyboard">
      <div class="keyboard-row" v-for="(row, rowIndex) in buttonRows" :key="rowIndex" :data-keys="row.length">
        <button
          v-for="(btn, btnIndex) in row"
          :key="btnIndex"
          class="keyboard-key"
          :class="{ 'key-lugar-certo': true, 'key-tem': false, 'key-nao-tem': false }" 
          :data-type="btn.action.name"
          @click.prevent="btn.action.callable"
          @mousedown.prevent=""
        >
          <span :name="btn.action.name || btn.value">
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
          layout: 0,
          lines: [
            "QWERTYUIOP   ",
            "ASDFGHJKL <",
            "ZXCVBNM >"
          ],
          pattern: null,
          maxlength: 0,
          value: ""
        };
      },
  
      computed: {
        buttonRows() {
          return this.lines.map(line => {
            let stream = line.match(new RegExp("(.)", "g"));
  
            let buttonRow = [];
  
            stream.forEach(char => {
              if (char === " ") {
                buttonRow.push({
                  action: { name: "spacer", callable: null },
                  value: null,
                });
              } else if (char === ">") {
                buttonRow.push({
                  action: { name: "enviar", callable: this.enviar },
                  value: "enviar",
                });
              } else if (char === "<") {
                buttonRow.push({
                  action: { name: "backspace", callable: this.backspace },
                  value: "<",
                });
              } else {
                buttonRow.push({
                  action: { name: null, callable: this.append.bind(this, char) },
                  value: char,
                });
              }
            });
  
            return buttonRow;
          });
        },
  
        valid() {
          return !this.pattern || this.value.match(new RegExp(this.pattern));
        }
      },
  
      methods: {
        mutate(value) {
          if (this.maxlength > 0) {
            value = value.slice(0, this.maxlength);
          }
  
          this.$emit("input", value);
        },
  
        append(char) {
          this.mutate(this.value + char);
        },

        backspace() {
          this.mutate(this.value.slice(0, this.value.length - 1));
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
  
    .keyboard-key[data-type="space"] {
      min-width: 160px;
    }  

    .keyboard-key[data-type="enviar"] {
      padding: 0 8px;
    }  

    .keyboard-key[data-type="spacer"] {
      min-width: 2px;
      width: 2px;
      padding: 0;
      background: none;
      color: none;
    }

    .keyboard-key-lugar-certo {
      background: #7F7;
      color: #000;
    }
  </style>