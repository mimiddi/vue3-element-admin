<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore, mapGetters } from 'vuex'

const route = useRoute()
const store = useStore()

const username = ref('')
const password = ref('')

/**
 * src/permission.js
 * 保存token失效返回login之前的path
 * 登录成功则跳转指定页面redirect
 */
const { query } = route
let redirect = undefined // 要跳转的页面
let otherQuery = {} // 要跳转的页面参数
if (query) {
  redirect = query.redirect
  otherQuery = getOtherQuery(query)

  // 提取其他参数
  function getOtherQuery (query) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {})
  }
}

const allState = store.state
// store.dispatch('test/setTestState', true)
// const computedState = computed({
//   get: () => count.value + 1,
//   set: val => {
//     count.value = val - 1
//   }
// })

console.info(store.state.test.testState)
</script>

<template>
  <div>login</div>
  <!--<div @click="count++">{{ count }}</div>-->
  <el-button>111</el-button>
</template>

<style scoped>
  a {
    color: #42b983;
  }
</style>
