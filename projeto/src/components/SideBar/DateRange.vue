<template>
    <div class="data">
        <h4>Select date range:</h4>           
        <div style="display: flex; flex-direction: row; padding-left: 8px; align-items: center;">
            <span for="date-from" style="padding-right: 8px">From:</span>
            <input 
            id="date-from"
            type="date"
            />
        </div>
        <div style="display: flex; flex-direction: row; padding-left: 8px; align-items: center;">
            <span for="date-to" style="padding-right: 8px">To:</span>
            <input 
            id="date-to"
            type="date" 
            />
        </div>
        <h4 style="text-align: center;">or</h4>
        <h4>Select a preset range:</h4>
        <div style="gap: 16px; display: flex; justify-content: center;">
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

</style>