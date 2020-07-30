<template>
  <div class="numberPad" :class="{show:this.$store.state.isShowNumberPad}">
    <div class="output">
      <div class="notes">
        <FormItem field-name="备注:"
                  placeholder="点击写备注"
                  :value.sync="record.notes">
        </FormItem>
      </div>
      {{output}}
    </div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';

  @Component({
    components: {FormItem}
  })
  export default class NumberPad extends Vue {
    @Prop(Number) readonly value!: number;
    output: string = '0';

    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    inputContent(event: MouseEvent) {
      const Button = (event.target as HTMLButtonElement);
      const input = Button.textContent!;
      if (this.output.length === 8) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {return;}
      this.output += input;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    clear() {
      this.output = '0';
    }

    ok() {
      this.$emit('update:value', parseFloat(this.output));
      this.$emit('submit', parseFloat(this.output));
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .numberPad.show {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: rgb(243, 243, 243);
  }

  .numberPad {
    display: none;

    > .output {
      @extend %clearFix;
      @extend %innerShader;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      height: 45px;
      line-height: 27px;
      position: relative;

      >.notes{
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    > .buttons {
      @extend %clearFix;
      font-size: 18px;

      > button {
        float: left;
        width: 25%;
        height: 57px;
        background: transparent;
        border: 1px solid rgb(201, 201, 201);

        &.ok {
          float: right;
          height: 57*2px;
        }

        &.zero {
          width: 25*2%;
        }
      }
    }
  }
</style>