<template>
  <Layout>
    <div>
      <Tabs :data-source="recordTypeList"/>
      <Chart :options="x"/>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constant/recordTypeList';
  import Chart from '@/components/Chart.vue';


  @Component({
    components: {Chart, Tabs}
  })
  export default class Statistics extends Vue {
    recordTypeList = recordTypeList;

    get x() {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
          ]
        },
        yAxis: {
          type: 'value'
        },

        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }],
        tooltip: {show: true},
      };
    }
  }
</script>

<style lang="scss" scoped>

</style>