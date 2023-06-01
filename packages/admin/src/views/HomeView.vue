<script setup lang="ts">
import * as echarts from 'echarts'

const el = ref<HTMLElement>(null)

// const option = {

//   tooltip: {
//     trigger: 'axis',
//     triggerOn: 'mousemove', // 只有鼠标移到点上才出现信息框

//     axisPointer: {
//       type: 'cross',
//       crossStyle: {
//         color: '#999',
//       },
//     },
//     // 使用HTML标签在tooltip中嵌入表格
//     formatter(params) {
//       let table = '<table>'
//       table += `<tr><td>Date</td><td>${params[0].name}</td></tr>`
//       table += `<tr><td>Value</td><td>${params[0].value}</td></tr>`
//       table += '</table>'
//       return table
//     },
//   },
//   xAxis: {
//     type: 'category',
//     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
//   },
//   yAxis: {
//     type: 'value',
//   },
//   series: [{
//     data: [820, 932, 901, 934, 1290, 1330, 1320],
//     type: 'line',
//     smooth: true,
//     areaStyle: {
//       color: {
//         type: 'linear',
//         x: 0,
//         y: 0,
//         x2: 0,
//         y2: 1,
//         colorStops: [{
//           offset: 0, color: 'rgba(0, 255, 255, 0.3)', // 0% 处的颜色
//         }, {
//           offset: 1, color: 'rgba(0, 255, 255, 0)', // 100% 处的颜色
//         }],
//       },
//     },
//   }],
// }
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#83bff6',
      }, {
        offset: 0.5,
        color: '#188df0',
      }, {
        offset: 1,
        color: '#188df0',
      }]),
    },
    emphasis: {
      focus: 'series',
    },
  }],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
}

useChart(el, option)
</script>

<template>
  <main>
    <aside class="flex  flex-col overflow-auto aside">
      <div class="header p-6 flex flex-col gap-3">
        <div class="flex flex-row gap-2 items-center">
          <div class="px-2 py-1 bg-grey-400">
            111
          </div>
        </div>
        <div />
        <div />
      </div>
      <div ref="el" class="line-container" />
    </aside>
    <!-- <TheWelcome /> -->
  </main>
</template>

<style>
.line-container{
  width: 500px;
  height: 500px;
}
.aside{
  position: fixed;
  top: 0;
  height: 100%;
  width:30vw;
  right: 0;
  z-index: 20;
  background-color:rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 8px 16px;
}
</style>
