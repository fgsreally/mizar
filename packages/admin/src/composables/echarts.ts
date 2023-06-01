import * as echarts from 'echarts'
import { type Ref, onUnmounted } from 'vue'
import { onMounted } from 'vue'
export function useChart(el: Ref<HTMLElement>, option: any) {
  let myChart: echarts.ECharts

  onMounted(() => {
    myChart = echarts.init(el.value, 'dark')
    myChart.setOption(option)
  })
  onUnmounted(() => {
    myChart.dispose()
  })
}
