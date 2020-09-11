import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import Label from '@/components/Label';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    removeSwitch: '编辑',
    labelList: Label,
    type: '-',
    isShowCompile: false,
    isShowNumberPad: false,
    isShowInput: false,
    recordList: [],
    currentTag: undefined
  } as RootState,

  getters: {
    typeText: state => {
      return state.type === '-' ? '支出' : '收入';
    },

  },

  mutations: {
    xxx(state,type){
      state.type = type
    },

    accomplish(state, {type, input, select}) {
      store.commit('joinLabelList', {type, input, select});
      store.commit('setLabelList');
      store.commit('showInput');
      store.commit('cancelShowCompile');
    },

    remove(state, name: string) {
      let index = 0;
      for (let i = 0; i < state.labelList.length; i++) {
        if (state.labelList[i].name === name) {
          index = i;
          break;
        }
      }
      state.labelList.splice(index, 1);
      store.commit('setLabelList');
    },

    joinLabelList(state, {type, input, select}) {
      state.labelList.push({type: type, tag: select, name: input});
    },

    fetchLabelList(state) {
      state.labelList =  window.localStorage.getItem('labelList') ? JSON.parse( window.localStorage.getItem('labelList')||''):Label;
    },

    setLabelList(state) {
      window.localStorage.setItem('labelList', JSON.stringify(state.labelList));
    },

    setType(state, type) {
      state.type = type;
    },

    removeSwitch(state) {
      if (state.removeSwitch === '编辑') {
        state.removeSwitch = '完成';
      } else {
        state.removeSwitch = '编辑';
      }
      store.commit('isShowCompile');
    },

    isShowCompile(state) {
      state.isShowCompile = !state.isShowCompile;
    },

    cancelShowCompile(state) {
      if (state.isShowCompile) {
        state.isShowCompile = false;
      }
      if (state.removeSwitch === '完成') {
        state.removeSwitch = '编辑';
      }
    },
    //isShowNumberPad
    isShowNumberPad(state) {
      if (state.isShowNumberPad === false) {
        state.isShowNumberPad = true;
      }
    },

    cancelShowNumberPad(state) {
      if (state.isShowNumberPad === true) {
        state.isShowNumberPad = false;
      }
    },

    cancelShowInput(state) {
      if (state.isShowInput) {
        state.isShowInput = false;
      }
    },

    //isShowInput
    showInput(state) {
      state.isShowInput = state.isShowInput === false;
    },

    //recordStore
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList')
        || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList?.unshift(record2);  //可选链语法 stage-3
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },

  }

});

store.commit('fetchRecords')

export default store;