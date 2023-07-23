<script lang="ts" setup>
const { direction, offset } = defineProps<{ direction: 'top' | 'left' | 'right' | 'bottom'; offset: number; label: string }>()


const isActive = ref(true)
const computedStyle = computed(() => {
  const d = ['top', 'bottom'].includes(direction) ? 'left' : 'top'
  return {
    [d]: `${offset}px`,
  }
})
</script>

<template>
  <section :class="`mz-transition mz-${direction} ${isActive ? '' : 'mz-hidden'}`" m-4 :style="computedStyle"
    style="position: fixed;z-index: 10;user-select: none;will-change:auto">
    <header>
      <p class="drag-wrapper__label"  color-blue>
        {{ label }}
      </p>
    </header>
    <slot />
    <a-button :class="`mz-${direction}`" @click="isActive = !isActive">
      <div class="i-lucide:arrow-down" :class="{
        'rotate-180': isActive,
      }" />
    </a-button>
  </section>
</template>

<style lang="scss" scoped>
button {
  position: absolute;

  &.mz-top,
  &.mz-bottom {
    left: 50%;
    transform: translateX(-50%);
  }

  &.mz-left,
  &.mz-right {
    top: 50%;
  }

  &.mz-left {
    right: 0;
    transform: translate(100%, -50%);
  }

}

.mz-transition {
  transition: all 1s ease-in-out;

  &.mz-top.mz-hidden {
    transform: translateY(-100%);

  }

  &.mz-bottom.mz-hidden {
    transform: translateY(-100%);

  }

  &.mz-left.mz-hidden {
    transform: translateX(-100%);

  }

  &.mz-right.mz-hidden {
    transform: translateX(-100%);

  }
}</style>
