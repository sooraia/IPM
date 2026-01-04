<template>
    <main class="layout">
        <section class="left-menu">
            <MenuFilters />
        </section>

        <section class="alojamentos-wrapper">
            <div class="container">
                <h1>{{ cityStore.currentCity }}</h1>
                
                <p style="align-self: flex-start;">Results ({{ alojamentos.length }})</p>
                
                <div style="width: 100%;">
                    <p v-if="loading">A carregar dados...</p>
                    <p v-else-if="alojamentos.length === 0">Não foram encontrados alojamentos nesta cidade.</p>

                    <CardAlojamento 
                        v-for="casa in paginatedAlojamentos" 
                        :key="casa.id"
                        :nomeAlojamento="casa.name" 
                        :avaliacaoAlojamento="casa.review_scores_rating" 
                    />
                </div>

                <Pagination 
                    v-model="currentPage"
                    :totalPages="totalPages"
                />
                <Button v-if="alojamentos.length > 0" buttonLabel="Export" :icon="SaveIcon" id="button-export" />
            </div>
        </section>

        <section class="map" v-if="alojamentos.length > 0">
            <MapAlojamentos  :markers="markers" />
        </section>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCityStore } from '@/stores/city';
import { useListingsStore } from '@/stores/listings';
import CardAlojamento from '@/components/CardAlojamento.vue';
import MenuFilters from '@/components/MenuFilters.vue';
import MapAlojamentos from '@/components/MapAlojamentos.vue';
import Button from '@/components/Button.vue';
import Pagination from '@/components/Pagination.vue';
import SaveIcon from '@/assets/Export.png';

const cityStore = useCityStore();
const listingsStore = useListingsStore();
const { listings: alojamentos, loading } = storeToRefs(listingsStore);

const currentPage = ref(1);
const itemsPerPage = 13;

const totalPages = computed(() => {
    return Math.ceil(alojamentos.value.length / itemsPerPage);
});

const paginatedAlojamentos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return alojamentos.value.slice(start, end);
});

onMounted(() => {
    listingsStore.fetchListings();
    currentPage.value = 1;
});

const markers = computed(() => {
    return alojamentos.value.map(aloj => {
        return {
            latitude: aloj.latitude,
            longitude: aloj.longitude,
            estimated_occupancy: aloj.estimated_occupancy_l365d,
            infoContent: `
            <div style="padding: 10px; gap:5px; border-radius: 8px; width: 140px; heigth: 170px; display: flex; flex-direction: column; align-items: center;">
                <div style="display: flex; flex-direction:column; gap:5px; align-items: center;">
                    <h3 style="color: #002837;">${aloj.review_scores_rating}</h3>
                    <p style="color: #002837; font-weight: 400; font-size: 14px;">${aloj.name}</p>
                </div>
                <p style="display: flex; justify-content: end; width: 100%; font-size:10px; font-weight: 400;"> ${aloj.price}</p>
                <button onclick="window.open('${aloj.listing_url}', '_blank')" style="padding: 8px 16px; background-color: #256881; color: white; border:2px solid #002837; border-radius: 10px; cursor: pointer;">Ver anuncio</button>
            </div>
        `
        };
    });
});
</script>

<style scoped>

.layout {
    display: flex;
    flex-direction: row;
    max-height: calc(100vh - 190px);
}

.left-menu {
    width: 16%;
    overflow-y: auto;
    scroll-behavior: smooth;
}

.alojamentos-wrapper {
    width: 42%;
}

.container {
    width: 90%;
    margin: 10px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#button-export {
    align-self: flex-end;
    background: var(--light-accent2);
    color: white;
    cursor: pointer;
}

.map {
    width: 42%;
}
</style>


