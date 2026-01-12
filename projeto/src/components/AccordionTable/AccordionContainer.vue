<template>
  <div class="accordion-container" :style="{ width: width, maxHeight: maxHeight }">
    <div class="accordion-table">
      <AccordionItem v-for="(item, index) in data" :key="index" :item="item" :header-bg-color="headerBgColor"
        :body-bg-color="bodyBgColor" :font-weight="fontWeight" :text-align="textAlign"
        :justify-content="justifyContent" :links="links" />
    </div>
  </div>
</template>

<script setup>
import AccordionItem from "./AccordionItem.vue";

defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  maxHeight: String,
  width: String,
  headerBgColor: String,
  bodyBgColor: String,
  fontWeight: String,
  textAlign: String,
  justifyContent: String,
  links : {
    type: Boolean,
    default: true
  }
});

</script>

<style scoped>
.accordion-container {
  margin: 0 auto;
  overflow-y: auto;
  border-radius: 15pt;
}

.accordion-table {
  border-radius: 15pt;
  box-shadow: 0 2px 8px var(--shadow);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) rgba(21, 62, 76, 0.58);
}
</style>
