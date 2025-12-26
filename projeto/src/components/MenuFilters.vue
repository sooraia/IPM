<template>
    <section class="menu">
        <header class="title-menu">
            <LabelMenu title="Filters"/>
            <img id="importFilters" type="submit" src="../assets/importFilters.png" />
        </header>
        <div class="filtros">
            <DateRange />
            <div>
                <h4>Price per night:</h4>
                <RangeBar v-model="filters.priceRange" 
                        :min="0" 
                        :max="1500"
                        :gap="100"
                        :currency="true"/>
            </div>
            <CircleButton text="No License"/>
            <CircleButton text="Host is a SuperHost"/>
            <div>
                <h4>Property Type:</h4>
                <Dropdown />
            </div>
            <div>
                <h4>Rating Score:</h4>
                <StarRating v-model="ratingNumber"/>
            </div>
            <div>
                <h4>Annual Occupancy:</h4>
                <RangeBar v-model="filters.annualOccupancy" 
                        :min="0" 
                        :max="365"
                        :gap="1"
                        :currency="false"/>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import LabelMenu from './SideBar/LabelMenu.vue';
import CircleButton from './SideBar/CircleButton.vue';
import StarRating from './SideBar/StarRating.vue';
import Dropdown from './SideBar/Dropdown.vue';
import RangeBar from './SideBar/RangeBar.vue';
import DateRange from './SideBar/DateRange.vue';

const ratingNumber = ref(0);
const filters = ref({
    priceRange: [0, 1500],
    annualOccupancy: [0, 365]
});

</script>

<style scoped>

.menu{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}

.title-menu {
    display: flex;
    gap: 10px;
}

#importFilters {
    background-color: var(--accent2);
    padding:5px;
    border-radius: 50%;
}

.filtros {
    color: var(--accent);
    gap:20px;
    display: flex;
    flex-direction: column;
}
</style>