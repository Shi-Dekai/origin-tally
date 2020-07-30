<template>
  <div class="add" @click="add">
    +
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class add extends Vue {
    add() {
      this.$store.commit('showInput');
    }
  }
</script>

<style lang="scss" scoped>
  .add {
    font-size: 32px;
    width: 40px;
    display: flex;
    justify-content: center;
  }
</style>