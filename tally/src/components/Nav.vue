<template>
  <nav>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      明细
    </router-link>
    <Add/>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
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
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .icon {
      width: 32px;
      height: 32px;
    }

    > .item.selected {
      color: $color-highlight;
    }
  }
</style>