<script setup lang="ts">
/**
 * A recreation of this demo: https://observablehq.com/@d3/line-chart
 */
import { useRequest } from '@/composables/request'
import { getActions } from '@/api'

const isActive = true // !!getQuery('')
const { data } = useRequest(getActions, { initData: [] as any, defaultParams: ['64ad0f48050c3b5f9c60a450'] })
</script>

<template>
  <Container v-if="isActive" direction="left" :offset="100">
    <a-collapse>
      <a-collapse-item v-for="(item, i) in data" :key="i" :header="item.message">
        {{ item.data.stack }}
      </a-collapse-item>
    </a-collapse>
  </Container>
</template>

<style scoped></style>
