<script setup lang="ts">
import axios from 'axios'
function throwError() {
  throw new Error('冲冲冲')
}
function throwReject() {
  return Promise.reject('冲')
}

Promise.reject('setup')
async function xhr() {
  const ret = await axios.get('/a.json')
  console.log(ret)
}

function requestFetch() {
  fetch('/test', {
    method: 'POST',
    // @ts-expect-error not
    body: { name: 'fga' },
  })
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="throwReject">
      抛出reject
    </button>
    <button @click="throwError">
      抛出错误
    </button>
    <button @click="xhr">
      错误请求xhr
    </button>
    <button @click="requestFetch">
      错误请求fetch
    </button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
