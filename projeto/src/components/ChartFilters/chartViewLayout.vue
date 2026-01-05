<template>
  <div class="grid-container">
    <div class="filter-column">
        <slot name="filters"></slot> 
    </div>

    <div class="main-column">
        <div class="charts-container">
            <slot name="chart"></slot> 
        </div>
    </div>
    
    <div class="share-column">
        <p class = "subtitle" style="font-weight: bold;">City:</p>
        <SearchBar class = "searchbar"></SearchBar>
        <slot name="share-content"></slot> 
    </div>
  </div>
</template>

<script setup>
    import SearchBar from '@/components/SearchBar.vue'
</script>

<style scoped>
    .grid-container{
        display: flex;
        width: 100%;
        max-height: calc(100vh - 190px);
    }

    .searchbar{
        display: flex;
        margin-left: auto;
        width: 90%;
        height: 45px;
        margin-bottom: 30px;
    }

    .subtitle{
        font-size: 18px;
        color: var(--accent);
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .filter-column{
        width: 20%;
        padding: 25px 7px;
        overflow-y: auto;
        max-height: calc(100vh - 190px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main-column{
        width: 60%;
        max-height: calc(100vh - 190px);
        padding: 30px 15px;
    }

    .share-column{
        width: 20%;
        padding: 30px 15px;
        overflow-y: scroll;
    }

    .charts-container{
        height: 95%;
        background-color: white;
        border-radius: 25px;
        padding: 15px;
    }
</style>