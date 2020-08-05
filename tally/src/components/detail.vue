<template>
  <div class="tabsContainer">
    <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
      <li class="tabs-item" :class="liClass(item)">
        支出
      </li>
      <li class="tabs-item" :class="liClass(item)">
        收入
      </li>

<!--      <li v-for="item in dataSource" :key="item.value" class="tabs-item"-->
<!--          :class="liClass(item)"-->
<!--          @click="select(item)"-->
<!--      >{{item.text}}-->
<!--      </li>-->
    </ul>


<!--    <span class="cancel" @click="cancel">取消</span>-->
<!--    <span class="compile" @click="compile">{{$store.state.removeSwitch}}</span>-->
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = {
    text: string, value: string
  }
  @Component({})
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array})
    dataSource!: DataSourceItem[];
    @Prop(String)
    readonly value!: string;
    @Prop()
    classPrefix?: string;

    cancel() {
      this.$store.commit('cancelShowInput');
      this.$store.commit('cancelShowNumberPad');
      this.$store.commit('cancelShowCompile');
      this.$emit('update:cancel');
    }

    compile() {
      this.$store.commit('removeSwitch');
    }

    liClass(item: DataSourceItem) {
      return {
        selected: item.value === this.value,
        [this.classPrefix + '-tabs-item']: this.classPrefix
      };
    }

    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
      this.$store.commit('setType', item.value);
    }

  }
</script>

<style lang="scss" scoped>
  .tabsContainer {
    border: 1px solid red;
    background: #F9DC61;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .compile {
    font-size: 13px;
    position: absolute;
    right: 20px;
  }

  .cancel {
    font-size: 13px;
    position: absolute;
    left: 20px;
  }

  .tabs {
    background: #F9DC61;
    display: flex;
    text-align: center;
    font-size: 14px;
    width: 15vh;

    &-item {
      flex-grow: 1;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      flex-direction: column;

      &.selected::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background: #333;
      }
    }
  }
</style>