<template>
    <main class="layout">
        <section class="left-menu">
            <MenuFilters 
            :maxPrice="maxPrice"
            :currencySymbol="currencySymbol"
            v-model:priceRange="priceRange" 
            v-model:annualOccupancy="annualOccupancy"
            v-model:noLicense="noLicense"
            v-model:isSuperHost="isSuperHost"
            v-model:propertyType="propertyType"
            v-model:ratingScore="ratingScore"
            v-model:roomsData="roomsData"
            v-model:sizeRes="sizeRes"
            v-model:selectedAmenities="selectedAmenities"
            :availableAmenities="availableAmenities"
            :neighborhoodsList="neighborhoods"
            @neighbourhoodSelected="handleNeighbourhoodSelection"
            />
        </section>

        <section class="alojamentos-wrapper">
            <div class="container">
                <h1>{{ cityStore.currentCity }}</h1>
                
                <p style="align-self: flex-start;">Results ({{ filteredListings.length }})</p>
                
                <div style="width: 100%;">
                    <p v-if="loading">A carregar dados...</p>
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
                <ExportData 
                    :show="showExportModal"
                    :filteredCount="filteredListings.length"
                    :totalCount="listings.length"
                    :filters="currentFilters"
                    :maxPrice="maxPrice"
                    @close="showExportModal = false"
                    @download="handleDownload"
                />
                
                <Button 
                    buttonLabel="Export" 
                    :icon="SaveIcon" 
                    id="button-export"
                    @click="showExportModal = true"
                />
                
            </div>
        </section>
        <section class="map">
            <MapAlojamentos :markers="markers" :cityName="cityStore.currentCity" :key="markers.length"/>
        </section>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCityStore } from '@/stores/city';
import { useRoute } from 'vue-router';
import { useListingsStore } from '@/stores/listings';
import { parsePrice } from '@/utils/chartHelpers';
import CardAlojamento from '@/components/CardAlojamento.vue';
import MenuFilters from '@/components/MenuFilters.vue';
import MapAlojamentos from '@/components/MapAlojamentos.vue';
import Button from '@/components/Button.vue';
import Pagination from '@/components/Pagination.vue';
import SaveIcon from '@/assets/Export.png';
import { categorizePropertyType, getNeighborhoodsList } from '@/utils/groupByCategory';
import { groupAmenities } from '@/utils/amenitiesHelper';
import ExportData from '@/components/Messages/exportData.vue';
import { getCurrencySymbol } from '@/utils/currencySymbol';

const cityStore = useCityStore();
const route = useRoute();

function updateCityFromRoute() {
  const p = route.params.city ?? route.query.city;
  if (p) {
    const city = Array.isArray(p) ? p[0] : p;
    cityStore.setCity(city);
  }
}

const listingsStore = useListingsStore();
const { listings, loading } = storeToRefs(listingsStore);

const maxPrice = ref(1500);
const priceRange = ref([0, 1500]);
const annualOccupancy = ref([0, 365]);
const noLicense = ref(false);
const isSuperHost = ref(false);
const propertyType = ref('All');
const ratingScore = ref(0);
const roomsData = ref({ accommodates: 0, bedrooms: 0, beds: 0, bathrooms: 0 });
const sizeRes = ref('Entire City');
const selectedAmenities = ref([]);
const showExportModal = ref(false);

const currencySymbol = computed(() => getCurrencySymbol(listings.value));

const neighborhood = ref("");
function handleNeighbourhoodSelection(newNeighbourhood) {
   if (neighborhoods.value.includes(newNeighbourhood)) {
       neighborhood.value = newNeighbourhood;
       sizeRes.value = "Neighbourhood";
   } else {
       sizeRes.value = 'Entire City';
   }
}

const currentFilters = computed(() => ({
    priceRange: priceRange.value,
    annualOccupancy: annualOccupancy.value,
    noLicense: noLicense.value,
    isSuperHost: isSuperHost.value,
    propertyType: propertyType.value,
    ratingScore: ratingScore.value,
    roomsData: roomsData.value,
    selectedAmenities: selectedAmenities.value,
}));

function handleDownload(options) {
    const dataToExport = filteredListings.value;
    
    if (options.format === 'csv') {
        exportToCSV(dataToExport, options.fields);
    } else {
        exportToJSON(dataToExport, options.fields);
    }
}
function exportToCSV(data, fields) {
    const rows = data.map(item => {
        return fields.map(field => {
            let value = item[field] !== undefined ? item[field] : '';
            return `"${value}"`;
        }).join(',');
    }).join('\n');
    
    const csv = `${fields.join(',')}\n${rows}`;
    downloadFile(csv, `listings_${cityStore.currentCity}_${Date.now()}.csv`, 'text/csv');
}

