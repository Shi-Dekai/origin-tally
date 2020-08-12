<template>
  <nav>
    <router-link to="/detail" class="item" active-class="selected">
      <Icon name="label"/>
      明细
    </router-link>
    <Add/>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="data"/>
      统计
    </router-link>

  </nav>
</template>

<script lang="ts">
  import Add from '@/components/Add.vue';

  export default {
    name: 'Nve',
    components: {Add}
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    justify-content: space-around;

    > .item {
      @extend %navItem;
    }

    .icon {
      width: 32px;
      height: 32px;
    }

    > .item.selected {
      >svg{
        color: #F9DC56;
      }
    }
  }
</style>