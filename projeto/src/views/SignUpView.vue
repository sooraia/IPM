<template>
  <div class="signup-page">
    <Error v-if="emailExists === true" errorMessage="This email address is already in use." @close="emailExists = null" />
    <Error v-if="fieldsFilled === false" errorMessage="Email, password and name required." @close="fieldsFilled = null" />
    <Success v-if="registerSuccess === true" successMessage="Your account has been successfully created!" @close="registerSuccess = null" 
        goTo="Log in" dest="/login"/>
    <AuthCard title="Welcome" subtitle="Sign Up to access your personalized dashboard and tools." button-label="Sign Up"
      :receive-text="'I\'d like to receive updates on new features and locations.'"
      :terms-text="'By signing in, you agree to our Terms and Conditions.'" :show-name="true" :is-signup="true"
      @submit="handleSignUp" />
  </div>
</template>

<script setup>
import AuthCard from '@/components/Cards/AuthCard.vue';
import Error from '@/components/Messages/Error.vue';
import Success from '@/components/Messages/Success.vue';
import { ref } from 'vue';

const emailExists =  ref(null);
const fieldsFilled =  ref(null);
const registerSuccess =  ref(null);

async function validateEmail(email) {
  try {
    const response = await fetch(`http://localhost:3000/profiles.users?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    if (data.length > 0) {
      console.log("Email já existe");
      emailExists.value = true;
      return;
    }
    console.log("Email disponível");
  } catch (error) {
    console.error(" Erro a verificar email" , error );
  } finally {
    console.log("Verificação de email terminada");
  }
}

async function handleSignUp(payload) {
  const { email, password, name, receiveUpdates } = payload;
  if (!email || !password || (name === undefined || name === '')) {
    fieldsFilled = false;
    return;
  }

  await validateEmail(email);
  if (emailExists.value === true) {
    return;
  }

  const data = {
    email: email,
    password: password,
    name: name,
    receive_updates: receiveUpdates,
  };
  try {
        const response = await fetch('http://localhost:3000/profiles.users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          registerSuccess.value = true;
        } else {
          console.error(" Erro ao registar utilizador" , response.statusText );
        }
      }catch (error) {
        console.error(" Erro a atualizar dados" , error );
      } finally {
        console.log("Atualização terminada");
      }

}
</script>

<style scoped>
.signup-page {
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