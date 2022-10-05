import Emoji from "./components/Emoji.vue"
import { string2emoji, deleteEmoji } from "./util"

export default {
  install: (app, options) => {
    const cdn = options && options.cdn || 'https://unpkg.com/emoji-box@latest/dist'
    app.config.globalProperties.$cdn = cdn
    app.config.globalProperties.$string2emoji = string2emoji
    app.config.globalProperties.$deleteEmoji = deleteEmoji
    app.component("Emoji", Emoji)
  }
}