<template>
  <div>
    {{value}}
    <label class="notes">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    @Prop({required: true}) fieldName!:string;
    @Prop() placeholder?: string

    @Watch('value')
    onValueChanged(value:string){
      this.$emit('update:value', value)
    }
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