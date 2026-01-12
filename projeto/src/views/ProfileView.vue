<template>
  <div class="profile-page">
  <Error v-if="errorMsg" :errorMessage="errorMsg" @close="closePopup"/>
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
              <ToggableForm 
                  :labels="[['Name', 'text'], ['Email', 'email'], ['Password', 'password'], ['Area of Interest', 'text']]"
                  :oldvalues="[name, email, password, areaInteresse]" 
                  v-model:editingMode="editing"
                  @submit="save"
              />
        </div>
    </div>

    <div id="saved-configs" class="container">
      <h1 class ="container-title">Saved Chart Configurations</h1>
      <div class="container-content">
        <ChartCard
          v-for="(chart, idx) in chartConfigs"
          :key="idx"
          :title="chart.name || chart.config_name || 'Saved chart'"
          :image-src="imageFor(chart)"
          :trash-button="true"
          @delete="() => handleDeleteSavedChart(idx)"
          @click="() => updateConfig(chart)"
          :dest="{ name: 'GraphView', params: { chartType: chart.chartType || chart.chart_type || chart.type, city: chart.city || chart.parameters?.city || chart.city_name } }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import ToggableForm from '@/components/ToggableForm.vue';
import validateEmail, { getChartConfig, deleteChartConfig } from '@/utils/users.js';
import Error from '@/components/Messages/Error.vue';
import { ref, onMounted } from 'vue';
import ChartCard from '@/components/Cards/ChartCard.vue';
import lineImg from '@/assets/line-simplified.png';
import barImg from '@/assets/bar-simplified.png';
import pieImg from '@/assets/pie-simplified.png';

const authStore = useAuthStore();
const name = ref(authStore.user.name);
const email = ref(authStore.user.email);
const password = ref(authStore.user.password);
const areaInteresse = ref(authStore.user.areaInteresse);

const editing = ref(false);
const errorMsg = ref(null);

const chartConfigs = ref([]);

onMounted(async () => {
  chartConfigs.value = await getChartConfig(authStore.user.email);
  console.log('chartConfigs:', chartConfigs.value);

});

function imageFor(chart) {
  const t = (chart?.chartType || chart?.chart_type || '').toString().toLowerCase();
  if (t.includes('line')) return lineImg;
  if (t.includes('pie')) return pieImg;
  if (t.includes('bar')) return barImg;
}

function closePopup() {
  errorMsg.value = null;
}

async function validateEditedInfo(name, email, password) {
 if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
    errorMsg.value = "Name, email and password cannot be empty.";
   return false;
 }
 if(email!== authStore.user.email) {
  const emailExists = await validateEmail(email);
  if (emailExists === true) {
    errorMsg.value = "Email is already in use.";
     return false;
   }
 }
  return true;
}

function handleLogOut() {
  const authStore = useAuthStore();
  authStore.logout();
}

async function handleDeleteSavedChart(idx) {
  const ok = await deleteChartConfig(authStore.user?.email, idx);
  if (ok) {
    chartConfigs.value = await getChartConfig(authStore.user?.email);
  }
}

async function save(payload) {
  const [newName, newEmail, newPassword, newAreaInteresse] = payload
  if (await validateEditedInfo(newName, newEmail, newPassword)===false) {
    return;
  }
    const data = {
    email: newEmail,
    password: newPassword,
    name: newName,
    area_interesse: newAreaInteresse,
  };
  try {
        const response = await fetch(`http://localhost:3000/profiles.users/${authStore.user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
            name.value = newName;
            password.value = newPassword;
            areaInteresse.value = newAreaInteresse;
            email.value = newEmail;
            editing.value = false;
            authStore.setUser({...authStore.user,
              name: newName,
              email: newEmail,
              password: newPassword,
              areaInteresse: newAreaInteresse,
            }, authStore.user.id);
        } else {
          console.error(" Erro ao registar utilizador" , response.statusText );
        }
  }catch (error) {
    console.error(" Erro a atualizar dados" , error );
  } finally {
    console.log("Atualização terminada");
  }
}

function updateConfig(chartConfig) {
  console.log("Updating config to:", chartConfig)
  authStore.setChartConfig(chartConfig)
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

#saved-configs .container-content {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  padding: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  align-items: flex-start;
  justify-content: flex-start;
  /* opcional: esconder barra em browsers que suportam */
  scrollbar-width: thin;
}
#saved-configs .container-content::-webkit-scrollbar {
  height: 10px;
}
#saved-configs .container-content::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 6px;
}


</style>