<template>
  <div class="login-page">
    <Error v-if="fieldsFilled === false" errorMessage="Email and password required." @close="fieldsFilled = null" />
    <Error v-if="emailExists === false" errorMessage="User not found. Please sign up first." @close="emailExists = null" />
    <Error v-if="loginSuccess === false" errorMessage="Invalid password. Please try again." @close="loginSuccess = null" />
    <Success v-if="loginSuccess === true" successMessage="Logged in successfully" @close="loginSuccess = null" 
        goTo="Go to profile" dest="/profile"/>
    <AuthCard title="Welcome Back" subtitle="Log in to access your personalized dashboard and tools."
      button-label="Login" :no-account-text="'Don\'t have an account?'" :sign-up-text="'Sign up'"
      :forgot-text="'Forgot password?'" @sign-up="goSignUp" @submit="handleLogin" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AuthCard from '@/components/Cards/AuthCard.vue';
import { ref } from 'vue';
import Error from '@/components/Messages/Error.vue';
import Success from '@/components/Messages/Success.vue';
import { useAuthStore } from '@/stores/auth';

const fieldsFilled = ref(null);
const emailExists = ref(null);
const loginSuccess = ref(null);

const router = useRouter()
function goSignUp() { router.push('/signup') }

async function handleLogin(payload) {
  const { email, password } = payload;
  if (!email || !password) {
    fieldsFilled.value = false;
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    if (data.length > 0) {
      if (data[0].password === password) {
        console.log("Login successful");
        const authStore = useAuthStore();
        authStore.setUser(data[0]);
        loginSuccess.value = true;
      } else {
        console.log("Incorrect password");
        loginSuccess.value = false;
        return;
      }
      return;
    } else {
      emailExists.value = false;
      console.log("Email does not exist");
      return;
    }
  } catch (error) {
    console.error(" Erro a verificar email" , error );
  } finally {
    console.log("Verificação de email terminada");
  }
  //..
  loginSuccess.value = true;
}
</script>

<style scoped>
.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(0deg,
      rgba(112, 168, 189, 0.8) 0%,
      rgba(112, 168, 189, 0.8) 100%),
    url('@/assets/background.jpg') lightgray -0.234px -239px / 100.024% 142.064% no-repeat;
}
</style>