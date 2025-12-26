<template>
    <select name="property" id="propertyDropdown">
        <option value="All">All</option>
        <option value="Shared Room">Shared Room</option>
        <option value="Hotel">Hotel</option>
        <option value="Private Room">Private Room</option>
        <option value="Entire Home/Apt">Entire Home/Apt</option>
    </select>
</template>

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