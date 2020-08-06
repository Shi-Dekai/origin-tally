<template>
  <div class="type" :class="{show:$store.state.isShowInput}">
    <Tabs :data-source="recordTypeList" :value.sync="type" @update:cancel="select = ''"/>

    <ol class="container" :class="{change:!(select === '')}">
      <li v-for="(item,index) in xxx" :key="index" class="labels"
          @click="ShowNumberPad(item)">
        <Icon name="remove" class="remove" :class="{showRemove:$store.state.isShowCompile}"
              @click.stop="remove(item.name)"/>
        <div class="iconContainer" :class="{selectLabel: select === item.tag}">
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
    <NumberPad :select.sync="select"
               @update:notes="OnUpdateNotes"
               :ShowBoard.sync="isShowBoard"
               @update:ShowBoard="OnUpdateBoard"
               :create-at="recordList.createdAt"
    />
    <div class="boardContainer" :class="{show:isShowBoard === 'show'}">
      <div class="board">
        <label>
          <span>请选择日期</span>
          <input :type="'date' ||'text'"
                 :value="inputValue(recordList.createdAt)"
                 @change="OnChange">
        </label>
        <div class="button">
          <button @click="confirm">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constant/recordTypeList';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import dayjs from 'dayjs';


  @Component({
    components: {NumberPad, Tabs}
  })
  export default class ChargeUp extends Vue {
    isShowBoard: string = 'none';
    type: '-' | '+' = this.$store.state.type;
    select: string = '';
    recordTypeList = recordTypeList;
    recordList: RecordItem = {
      type: '支出',
      tag: '',
      name: '',
      notes: '',
      amount: 0,
      createdAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD')
    };

    OnChange(event: MouseEvent) {
      this.recordList.createdAt = (event.currentTarget as HTMLInputElement).value;
    }

    confirm() {
      this.isShowBoard = 'none';

    }

    OnUpdateBoard(isShowBoard: string) {
      this.isShowBoard = isShowBoard;
    }

    inputValue(isoString: string) {
      return dayjs(isoString).format('YYYY-MM-DD');
    }

    get LabelList() {
      return this.$store.state.labelList;
    }

    get xxx() {
      const typeMap = {'-': '支出', '+': '收入'};
      return this.LabelList.filter((i: Label) => i.type === typeMap[this.type]);
    }

    OnUpdateNotes(obj: { notes: string, amount: number }) {
      this.recordList.notes = obj.notes;
      this.recordList.amount = obj.amount;
      this.$store.commit('createRecord', this.recordList);
    }

    created() {
      this.$store.commit('fetchLabelList');
    }

    remove(name: string) {
      this.$store.commit('remove', name);
    }

    addLabels() {
      this.$store.commit('showInput');
      this.$store.commit('cancelShowNumberPad');
    }

    ShowNumberPad(item: Label) {
      this.$store.commit('isShowNumberPad');
      this.select = item.tag;
      this.recordList.name = item.name;
      this.recordList.type = item.type;
      this.recordList.tag = item.tag;
    }
  }
</script>

<style lang="scss" scoped>
  .boardContainer {
    display: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, .2);

    &.show {
      display: block;
    }

    > .board {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 35%;
      left: 10%;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      width: 300px;
      height: 150px;
      border-radius: 20px;

      > label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 30px;

        > span {
          display: flex;
          font-size: 14px;
          position: relative;
          top: -5px;
        }

        > input {
          border: none;
          background: #ffffff;
        }

      }

      > .button {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 8px;
        border-top: 2px solid #a8bdbb;
        padding: 10px 0;

        > button {
          border: none;
          outline: none;
          background: #ffffff;
          color: #42b983;
          width: 100%;
        }
      }
    }

  }

  .container {
    display: flex;
    width: 100%;
    padding: 20px;
    flex-wrap: wrap;

    &.change {
      padding: 20px 20px 280px 20px;
    }

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

        &.selectLabel {
          background: #F9DC66;
        }

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