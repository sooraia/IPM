<template>
  <nav id="nav">
    <div class="left-nav">
      <div class="logo">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1 style="margin-top: 10px;">AirbnbStats</h1>
      </div>
      <ul id="nav-list">
        <router-link to="/">
          <li class="nav-item1" style="border-right: #ffffff 2px solid">Explore</li>
        </router-link>
        <router-link v-if="city" :to="`/dashboard/${city}`">
          <li class="nav-item2">Dashboard</li>
        </router-link>
        <router-link v-else  to="/dashboard">
          <li class="nav-item2">Dashboard</li>
        </router-link>
      </ul>
    </div>

    <router-link v-if="loggedIn === false" id="user" to="/login">
      <p>Login</p>
      <img alt="User-Avatar" src="../assets/user-avatar.png">
    </router-link>

    <router-link v-if="loggedIn === true" id="user" to="/profile">
      <p>{{ name }}</p>
      <img alt="User-Avatar" src="../assets/user-avatar.png">
    </router-link>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useCityStore } from '@/stores/city';
import { computed } from 'vue'

const cityStore = useCityStore()
const city = computed(() => cityStore.currentCity)

const auth = useAuthStore()
const loggedIn = computed(() => auth.user!=null)
const name = computed(() => {
  if (auth.user!=null) return auth.user.name;
  else return '';})


</script>

<style scoped>
#nav {
  display: flex;
  justify-content: space-between;
  background-color: var(--accent);
  padding: 6px 10px 0 0px;
  width: auto;
  min-height: 90px;
}

.left-nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
}

.logo img {
  height: 45px;
}

.logo h1 {
  color: var(--white);
  font-weight: medium;
  font-size: 20px;
  margin-top: 7px;
}

#nav-list {
  display: flex;
  border: var(--white) 2px solid;
  border-radius: 10px 10px 0px 0px;
  padding: 0;
}

.nav-item1,
.nav-item2 {
  width: 120px;
  display: flex;
  justify-content: center;
  list-style: none;
  color: var(--white);
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  padding: 5px;
}

.nav-item1:hover {
  background-color: var(--accent-hover);
  border-radius: 10px 0px 0px 0px;
}

.nav-item2:hover {
  background-color: var(--accent-hover);
  border-radius: 0px 10px 0px 0px;
}

#user {
  display: flex;
  align-items: center;
  gap: 15px;
}

#user img {
  height: 40px;
}

#user p {
  color: var(--white);
  font-size: 20px;
}
</style>
