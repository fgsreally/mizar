<script setup lang="ts">
import { useR } from 'phecda-vue'
import { useRequest } from '@/composables/request'
import { getPlayback } from '@/api'
import { Task } from '@/utils/tasks'
const base = useR(BaseModel)

const { data } = useRequest(getPlayback, { initData: [] as any, defaultParams: [base.errorId] })
const colorMap = {
  error: 'red',
  info: 'green',
  performance: 'blue',
}

async function execTask(type: string, data: any) {
  log(await (Task as any)[type]?.(data))
}
</script>

<template>
  <a-timeline px-8>
    <a-timeline-item v-for="(item, i) in data" :key="i" relative>
      <a-tag :color="colorMap[item.level]">
        {{ item.level }}
      </a-tag>

      {{ item.message }}

      <a-button shape="circle" @click="execTask(item.type, item.data)">
        <i-lucide:play />
      </a-button>
    </a-timeline-item>
  </a-timeline>
</template>

<style scoped></style>
