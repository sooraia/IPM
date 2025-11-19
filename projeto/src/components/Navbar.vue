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
        <li class="nav-item2">Dashboard</li>
      </ul>
    </div>
    
    <router-link id="user" to="/login">
          <a href="/login">Login/Register</a>
          <img alt="User-Avatar" src="../assets/user-avatar.png">
    </router-link>
  </nav>
</template>

<style>
#nav {
  display: flex;
  justify-content: space-between;
  background-color: #002837;
  padding: 6px 10px 0 0px;
  width: auto;
  height: 90px;
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
  color: #ffffff;
  font-weight: medium;
  font-size: 20px;
  margin-top: 7px;
}

#nav-list {
  display: flex;
  border: #ffffff 2px solid;
  border-radius: 10px 10px 0px 0px;
  padding: 0;
}

.nav-item1, .nav-item2 {
  width: 120px;
  display: flex;
  justify-content: center;
  list-style: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  padding: 5px;
}

.nav-item1:hover {
  background-color: #014055;
  border-radius: 10px 0px 0px 0px;
}

.nav-item2:hover {
  background-color: #014055;
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

#user a {
  color: #ffffff;
  text-decoration: none;
  font-size: 20px;
}
</style>

