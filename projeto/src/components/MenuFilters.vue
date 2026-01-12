<template>
    <section class="menu">
        <header class="title-menu">
            <LabelMenu title="Filters"/>
            <img 
                id="importFilters" 
                type="submit" 
                src="../assets/importFilters.png"
                @click="openImportModal"
                title="Import from saved filters"
            />
        </header>

        <ImportFilters 
            :show="showImportModal"
            :userEmail="userEmail"
            @close="showImportModal = false"
            @load="loadFilter"
        />

        <div class="filtros">
            <div>
                <p class="subtitle">Price per night:</p>
                <RangeBar v-model="priceRangeComputed" 
                        :min="0" 
                        :max="props.maxPrice"
                        :gap="100"
                        :currencySymbol="props.currencySymbol"
                />
            </div>
            <CircleButton text="No License" v-model="noLicenseComputed"/>
            <CircleButton text="Host is a SuperHost" v-model="isSuperHostComputed"/>
            <div>
                <p class="subtitle">Property Type:</p>
                <Dropdown v-model="propertyTypeComputed"/>
            </div>
            <div>
                <p class="subtitle">Rating Score:</p>
                <StarRating v-model="ratingScoreComputed"/>
            </div>
            <div>
                <p class="subtitle">Annual Occupancy:</p>
                <RangeBar v-model="annualOccupancyComputed" 
                        :min="0" 
                        :max="365"
                        :gap="1"
                />
            </div>
            <div>
                <p class="subtitle">Rooms and beds:</p>
                <Add texto="Accomodates" v-model="accommodatesComputed" :min="0" :max="20"/>
                <Add texto="Rooms" v-model="bedroomsComputed" :min="0" :max="20"/>
                <Add texto="Beds" v-model="bedsComputed" :min="0" :max="20"/>
                <Add texto="Bathrooms" v-model="bathroomsComputed" :min="0" :max="20"/>
            </div>
            <div>
                <p class="subtitle">Amenities:</p>
                <div class="amenities-list">
                    
                    <Checkbox 
                        v-for="(item, index) in displayedAmenities"
                        :key="index"
                        :modelValue="item.value"
                        @update:modelValue="toggleAmenity(item.label)"
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
                <SizeResults v-model:sizeRes="sizeResComputed" :suggestionsList="props.neighborhoodsList" @neighbourhoodSelected="emit('neighbourhoodSelected', $event)"/>

            </div>
        </div>
        <div class="buttons">
            <Button buttonLabel="Reset Filters" @click="resetFilters" id="button1" :icon="resetIcon"/>
            <Button buttonLabel="Save Filters" id="button2" :icon="saveIcon" @click="saveFilters"/>
        </div>

        <InputMessage 
            v-if="showInputModal"
            title="Save Filter Configuration"
            placeholder="Enter configuration name..."
            @confirm="handleSaveConfirm"
            @close="showInputModal = false"
        />

        <Success 
            v-if="showSuccessModal"
            successMessage="Filters saved successfully!"
            @close="showSuccessModal = false"
        />

        <Error 
            v-if="showErrorModal"
            :errorMessage="errorMessage"
            @close="showErrorModal = false"
        />
    </section>
    
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import LabelMenu from './SideBar/LabelMenu.vue';
import CircleButton from './SideBar/CircleButton.vue';
import StarRating from './SideBar/StarRating.vue';
import Dropdown from './SideBar/Dropdown.vue';
import RangeBar from './SideBar/RangeBar.vue';
import Add from './SideBar/Add.vue';
import Checkbox from './SideBar/Checkbox.vue';
import Button from './Button.vue';
import SizeResults from './SideBar/SizeResults.vue';
import resetIcon from '../assets/ResetFilters.png';
import saveIcon from '../assets/SaveFilters.png';
import { useAuthStore } from '@/stores/auth';
import { saveFiltersConfig } from '@/utils/users';
import InputMessage from './Messages/inputMessage.vue';
import Success from './Messages/Success.vue';
import Error from './Messages/Error.vue';
import ImportFilters from './SideBar/importFilters.vue';

const props = defineProps({
    priceRange: { type: Array, default: [0, 1500] },
    currencySymbol: { type: String, default: '' },
    annualOccupancy: { type: Array, default: [0, 365] },
    maxPrice: { type: Number, default: 1500 },
    noLicense: { type: Boolean, default: false },
    isSuperHost: { type: Boolean, default: false },
    propertyType: { type: String, default: 'All' },
    ratingScore: { type: Number, default: 0 },
    roomsData: { 
        type: Object, 
        default: () => ({ accommodates: 0, bedrooms: 0, beds: 0, bathrooms: 0 })
    },
    sizeRes: { type: String, default: 'Entire City' },
    availableAmenities: { type: Array, default: () => [] },
    selectedAmenities: { type: Array, default: () => [] },
    neighborhoodsList: { type: Array, default: () => [] }
});

const emit = defineEmits([
    'update:priceRange', 
    'update:annualOccupancy',
    'update:noLicense',
    'update:isSuperHost',
    'update:propertyType',
    'update:ratingScore',
    'update:roomsData',
    'update:sizeRes',
    'update:selectedAmenities',
    'neighbourhoodSelected'
]);

