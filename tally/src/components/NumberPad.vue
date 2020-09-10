<template>
  <div class="numberPad" :class="{show:this.$store.state.isShowNumberPad}">
    <div class="output">
      <div class="notes">
        <FormItem field-name="备注:"
                  placeholder="点击写备注"
                  :value.sync="notes"
                  :select="select">
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
      <button @click="inputContent">.</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="ShowBoard">{{createdAtText}}</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import FormItem from '@/components/FormItem.vue';
  import dayjs from 'dayjs';

  @Component({
    components: {FormItem}
  })
  export default class NumberPad extends Vue {
    @Prop(Number) readonly value!: number;
    @Prop(String) select!: string;
    @Prop(String) createAt?: string;
    @Prop(String) type!: string;

    isShowBoard = 'show';
    output = '0';
    notes = '';

    get createdAtText(){
      const inputValue = new Date()
      if (this.createAt === dayjs(inputValue).format('YYYY-MM-DD')){
        return '今天'
      }else {
        return this.createAt
      }
    }

    ShowBoard() {
      this.$emit('update:ShowBoard', this.isShowBoard);
    }

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
      console.log(this.type);
    }

    ok() {
      if (!(this.output === '0')) {
        this.$emit('update:notes', {notes: this.notes, amount: parseFloat(this.output)});
        this.$emit('submit', parseFloat(this.output));
        this.output = '0';
        this.notes = '';
        this.$store.commit('cancelShowNumberPad');
        this.$store.commit('cancelShowInput');
        if (!(this.$route.path === '/detail')) {
          this.$store.commit('xxx',this.type)
          this.$router.push(`/detail?tab=${this.$store.state.type}`);
        }
        console.log();
        this.$emit('update:select', '');
      } else {
        alert('请输入记账金额！');
      }
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
    z-index: 1;

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

      > .notes {
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
      }
    }
  }
  @media (min-width: 500px) {
    .numberPad>.output{
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 40px;
      text-align: right;
      height: 45px;
      line-height: 27px;
      position: relative;
      width: 483px;
    }
    .buttons{
      font-size: 18px;
      height: 13.7em;
      width: 483px;
    }
  }
</style>