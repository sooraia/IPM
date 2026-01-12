<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggle" :style="{
      backgroundColor: headerBgColor,
      justifyContent: justifyContent || 'space-between'
    }">
      <span class="category-name" :style="{
        fontWeight: fontWeight || 'normal',
        textAlign: textAlign || 'center'
      }">
        {{ item.category }}
      </span>
      <img :src="arrowIcon" :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }" class="arrow-icon"
        alt="Seta" />
    </div>
    <div v-if="isOpen" class="accordion-body" :style="{ backgroundColor: bodyBgColor }">
      <div class="subcategory-row" v-if="!links" :style="{ fontWeight: fontWeight || 'normal', textAlign: 'left'}">
        {{ item.subcategories[0] }}
      </div>
      <template v-else>
        <div 
          v-for="(subcategory, index) in item.subcategories" 
          :key="index" 
        >
          <router-link 
            v-if="item.available && item.available.includes(subcategory)"
            class="subcategory-row"
            :to="{ name: 'alojamentos', params: { city: subcategory.trim().replace(' ', '') } }"
            :style="{
              fontWeight: fontWeight || 'normal',
              justifyContent: justifyContent || 'flex-start',
            }"
          > 
            {{ subcategory }}
          </router-link>
          <div 
            v-else-if="item.available"
            id="unavailable"
            class="subcategory-row"
            :style="{
              fontWeight: fontWeight || 'normal',
              justifyContent: justifyContent || 'flex-start',
            }"
          > 
            {{ subcategory }} (unavailable)
          </div>
          <div 
            v-else
            class="subcategory-row"
            :style="{
              fontWeight: fontWeight || 'normal',
              justifyContent: justifyContent || 'flex-start',
            }"
          > 
            {{ subcategory }}
          </div>
        </div>
      </template>
    </div>
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
  links: {
    type: Boolean,
    default: false
  }
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

.accordion-item:last-child {
    border-bottom: none;
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
  display: block;
  cursor: pointer;
}

.subcategory-row:hover {
  background-color: var(--label-bg-blue);
  color: var(--accent);
}

#unavailable {
  color: rgb(154, 161, 160);
  pointer-events: none;
}
</style>