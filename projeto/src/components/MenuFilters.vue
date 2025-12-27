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
                <RangeBar v-model="rangebar.priceRange" 
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
                <RangeBar v-model="rangebar.annualOccupancy" 
                        :min="0" 
                        :max="365"
                        :gap="1"
                        :currency="false"/>
            </div>
            <div>
                <h4>Rooms and beds:</h4>
                <Add texto="Rooms" v-model="roomsData.rooms" :min="0" :max="10"/>
                <Add texto="Beds" v-model="roomsData.beds" :min="0" :max="10"/>
                <Add texto="Bathrooms" v-model="roomsData.bathrooms" :min="0" :max="10"/>
            </div>
            <div>
                <h4>Amenities:</h4>
                <div class="amenities-list">
                    
                    <Checkbox 
                        v-for="(item, index) in displayedAmenities"
                        :key="index"
                        v-model="item.value" 
                        :texto="item.label"
                    />

                    <button 
                        v-if="amenities.length > 5" 
                        class="show-more-btn"
                        @click="showAllAmenities = !showAllAmenities"
                    >
                        {{ showAllAmenities ? 'Show less <' : 'Show more >' }}
                    </button>

                </div>
            </div>
            <div>
                <h4>Show Results for:</h4>
                <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px;">
                    <CircleButton text="Entire City"/>
                    <CircleButton text="Neighborhood"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed} from 'vue';
import LabelMenu from './SideBar/LabelMenu.vue';
import CircleButton from './SideBar/CircleButton.vue';
import StarRating from './SideBar/StarRating.vue';
import Dropdown from './SideBar/Dropdown.vue';
import RangeBar from './SideBar/RangeBar.vue';
import DateRange from './SideBar/DateRange.vue';
import Add from './SideBar/Add.vue';
import Checkbox from './SideBar/Checkbox.vue';

const ratingNumber = ref(0);
const rangebar = ref({
    priceRange: [0, 1500],
    annualOccupancy: [0, 365]
});
const roomsData = ref({
    rooms: 0,
    beds: 0,
    bathrooms: 0
});

const amenities = ref([
    { label: 'Wifi', value: false },
    { label: 'Washing machine', value: false },
    { label: 'Air conditioning', value: false },
    { label: 'TV', value: false },
    { label: 'Hair dryer', value: false },
    { label: 'Gym', value: false },             
    { label: 'Hot tub', value: false }
]);

const showAllAmenities = ref(false);

const displayedAmenities = computed(() => {
    if (showAllAmenities.value) {
        return amenities.value;
    }
    return amenities.value.slice(0, 5);
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

.amenities-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
}

.show-more-btn {
    background: none;
    border: none;
    color: var(--accent);
    font-size: 16px;
    cursor: pointer;
    text-decoration: underline;
}

.show-more-btn:hover {
    color: var(--accent2);
}
</style>