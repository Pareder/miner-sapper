<template>
  <div>
    <DifficultyModal v-if="minerClicked" @close="toggleMinerModal" />
    <h1>Simple Classic Games</h1>
    <div class="buttons">
      <button type="button" class="btn" @click="toggleMinerModal">Minesweeper</button>
      <router-link to="/tetris" tag="button" class="btn">Tetris</router-link>
      <router-link to="/snake" tag="button" class="btn">Snake</router-link>
      <router-link to="/bubbles" tag="button" class="btn">Bubbles</router-link>
      <router-link to="/numbers" tag="button" class="btn">2048</router-link>
    </div>
  </div>
</template>

<script>
import DifficultyModal from '../components/DifficultyModal'

export default {
  data () {
    return {
      minerClicked: false
    }
  },

  methods: {
    toggleMinerModal () {
      this.minerClicked = !this.minerClicked
    }
  },

  components: {
    DifficultyModal
  }
}
</script>

<style scoped>
h1 {
  color: #fff;
  letter-spacing: 3px;
  text-shadow: 3px 3px 5px #134E5E;
}
</style>
