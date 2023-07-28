<script setup lang="ts">
let activeKey = $(ref('error_statistics'))
provide('change-tab', (k: string) => activeKey = k)
</script>

<template>
  <!-- <Container direction="top" :offset="30" label="mizar admin"> -->
  <a-tabs v-model="activeKey" w-fit border-8 border-solid border-blue>
    <a-tab-pane key="error_statistics" title="错误统计">
      <a-scrollbar style="height:300px;overflow: auto;">
        <ErrorStatistics />
      </a-scrollbar>
    </a-tab-pane>
    <a-tab-pane key="error_records" title="错误集">
      <a-scrollbar style="height:300px;overflow: auto;">
        <ErrorRecord />
      </a-scrollbar>
    </a-tab-pane>
    <a-tab-pane key="error_playback" title="错误回放">
      <a-scrollbar style="height:300px;overflow: auto;">
        <ErrorPlayback />
      </a-scrollbar>
    </a-tab-pane>
  </a-tabs>
  <a-space>
    <a-trigger position="top" auto-fit-position :unmount-on-close="false">
      <span>Hover Me</span>
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
    <a-trigger trigger="click" :unmount-on-close="false">
      <a-button>Click Me</a-button>
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
    <a-trigger trigger="focus" :render-to-body="false">
      <a-input placeholder="Focus on me" />
      <template #content>
        <div class="demo-basic">
          <a-empty />
        </div>
      </template>
    </a-trigger>
  </a-space>

  <!-- </Container> -->
</template>
