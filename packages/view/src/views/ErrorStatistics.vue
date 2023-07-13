<script setup lang="ts">
/**
 * A recreation of this demo: https://observablehq.com/@d3/line-chart
 */
import Chart from 'chart.js/auto'

import { $request, getErrorStatistics } from '@/api'
import { getQuery } from '@/utils'
const container = $(ref<HTMLCanvasElement | null>(null))

const isActive =true //!!getQuery('')

onMounted(refresh)

async function refresh() {
  const { data: value } = await $request(getErrorStatistics())
  const labels = [1,2,3]
  const data = {
    labels,
    datasets: [{
      label: 'My First Dataset',
      data: value,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  }
  
  const chart = new Chart(container!.getContext('2d')!,{
    type:'line',
    data
  })

}
</script>

<template>
  <Container v-if="isActive" direction="left" :offset="100">
    <canvas ref="container" />
  </Container>
</template>

<style scoped></style>