function exportToJSON(data, fields) {
    const filteredData = data.map(item => {
        const filtered = {};
        fields.forEach(field => {
            if (item[field] !== undefined) {
                filtered[field] = item[field];
            }
        });
        return filtered;
    });
    
    const json = JSON.stringify(filteredData, null, 2);
    downloadFile(json, `listings_${cityStore.currentCity}_${Date.now()}.json`, 'application/json');
}

function downloadFile(content, filename, mimeType) { // funcao pre definida para o browser entender
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

const neighborhoods = computed(() => {
  console.log('Listings for neighborhoods computation:', listings.value);
  const result = getNeighborhoodsList(listings.value);
  console.log('getNeighborhoodsList result:', result);
  return result;
});

function getListingGroupedAmenities(listing) {
    if (!listing.amenities) return [];
    
    try {
        let amenitiesList;
        if (typeof listing.amenities === 'string') {
            amenitiesList = JSON.parse(listing.amenities);
        } else if (Array.isArray(listing.amenities)) {
            amenitiesList = listing.amenities;
        } else {
            return [];
        }
        
        return groupAmenities(amenitiesList);
    } catch (e) {
        console.error('Error parsing amenities for listing:', listing.id, e);
        return [];
    }
}

const availableAmenities = computed(() => {
    const amenityCount = {}; // contar quantas tem depois de agrupar

    listings.value.forEach(listing => {
        const groupedAmenities = getListingGroupedAmenities(listing);
        groupedAmenities.forEach(amenity => {
            amenityCount[amenity] = (amenityCount[amenity] || 0) + 1;
        });
    });
    return Object.keys(amenityCount) // ter apenas 40 no total para nao poluir
        .sort((a, b) => amenityCount[b] - amenityCount[a])
        .slice(0, 40);
});

const currentPage = ref(1);
const itemsPerPage = 13;

const filteredListings = computed(() => {
    return listings.value.filter(listing => {
        const price = parsePrice(listing.price);
        if (price < priceRange.value[0] || price > priceRange.value[1]) {
            return false;
        }

        const occupancy = listing.estimated_occupancy_l365d;
        if (occupancy < annualOccupancy.value[0] || occupancy > annualOccupancy.value[1]) {
            return false;
        }

        if (noLicense.value) {
            if (listing.license === 't') {
                return false;
            }
        }

        if (isSuperHost.value) {
            if (listing.host_is_superhost !== 't') {
                return false;
            }
        }

        if (propertyType.value !== 'All') {
            const category = categorizePropertyType(listing.property_type);
            if (category !== propertyType.value) {
                return false;
            }
        }

        if (ratingScore.value > 0) {
            const rating = Math.round(listing.review_scores_rating);
            if (rating !== ratingScore.value) {
                return false;
            }
        }

        if (roomsData.value.accommodates > 0) {
            if (listing.accommodates < roomsData.value.accommodates) {
                return false;
            }
        }
        if (roomsData.value.bedrooms > 0) {
            if (listing.bedrooms < roomsData.value.bedrooms) {
                return false;
            }
        }
        if (roomsData.value.beds > 0) {
            if (listing.beds < roomsData.value.beds) {
                return false;
            }
        }
        if (roomsData.value.bathrooms > 0) {
            if (listing.bathrooms < roomsData.value.bathrooms) {
                return false;
            }
        }
        if (selectedAmenities.value.length > 0) {
            const groupedListingAmenities = getListingGroupedAmenities(listing);
            const hasAllAmenities = selectedAmenities.value.every(amenity => 
                groupedListingAmenities.includes(amenity)
            );
            if (!hasAllAmenities) {
                return false;
            }
        }
        if (sizeRes.value === 'Neighbourhood' && neighborhood.value) {
            if (listing.neighbourhood_cleansed !== neighborhood.value) {
                return false;
            }
        }
        return true;
    });
});

const totalPages = computed(() => {
    return Math.ceil(filteredListings.value.length / itemsPerPage);
});

const paginatedAlojamentos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredListings.value.slice(start, end);
});

onMounted(async () => {
    updateCityFromRoute();

    await listingsStore.fetchListings();
    if (listings.value.length > 0) {
        const prices = listings.value.map(item => parsePrice(item.price));
        const cityMax = Math.max(...prices);
        maxPrice.value = cityMax;
        priceRange.value = [0, cityMax];
    }

    currentPage.value = 1;
});

const markers = computed(() => {
    const filtered = filteredListings.value.map(aloj => {
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
    return filtered;
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
    overflow-x: visible;
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


