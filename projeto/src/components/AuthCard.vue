<template>
  <div class="auth-card">
    <div class="title">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
    </div>
    <div class="forms">
        <form>
            <div>
              <label for="f-email">Email:</label>
              <input type="email" id="f-email" placeholder="Insert your email" />
            </div>
            <div>
              <label for="f-pass">Password:</label>
              <input type="password" id="f-pass" placeholder="Insert your password" />
            </div>
            <div v-if="showName">
              <label for="f-name">Username:</label>
              <input type="text" id="f-name" placeholder="Insert your username" />
            </div>
        </form>
        <div class="options">
            <template v-if="optionsSignup">
                <div class="signopt">
                    <input type="checkbox">
                    <span>{{ receive }}</span>
                </div>
            </template>

            <template v-else-if="optionsLogin">
                <div v-if="noAccount && signUp">
                    <p id="dont">{{ noAccount }}</p>
                    <p id="sign-up" @click="$emit('signUp')">{{ signUp }}</p>
                </div>
                <p id="forgot" v-if="forgot">{{ forgot }}</p>
            </template>
        </div>
    </div>
    <div class="submit">
        <button type="submit">
            {{ buttonLabel }}
        </button>
        <p v-if="terms">{{ terms }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  subtitle: string
  buttonLabel: string
  showName?: boolean
  noAccount?: string
  signUp?: string
  forgot?: string
  receive?: string
  terms?: string
  optionsSignup: boolean
  optionsLogin:boolean
}>()

const emit = defineEmits(['signUp'])

const email = ref('')
const password = ref('')
const name = ref('')
</script>

<style scoped>
.auth-card {
    width: 1148px;
    height: 496px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 40px;
    justify-content: space-between;
    background-color: rgba(0, 40, 55, 0.71);
    border-radius: 30px;
    border: 6px solid #002837;
    text-align: center;
}

.title h1 {
    color: #ffffff;
    font-size: 48px;
}

.title p {
    color: rgba(225, 118, 40, 0.60);
    font-size: 24px;
}

.forms {
    width: 85%;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

form div {
    background-color: #002837;
    border-radius: 30px;
    color: #ffffff;
    font-weight: 600;
    display: flex;
    gap: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    padding-left: 20px;
    height: 70px;
}

#f-email, #f-pass, #f-name {
    width: 100%;
    height: 30px;
    border-radius:20px;
    background-color: #D9D9D9;
    color: #00000099;
    font-weight: 400;
    padding-left: 10px;
    margin-right: 20px;
    font-size: 14px;
    outline: none;
}

.options {
    margin-top:10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.options div {
    display: flex;
    gap: 5px;
}

.options .signopt {
    display: flex;
    align-items: center;
    gap: 10px;
}

.options .signopt input {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(225, 118, 40, 0.60);
  border-radius: 5px;
  cursor: pointer;
}

.options .signopt span {
    color: rgba(225, 118, 40, 0.60);
    margin-top: 1px;
}

#dont {
    color:rgba(255,255,255,0.57);
}

#sign-up, #forgot {
    color: rgba(225, 118, 40, 0.70);
    text-decoration: underline;
    cursor: pointer;
}
.submit button {
    color: #ffffff;
    background-color: #002837;
    padding: 10px 40px;
    border-radius: 15px;
    font-weight: 600;
    font-size: 25px;
    border: 0;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.1);
    cursor: pointer;
}

.submit button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.submit p {
    margin-top: 10px;
    color: rgba(0, 40, 55)
}
</style>