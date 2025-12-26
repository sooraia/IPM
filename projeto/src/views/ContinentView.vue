<template>
  <div class="body">
    <div class="body-container">
      <div class="accordion-table-container">
        <h1>ASIA-PACIFIC</h1>
        <AccordionTable :data="countriesData" :font-weight="'bold'" :text-align="'center'" width="70%"
          :max-height="'55vh'" />
      </div>
      <ContinentMap id="ContinentMap" />
    </div>
  </div>
</template>

<script setup>
import AccordionTable from "@/components/AccordionTable/AccordionContainer.vue";
import ContinentMap from "@/components/ContinentMap.vue";

const countriesData =
  [{
    category: "Australia", subcategories: ["Barossa Valley", "Barwon South West, Vic",
      " Brisbane", "Melbourne", "Mid North Coast", "Mornington Peninsula",
      "Northern Rivers", "Sunshine Coast", "Sydney", "Tasmania", "Western Australia"]
  },
  { category: "China", subcategories: ["Beijing", "Hong Kong", "Shanghai"] },
  { category: "Japan", subcategories: ["Tokyo"] },
  { category: "Singapore", subcategories: ["Singapore"] },
  { category: "Taiwan", subcategories: ["Taipei"] },
  { category: "Thailand", subcategories: ["Bangkok"] },];

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
