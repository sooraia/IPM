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
            <SearchBar class = "searchbar" :value="cityName" @search="handleSearch"/>
            <slot name="share-content"></slot> 
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import SearchBar from '@/components/SearchBar.vue'

    const props = defineProps({
        chartType: {
            type: String
        }
    })
    const router = useRouter()
    const route = useRoute()
    const cityName = computed(() => route.params.city || '')

    function handleSearch(cityName) {
        router.push({name: 'GraphView', params: { chartType: props.chartType, city: cityName }})
    }

    
</script>

<style scoped>
    .grid-container{
        display: flex;
        width: 100%;
        height: calc(100vh - 245px);
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
        height: calc(100%);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main-column{
        width: 60%;
        height: 100%;
        padding: 30px 15px;
    }

    .share-column{
        width: 20%;
        padding: 30px 15px;
        overflow-y: scroll;
    }

    .charts-container{
        height:95%;
        background-color: white;
        border-radius: 25px;
        padding: 15px;
    }
</style>