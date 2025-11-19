<template>
    <div class="center">
        <AuthCard
        title="Welcome Back"
        subtitle="Log in to access your personalized dashboard and tools."
        button-label="Login"
        noAccount="Don't have an account?"
        signUp="Sign up"
        forgot="Forgot password?"
        optionsLogin
        @signUp="goSignUp"
        />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AuthCard from '@/components/AuthCard.vue';

const router = useRouter()
function goSignUp() {router.push('/signup')}
</script>

<style>
.center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    linear-gradient(0deg, 
    rgba(112, 168, 189, 0.8) 0%, 
    rgba(112, 168, 189, 0.8) 100%), 
    url('@/assets/background.jpg') lightgray -0.234px -239px / 100.024% 142.064% no-repeat;
  padding: 32px 24px;
}
</style>