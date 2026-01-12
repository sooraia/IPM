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
      <ContinentMap id="ContinentMap" :continent="currentContinent"/>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCityStore } from '@/stores/city';
import AccordionTable from "@/components/AccordionTable/AccordionContainer.vue";
import ContinentMap from "@/components/ContinentMap.vue";
import { useRoute } from 'vue-router';
import { ref } from 'vue';
const route = useRoute();

onMounted(() => {
  try {
    if (currentContinent.value) {
      getCitiesbyCountry(currentContinent.value);
      loadContent();
    }
  } catch (error) {
    console.error("Erro ao carregar cidades por continente:", error);
  }
});

const currentContinent = computed(() => {
  const p = route.params.continent ?? route.query.continent;
  if (!p) return null;
  return Array.isArray(p) ? p[0] : p;
});

const cityStore = useCityStore();
const currentContent = ref({ title: '', data: [] });

async function loadContent() {
  if (!currentContinent.value)
    currentContent.value = { title: '', data: [] };
  else {
    const citiesbycountry = await getCitiesbyCountry(currentContinent.value);
    const tableData = { title: '', data: [] };
    tableData.title = currentContinent.value.toUpperCase();
    for (let i = 0; i < citiesbycountry.length; i++) {
      const element = citiesbycountry[i];
      tableData.data.push({category: element.name, subcategories: element.cities, available: element.available });
    }
    console.log("Table Data:", citiesbycountry);
    currentContent.value = tableData;
  }
}

async function getCitiesbyCountry(currentContinent) {
    try {
        const response = await fetch(`http://localhost:3000/cities.cities?continent=${encodeURIComponent(currentContinent)}`);
        const data = await response.json();
        const { continent, countries} = data[0];
        return countries;
      } catch (error) {
          console.error("Erro a obter cidades", error);
          return [];
    }
}

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
