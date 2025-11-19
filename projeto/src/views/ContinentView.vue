<template>
  <div class = "body">
    <div class = "accordion-table-container">
      <h1>ASIA-PACIFIC</h1>
      <AccordionTable/>
    </div>
    <ContinentMap/>
  </div>
</template>

<script setup>
  import AccordionTable from "@/components/AccordionTable/AccordionContainer.vue";
  import ContinentMap from "@/components/ContinentMap.vue";
</script>

<style scoped>
  .body {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    border-top: #002837 5px solid;
    background-color: #0028371b;
    height: 100%;
  }

  h1 {
    font-size: 40px;
    color: #002837;
    text-align: center;
    margin-bottom: 30px;
  }

  .accordion-table-container {
    width: 55%;
    position: relative;
  }

</style>
