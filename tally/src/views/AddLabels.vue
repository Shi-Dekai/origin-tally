<template>
  <div>
    <div class="menuBar">
      <span class="menu return" @click="goBack"><返回</span>
      <span class="menu add">添加{{type}}类别</span>
      <span class="menu accomplish" @click="accomplish(type,input,select)">完成</span>
    </div>

    <label class="input">
      <input type="text" placeholder="请输入类别名称（不超过4个汉字）" maxlength="4" v-model="input">
    </label>
    <div class="addLabel">
      <ol class="container">
        <li class="presentItem">
          <div class="presentContainer">
            <Icon :name=select class="present"/>
          </div>
        </li>

        <li v-for="item in labels" :key="item" class="labels"
            @click="selected(item)">
          <div class="iconContainer" :class="{selectClass: select === item}">
            <Icon :name=item class="icon"></Icon>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import AddLabel from '@/components/AddLabel';

  @Component
  export default class AddLabels extends Vue {
    input: string = '';
    type: string = this.$store.getters.typeText;
    select: string = 'shuiguo';
    labels: string[] = AddLabel;

    goBack() {
      this.$router.back();
      this.$store.commit('showInput');
      this.$store.commit('cancelShowCompile');
    }

    selected(item: string) {
      this.select = item;
    }

    accomplish(type: string, input: string, select: string) {
      if (!input) {
        alert('请输入标签名！');
      } else if (this.$store.state.labelList.filter((item: Label) => item.name === input && item.type === type).length > 0) {
        alert('!!!');
      } else {
        this.$store.commit('accomplish', {type, input, select});
        this.$router.push('/statistics');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    position: relative;
    height: 70px;
    align-items: center;
    background: #ffffff;

    > input {
      position: absolute;
      left: 90px;
      width: 80%;
      height: 27px;
      line-height: 27px;
      border: none;
    }
  }

  .addLabel {
    width: 100%;
    height: 82vh;
    background: #ffffff;
    padding-top: 30px;
    overflow: scroll;
  }

  .container {
    display: flex;
    width: 100%;
    padding: 20px;
    flex-wrap: wrap;

    > .presentItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
      margin-bottom: 20px;
      position: absolute;
      top: 57px;
      left: 7px;

      > .presentContainer {
        font-size: 50px;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F9DC61;

        > .present {
          width: 40px;
        }
      }

      > .present {
        border: 1px solid red;
        width: 30px;
      }
    }


    .labels {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
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
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;

        &.selectClass {
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

  .menuBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background: #F9DB61;

    > .menu {
    }

    > .return {
      padding-left: 8px;
    }

    > .add {

    }

    > .accomplish {
      padding-right: 8px;
    }
  }
</style>