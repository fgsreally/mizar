<script setup lang="ts">
import { useRequest } from 'vue-request'
const value = $ref('')
const { data, loading, run } = useRequest(testService, {
  debounceInterval: 300,
  manual: true,
  initialData: [],
})

watch(value, run)
</script>

<template>
  <Teleport to="body">
    <div flex flex-column fixed top="1/3" left="1/2" translate-x="-50%">
      <input v-model="value" type="text"><span v-show="loading" class="loading" />
      <div v-for="(item, i) in data" :key="i" flex content-center justify-center>
        {{ item }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

</style>
