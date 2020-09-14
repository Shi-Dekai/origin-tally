<template>
  <Layout>
    <div>
      <Tabs :data-source="recordTypeList" :value.sync="$store.state.type"/>
      <EmptyContent v-if="groupedList.length ===0"/>
      <ol>
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}} <span>{{'总计: '+group.total}}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <div class="iconContainer">
                <Icon :name="item.tag" class="icon"/>
              </div>
              <div class="notesAndSum">
                <span class="notes">{{name(item.name,item.notes)}}</span>
                <span class="sum">{{item.amount}}</span>
              </div>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constant/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import EmptyContent from '@/components/EmptyContent.vue';

  @Component({
    components: {EmptyContent, Tabs}
  })

  export default class Detail extends Vue {
    name(name: string, notes: string) {
      return notes ? notes : name;
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(new Date(), 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const newList = clone(recordList).filter(r => r.type === this.$store.getters.typeText)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

      if (newList.length === 0) {return [];}
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];

      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  ::v-deep .content {
    background: #ffffff;
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
    color: #999;
    font-size: 13px;
    padding-left: 22px;
    border-bottom: 1px solid #E1E1E1;
  }

  .record {
    @extend %item;
    display: flex;
    align-items: center;
    height: 62px;
    padding-right: 0;

    .iconContainer {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      background: #f5f5f5;
    }

    .notesAndSum {
      flex-grow: 1;
      border-top: 1px solid #EBEBEB;
      margin-left: 15px;
      position: relative;

      .notes {
        margin-right: auto;
        height: 64px;
        line-height: 64px;
      }

      .sum {
        position: absolute;
        right: 0;
        height: 100%;
        line-height: 64px;
        padding-right: 16px;
      }
    }
  }

  ::v-deep .interval-tabs-item {
    height: 48px;
  }

  ::v-deep .cancel {
    display: none;
  }

  ::v-deep .compile {
    display: none;
  }
</style>