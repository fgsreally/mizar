<script setup lang="ts">
defineProps<{
  direction: 'left' | 'right'
  offset: number
  description: string
}>()
const isActive = ref(true)
</script>

<template>
  <div fixed flex flex-col flex-items-center justify-center flex-wrap :style="`top:${offset}px;${direction}:0`">
    <div
      :title="description"
      flex justify-center
      flex-items-center w-5 h-5
      rounded-full
      absolute
      top-0
      z-10
      translate-y="-100%"
      :class="direction === 'left' ? 'left-0' : 'right-0'"
      class="arrow"
      @click="isActive = !isActive"
    >
      <div
        w-5
        h-5
        :class="{
          'i-lucide-arrow-left': direction === 'left',
          'i-lucide-arrow-right': direction === 'right',
          'rotate-180': !isActive,
        }" transition-all
      />
    </div>
    <Transition :name="direction" appear>
      <div v-show="isActive">
        <el-card class="card" p-4>
          <slot />
        </el-card>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.left-enter-active,
.left-leave-active,.right-enter-active,
.right-leave-active {
  transition: transform 0.5s ease;
}

.left-enter-from,
.left-leave-to {
  transform: translateX(-100%);
}

.right-enter-from,
.right-leave-to {
  transform: translateX(100%);
}
.card{
    border-radius: 0.5rem;
    overflow:hidden;
    border:1px solid rgba(82, 82, 111, 0.44) ;
    flex:wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width:100px;
    will-change:auto;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 24px;
    color:rgb(224, 225, 236);
    backdrop-filter: blur(10px) saturate(190%) contrast(70%) brightness(80%);
    background-color: rgba(29, 30, 43, 0.498);
    max-width:max-content ;
 }

 .arrow{
    background-color: rgba(29, 30, 43, 0.498);
    color:rgb(224, 225, 236);

 }
</style>
