<template>
    <section class="menu">
        <header class="title-menu">
            <LabelMenu title="Filters"/>
            <img id="importFilters" type="submit" src="../assets/importFilters.png" />
        </header>
        <div class="filtros">
            <DateRange />
            <div>
                <p class="subtitle">Price per night:</p>
                <RangeBar v-model="rangebar.priceRange" 
                        :min="0" 
                        :max="1500"
                        :gap="100"
                        :currency="true"/>
            </div>
            <CircleButton text="No License"/>
            <CircleButton text="Host is a SuperHost"/>
            <div>
                <p class="subtitle">Property Type:</p>
                <Dropdown />
            </div>
            <div>
                <p class="subtitle">Rating Score:</p>
                <StarRating v-model="ratingNumber"/>
            </div>
            <div>
                <p class="subtitle">Annual Occupancy:</p>
                <RangeBar v-model="rangebar.annualOccupancy" 
                        :min="0" 
                        :max="365"
                        :gap="1"
                        :currency="false"/>
            </div>
            <div>
                <p class="subtitle">Rooms and beds:</p>
                <Add texto="Accomodates" v-model="roomsData.accomodates" :min="0" :max="10"/>
                <Add texto="Rooms" v-model="roomsData.rooms" :min="0" :max="10"/>
                <Add texto="Beds" v-model="roomsData.beds" :min="0" :max="10"/>
                <Add texto="Bathrooms" v-model="roomsData.bathrooms" :min="0" :max="10"/>
            </div>
            <div>
                <p class="subtitle">Amenities:</p>
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
                <p class="subtitle">Show Results for:</p>
                <SizeResults v-model:sizeRes="sizeResSelected"/>
            </div>
        </div>
        <div class="buttons">
            <Button buttonLabel="Reset Filters" @click="resetFilters" id="button1" :icon="resetIcon"/>
            <Button buttonLabel="Save Filters" id="button2" :icon="saveIcon"/>
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
import Button from './Button.vue';
import SizeResults from './SideBar/SizeResults.vue';
import resetIcon from '../assets/ResetFilters.png';
import saveIcon from '../assets/SaveFilters.png';

const ratingNumber = ref(0);
const rangebar = ref({
    priceRange: [0, 1500],
    annualOccupancy: [0, 365]
});

const roomsData = ref({
    accomodates: 0,
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

const sizeResSelected = ref('Entire City');

function resetFilters(){
    ratingNumber.value = 0;
    rangebar.value.priceRange = [0, 1500];
    rangebar.value.annualOccupancy = [0, 365];
    roomsData.value.accomodates = 0;
    roomsData.value.rooms = 0;
    roomsData.value.beds = 0;
    roomsData.value.bathrooms = 0;
    amenities.value.forEach(item => item.value = false);
    sizeResSelected.value = 'Entire City';
}

</script>

<style scoped>

.menu{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    margin: 10px 15px 10px 10px; 
}

.subtitle{
    font-size: 18px;
    color: var(--accent);
    margin-bottom: 5px;
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

.select-metric{
        accent-color: var(--accent);
        margin-top: 5px;
}
.search-wrapper {
        width: 85%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin-left: 35px;
    }
.input-neighbourhood{
        background-color: rgba(217, 217, 217, 1);
        margin-top: 10px;
        align-self: center;
    }


.buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

#button1 {
    border: 2px solid var(--accent);
    cursor: pointer;
    width: 200px;
}

#button2 {
    background: var(--light-accent2);
    color: white;
    cursor: pointer;
    width: 200px;
}
    
</style>