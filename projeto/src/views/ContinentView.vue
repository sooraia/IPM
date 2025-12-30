<template>
  <div class="body">
    <div class="body-container">
      <div class="accordion-table-container">
        <h1>{{ currentContent.title }}</h1>
        <AccordionTable 
            :data="currentContent.data" 
            :font-weight="'bold'" 
            :text-align="'center'" 
            width="70%"
            :max-height="'55vh'" 
        />
      </div>
      <ContinentMap id="ContinentMap" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCityStore } from '@/stores/city';
import AccordionTable from "@/components/AccordionTable/AccordionContainer.vue";
import ContinentMap from "@/components/ContinentMap.vue";

const cityStore = useCityStore();

const contentByCity = {
    'Tokyo': {
        title: 'ASIA-PACIFIC',
        data: [
            { category: "Australia", subcategories: ["Barossa Valley", "Barwon South West, Vic", "Brisbane",
                                                     "Melbourne", "Mid North Coast", "Mornington Peninsula",
                                                      "Northern Rivers New South Wales", "Sydney", "Tasmania","Western Australia"] },
            { category: "China", subcategories: ["Beijing", "Hong Kong", "Shanghai"] },
            { category: "Japan", subcategories: ["Tokyo"] },
            { category: "Singapore", subcategories: ["Singapore"] },
            { category: "Taiwan", subcategories: ["Taipei"] },
            { category: "Thailand", subcategories: ["Bangkok"] }
        ]
    },
    'Porto': {
        title: 'EUROPE',
        data: [
            { category: "Austria", subcategories: ["Vienna"] },
            { category: "Belgium", subcategories: ["Antwerp", "Brussels", "Ghent"] },
            { category: "Czech Republic", subcategories: ["Prague"] },
            { category: "Denmark", subcategories: ["Copenhagen"] },
            { category: "France", subcategories: ["Bordeaux", "Lyon", "Paris", "Pays Basque"] },
            { category: "Germany", subcategories: ["Berlin", "Munich"] },
            { category: "Greece", subcategories: ["Athens", "Crete", "South Aegean", "Thessaloniki"] },
            { category: "Hungary", subcategories: ["Budapest"] },
            { category: "Ireland", subcategories: ["Dublin"] },
            { category: "Italy", subcategories: ["Bergamo", "Bologna", "Florence", "Milan", "Naples", "Puglia", "Rome", "Sicily", "Trentino", "Venice"] },
            { category: "Latvia", subcategories: ["Riga"] },
            { category: "Norway", subcategories: ["Oslo"] },
            { category: "Portugal", subcategories: ["Lisbon", "Porto"] },
            { category: "Spain", subcategories: ["Barcelona", "Euskadi", "Girona", "Madrid", "Malaga", "Mallorca", "Menorca", "Sevilla", "Valencia"] },
            { category: "Sweden", subcategories: ["Stockholm"] },
            { category: "Switzerland", subcategories: ["Geneva", "Vlaud", "Zurich"] },
            { category: "The Netherlands", subcategories: ["Amsterdam", "Rotterdam", "The Hague"] },
            { category: "Turkey", subcategories: ["Istanbul"] },
            { category: "United Kingdom", subcategories: ["Bristol", "Edinburgh", "Greater Manchester", "London"] }
        ]
    },
    'Hawaii': {
        title: 'AMERICA',
        data: [
            { category: "USA", subcategories: ["Hawaii", "New York", "San Francisco"] },
            { category: "Brazil", subcategories: ["Rio de Janeiro", "São Paulo"] },
            { category: "Canada", subcategories: ["Toronto", "Vancouver"] }
        ]
    },
    'CapeTown': {
        title: 'AFRICA',
        data: [
            { category: "South Africa", subcategories: ["Cape Town", "Johannesburg"] },
            { category: "Egypt", subcategories: ["Cairo"] },
            { category: "Morocco", subcategories: ["Marrakech"] }
        ]
    }
};

const currentContent = computed(() => {
    const city = cityStore.currentCity;
    if (city && contentByCity[city]) {
        return contentByCity[city];
    }
});

</script>

<style scoped>
.body {
  background-color: var(--bg-secondary);
  margin-top: 3vh;
  border-top: 5px solid var(--accent);
  width: 100%;
  min-height: 100%;
}

.body-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

h1 {
  font-size: 40px;
  color: var(--accent);
  text-align: center;
  margin-bottom: 30px;
}

.accordion-table-container {
  width: 55%;
}

#ContinentMap {
  margin: 25px;
}
</style>
