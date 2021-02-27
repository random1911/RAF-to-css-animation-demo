<template>
  <div id="app">
    <SidebarMenu :is-hidden="isHidden" @close-menu="closeMenu">
      This is menu content
    </SidebarMenu>
    <div style="text-align: center">
      <p>Look at this at mobile phone or emulator</p>
      <p>Open sidebar menu then swipe to left.</p>
      <p>
        Swipe will affect RAF. After swipe end, CSS animation starts from last
        position passed via CSS variable
      </p>
      <button @click="showMenu" type="button">Show menu</button>
      <p>
        <a href="https://github.com/random1911/RAF-to-css-animation-demo"
          >source code</a
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SidebarMenu from "./components/SidebarMenu.vue";

@Component({
  components: {
    SidebarMenu
  }
})
export default class App extends Vue {
  isHidden = true;
  showMenu() {
    this.isHidden = false;
  }
  closeMenu() {
    this.isHidden = true;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  padding: 20px;
}
</style>
