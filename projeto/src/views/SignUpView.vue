<template>
  <div class="card">
    <AuthCard
    title="Welcome"
    subtitle="Sign Up to access your personalized dashboard and tools."
    button-label="Sign Up"
    receive="I'd like to receive updates on new features and locations."
    terms="By signing in, you agree to our Terms and Conditions."
    optionsSignup
    showName
    />
  </div>
</template>

<script setup>
import AuthCard from '@/components/AuthCard.vue';
</script>