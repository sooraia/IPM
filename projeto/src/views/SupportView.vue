<template>
  <Error v-if="submittedmsg === false" errorMessage="Please fill in all required fields" @close="closePopup"/>
  <Success v-if="submittedmsg === true" successMessage="Support request submitted successfully " @close="closePopup" goTo="Continue Exploring" dest="/"/>
  <div class="card">
    <BaseCard title="Support" background-color="var(--accent)">
     <template #content>
        <div id="inner-card">
          <form @submit.prevent="onSubmit">
            <div class="input-field">
              <label for="name">Name*</label> 
              <input id="name" class = "text-input" type="text" v-model="name" placeholder="Your name" />
            </div>
            <div class="input-field">
              <label for="email">Email*</label> 
              <input id="email" class = "text-input" type="email" v-model="email" placeholder="Your email" />
            </div>
            <div class="input-field">
              <label for="message">Message*</label> 
              <textarea id="message" class = "text-input" v-model="message" placeholder="Describe your issue"></textarea>
            </div>
            <button type="submit">Send Email
              <img src="../assets/email-icon.png"/>
            </button>
          </form>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from '@/components/Cards/BaseCard.vue';
import Error from '@/components/Messages/Error.vue';
import Success from '@/components/Messages/Success.vue';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const submittedmsg = ref(null);

function onSubmit() {
  if (!name.value || !email.value || !message.value) {
    submittedmsg.value = false;
    return;
  }
  console.log({ name: name.value, email: email.value, message: message.value });

  submittedmsg.value = true;
  // reset
  name.value = '';
  email.value = '';
  message.value = '';
}

function closePopup() {
  submittedmsg.value = null;
}

</script>

<style scoped>


.card {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#inner-card {
  background-color: var(--light-blue2);
  box-sizing: border-box;
  width: 100%;
  margin: 15px 0 20px 0;
  border-radius: 20px;
  padding: 30px 45px 30px 45px;

  display: flex;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;  
  align-items: center;
}

.input-field {
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  align-items: baseline;
  font-size: 20px;
  color:var(--white);
  gap: 5px;
  width: 100%;
}

.text-input {
  width: 100%;
  height: 40px;
  background-color: var(--bg);
  box-sizing: border-box;
  border: 0;
  border-radius: 10px;
  padding: 6px 12px;
  font-size: 20px;
  color: var(--gray-color);
  outline: none;
}

.text-input:focus {
  outline: 2px solid var(--accent2);
}

#message {
  height: 140px;
  resize: none;
}

#inner-card button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 55px;
  background-color: var(--accent);
  padding-top: 5px;
  border-radius: 25px;
  color: var(--bg);
  font-size: 25px;
  cursor: pointer; 
  gap: 10px;
}

#inner-card button:hover {
  background-color: var(--accent-hover);
}

#inner-card button img{
  width: 25px;
  padding-bottom: 5px;
}

</style>