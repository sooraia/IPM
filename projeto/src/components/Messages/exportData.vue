<template>
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
        <div class="export-data-container">
            <div class="header">
                <img src="@/assets/exportData.png" />
                <h1> Export Data</h1>
            </div>
            <hr />
            <div class="format">
                <h2>Choose your format:</h2>
                <input type="radio" v-model="selectedFormat" value="csv" checked> 
                    CSV (Excel compatible)
                <p style="margin-left: 40px; font-weight: 300; font-style: italic;">Best for spreadsheets and data analysis</p>
                <input type="radio" v-model="selectedFormat" value="json">
                    JSON
                <p style="margin-left: 40px; font-weight: 300; font-style: italic;">Best for developers and APIs</p>
            </div>
            <hr />
            <div>
                <h2>Select your preferred fields:</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px;">
                    <Checkbox 
                        v-for="field in fields"
                        :key="field"
                        :modelValue="selectedFields.includes(field)"
                        @update:modelValue="toggleField(field)"
                        :texto="field"
                    />
                </div>
            </div>
            <Button buttonLabel="Download" @click="handleDownload" id="download-button"></Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import Checkbox from '@/components/SideBar/Checkbox.vue';

const props = defineProps({
    show: { type: Boolean, default: false },
});

const emit = defineEmits(['close', 'download']);

const selectedFormat = ref('csv');

const fields = [
    'id', 'name', 'listing_url', 'host_id', 'host_name', 'host_is_superhost', 
    'host_listings_count', 'neighbourhood_cleansed', 'latitude', 'longitude', 
    'property_type', 'room_type', 'accommodates', 'bathrooms', 'bedrooms', 
    'beds', 'amenities', 'price', 'estimated_occupancy_l365d', 
    'review_scores_rating', 'license', 'calculated_host_listings_count', 
    'reviews_per_month'
];

const selectedFields = ref([]);

function toggleField(fieldKey) {
    const index = selectedFields.value.indexOf(fieldKey);
    if (index > -1) {
        selectedFields.value.splice(index, 1);
    } else {
        selectedFields.value.push(fieldKey);
    }
}

function closeModal() {
    selectedFields.value = [];
    emit('close');
}

function handleDownload() {
    if (selectedFields.value.length === 0) {
        alert('Please select at least one field to export');
        return;
    }
    emit('download', {
        format: selectedFormat.value,
        fields: selectedFields.value,
    });
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
    z-index: 2;
}

.export-data-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background:
        linear-gradient(0deg,
        rgba(112, 168, 189, 0.8) 0%,
        rgba(112, 168, 189, 0.8) 100%),
        url('@/assets/background.jpg') lightgray -0.234px -239px / 100.024% 142.064% no-repeat;
    height: 560px;
    width: 500px;
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

#download-button {
    align-self: center;
    background: var(--light-accent2);
    color: white;
    font-size: 24px;
    cursor: pointer;
}

input[type="radio"] {
    color: var(--accent);
    cursor: pointer;
    accent-color: var(--accent2);
}

/*deep permite "perfurar" o scoped para mudar estilos*/
:deep(.custom-box) {
    background-color: var(--accent-opacity);
}

:deep(.check-icon) {
    stroke: var(--accent);
}

:deep(.texto) {
    color: var(--accent);
}
</style>