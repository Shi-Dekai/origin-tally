<template>
  <div class="add" @click="add">
    <Icon name="tally"/>
    记账
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
  @import "~@/assets/style/helper.scss";
  .add {
    @extend %navItem;
    >svg{
      width: 32px;
      height: 32px;
    }
  }
</style>