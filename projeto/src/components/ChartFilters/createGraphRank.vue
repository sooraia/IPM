<template>
    <chartViewLayout>
        <template #filters>
            <RankingFilters 
                v-model:metricsValue="metricSelected" 
                v-model:n_rowsValue="n_rows"
                v-model:propertyTypeSelected="propertyType"
                v-model:priceValue="priceRange"  
                v-model:dateRange="dateRange"
            />
        </template>

        <template #chart>
            <div class="charts-container">
                <BarChart 
                    :key="metricSelected + n_rows + propertyType + priceRange[0] + priceRange[1]"
                    style="width: 100%; height: 100%;"
                    :labels="labelsR"
                    :data="dataBC"
                    :label="metricSelected"
                    :barcolors="rgba(242, 144, 47, 1)"
                    :horizontal="true"
                />
            </div>
        </template>
        
        <template #share-content>
            <p id = "share-title">Top Neighbour hoods by {{metricSelected}}</p>
            <p id = "share-text">Horizontal bar chart showing the number of listings in each neighborhood, sorted in descending order.</p>
            <ButtonsShare/>
        </template>
    </chartViewLayout>
</template>


<script setup>
import { ref, computed } from 'vue'
import RankingFilters from '@/components/ChartFilters/RankingFilters.vue'
import BarChart from '@/components/Charts/BarChart.vue'
import ButtonsShare from '../SideBar/3ButtonsShare.vue'
import chartViewLayout from './chartViewLayout.vue'

const metricSelected = ref('Number of Listings')
const n_rows = ref(10)
const propertyType = ref('Entire Home') 
const priceRange = ref([0, 1500])
const dateRange = ref([,])

const allData = [
    { neighborhood: 'Alfama', listings: 150, price: 95 },
    { neighborhood: 'Bairro Alto', listings: 120, price: 110 },
    { neighborhood: 'Belém', listings: 80, price: 130 },
    { neighborhood: 'Graça', listings: 110, price: 85 },
    { neighborhood: 'Chiado', listings: 90, price: 150 },
]

// Lógica de filtragem reativa
const filteredRankingData = computed(() => {
    let data = [...allData];

    // Aplica o filtro de preço que vem do RankingFilters
    data = data.filter(item => item.price >= priceRange.value[0] && item.price <= priceRange.value[1]);

    if (metricSelected.value === 'Number of Listings') {
        data.sort((a, b) => b.listings - a.listings);
    } else if (metricSelected.value === 'Average Price per Night') {
        data.sort((a, b) => b.price - a.price);
    }
    return data.slice(0, n_rows.value);
});

// Estas são as variáveis que o gráfico procura
const labelsR = computed(() => filteredRankingData.value.map(d => d.neighborhood));

const dataBC = computed(() => {
    if (metricSelected.value === 'Number of Listings') {
        return filteredRankingData.value.map(d => d.listings);
    } 
    return filteredRankingData.value.map(d => d.price);
});

</script>


<style scoped>
    .subtitle{
        font-size: 18px;
        color: var(--accent);
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .charts-container{
        height: 95%;
        background-color: white;
        border-radius: 25px;
        padding: 15px;
    }

    #share-title{
        font-weight: 700;
        font-size: 50PX;
        margin-left: 20px;
    }

    #share-text{
        font-weight: normal;
        margin: 10px 40px 15px 15px;
        color: rgba(120, 120, 120, 1);
    }

</style>