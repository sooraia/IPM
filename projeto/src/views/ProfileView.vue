<template>
  <div class="profile-page">
    <router-link id="logout" :to="'/login'">
        <button @click="handleLogOut"  >
            <img src="../assets/logout-icon.png" alt="logout icon" />
            Log Out
        </button>
    </router-link>
    <div id="personal-info" class="container">
        <h1 class ="container-title">Personal Info</h1>
        <div class="container-content">
            <img src="../assets/default-avatar.png" style="width:30%" alt="user icon" />
            <div id="info-text">
                <EditableField label="Name" :value="name" :editingMode="editing" :type="'text'" />
                <EditableField label="Email" :value="email" :editingMode="editing" :type="'email'" />
                <EditableField label="Password" :value="password" :editingMode="editing" :type="'password'" />
                <EditableField label="Area of Interest" :value="areaInteresse" :editingMode="editing" :type="'text'" />
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
                  <button v-if="editing===false" @click="toggleEdit">
                      Edit
                      <img src="../assets/edit.png" alt="edit icon" style="width: 15%;" />
                  </button>
                  <button id="save" v-else @click="save">
                      Save
                      <img src="../assets/save-icon.png" alt="save icon" style="width: 20%;" />
                  </button>
                </div>
            </div>
        </div>
    </div>

    <div id="saved-configs" class="container">
      <h1 class ="container-title">Saved Chart Configurations</h1>
      <div class="container-content"></div>
    </div>

    <div id="favorite-searches" class="container">
      <h1 class ="container-title">Favorite Searches</h1>
      <div class="container-content"></div>
    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import EditableField from '@/components/EditableField.vue';
import { ref } from 'vue';
import {computed} from 'vue';

const authStore = useAuthStore();
const name = authStore.user.name;
const email = authStore.user.email;
const password = authStore.user.password;
const areaInteresse = authStore.user.areaInteresse;
const editing = ref(false);

function validateEditedInfo() {
  // to do
}

function handleLogOut() {
  const authStore = useAuthStore();
  authStore.logout();
}

function toggleEdit() {
  editing.value = !editing.value;
}
function save() {
  // Logic to save updated user info can be added here
  toggleEdit();
}

</script>

<style scoped>
.profile-page {
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  background:
    linear-gradient(0deg,
      rgba(112, 168, 189, 0.8) 0%,
      rgba(112, 168, 189, 0.8) 100%),
    url('@/assets/background.jpg') lightgray -0.234px -239px / 100.024% 142.064% no-repeat;
}
#logout {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
}
#logout button {
  width: 162px;
  height: 49px;
  border-radius: 23px;
  background: var(--light-accent2);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  border: none;
  font-weight: 550;
  filter: drop-shadow(2px 2px 4px var(--shadow));
}

#logout button:hover {
  background: var(--accent2);
  filter: drop-shadow(4px 4px 6px var(--shadow));
}
#logout button img {
  width: 30px;
  height: 30px;
}

.container {
 width: 1550px;
 height: 600px;
 border-radius: 30px;
 border: 5px solid var(--accent);;
 background: rgba(0, 40, 55, 0.23);
}

.container-title {
 width: 100%;
 height: 100px;
 font-size: 50px;
 display: flex;
 color: var(--accent);
 align-items: center;
 padding-left: 20px;
 padding-top: 10px;
 border-bottom: 2px solid var(--accent);
 cursor: default;
 box-sizing: border-box;
 border-radius: 30px 30px 0 0;
 background: rgba(0, 40, 55, 0.15);
}

.container-content {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 150px;
 padding: 10px;
}

#info-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
}

#info-text button {
  display: inline-flex;
  width: 120px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: 10px;
  font-size: 20px;
  color: var(--white);
  background-color: var(--light-accent2);
  border-radius: 30px;
  cursor: pointer;
  border: none;
}

#info-text button:hover {
    background-color: var(--accent2);
    filter: drop-shadow(4px 4px 6px var(--shadow));
}

</style>