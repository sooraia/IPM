<template>
  <div class="accordion-container">
    <div class = "accordion-table">
      <AccordionItem
        v-for="(country, index) in countries"
        :key="index"
        :item="country"
      />
    </div>
  </div>
</template>

<script setup>
import AccordionItem from "./AccordionItem.vue";

const countries = [
  { country: "Australia", cities: ["Barossa Valley", "Barwon South West, Vic", " Brisbane", "Melbourne", "Mid North Coast", 
                    "Mornington Peninsula", "Northern Rivers", "Sunshine Coast", "Sydney", "Tasmania", "Western Australia"] },
  { country: "China", cities: ["Beijing", "Hong Kong", "Shanghai"] },
  { country: "Japan", cities: ["Tokyo"] },
  { country: "Singapore", cities: ["Singapore"] },
  { country: "Taiwan", cities: ["Taipei"] },
  { country: "Thailand", cities: ["Bangkok"] },
];
</script>

<style scoped>

  .accordion-container {
    width: 70%; 
    margin: 0 auto;
    overflow-y: auto;
    border-radius: 15pt;
  }

  .accordion-table {
    border-radius: 15pt;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #002837 #153e4c93;
    max-height: 55vh;
  }

</style>
