import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 打包发布
const lib = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/install.js'),
      name: 'Emoji',
      fileName: (format) => `emoji.${format}.js`
    },
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
    }
  }
})

// 开发测试
const dev = defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    outDir: 'dev',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
      },
    }
  }
})

export default ({ mode }) => {
  const type = loadEnv(mode, process.cwd()).VITE_BASEURL
  if (type === 'lib') {
    return lib
  } else {
    return dev
  }
}