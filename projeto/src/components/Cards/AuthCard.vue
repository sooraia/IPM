<template>
    <BaseCard :title="title" :subtitle="subtitle" :background-color="'rgba(0, 40, 55, 0.71)'">
        <template #content>
            <div class="auth-form">
                <div class="input-group">
                    <label for="auth-email">Email:</label>
                    <input type="email" id="auth-email" v-model="email" placeholder="Insert your email" />
                </div>

                <div class="input-group">
                    <label for="auth-password">Password:</label>
                    <input type="password" id="auth-password" v-model="password" placeholder="Insert your password" />
                </div>

                <div v-if="showName" class="input-group">
                    <label for="auth-username">Username:</label>
                    <input type="text" id="auth-username" v-model="username" placeholder="Insert your username" />
                </div>
            </div>

            <div class="auth-options">
                <template v-if="isSignup">
                    <div class="checkbox-option">
                        <input type="checkbox" id="receive-updates" v-model="receiveUpdates" />
                        <span>{{ receiveText }}</span>
                    </div>
                </template>

                <template v-else>
                    <div class="signup-link">
                        <span class="no-account">{{ noAccountText }}</span>
                        <span class="link" @click="handleSignUp">{{ signUpText }}</span>
                    </div>
                    <span v-if="forgotText" class="link">{{ forgotText }}</span>
                </template>
            </div>
        </template>

        <template #actions>
            <button class="auth-button">
                {{ buttonLabel }}
            </button>
        </template>

        <template #footer v-if="termsText">
            <p class="terms">{{ termsText }}</p>
        </template>
    </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from './BaseCard.vue'

const props = defineProps<{
    title: string
    subtitle?: string
    buttonLabel: string
    showName?: boolean
    noAccountText?: string
    signUpText?: string
    forgotText?: string
    receiveText?: string
    termsText?: string
    isSignup?: boolean
}>()

const emit = defineEmits<{
    signUp: []
    submit: [{ email: string; password: string; username?: string; receiveUpdates?: boolean }]
}>()

const email = ref('')
const password = ref('')
const username = ref('')
const receiveUpdates = ref(false)

const handleSignUp = () => {
    emit('signUp')
}

</script>

<style scoped>
.auth-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.input-group {
    background-color: var(--accent);
    border-radius: 30px;
    color: var(--white);
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

#auth-email,
#auth-password,
#auth-username {
    width: 100%;
    height: 30px;
    border-radius: 20px;
    background-color: var(--bg);
    color: var(--gray-color);
    font-weight: 400;
    padding-left: 10px;
    margin-right: 20px;
    font-size: 14px;
}

#auth-email:focus,
#auth-password:focus,
#auth-username:focus {
    outline: 2px solid var(--accent2);
}

.auth-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.checkbox-option {
    display: flex;
    align-items: center;
    gap: 10px;
}

.checkbox-option input {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent2-t);
    border-radius: 5px;
    cursor: pointer;
    position: relative;
}

.checkbox-option input:checked {
    background-color: var(--accent2-t);
}

.checkbox-option input:checked::after {
    content: '✓';
    color: var(--white);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    font-weight: bold;
}

.checkbox-option span {
    color: var(--accent2-t);
    margin-top: 1px;
}

.signup-link {
    display: flex;
    gap: 5px;
}

.no-account {
    color: var(--bg);
}

.link {
    color: var(--accent2-t);
    text-decoration: underline;
    cursor: pointer;
}

.auth-button {
    color: var(--white);
    background-color: var(--accent);
    padding: 10px 40px;
    border-radius: 15px;
    font-weight: 600;
    font-size: 25px;
    border: 0;
    box-shadow: 0 8px 16px 0 var(--shadow);
    cursor: pointer;
}

.auth-button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 16px 0 var(--shadow);
    background-color: var(--accent-hover);
}

.terms {
    color: var(--accent);
    font-size: 16px;
}
</style>