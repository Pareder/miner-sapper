<template>
  <div>
    <DifficultyModal v-if="minerClicked" @close="toggleMinerModal" />
    <h1>Simple Classic Games</h1>
    <div class="buttons">
      <button type="button" class="btn" @click="toggleMinerModal">Minesweeper</button>
      <router-link to="/tetris" class="btn">Tetris</router-link>
      <router-link to="/snake" class="btn">Snake</router-link>
      <router-link to="/bubbles" class="btn">Bubbles</router-link>
      <router-link to="/numbers" class="btn">2048</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DifficultyModal from '../components/DifficultyModal.vue'

const minerClicked = ref(false)
function toggleMinerModal() {
  minerClicked.value = !minerClicked.value
}
</script>

<style scoped>
h1 {
  color: #fff;
  letter-spacing: 3px;
  text-shadow: 3px 3px 5px #134E5E;
}
</style>
