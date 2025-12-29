<template>
  <body id="dashboard-city-view">
    <div id="overview">
      <div id="overview-top">
        <div id="overview-current-city">
          <h1 id="city-caption">Showing results for...</h1>
          <SearchBar :value="currentCity" style="width: 80%;"/>
        </div>
        <button id="compare-button">Compare to other city</button>
      </div>

      <h1 class="title" style="color:#D9D9D9;font-size: 65px;">OVERVIEW</h1>
      <div id="overview-grid">
        <div class="overview-card" id="listings">
          <h1>Listings</h1>
          <p>{{ listings }}</p>
        </div>
        <div class="overview-card" id="hosts">
          <h1>Active Hosts</h1>
          <p>{{ hosts }}</p>
        </div>
        <div class="overview-card" id="occupancy">
          <h1>Occupancy Rate</h1>
          <p>{{ occupancy }}</p>
        </div> 
        <div class="overview-card" id="rating">
          <h1>Average Review Rating</h1>
          <div class="overview-card-content">
            <p>{{ rating }}</p>
            <svg width="40%" xmlns="http://www.w3.org/2000/svg" viewBox="0 10 640 640"><path fill="#699199" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
          </div>
        </div>
        <div class="overview-card" id="price">
          <h1>Average Price per Night</h1>
          <div class="overview-card-content">
            <p>{{ price }}</p>
            <p style="font-size: 20px;">{{ currency }}</p>
          </div>
        </div>
        <div class="overview-card" id="price-line">
          <h1>Prices over the last year</h1>
          <LineChart style="width:97%;height: 85%;"
              :labels="labelsLC"
              :label="'Average Price Per Night'"
              :data="dataLC"
              :color="'rgba(105, 145, 153, 1)'"
              :legendcolor="'rgba(105, 145, 153, 1)'"
              :gridcolor="'rgba(217, 217, 217, 0.2)'"
              />
        </div>
        <div class="overview-card" id="top-neighborhoods-bar">
          <h1 >Top Neighborhoods</h1>
          <BarChart style="width:97%;height: 85%;"
            :labels="labelsBC"
            :label="'Number of Listings'"
            :data="dataBC"
            :barcolors="'rgba(105, 145, 153, 1)'"
            :legendcolor="'rgba(105, 145, 153, 1)'"
            :gridcolor="'rgba(217, 217, 217, 0.2)'"
            :borderradius="10"
          />
        </div>
      </div>
    </div>

    <div id="executive">
      <h1 class="title">OWNERSHIP AND REGULATION</h1>
      <div id="executive-content">
        <div class="overview-card" id="license-pie-chart">
          <h1 style="color: var(--bg);">License Status</h1>
          <PieChart style="width:97%;height: 85%;"
            :labels="['Licensed', 'Unlicensed']"
            :label="'License Statu'"
            :data="dataLicensePC"
            :colors="['rgb(225, 232, 234)', 'rgba(105, 145, 153, 1)']"
            :borderWidth="0"
            :legendcolor="'rgb(225, 232, 234)'"
          />
        </div>
        <div id="top-hosts-bar-chart">
          <h1>Top 5 Hosts by Number of Listings Published</h1>
          <BarChart style="width:85%;height: 80%;"
            :labels="labelsTopHosts"
            :label="'Number of Listings'"
            :data="dataTopHosts"
            :barcolors="['rgb(0, 40, 55)', 'rgba(105, 145, 153, 1)']"
            :legendcolor="'rgb(0, 40, 55)'"
            :gridcolor="'rgba(217, 217, 217, 0.2)'"
            :borderradius="10"
          />
        </div>
        <div id="executive-statistics">
          <div class="overview-card"><span class='bigger'>{{ percentageFivePlusProperties }}%</span> of hosts hold more than <span class='medium'>5</span> properties</div>
          <div id="executive-statistics-bottom">
            <div class="overview-card"><span class='bigger'>{{ propertiesOver300Nights }}</span> Properties with <span class='medium'>300</span> nights booked in the last 12 months</div>
              <router-link id="executive-statistics-button" to="/">See on map &#10140</router-link>
          </div>
        </div>
      </div>
    </div>

    <div id="trends">
      <h1 class="title">TRENDS AND INSIGHTS</h1>
      <div id="trends-options">
        <ChartCard style="width: 550px;" :title="'Neighbourhood Rankings'"
            :description ="'Use different metrics to compare neighborhoods, side by side using ranked bars.'">
            <img src="@/assets/bar-simplified.png" alt="Neighborhood Rankings Chart Example" style="max-width:80%;"/>
        </ChartCard>
        <ChartCard style="width: 550px;" :title="'Market Trends Over Time'" 
            :description ="'Track how prices, availability, number of listings and other metrics change over time.'">
            <img src="@/assets/line-simplified.png" alt="Line Chart Simplified Example" style="max-width:88%;"/>
        </ChartCard>
        <ChartCard style="width: 550px;" :title="'Listing Proportion by Category'" 
            :description ="'Visualize the proportion and distribution of listings across categories.'">
            <img src="@/assets/pie-simplified.png" alt="Pie Chart Simplified Example" style="max-width:58%;"/>
        </ChartCard>
      </div>
    </div>
  </body>
