<template>
    <select 
    name="property" 
    id="propertyDropdown"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)">
        <option value="All">All</option>
        <option value="Shared Room">Shared Room</option>
        <option value="Hotel Room">Hotel Room</option>
        <option value="Private Room">Private Room</option>
        <option value="Entire Home">Entire Home</option>
        <option value="Other">Other</option>
    </select>
</template>

<script setup>
const props = defineProps({
    modelValue: { type: String, default: 'All' }
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
#propertyDropdown {
    width: 80%;
    margin-top: 8px;
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    background-color: var(--label-bg-blue);
    color: var(--gray-color);
    outline: none;
    border-color: var(--accent);
    cursor: pointer;
}
</style>