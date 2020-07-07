<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="selectType('-')">收入
      </li>
      <li :class="type === '+' && 'selected'"
          @click="selectType('+')">支出
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    type = '-'; //'-'表示支出，'+'表示收入
    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.type = type;
    }
  };
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    > li {
      flex-grow: 1;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      flex-direction: column;

      &.selected::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 100%;
        background: #333;
      }
    }
  }
</style>