onMounted(() => {
    console.log('Neighborhoods List:', props.neighborhoodsList);
});

const showInputModal = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref('');
const showImportModal = ref(false);

const userEmail = computed(() => {
    const authStore = useAuthStore();
    return authStore.user?.email || '';
});

const priceRangeComputed = computed({
    get: () => props.priceRange,
    set: (val) => emit('update:priceRange', val)
});

const annualOccupancyComputed = computed({
    get: () => props.annualOccupancy,
    set: (val) => emit('update:annualOccupancy', val)
});

const noLicenseComputed = computed({
    get: () => props.noLicense,
    set: (val) => emit('update:noLicense', val)
});

const isSuperHostComputed = computed({
    get: () => props.isSuperHost,
    set: (val) => emit('update:isSuperHost', val)
});

const propertyTypeComputed = computed({
    get: () => props.propertyType,
    set: (val) => emit('update:propertyType', val)
});

const ratingScoreComputed = computed({
    get: () => props.ratingScore,
    set: (val) => emit('update:ratingScore', val)
});

const accommodatesComputed = computed({
    get: () => props.roomsData.accommodates,
    set: (val) => emit('update:roomsData', { ...props.roomsData, accommodates: val })
});

const bedroomsComputed = computed({
    get: () => props.roomsData.bedrooms,
    set: (val) => emit('update:roomsData', { ...props.roomsData, bedrooms: val })
});

const bedsComputed = computed({
    get: () => props.roomsData.beds,
    set: (val) => emit('update:roomsData', { ...props.roomsData, beds: val })
});

const bathroomsComputed = computed({
    get: () => props.roomsData.bathrooms,
    set: (val) => emit('update:roomsData', { ...props.roomsData, bathrooms: val })
});

const sizeResComputed = computed({
    get: () => props.sizeRes,
    set: (val) => emit('update:sizeRes', val)
});

const amenities = computed(() => {
    return props.availableAmenities.map(amenity => ({
        label: amenity,
        value: props.selectedAmenities.includes(amenity)
    }));
});

function toggleAmenity(amenity) {
    const current = [...props.selectedAmenities];
    const index = current.indexOf(amenity);
    
    if (index > -1) {
        current.splice(index, 1);
    } else {
        current.push(amenity);
    }
    
    emit('update:selectedAmenities', current);
}

const showAllAmenities = ref(false);

const displayedAmenities = computed(() => {
    if (showAllAmenities.value) {
        return amenities.value;
    }
    return amenities.value.slice(0, 5);
});

function resetFilters(){
    ratingScoreComputed.value = 0;
    priceRangeComputed.value = [0, props.maxPrice];
    annualOccupancyComputed.value = [0, 365];
    noLicenseComputed.value = false;
    isSuperHostComputed.value = false;
    propertyTypeComputed.value = 'All';
    emit('update:roomsData', { accommodates: 0, bedrooms: 0, beds: 0, bathrooms: 0 });
    sizeResComputed.value = 'Entire City';
    emit('update:selectedAmenities', []);
}

function saveFilters() {
    const authStore = useAuthStore();
    const userEmail = authStore.user?.email;
    
    if (!userEmail) {
        errorMessage.value = 'You need to be logged in to save filters!';
        showErrorModal.value = true;
        return;
    }
    
    showInputModal.value = true;
}

async function handleSaveConfirm(configName) {
    showInputModal.value = false;
    
    const authStore = useAuthStore();
    const userEmail = authStore.user?.email;
    
    const filtersConfig = {
        config_name: configName,
        timestamp: new Date().toISOString(),
        filters: {
            priceRange: props.priceRange,
            annualOccupancy: props.annualOccupancy,
            noLicense: props.noLicense,
            isSuperHost: props.isSuperHost,
            propertyType: props.propertyType,
            ratingScore: props.ratingScore,
            roomsData: props.roomsData,
            sizeRes: props.sizeRes,
            selectedAmenities: props.selectedAmenities
        }
    };
    
    const success = await saveFiltersConfig(userEmail, filtersConfig);

    if (success) {
        showSuccessModal.value = true;
    } else {
        errorMessage.value = 'Failed to save filters. Please try again.';
        showErrorModal.value = true;
    }
}


function openImportModal() {
    const authStore = useAuthStore();
    const userEmail = authStore.user?.email;
    
    if (!userEmail) {
        errorMessage.value = 'You need to be logged in to import filters!';
        showErrorModal.value = true;
        return;
    }
    showImportModal.value = true;
}

function loadFilter(filter) {
    const f = filter.filters;
    
    priceRangeComputed.value = f.priceRange;
    annualOccupancyComputed.value = f.annualOccupancy;
    noLicenseComputed.value = f.noLicense;
    isSuperHostComputed.value = f.isSuperHost;
    propertyTypeComputed.value = f.propertyType;
    ratingScoreComputed.value = f.ratingScore;
    emit('update:roomsData', f.roomsData);
    sizeResComputed.value = f.sizeRes;
    emit('update:selectedAmenities', f.selectedAmenities);
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
    cursor: pointer;
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