<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" title="错误统计">
      <ErrorStatistics />
    </a-tab-pane>
    <a-tab-pane key="2" title="错误回放">
      <ErrorActions />
    </a-tab-pane>
    <a-tab-pane key="3">
      <template #title>
        Tab 3
      </template>
      Content of Tab Panel 3
    </a-tab-pane>
  </a-tabs>
</template>
