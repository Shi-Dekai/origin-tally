<template>
  <div id="app">
    <router-view/>
    <ChargeUp/>
    <NumberPad   />
  </div>
</template>

<style lang="scss">
  @import "~@/assets/style/reset.scss";
  @import "~@/assets/style/helper.scss";
  #app{
    position: relative;
    overflow: hidden;
    height: 100vh;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $font-hei;
    line-height: 1.5;
    color: #333;
    font-size: 16px;
    background: #f5f5f5;
  }
</style>
<script lang="ts">
  import Vue from 'vue';
  import {Component, Provide} from 'vue-property-decorator';
  import ChargeUp from '@/views/ChargeUp.vue';
  import NumberPad from '@/components/NumberPad.vue';

  @Component({
    components: {NumberPad, ChargeUp}
  })
  export default class App extends Vue {
    @Provide() eventBus = new Vue();

  }
</script>