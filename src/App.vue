<template>
  <div id="app">
    <div class="p-20">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  box-sizing: border-box;
}
body, html {
  margin: 0;
  padding: 0;
  background: #134E5E;
  background: radial-gradient(#71B280, #134E5E);
}
h2 {
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.btn {
  margin-top: 30px;
  width: 200px;
  height: 50px;
  position: relative;
  z-index: 1;
  border: 1px solid #fff;
  color: #fff;
  background-color: transparent;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  overflow: hidden;
  outline: none;
}
.btn + .btn {
  margin-left: 20px;
}
.btn:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background: radial-gradient(circle, #71B280, #134E5E 60%);
  transition: transform 0.5s;
}
.btn:hover:before {
  transform: scale(2);
}

.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter {
  opacity: 0;
}
.p-20 {
  padding: 20px;
}
</style>