</template>

<script setup>
import LineChart from '@/components/Charts/LineChart.vue';
import SearchBar from '@/components/SearchBar.vue';
import BarChart from '@/components/Charts/BarChart.vue';
import PieChart from '@/components/Charts/PieChart.vue';
import { ref } from 'vue';
import ChartCard from '@/components/Cards/ChartCard.vue';
const currentCity = ref('Melbourne, Australia');

const listings = ref(12000);
const hosts = ref(1800);
const occupancy = ref('75%');
const rating = ref(4.5);
const price = ref('150');
const currency = ref('AUD');

const labelsLC= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dataLC = [210, 215, 226, 230, 220, 230, 228, 215, 211, 210, 209, 210]

const labelsBC= ['Neighborhood A', 'Neighborhood B', 'Neighborhood C', 'Neighborhood D', 'Neighborhood E','Neighborhood F', 'Neighborhood G', 'Neighborhood H', 'Neighborhood I', 'Neighborhood J'];
const dataBC = [300, 250, 200, 150, 100, 90, 80, 70, 60, 50];

const percentageFivePlusProperties = ref(35);
const propertiesOver300Nights = ref(350);

const dataLicensePC = [95,5];
const labelsTopHosts = ['Host A', 'Host B', 'Host C', 'Host D', 'Host E'];
const dataTopHosts = [50, 45, 40, 35, 30];
</script>



<style scoped>

#dashboard-city-view {
  gap: 120px;
  display: flex;
  flex-direction: column;
  padding-bottom: 150px;
}

#overview {
  padding: 20px 0px 0 0px;
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

#executive {
  height: 50vh;
  gap: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

#trends {
  height: 500px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
}

.title {
  color: var(--accent);
  font-size: 50px;
  font-weight: 700;
  margin-left: 50px;
  user-select: none;
}

#overview-top {
  width: 98%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

#overview-current-city {
  display: flex;
  grid-column: 2;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}

#city-caption {
  text-align: center;
  color: var(--accent);
  font-size: 20px;
  font-weight: 700;
  filter: drop-shadow(4px 4px 4px var(--shadow));
  user-select: none;
}

#compare-button{
  grid-column: 3;
  justify-self: end;
  background: var(--light-accent2);
  width: 240px;
  height: 50px;
  border-radius: 25px;
  border: none;
  font-size: 18px;
  color: white;
  filter: drop-shadow(4px 4px 6px var(--shadow));
}
#compare-button:hover {
  background: var(--accent2);
}



#overview-grid {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  height: 60%;
  padding: 0 50px;
}

.overview-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  border-radius: 20px;
  border: 3px solid var(--accent);
  background: var(--accent);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 20px;
}

.overview-card:hover {
  background-color: rgb(0, 48, 65);
  border: 3px solid rgb(0, 48, 65);
}

.overview-card p {
  color: #699199;
  text-align: center;
  font-size: 96px;
  font-weight: 500;
}

.overview-card h1 {
  color: #699199;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
}

.overview-card-content {
  display: flex;
  align-items: center;
  gap: 5px;
}

#occupancy { grid-area: 2 / 1 / 3 / 3; }
#rating { grid-area: 2 / 3 / 3 / 5; }
#price { grid-area: 2 / 5 / 3 / 7; }
#listings { grid-area: 1 / 1 / 2 / 4; }
#hosts{ grid-area: 1 / 4 / 2 / 7; }
#price-line { grid-area: 1 / 7 / 3 / 12; }
#top-neighborhoods-bar { grid-area: 1 / 12 / 3 / 15; }

#executive-content {
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 2fr 4fr;
  grid-column-gap: 50px;
  padding: 0 50px;
}

#top-hosts-bar-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  font-size: 15px;
  padding: 20px 20px 0 20px;
}

#executive-statistics {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 800px;
  align-items: flex-start;
  align-self: center;
}

#executive-statistics-bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#executive-statistics-button {
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 25px 25px;
  border: none;
  background-color: var(--bg);
  color: var(--accent);
  font-size: 20px;
  cursor: pointer;
  border: 7px solid var(--accent);
}

#executive-statistics-button:hover {
  background-color: rgb(218, 234, 255);
}

#executive-statistics-bottom .overview-card {
  border-radius: 25px 25px 25px 0px;
}

#executive-statistics .overview-card {
  width: 100%;
  height: 60px;
  justify-content: center;
  font-size: 24px;
  text-align: center;
  color: var(--bg);
  display:inline-block;
  text-align: center;

}
.bigger {
  font-size: 48px;
  font-weight: 700;
}

.medium {
  font-size: 36px;
  font-weight: 600;
}

#trends-options {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0 50px;
}
</style>