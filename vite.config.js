import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['marked']
  },
  build: {
    rollupOptions: {
      external:[
        'vue-material-design-icons/Youtube.vue',
        'vue-material-design-icons/TelevisionClassic.vue',
        'vue-material-design-icons/Twitter.vue',
        'vue-material-design-icons/Post.vue',
        'vue-material-design-icons/Soundcloud.vue',
        'vue-material-design-icons/Album.vue',
        'vue-material-design-icons/AccountCircle.vue',
        'vue-material-design-icons/Play.vue',
        'vue-material-design-icons/Pause.vue',
        'vue-material-design-icons/InformationOutline.vue',
        'vue-material-design-icons/chevronLeft.vue',
        'vue-material-design-icons/chevronDown.vue',
        'vue-kinesis'
      ],
    },
    commonjsOptions: {
      include: ['marked']
    }
  }
})
