<template>
  <body id="compare-cities">
    <div id="overview">
      <div id="overview-top">
          <SearchBar :value="cityA" style="width: 80%;"/>
          <img @click="swap" src="../assets/swap-icon.png" alt="swap"/>
          <SearchBar id="right-bar" :value="cityB" style="width: 80%;"/>
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
          :labels="['Entire home/apt', 'Private room', 'Shared room', 'Hotel room']"
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
import BarChart from '@/components/Charts/BarChart.vue';
import GroupedBarChart from '@/components/Charts/GroupedBarChart.vue';
import { ref } from 'vue';
import StatsCard from '@/components/Cards/StatsCard.vue';
import IconInfo from '@/components/icons/IconInfo.vue';
import Tooltip from '@/components/Tooltip.vue';
import DoubleSidedBarChart from '@/components/Charts/DoubleSidedBarChart.vue';

const cityA = ref('Lisbon, Portugal');
const cityB = ref('Porto, Portugal');
const avgPriceA = ref(120);
const avgPriceB = ref(100);
const avgScoreA = ref(4.5);
const avgScoreB = ref(4.2);
const currencyA = ref('EUR');
const currencyB = ref('EUR');
const listingsA = ref(4000);
const listingsB = ref(2500);
const hostsA = ref(300);
const hostsB = ref(200);

const occupancyA = ref([65, 70, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70]);
const occupancyB = ref([60, 65, 70, 75, 80, 85, 90, 85, 80, 75, 70, 65]);

const propertyTypeA = ref([3100, 300, 300, 200]);
const propertyTypeB = ref([1900, 200, 150, 50]);

function swapTwoValues(a, b) {
  const temp = a.value;
  a.value = b.value;
  b.value = temp;
}
function swap() {
 swapTwoValues(cityA, cityB);
 swapTwoValues(avgPriceA, avgPriceB);
 swapTwoValues(avgScoreA, avgScoreB);
 swapTwoValues(avgScoreA, avgScoreB);
}
</script>

<style scoped>

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