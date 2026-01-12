<template>
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
        <div class="import-filters-container">
            <div class="header">
                <h1>Import Filters</h1>
            </div>
            <hr />
            <div v-if="savedFilters.length === 0" class="no-filters">
                <p>No saved filters yet.</p>
                <p class="hint">Save your current filters to see them here!</p>
            </div>
            <div v-else class="filters-list">
                <h3>Select a configuration to load:</h3>
                <div 
                    v-for="(filter, index) in savedFilters" 
                    :key="index"
                    class="filter-item"
                    @click="selectFilter(filter)"
                >
                    <div class="filter-info">
                        <h3>{{ filter.config_name }}</h3>
                        <p class="filter-date">{{ formatDate(filter.timestamp) }}</p>
                        <div v-if="expandedFilter === index" class="filter-details">
                            <p><strong>Price (per night):</strong> {{ filter.filters.priceRange[0] }} - {{ filter.filters.priceRange[1] }}</p>
                            <p><strong>License:</strong> {{ filter.filters.noLicense ? 'No' : 'Yes' }}</p>
                            <p><strong>Super Host:</strong> {{ filter.filters.isSuperHost ? 'Yes' : 'No' }}</p>
                            <p><strong>Property Type:</strong> {{ filter.filters.propertyType }}</p>
                            <p><strong>Rating Score:</strong> {{ filter.filters.ratingScore }}</p>
                            <p><strong>Annual Occupancy:</strong> {{ filter.filters.annualOccupancy[0] }} - {{ filter.filters.annualOccupancy[1] }}</p>
                            <p><strong>Accommodates:</strong> {{ filter.filters.roomsData.accommodates }}</p>
                            <p><strong>Bedrooms:</strong> {{ filter.filters.roomsData.bedrooms }}</p>
                            <p><strong>Beds:</strong> {{ filter.filters.roomsData.beds }}</p>
                            <p><strong>Bathrooms:</strong> {{ filter.filters.roomsData.bathrooms }}</p>
                            <p><strong>Amenities:</strong> {{ filter.filters.selectedAmenities?.length || 0 }} selected</p>
                        </div>
                    </div>
                    <button 
                        class="options-btn"
                        @click.stop="toggleDetails(index)"
                        title="Inspect this filter"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="var(--accent)">
                            <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/>
                        </svg>
                    </button>
                    <button 
                        class="options-btn"
                        @click.stop="deleteFilter(index)"
                        title="Delete this filter"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="var(--accent)">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getFiltersConfig, deleteFiltersConfig } from '@/utils/users';

const props = defineProps({
    show: { type: Boolean, default: false },
    userEmail: { type: String, required: true }
});

const emit = defineEmits(['close', 'load']);

const savedFilters = ref([]);
const expandedFilter = ref(null);

async function loadFilters() {
    savedFilters.value = await getFiltersConfig(props.userEmail);
}

watch(() => props.show, async (newVal) => {
    if (newVal && props.userEmail) {
        await loadFilters();
    } else {
        expandedFilter.value = null;
    }
});

function toggleDetails(index) {
    expandedFilter.value = expandedFilter.value === index ? null : index;
}

function selectFilter(filter) {
    emit('load', filter);
    closeModal();
}

async function deleteFilter(index) {
    const success = await deleteFiltersConfig(props.userEmail, index);
    
    if (success) {
        await loadFilters(); // lista atualizada
        expandedFilter.value = null;
    } else {
        alert('Failed to delete filter');
    }
}

function closeModal() {
    emit('close');
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
}

.import-filters-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 30px;
    background:
        linear-gradient(0deg,
        rgba(112, 168, 189, 0.8) 0%,
        rgba(112, 168, 189, 0.8) 100%),
        url('@/assets/background.jpg') lightgray -0.234px -239px / 100.024% 142.064% no-repeat;
    min-height: 400px;
    max-height: 600px;
    width: 550px;
    border-radius: 20px;
    border: 2px solid var(--light-accent2);
    overflow-y: auto;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: var(--accent);
    justify-content: center;
}

.header img {
    width: 40px;
    height: 40px;
}

.header h1 {
    font-size: 28px;
    margin: 0;
}

hr {
    border: 1px solid var(--accent2);
}

.no-filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: var(--accent);
    text-align: center;
    flex-grow: 1;
}

.no-filters p {
    font-size: 18px;
    margin: 5px 0;
}

.hint {
    font-size: 14px;
    font-style: italic;
    opacity: 0.8;
}

.filters-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.filters-list h3 {
    color: var(--accent);
    margin: 0;
}

.filter-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px 20px;
    background: var(--accent-opacity);
    border: 2px solid var(--accent2);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
}

.filter-item:hover {
    transform: translateX(5px);
}

.filter-info {
    flex-grow: 1;
}

.filter-info h3 {
    color: white;
    font-size: 18px;
    margin-top: 5px;
}

.filter-date {
    color: var(--accent);
    font-size: 13px;
    font-weight: 400;
}

.options-btn {
    background: none;
    border: none;
    cursor: pointer;
}

.options-btn:hover {
    transform: scale(1.1);
}

.filter-details {
    margin: 15px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    border-left: 3px solid var(--accent2);
}

.filter-details p {
    color: white;
    font-size: 14px;
    margin: 8px 0;
}

.filter-details strong {
    color: var(--accent);
}


</style>