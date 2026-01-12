<template>
  <router-link to='/dashboard' id="top-button"> &#8592 Back to Dashboard</router-link>
  <body id="compare-cities">
    <div id="overview">
      <div id="overview-top">
          <SearchBar :value="cityA" style="width: 80%;" @search="updateCity($event, 'A')"/>
          <img @click="swap" src="../assets/swap-icon.png" alt="swap"/>
          <SearchBar id="right-bar" :value="cityB" style="width: 80%;" @search="updateCity($event, 'B')"/>
      </div>
      <div id="overview-grid">
        <StatsCard id="cards-left-1" :title="'Average Price Per night'" :stat="avgPriceA" :currency="currencyA" />
        <StatsCard id="cards-left-2" :title="'Average Review Rating'" :stat="avgScoreA" :score="true" />
        <StatsCard id="cards-right-1" :backgroundColor="'rgba(242, 144, 47, 1)'" :textColor="'rgb(0, 40, 55)'" :title="'Average Price Per night'" :stat="avgPriceB" :currency="currencyB" />
        <StatsCard id="cards-right-2" :backgroundColor="'rgba(242, 144, 47, 1)'" :textColor="'rgb(0, 40, 55)'" :title="'Average Review Rating'" :stat="avgScoreB" :score="true" />
        <div id="bars">
          <div class="bar">
            <h1 class="bar-label">Listings</h1>
            <DoubleSidedBarChart style="height:140px" class="bar" :labels="['Listings']" :leftData="[listingsA]" :rightData="[listingsB]" :leftLabel="cityA" :rightLabel="cityB" :gridColor="'rgba(0,0,0,0.0)'" :displayLegend="false"/>
          </div>
          <div class="bar">
            <h1 class="bar-label">Hosts</h1>
            <DoubleSidedBarChart style="height:140px" class="bar" :labels="['Hosts']" :leftData="[hostsA]" :rightData="[hostsB]" :leftLabel="cityA" :rightLabel="cityB" :gridColor="'rgba(0,0,0,0.0)'" :displayLegend="false"/>
          </div>
        </div>
      </div>
    </div>

    <div class="container" id="bar-occupancy">
      <div id="container-top">
        <h1>Monthly Occupancy rate</h1>
        <div id="info1">
          <IconInfo id="info" style="width:40px;"/>
          <Tooltip id="tooltip-occupancy" :title="'Monthly Occupancy Rate'" :description="'Calculated by averaging the occupancy rate of all available  properties in each city, month by month. This helps identify seasonal patterns, peak tourist seasons, and overall market health.'"/>
        </div>
      </div>
      <div class="content">
        <GroupedBarChart :style="{width: '100%', height: '450px'}"
          :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
          :data="[occupancyA, occupancyB]"
          :label="[cityA, cityB]"
          :barcolors="['rgb(0, 40, 55)', 'rgba(242, 144, 47, 1)']"
          :borderradius="1"
          :percentage="true"
        />
      </div>
    </div>

    <div class="container">
      <div id="container-top">
        <h1>Property Type Breakdown</h1>
        <div  id="info2">
          <IconInfo style="width:40px;"/>
          <Tooltip id="tooltip-type" :title="'Property Type Breakdown'" :description="'Reveals the market composition by categorizing all available rentals into entire homes/appartments, private rooms, hotel rooms or shared rooms. This shows the dominant rental strategy and target audience in each city.'"/>
        </div>
      </div>
      <div class="content">
        <GroupedBarChart :style="{width: '100%', height: '450px'}"
          :labels= "propertyTypes"
          :data="[propertyTypeA, propertyTypeB]"
          :label="[cityA, cityB]"
          :barcolors="['rgb(0, 40, 55)', 'rgba(242, 144, 47, 1)']"
          :borderradius="1"
        />
      </div>
    </div>
  </body>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
