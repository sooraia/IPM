<template>
    <div class="metrics-container">
        <label v-for="m in metrics" :key="m">
            <input type="radio" name="metric" class="select-metric" :value="m" v-model="internalSelected" />
            {{ m }}
        </label>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import LabelMenu from '@/components/SideBar/LabelMenu.vue';

const props = defineProps({
    metrics: {
        type: Array,
        required: true
    },
    metricSelected: {
        type: String,
        default: ''
    }
});

const internalSelected = ref(props.metricSelected || props.metrics[0]);

const emit = defineEmits(['update:metricSelected']);

watch(internalSelected, (newValue) => {
    emit('update:metricSelected', newValue);
});
watch(() => props.metricSelected, (newValue) => {
    internalSelected.value = newValue;
});

</script>

<style scoped>

    .metrics-container{
        color: var(--metrics-text);
        display: flex;
        flex-direction: column;
    }

    .select-metric{
        accent-color: var(--accent);
        margin-top: 5px;
        margin-left: 18px;
    }
</style>