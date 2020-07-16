<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          @click="toggle(tag)"
          :class="{select:selectedTags.indexOf(tag)>=0}">{{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component({
    computed: {
      tagList() {
        return this.$store.state.tagList;
      }
    }
  })
  export default class Tags extends Vue {
    selectedTags: string[] = [];

    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    create() {
      const name = window.prompt('请输入标签名');
      if (!name) { return window.alert('标签名不能为空'); }
      this.$store.commit('createTag',name);
    }

  };
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 14px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      display: flex;
      flex-wrap: wrap;
      /*justify-content: center;*/
      > li {
        $bg: #d9d9d9;
        margin-top: 4px;
        $h: 24px;
        background: $bg;
        height: $h;
        line-height: $h;
        border-radius: ($h/2);
        padding: 0 16px;
        margin-right: 12px;

        &.select {
          background: darken($bg, 50%);
          color: white;
        }
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