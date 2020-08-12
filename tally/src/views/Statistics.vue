<template>
  <Layout>
    <div class="content">
      <Tabs :data-source="recordTypeList" :value.sync="typeSymbol"/>
      <div class="StatisticalHead">
        <div class="grossAmount">
          <span class="amountTo">本月总{{type}}：{{grossAmount()}}</span>
          <br>
          <span class="span">平均值：{{mean()}}</span>
        </div>
      </div>

      <hr class="hr">
      <Chart class="chart" :options="chartOptions"/>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constant/recordTypeList';
  import Chart from '@/components/Chart.vue';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';


  @Component({
    components: {Chart, Tabs}
  })
  export default class Statistics extends Vue {
    recordTypeList = recordTypeList;
    typeSymbol = '-';

    mean() {
      return (this.keyValueList.map(item => item.amount).reduce((a, b) => {return a + b;}) / this.keyValueList.length).toFixed(2);
    }

    grossAmount() {
      return this.keyValueList.map(item => item.amount).reduce((a, b) => {return a + b;}).toFixed(2);
    }

    get type() {
      return this.typeSymbol === '-' ? '支出' : '收入';
    }

    get keyValueList() {
      let year = dayjs().year();
      let month = dayjs().month();

      const list = this.$store.state.recordList;
      const newList = clone(list).filter((item: RecordItem) => item.type === this.type);

      let list2 = newList.map((item: RecordItem) => ({
        type: item.type,
        amount: item.amount,
        createAt: item.createdAt,
        date: dayjs(item.createdAt).format('YYYY-MM-DD')
      }));

      const list3 = list2.filter((item: { type: string, amount: string, createAt: string, date: string }) =>
        dayjs(item.date).year() === year
        && dayjs(item.date).month() === month
      );

      let dict: any = {};
      for (let i = 0; i < list3.length; i++) {
        if (dict[list3[i].createAt] === undefined) {
          dict[list3[i].createAt] = list3[i].amount;
        } else {
          dict[list3[i].createAt] = dict[list3[i].createAt] + list3[i].amount;
        }
      }

      function mGetDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let d = new Date(year, month, 0);
        return d.getDate();
      }

      let days: number = mGetDate();
      let result = [];
      for (let i = 1; i <= days; i++) {
        let key = year +
          '-' + ((month + 1) < 10 ? '0' + (month + 1) : (month + 1)) +
          '-' + (i < 10 ? ('0' + i) : i);
        if (dict[key]) {
          result.push({createAt: key, amount: dict[key]});
        } else {
          result.push({createAt: key, amount: 0});
        }
      }
      return result;
    }

    get chartOptions() {
      const keys = this.keyValueList.map(item => dayjs(item.createAt).format('MM-DD'));
      const values = this.keyValueList.map(item => item.amount);

      return {
        grid: {
          left: 10,
          right: 10,
          height: 150,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisLabel: {
            interval: 5,
            lineStyle: {width: 1},
            axisTick: {show: false},
          },
          axisTick: {show: false},
          axisLine: {lineStyle: {color: '#7C7C7C'}}

        },
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: true,
            interval: 1
          }
        },

        series: [{
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: {
            normal: {
              color: '#5d5c5d',//折线的颜色
              width: '0.8'//折线粗细
            }
          },
          itemStyle: {
            normal: {
              color: '#F9DB61',
              borderColor: '#000000',
              borderWidth: 0.3
            },
            borderWidth: 1,
            color: '#666',
            shadowColor: 'yellow',
            symbolSize: 1
          },
          data: values,
          type: 'line',
        }],
        tooltip: {
          show: true,
          formatter: '日期：{b}<br />金额：{c}',
          position: 'top'
        },
      };
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    height: 100%;
    background: #ffffff;
  }
  .StatisticalHead{
    display: flex;
    justify-content: center;
    align-items: center;
    .grossAmount {
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      top: 15px;
      width: 35%;
      height: 50px;
      background: #f5f5f5;
      border-radius: 4px;
      font-family: "Montserrat", sans-serif;
      font-size: 13px;
      >.amountTo {
        position: absolute;
        top: 2px;
      }
      .span {
        position: absolute;
        bottom: 2px;
      }
    }
  }


  .hr {
    position: relative;
    top: 63px;
    background: #7C7C7C;
    border: none;
    height: 1px;
  }

  ::v-deep .cancel {
    display: none;
  }

  ::v-deep .compile {
    display: none;
  }
</style>