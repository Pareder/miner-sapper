<template>
  <div>
    <DifficultyModal v-if="minerClicked" @close="closeMinerModal" />
    <h1>Simple Classic Games</h1>
    <div class="buttons">
      <button type="button" class="btn" @click="openMinerModal">Minesweeper</button>
      <router-link to="/tetris" tag="button" class="btn">Tetris</router-link>
      <router-link to="/crush" tag="button" class="btn">Crush</router-link>
      <router-link to="/numbers" tag="button" class="btn">2048</router-link>
    </div>
  </div>
</template>
<script>
import DifficultyModal from './DifficultyModal'

export default {
  data () {
    return {
      minerClicked: false
    }
  },
  methods: {
    openMinerModal () {
      this.minerClicked = true
    },
    closeMinerModal () {
      this.minerClicked = false
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
