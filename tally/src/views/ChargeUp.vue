<template>
  <div class="type" :class="{show:$store.state.isShowInput}">
    <Tabs :data-source="recordTypeList" :value.sync="type"/>
    <!--    <Tags @update:value="record.tags = $event"/>-->


    <ol class="container">
      <li v-for="(item,index) in xxx" :key="index" class="labels"
          @click="ShowNumberPad">
        <Icon name="remove" class="remove" :class="{showRemove:$store.state.isShowCompile}"
              @click.stop="remove(item.name)"/>
        <div class="iconContainer">
          <Icon :name=item.tag class="icon"></Icon>
        </div>
        <div class="labelsType">{{item.name}}</div>
      </li>

      <router-link to="AddLabels" class="labels" :type="type">
        <div class="iconContainer" @click="addLabels">
          <Icon name="add" class="settingIcon"/>
        </div>
        <div class="labelsType">添加类别</div>
      </router-link>
    </ol>
    <NumberPad/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constant/recordTypeList';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';


  @Component({
    components: {Tags, NumberPad, Tabs}
  })
  export default class ChargeUp extends Vue {
    type: '-' | '+' = this.$store.state.type;

    get LabelList() {
      return this.$store.state.labelList;
    }

    get xxx() {
      const typeMap = {'-': '支出', '+': '收入'};
      return this.LabelList.filter((i: Label) => i.type === typeMap[this.type]);
    }

    recordTypeList = recordTypeList;

    created() {
      this.$store.commit('fetchLabelList');
    }

    remove(name:string) {
      this.$store.commit('remove',name)
    }

    addLabels() {
      this.$store.commit('showInput');
      this.$store.commit('cancelShowNumberPad');
    }

    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    ShowNumberPad() {
      this.$store.commit('isShowNumberPad');
    }
  }
</script>

<style lang="scss" scoped>

  .container {
    display: flex;
    width: 100%;
    padding: 20px;
    flex-wrap: wrap;

    .labels {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;
      position: relative;

      > .remove {
        display: none;
      }

      > .showRemove {
        display: block;
        position: absolute;
        top: -8px;
        right: 5px;
      }

      > .iconContainer {
        font-size: 50px;
        border-radius: 50%;
        background: rgb(245, 245, 245);
        width: 55px;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;

        > .icon {
          width: 30px;
        }
      }

      > .labelsType {
        position: relative;
        bottom: -3px;
        font-size: 14px;
      }

    }
  }

  .type {
    position: absolute;
    top: 100vh;
    background: #fff;
    z-index: 1;
    width: 100%;
    height: 100vh;
    transition: all .3s;
    overflow: scroll;
  }

  .type.show {
    top: 0;
  }
</style>