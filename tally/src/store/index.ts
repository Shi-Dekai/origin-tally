import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
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