import GroupedBarChart from '@/components/Charts/GroupedBarChart.vue';
import { ref } from 'vue';
import StatsCard from '@/components/Cards/StatsCard.vue';
import IconInfo from '@/components/icons/IconInfo.vue';
import Tooltip from '@/components/Tooltip.vue';
import DoubleSidedBarChart from '@/components/Charts/DoubleSidedBarChart.vue';
import { onMounted } from 'vue';
import { fetchListingsForCity, fetchCalendarForCity, processListingsData, processCalendarData } from '@/utils/cityData.js';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import { useCityStore } from '@/stores/city';

const cityA = ref('');
const cityB = ref('');
const route = useRoute();
const listings = ref(null);
const calendarData = ref(null);
const loading = ref(false);
const cityStore = useCityStore();
const router = useRouter();

function updateCity(newCityName, cityLabel) {
  if (cityLabel === 'A') {
    cityA.value = newCityName;
  } else if (cityLabel === 'B') {
    cityB.value = newCityName;
  }
  router.push({ 
    name: 'compareCitiesData', 
    params: { 
      cityA: cityA.value,
      cityB: cityB.value
    } 
  });
}

watch(() => route.params, async (newParams) => {
  if (newParams.cityA && newParams.cityB) {
    await updateCitiesRoute(newParams.cityA, newParams.cityB);
  }
}, { immediate: true });

async function updateCitiesRoute(paramA, paramB) {
  loading.value = true;
  try {
    cityA.value = paramA.replace(/-/g, ' ');
    cityB.value = paramB.replace(/-/g, ' ');
    
    const listingsA = await fetchListingsForCity(cityA.value);
    const listingsB = await fetchListingsForCity(cityB.value);
    const calendarA = await fetchCalendarForCity(cityA.value);
    const calendarB = await fetchCalendarForCity(cityB.value);
    
    listings.value = {A:listingsA, B:listingsB};
    calendarData.value = {A:calendarA, B:calendarB};
    updateInfo();
  } catch (error) {
    console.error('Error fetching city data:', error);
  } finally {
    loading.value = false;
  }
}

function updateInfo() {
  if (!listings.value || listings.value.length === 0) {
    console.log("No listings data available.");
    return;
  }
  if (!calendarData.value || calendarData.value.length === 0) {
    console.log("No calendar data available.");
    return;
  }
  updateListingsValues(listings.value);
  updateCalendarValues(calendarData.value);
}

onMounted(async () => {
  updateInfo();
  cityStore.setCity(null);
});

const avgPriceA = ref(0);
const avgPriceB = ref(0);
const avgScoreA = ref(0);
const avgScoreB = ref(0);
const currencyA = ref('');
const currencyB = ref('');
const listingsA = ref(0);
const listingsB = ref(0);
const hostsA = ref(0);
const hostsB = ref(0);

const occupancyA = ref([]);
const occupancyB = ref([]);
const propertyTypes = ref(['Entire Home', 'Private Room', 'Shared Room', 'Hotel Room', 'Other']);
const propertyTypeA = ref([]);
const propertyTypeB = ref([]);

function swapTwoValues(a, b) {
  const temp = a.value;
  a.value = b.value;
  b.value = temp;
}
function swap() {
  swapTwoValues(cityA, cityB);
  swapTwoValues(avgPriceA, avgPriceB);
  swapTwoValues(avgScoreA, avgScoreB);
  swapTwoValues(currencyA, currencyB);
  swapTwoValues(listingsA, listingsB);
  swapTwoValues(hostsA, hostsB);
  swapTwoValues(occupancyA, occupancyB);
  swapTwoValues(propertyTypeA, propertyTypeB);
}

