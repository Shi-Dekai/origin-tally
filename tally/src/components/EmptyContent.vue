<template>
  <div class="container">
    <div class="iconContainer">
      <div class="icon">
        <Icon name="jizhang"/>
      </div>
      暂无数据
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class EmptyContent extends Vue {

  }
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    justify-content: center;
    font-size: 13px;
    color: #D8D8D8;
    >.iconContainer{
      display: flex;
      align-items: center;
      flex-direction: column;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      >.icon{
        position: relative;
        bottom: 10px;
        >svg{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
</style>