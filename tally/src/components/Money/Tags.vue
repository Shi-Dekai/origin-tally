<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li>衣11</li>
      <li>食22</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住33</li>
      <li>行44</li>
    </ul>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Tages'
  };
</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    > .current {
      display: flex;
      flex-wrap: wrap;
      /*justify-content: center;*/
      > li {
        margin-top: 4px;
        $h: 24px;
        background: #d9d9d9;
        height: $h;
        line-height: $h;
        border-radius: ($h/2);
        padding: 0 16px;
        margin-right: 12px;
      }
    }

    > .new {
      padding: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 3px;

      }
    }
  }
</style>