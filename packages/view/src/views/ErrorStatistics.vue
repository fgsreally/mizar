<script setup lang="ts">
import Chart from 'chart.js/auto'
import { useR } from 'phecda-vue'
import { BaseModel } from '../models/base'
import { $Req, getErrorStatistics } from '@/api'
const container = $ref<HTMLCanvasElement | null>(null)
let visible = $ref(false)
let list = $ref<Awaited<ReturnType<typeof getActions>>>([])
let chart: Chart
const base = useR(BaseModel)

async function update(range: any) {
  chart?.destroy()
  if (!range)
    return
  const [timestart, timeend] = range
  const { data: value } = await $Req(getErrorStatistics(base.projectId, timestart, timeend))
  const data = {
    labels: value.map(item => item.date),
    datasets: [{
      label: '报错总数',
      data: value.map(item => item.total),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 1,
    }],
  }

  chart = new Chart(container!.getContext('2d')!, {
    type: 'line',
    data,
  })
}

async function updateList(time: string) {
  const { data } = await $Req(getActions(time, base.projectId))

  list = data
}

function showDrawer(e: Event) {
  if (!chart)
    return
  const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true)
  if (points.length) {
    const { datasetIndex } = points[0]
    const time = chart.data.labels![datasetIndex]
    updateList(time as string)
    visible = true
  }
}
</script>

<template>
  <div id="error-statistics_container">
    <a-range-picker show-time @change="update" />
    <div style="width: 360px;height:180px">
      <canvas ref="container" @click="showDrawer" />
    </div>
    <a-drawer popup-container="#error-statistics_container" :visible="visible" :footer="false" @cancel="visible = false">
      <template #title>
        错误统计
      </template>
      <a-collapse>
        <a-collapse-item v-for="(item, i) in list " :key="i">
          {{ item.data.message }}
          <template #header>
            {{ item.data.type }}
            <a-tag color="red">
              {{ item.data.count }}
            </a-tag>
          </template>
        </a-collapse-item>
      </a-collapse>
    </a-drawer>
  </div>
</template>
