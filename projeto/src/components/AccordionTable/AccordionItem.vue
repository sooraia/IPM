<template>
  <div class="accordion-item">
    <div class="accordion-header" @click="toggle">
      <span class="country-name">{{ item.country }}</span>
      <img 
        :src="arrowIcon" 
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
        class="arrow-icon"
        alt="Seta"
      />
    </div>

    <transition name="slide">
      <div v-if="isOpen" class="accordion-body">
        <div
          v-for="(city, index) in item.cities"
          :key="index"
          class="city-row"
        >
          {{ city }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>

    import { ref } from "vue";
    import arrowIcon from '../../assets/arrowVIcon.png';

    const props = defineProps({
        item: Object
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

    .accordion-item:e9e9e9last-child {
        border-bottom: none;
    }

    .accordion-header {
        background-color: var(--accent);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .country-name {
        color: var(--white);
        font-size: 18px;
        font-weight: bold;
        margin: auto;
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

    .city-row {
        padding: 15px 20px;
        border-top: 1px solid var(--bg);
        color: var(--white);
        font-size: 16px;
    }

</style>