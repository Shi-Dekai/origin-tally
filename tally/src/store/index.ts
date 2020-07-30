import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
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
    tagList: [],
    currentTag: undefined
  } as RootState,

  getters: {
    typeText: state => {
      return state.type === '-' ? '支出' : '收入';
    }
  },

  mutations: {

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
      state.labelList = JSON.parse(window.localStorage.getItem('labelList') || '');
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
      if (state.isShowCompile === false) {
        state.isShowCompile = true;
      } else {
        state.isShowCompile = false;
      }
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
      if (state.isShowInput === false) {
        state.isShowInput = true;
      } else {
        state.isShowInput = false;
      }
    },

    //recordStore
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList')
        || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList?.push(record2);  //可选链语法 stage-3
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },


    //tagStore
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      } else {
        const id = createId().toString();
        state.tagList.push({id, name: name});
        store.commit('saveTags');
      }

    },
    updateTag(state, payload: { id: string, name: string }) {
      const idList = state.tagList.map(item => item.id);
      const {id, name} = payload;
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  }

});

export default store;