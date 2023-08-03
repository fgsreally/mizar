<script setup lang="ts">
import { useV } from 'phecda-vue'
const { errorIds } = $(useV(BaseModel))
</script>

<template>
  <a-list v-if="!!errorIds">
    <a-list-item v-for="(item, i) in errorIds" :key="i">
      {{ item }} <a-button>切换</a-button>
    </a-list-item>
  </a-list>
  <a-empty v-else />
</template>

<style scoped>
:deep(.arco-list-item-content){
display: flex;
align-items: center;
padding: 0 20px;
justify-content: space-between;
}
</style>
