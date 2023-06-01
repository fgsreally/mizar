<script setup lang="ts">
interface Point {
  type: string
  timestamp: number
  [key: string]: any
}
const { points } = defineProps<{ points: Point[] }>()

let current = $ref<Point>()
const length = computed(() => {
  return (points[points.length - 1].timestamp - points[0].timestamp) / 100
})
console.log(length.value)
function selectPoint(point: Point) {
  current = point
}
</script>

<template>
  <Teleport to="body">
    <div fixed bottom-0 md:h-20 w="80vw" left-0 flex flex-col content-center justify-center m-x-auto>
      <section v-if="current" flex flex-col fixed top-0 left-0>
        <div v-for="(item, i) in current" :key="i">
          <label for="">{{ i }}</label>
          <span>{{ item }}</span>
        </div>
      </section>

      <div w-full h-0 border-solid border-1 border-grey relative>
        <span
          v-for="(item, i) in points"
          :key="i"
          rounded-full
          border-4
          border-solid
          border-transparent
          hover:border-blue
          w-4 h-4 hover:scale-110
          :style="{
            left: `${(item.timestamp - points[0].timestamp) / length}%`,
            position: 'absolute',
          }"
          :class="{
            'bg-red': item.type === 'a',
            'border-yellow': current === item,
          }"
          @click="selectPoint(item)"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

</style>
