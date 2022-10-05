# emoji-box

### 特别说明：

- 基于 Vue3 编写，Vue2 不适用。
- 本项目中的表情基于开源表情制作，可商用。
- 一切用于不正当的行为，后果由使用者承担责任，与本项目无关。

## 安装

npm
```
npm i emoji-box
```
yarn
```
yarn add emoji-box
```

## 引入

Vue3
``` javascript
// 引入安装包和样式
import { createApp } from 'vue'
import App from './App.vue'
import Emoji from 'emoji-box'
import 'emoji-box/dist/style.css'

const app = createApp(App)
app.use(Emoji)
// 自定义图片 cdn 地址
// app.use(Emoji, { cdn: '' })
``` 

Nuxt3
在 plugins 下新建 emoji.ts 文件
``` javascript
import { defineNuxtPlugin } from '#app'
import Emoji from 'emoji-box'
import 'emoji-box/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Emoji)
  // 自定义图片 cdn 地址
  // nuxtApp.vueApp.use(Emoji, { cdn: '' })
})
```

**自定义图片 cdn 地址说明（可选）**
- 默认cdn地址: https://unpkg.com/emoji-box@latest/dist
- 如果表情图片加载缓慢，可将图片放在项目的静态文件夹中或者其他 cdn 上
- 自定义图片 cdn 地址请**注意路径**，确保图片地址如：`cdn地址/xx/xx_001.png` 能正常访问
- [图片素材地址](https://github.com/newbill/emoji-box/tree/main/public)

## 示例

``` html
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
```

**参数说明**

> 必要参数
- `v-model`: 关联插入表情的内容字段
- `addEmoji($event)`: 点击表情触发的方法，返回参数是该表情的文本形式
- `deleteEmoji()`: 点击删除按钮触发的方法

> 可选参数
- `id`: 表情面板的唯一标识，可省略，字符串类型，默认为emoji-box
- `buttton`: 是否显示删除按钮，可省略，布尔类型，默认为true
- `height`: 面板高度，可省略，字符串类型，默认为160px
- `hidden`: 选择要隐藏的表情面板，可省略，字符串数组类型，默认为空即都显示，`hidden="['XX']"`则表示隐藏XX表情面板
- `active`: 默认选中的表情面板，可省略，字符串类型，默认为圆脸

**全局方法**

``` javascript
// 解析显示表情
this.value = this.$string2emoji(this.value)
// 逐个删除已有表情
this.value = this.$deleteEmoji(this.value)
```

## 在线体验

[demo](https://emoji.dai.im)