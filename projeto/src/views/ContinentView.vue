<template>
  <div class="body">
    <div class = "body-container">
      <div class = "accordion-table-container">
        <h1>ASIA-PACIFIC</h1>
        <AccordionTable/>
      </div>
      <ContinentMap id="ContinentMap"/>
      </div>
  </div>
</template>

<script setup>
  import AccordionTable from "@/components/AccordionTable/AccordionContainer.vue";
  import ContinentMap from "@/components/ContinentMap.vue";
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
    margin:25px;
  }

</style>
