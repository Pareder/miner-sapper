<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop" @click="$emit('close')"></div>
      <div class="modal__inner">
        <div class="modal__top">
          <h2>Select the Minesweeper's difficulty</h2>
        </div>
        <div class="modal__body">
          <div class="buttons">
            <router-link to="/miner/easy" class="btn">Easy</router-link>
            <router-link to="/miner/medium" class="btn">Medium</router-link>
            <router-link to="/miner/hard" class="btn">Hard</router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.buttons {
  flex-direction: column;
}
</style>
