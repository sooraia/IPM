import { categorizePropertyType } from '@/utils/groupByCategory.js';

export async function fetchAvailableCities() {
    try {
        const response = await fetch(`http://localhost:3000/cities.cities`);
        const data = await response.json();
        
        const cityCountry = [];
        
        data.forEach(item => { 
            item.available.forEach(obj => {
                if (obj.city && obj.country) {
                    cityCountry.push(`${obj.city}, ${obj.country}`);
                }
            });
        });
        return cityCountry;
    } catch (error) {
        console.error("Erro ao obter cidades", error);
        return [];
    }
}

export function cleanCityName(cityName) {
  if (!cityName || typeof cityName !== 'string') return null;
  return cityName.split(',')[0].trim().replace(' ', '');
}

export async function validateCity(cityName) {
  if (!cityName) return false
  const cityKey = cleanCityName(cityName)
  const availableCities = await fetchAvailableCities()
  for (let city of availableCities) {
    const cityFormatted = cleanCityName(city)
    if (cityFormatted.toLowerCase() === cityKey.toLowerCase()) {
      return true
    }
  }
  return false
}

export async function fetchListingsForCity(cityName) {
  if (!cityName) return []
  const cityKey = cityName.trim().replace('-', '')
  try {
    const key = `${cityKey}.listings`
    const resp = await fetch(`http://localhost:3000/${key}`)
    if (!resp.ok) {
        return []
    }
    else {
        return resp.json()
    }
  } catch (error) {
    console.error("Erro ao carregar listings da cidade:", error)
    return []
  }
  return []
}

export async function fetchCalendarForCity(cityName) {
  if (!cityName) return []
  const cityKey = cityName.trim().replace('-', '')
  try {
    const key = `${cityKey}.calendar`
    const resp = await fetch(`http://localhost:3000/${key}`)
    if (!resp.ok) {
        return []
    }
    else {
        return resp.json()
    }
  } catch (error) {
    console.error("Erro ao carregar calendar da cidade:", error)
    return []
  }
  return []
}

export function processListingsData(listingsData) {
  const numberListings = Object.keys(listingsData).length;
  const hostSet = new Set();
  const hostMap = new Map();
  const propertyTypeMap = new Map();
  let totalRating = 0, totalOccupancy = 0, totalPrice = 0, propert300 = 0, hostOver5 = 0, licensedCount = 0, currency = null;
  const neighborhoodMap = new Map();
  for (let element of Object.values(listingsData)) {
    const {host_id, host_name, host_listings_count, neighbourhood_cleansed: neighborhood, price, estimated_occupancy_l365d: occupancy, review_scores_rating: rating, license } = element;
    if (!hostSet.has(host_id)) {
      hostSet.add(host_id);
      if (host_listings_count >= 5) hostOver5 += 1;
    }
    totalOccupancy += (occupancy * 100) / 365;
    totalRating += (rating || 0);
    if (!currency) currency= price.substring(0,3);
    totalPrice += parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    if (occupancy >= 300) propert300 += 1;

    if (neighborhoodMap.has(neighborhood)) {
      neighborhoodMap.set(neighborhood, neighborhoodMap.get(neighborhood) + 1);
    } else {
      neighborhoodMap.set(neighborhood, 1);
    }

    if (hostMap.has(host_id)) {
      hostMap.get(host_id).count += 1;
    } else {
      hostMap.set(host_id, { name: host_name, count: 1 });
    }
    if (license && license.trim()== "t") {
      licensedCount += 1;
    }
    let propertyType = categorizePropertyType(element.property_type);
    if (propertyTypeMap.has(propertyType)) {
      propertyTypeMap.set(propertyType, propertyTypeMap.get(propertyType) + 1);
    } else {
      propertyTypeMap.set(propertyType, 1);
    }
  }
  const numberHosts= hostSet.size;
  const occupancy= numberListings ? (totalOccupancy / numberListings).toFixed(0) + '%' : '0%';
  const avgRating = numberListings ? (totalRating / numberListings).toFixed(1) : '0';
  const avgPrice = numberListings ? (totalPrice / numberListings).toFixed(0) : '0';
  return {
    numberListings,
    numberHosts,
    hostOver5,
    occupancy,
    avgRating,
    avgPrice,
    currency,
    propert300,
    licensedCount,
    neighborhoodMap,
    hostMap,
    propertyTypeMap
  };
}

export function processCalendarData(calendarData) {
  const priceMap = new Map();
  const availabilityMonthMap = new Map();
  const entriesInMonth = new Map();
  for (let element of Object.values(calendarData)) {
    const { listing_id, date, available, price, id } = element;
    const month = parseInt(date.split('-')[1]);
    const priceValue = (parseFloat(price.substring(3)) || 0);
    if (priceMap.has(month)) {
      const m = priceMap.get(month);
      m.totalPrice += priceValue;
      m.count += 1;
    } else {
      priceMap.set(month, { totalPrice: priceValue, count: 1 });
    }

    if( available === 't' ) {
      if (availabilityMonthMap.has(month)) {
        availabilityMonthMap.set(month, availabilityMonthMap.get(month) + 1);
      } else {
        availabilityMonthMap.set(month, 1);
      }
    }
    if (entriesInMonth.has(month)) {
      entriesInMonth.set(month, entriesInMonth.get(month) + 1);
    } else {
      entriesInMonth.set(month, 1);
    }
  }
  const monthlyOccupancy = new Map();
  for (let [month, data] of availabilityMonthMap.entries()) {
    const totalEntries = entriesInMonth.get(month) || 1;
    const availabilityRate = (data / totalEntries) * 100;
    const occupancyRate = 100 - availabilityRate;
    monthlyOccupancy.set(month, occupancyRate.toFixed(2));
  }
  return { priceMap , monthlyOccupancy };
}