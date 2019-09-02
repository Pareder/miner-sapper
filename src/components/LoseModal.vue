<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop"></div>
      <div class="modal__inner">
        <div class="modal__top">
          <h2>You lose</h2>
        </div>
        <div class="modal__body">
          <p>You can try again.</p>
          <button type="button" class="btn" @click="$emit('restart')">Restart</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.modal__backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 30px;
}
.modal__top {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal__body {
  max-height: 100vh;
  padding: 20px 0;
  overflow-y: auto;
  overflow-x: hidden;
}
p {
  margin: 0;
}
</style>
