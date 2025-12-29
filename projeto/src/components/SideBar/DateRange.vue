<template>
    <div class="data">
        <p class="subtitle">Select date range:</p>           
        <div style="display: flex; flex-direction: row; padding-left: 8px; align-items: center;">
            <span for="date-from" style="padding-right: 8px; font-weight: 350;">From:</span>
            <input 
            id="date-from"
            type="date"
            />
        </div>
        <div style="display: flex; flex-direction: row; padding-left: 8px; align-items: center;">
            <span for="date-to" style="padding-right: 8px; font-weight: 350;">To:</span>
            <input 
            id="date-to"
            type="date" 
            />
        </div>
        <p class="subtitle" style="text-align: center;">or</p>
        <p class="subtitle">Select a preset range:</p>
        <div style="gap: 10px; display: flex; justify-content: center; font-size: 15px;">
            <label>3 months</label>
            <label>6 months</label>
            <label>1 year</label>
        </div>
    </div>
</template>

<style scoped>
.data {
    background-color: var(--accent2-opacity2);
    border-radius: 10px;
    padding: 10px;
    gap:4px;
    display: flex;
    flex-direction: column;
}

input {
    border:none; 
    border-radius: 8px; 
    color: var(--metrics-text); 
    background-color: var(--accent2-opacity5); 
    outline: none; border-color: var(--accent2);
}

label {
    background-color: var(--label-bg-blue); 
    color: var(--label-text-blue); 
    border-radius: 8px; 
    padding: 0 8px;
}

.subtitle{
    font-size: 18px;
    color: var(--accent);
    margin-bottom: 5px;
}

</style>