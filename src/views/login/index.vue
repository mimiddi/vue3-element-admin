<script setup>
import { ref, computed } from 'vue'
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
console.info(allState.test.testState)
computed({...mapGetters(['testState'])})



store.dispatch('test/setTestState', true)
// const count = ref(0)
// const computedState = computed({
//   get: () => count.value + 1,
//   set: val => {
//     count.value = val - 1
//   }
// })

const computedState = computed({
  get: () => allState.test.testState + 1,
  set: val => {
    // allState.test.value = val - 1
  }
})


// console.info(res)

console.info(store.state.test.testState)

// login
function login() {
  console.info(111)
}
</script>

<template>
  <div>login</div>
  <!--<div @click="count++">{{ count }}</div>-->
  <el-button>1112 {{ testState }} </el-button>
  <div>{{ computedState }}</div>

  <el-button @click="login">login</el-button>
</template>

<style scoped>
  a {
    color: #42b983;
  }
</style>
