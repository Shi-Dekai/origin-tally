<template>
  <div>
    {{value}}
    <label class="notes">
      <span class="name">备注</span>
      <input type="text"
             v-model="value"
             placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    padding-left: 16px;
    background: #f5f5f5;
    display: flex;
    align-items: center;

    > .name {
      padding-right: 16px;
    }

    > input {
      padding: 20px 0;
      flex-grow: 1;
      background: transparent;
      border: none;
    }
  }
</style>