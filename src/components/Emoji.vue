<template>
  <div class="emoji-panel">
    <span v-for="tab in tabs" :key="tab.id">
      <div class="emoji-tab" v-if="hidden.indexOf(tab.name) == -1">
        <input type="radio" name="emoji-tab" :id="id + '-' + tab.id" :checked="isActive == tab.name" />
        <label :for="id + '-' + tab.id" @click="isActive = tab.name">{{ tab.name }}</label>
      </div>
    </span>
    <div v-for="tab in tabs" :key="tab.id">
      <div class="emoji-box" v-if="isActive == tab.name && hidden.indexOf(tab.name) == -1">
        <div :style="{ height: height }" class="emoji-container">
          <span class="emoji-wrapper" v-for="[key, value] of Object.entries(tab.emojiMap)" :key="value">
            <img :src="this.$cdn + '/' + tab.prefix + '/' + value + tab.suffix" :alt="value" @click="addEmoji(key)">
          </span>
        </div>
        <div class="delete-button" @click="deleteEmoji()" v-if="button">
          <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#666666">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faceEmojiMap, otherEmojiMap, handEmojiMap, animalEmojiMap } from '../util'

export default {
  name: 'Emoji',
  props: {
    id: {
      type: String,
      default: 'emoji-box'
    },
    value: {
      type: String,
      default: ''
    },
    button: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '160px'
    },
    hidden: {
      type: Array,
      default: []
    },
    active: {
      type: String,
      default: '圆脸'
    },
  },
  data() {
    return {
      isActive: this.active,
      tabs: [
        {
          id: 'face',
          name: '圆脸',
          prefix: 'ms',
          suffix: '.png',
          emojiMap: faceEmojiMap,
        }, {
          id: 'other',
          name: '其他',
          prefix: 'ms',
          suffix: '.png',
          emojiMap: otherEmojiMap,
        }, {
          id: 'hand',
          name: '手势',
          prefix: 'ms',
          suffix: '.png',
          emojiMap: handEmojiMap,
        }, {
          id: 'animal',
          name: '动物',
          prefix: 'ms',
          suffix: '.png',
          emojiMap: animalEmojiMap,
        },
      ],
    }
  },
  methods: {
    addEmoji(key) {
      this.$emit('add', this.value + key)
    },
    deleteEmoji() {
      this.$emit('delete', this.$deleteEmoji(this.value))
    }
  },
}
</script>

<style>
@import "../css/style.css";
</style>