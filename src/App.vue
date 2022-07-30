<template>
  <div id="app" :data-theme="$store.state.currentTheme" class="h-screen">
    <div class="back fixed h-full w-screen z-0">
    </div>
    <div class="z-50 w-full absolute">
      <navbar></navbar>
      <router-view class="flex-grow"></router-view>
    </div>
  </div>
</template>

<script>
import 'animate.css'
import navbar from "./components/navbar.vue"

export default {
  name: "app",
  components: {
    navbar,
  },
  setup() {

  },
  methods:{
    ba(){
      console.log(this.getTheme)
    }
  }
}
</script>

<style>
.back {
  background-color: theme('colors.base-100');
  background-image: radial-gradient(theme('colors.base-100') 20%, transparent 0), radial-gradient(theme('colors.base-200') 20%, transparent 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}

.logo-font {
  font-family: 'Montserrat', sans-serif;
}

#app {
  font-family: 'Kosugi', sans-serif;
}
</style>