function updateListingsValues(listingsData) {
  if (!listingsData.A || !listingsData.B) {
    console.log("Listings data for one or both cities is missing.");
    return;
  }
  const processedA = processListingsData(listingsData.A);
  const processedB = processListingsData(listingsData.B);
  avgPriceA.value = processedA.avgPrice;
  avgPriceB.value = processedB.avgPrice;
  avgScoreA.value = processedA.avgRating;
  avgScoreB.value = processedB.avgRating;
  listingsA.value = processedA.numberListings;
  listingsB.value = processedB.numberListings;
  hostsA.value = processedA.numberHosts;
  hostsB.value = processedB.numberHosts;
  propertyTypeA.value = [];
  propertyTypeB.value = [];
  currencyA.value = processedA.currency;
  currencyB.value = processedB.currency;
  for (let type of propertyTypes.value) {
    let a = processedA.propertyTypeMap.get(type) || 0, b = processedB.propertyTypeMap.get(type) || 0;
    propertyTypeA.value.push(a);
    propertyTypeB.value.push(b);
  }
}

function updateCalendarValues(calendarData) {
  if (!calendarData.A || !calendarData.B) {
    console.log("Calendar data for one or both cities is missing.");
    return;
  }
  const processedA = processCalendarData(calendarData.A);
  const processedB = processCalendarData(calendarData.B);
  occupancyA.value = [];
  occupancyB.value = [];
  for(let i=1; i<13; i++) {
    occupancyA.value.push(processedA.monthlyOccupancy.get(i) || 0);
    occupancyB.value.push(processedB.monthlyOccupancy.get(i) || 0);
  }
}

</script>

<style scoped>

#top-button{
  align-self: flex-start;
  width: 200px;
  position: absolute;
  top: 120px;
  left: 30px;
  font-size: 17px;
  text-align: center;
  background: var(--accent);
  font-weight: bold;
  color: white;
  padding: 10px 40px;
  cursor: pointer;
  border-radius: 25px;
}
#top-button:hover{
  background: var(--accent-hover);
}

#compare-cities {
  gap: 120px;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;
}

#overview {
  padding: 40px;
  box-sizing: border-box;
  height: 750px;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  border-bottom: 7px solid var(--accent);
  background:
    linear-gradient(0deg,
                  rgba(112, 168, 189, 0.36) 0%, rgba(112, 168, 189, 0.36) 100%),
                    url('@/assets/background.jpg') -0.234px -239px / 100.024% 142.064% no-repeat;
}
#overview-top {
  padding: 0px 400px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}

#right-bar {
  background-color: var(--light-accent2);
}

#overview-top img {
  cursor: pointer;
  width: 70px;
}

#overview-grid {
  padding: 0px 100px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  column-gap: 30px;
  height: 100%;
  width: 100%;
}


#cards-left-1 {
  grid-area: 1 / 1 / 2 / 2;
}
#bars {
  grid-area: 1 / 2 / 3 / 3;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top : 20px;
  gap: 40px;
}
#cards-left-2 { grid-area: 2 / 1 / 3 / 2; }
#cards-right-1 { grid-area: 1 / 3 / 2 / 4; } 
#cards-right-2 {
  grid-area: 2 / 3 / 3 / 4;
}


.container {
  margin: 0 150px;
  background-color: var(--accent);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px 50px 40px 50px;
  min-width: 500px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#container-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

#container-top h1 {
  color: #DBF3FD;
  text-align: center;
  font-family: "Josefin Sans";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

#card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: rgb(0, 48, 65);
  cursor: pointer;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background-color: rgba(219, 243, 253, 1);
  border-radius : 20px;
  padding : 35px;
}

#tooltip-occupancy {
  display: none;
  position:absolute;
  top: 1085px;
  left: 540px;
} 

.info :hover #tooltip-occupancy {
  display: block;
}

#info1:hover #tooltip-occupancy {
  display: block;
}

#tooltip-type {
  display: none;
  position:absolute;
  top: 1920px;
  left: 553px;
}

#info2:hover #tooltip-type {
  display: block;
}
.bar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.bar-label {
  border-radius: 20px;
  border: 1px solid #5E7D83;
  background: linear-gradient(90deg, rgba(217, 217, 217, 0.83) 0%, rgba(160, 194, 196, 0.63) 100%);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 10px 30px;
  padding-top: 15px;
  font-size: 24px;
  color: var(--accent);
}


</style>