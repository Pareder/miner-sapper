<template>
  <form
    class="form"
    @submit.prevent="setNickname"
  >
    <div class="row">
      <input
        v-model="name"
        class="name"
        type="text"
        placeholder="Enter your name"
      >
      <input
        class="submit"
        type="submit"
        value="Send"
        :disabled="sent"
      >
    </div>
    <div
      v-if="error"
      class="error"
    >
      Name length should be between 3 and 20 symbols
    </div>
    <div
      v-if="sendingError"
      class="error"
    >
      We apologize, server is currently unavailable, try again later
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  sendingError: boolean,
}>()
const emit = defineEmits(['submitForm'])

const name = ref('')
const error = ref(false)
const sent = ref(false)

function setNickname() {
  if (name.value.length > 2 && name.value.length < 20) {
    error.value = false
    sent.value = true
    emit('submitForm', name.value)
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.form {
  padding: 0 40px;
  position: relative;
}
.form label {
  font-size: 18px;
}
.form input {
  height: 50px;
  padding: 0 20px;
  border: 1px solid #134E5E;
  border-radius: 20px;
  outline: none;
  transition: all 0.3s;
}
.name {
  width: 100%;
}
.submit {
  width: 100px;
  margin-left: 5px;
  background-color: #71B280;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
}
.submit:hover {
  background-color: #134E5E;
}
.form input:focus {
  box-shadow: 0 0 10px #134E5E;
}
.error {
  position: absolute;
  bottom: -17px;
  left: 0;
  width: 100%;
  color: tomato;
  font-size: 12px;
  text-align: center;
}
.row {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
