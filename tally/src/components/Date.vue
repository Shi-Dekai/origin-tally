<template>
  <div class="boardContainer" v-if="board">
    <div class="board">
      <label>
        <span>请选择日期</span>
        <input :type="'date' ||'text'"
               :value="inputValue(createdAt)"
               @change="OnChange">
      </label>
      <div class="button">
        <button @click="board = false">确定</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Inject} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class Date extends Vue {
    board = false
    createdAt = '';
    @Inject() eventBus!: Vue;

    mounted() {
      console.log('1');
      this.eventBus.$on('update:createdAt', (createdAt: string) => {
        this.createdAt = createdAt;
      });
      this.eventBus.$on('update:showBoard', (board: boolean)=>{
        this.board = board
      })
    }

    inputValue(isoString: string) {
      console.log(dayjs(isoString).format('YYYY-MM-DD'));
      return dayjs(isoString).format('YYYY-MM-DD');
    }

    OnChange(event: MouseEvent) {
      this.createdAt = (event.currentTarget as HTMLInputElement).value;
      this.eventBus.$emit('update:createdAt', this.createdAt);
    }
  }
</script>

<style lang="scss" scoped>
  .boardContainer {
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, .2);
    z-index: 2;

    > .board {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 35%;
      left: 10%;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      width: 300px;
      height: 150px;
      border-radius: 20px;

      > label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 30px;

        > span {
          display: flex;
          font-size: 14px;
          position: relative;
          top: -5px;
        }

        > input {
          border: none;
          background: #ffffff;
        }

      }

      > .button {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 8px;
        border-top: 2px solid #a8bdbb;
        padding: 10px 0;

        > button {
          border: none;
          outline: none;
          background: #ffffff;
          color: #42b983;
          width: 100%;
        }
      }
    }

  }
</style>