<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggle" :style="{
      backgroundColor: headerBgColor,
      justifyContent: justifyContent || 'space-between'
    }">
      <span class="category-name" :style="{
        fontWeight: fontWeight || defaultFontWeight,
        textAlign: textAlign || 'center'
      }">
        {{ item.category }}
      </span>
      <img :src="arrowIcon" :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }" class="arrow-icon"
        alt="Seta" />
    </div>

    <transition name="slide">
      <div v-if="isOpen" class="accordion-body" :style="{ backgroundColor: bodyBgColor }">
        <div v-for="(subcategory, index) in item.subcategories" :key="index" class="subcategory-row" :style="{
          fontWeight: fontWeight || defaultFontWeight,
          justifyContent: justifyContent || 'flex-start',
        }">
          {{ subcategory }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>

import { ref } from "vue";
import arrowIcon from '../../assets/arrowVIcon.png';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  headerBgColor: String,
  bodyBgColor: String,
  fontWeight: String,
  textAlign: String,
  justifyContent: String,
});

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

</script>

<style scoped>
.accordion-item {
  border-bottom: 1px solid var(--bg);
  margin-bottom: 0;
  overflow: hidden;
  width: 100%;
}

.accordion-header {
  background-color: var(--accent);
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-name {
  color: var(--white);
  font-size: 18px;
  width: 100%;
}

.accordion-header:hover {
  background-color: rgb(1, 29, 39);
}

.arrow-icon {
  transition: transform 0.2s ease;
  height: 25px;
}

.accordion-body {
  background-color: rgb(16, 54, 68);
}

.subcategory-row {
  padding: 15px 20px;
  border-top: 1px solid var(--bg);
  color: var(--white);
  font-size: 16px;
  text-align: left;
}
</style>