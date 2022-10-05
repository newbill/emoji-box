<template>
  <div class="app">
    <header>
      <h1>emoji-box</h1>
      <span>
        <a href="https://www.npmjs.com/package/emoji-box" target="_blank">使用文档</a>
        &nbsp;&nbsp;
        <a href="https://github.com/newbill/emoji-box" target="_blank">仓库地址</a>
      </span>
    </header>
    <Emoji v-model="state.value" @add="addEmoji($event)" @delete="deleteEmoji()" />
    <div class="test">
      <div class="flex-box">
        <div class="box">{{ state.value }}</div>
        <button @click="send()" class="btn">渲染</button>
        <div class="box">
          <div v-for="(msg, index) of state.msgs" :key="index" v-html="msg"></div>
        </div>
      </div>
    </div>
    <footer>
      <div>&copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;emoji-box</div>
      <div>
        <span>由&nbsp;<a href="https://dai.im" target="_blank">DAI</a>&nbsp;设计</span>
        <span class="heart">&nbsp;❤&nbsp;</span>
        <span>由&nbsp;<a href="https://vercel.com" target="_blank">Vercel</a>&nbsp;驱动</span>
      </div>
      <div>一切用于不正当的行为，后果由使用者承担责任，与本项目无关</div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
const internalInstance = getCurrentInstance()
const global = internalInstance?.appContext.config.globalProperties

const state = reactive({
  value: '',
  msgs: [],
})

const send = () => {
  state.msgs.push(global.$string2emoji(state.value))
  state.value = ''
}

const addEmoji = (val) => {
  state.value += val
}

const deleteEmoji = () => {
  if (state.value) {
    state.value = global.$deleteEmoji(state.value)
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #666;
}
a:hover {
  color: green;
}
.app {
  max-width: 870px;
  margin: auto;
}
header,
footer {
  text-align: center;
  margin-top: 50px;
}
header {
  margin-bottom: 50px;
}
.test {
  margin: 50px 0;
}
.flex-box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.btn {
  width: 10%;
  display: inline-block;
  cursor: pointer;
}
.box {
  flex-grow: 1;
  text-align: left;
  max-width: 45%;
  height: 200px;
  border: 1px green solid;
  border-radius: 3px;
  display: inline-block;
  overflow: auto;
}
.heart {
  color: red;
}
</style>