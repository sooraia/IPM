<template>
  <div class="signup-page">
    <AuthCard title="Welcome" subtitle="Sign Up to access your personalized dashboard and tools." button-label="Sign Up"
      :receive-text="'I\'d like to receive updates on new features and locations.'"
      :terms-text="'By signing in, you agree to our Terms and Conditions.'" :show-name="true" :is-signup="true"
      @submit="handleSignUp" />
  </div>
</template>

<script setup>
import AuthCard from '@/components/Cards/AuthCard.vue';
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