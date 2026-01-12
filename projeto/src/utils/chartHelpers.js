import {categorizePropertyType} from './groupByCategory.js';
import {getCurrencySymbol} from './currencySymbol.js';

export const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^\d.]/g, ''));
};

export const formatListings = (listingsData) => {
    const dataCleaned = {};
    let maxPrice = 0;

    listingsData.forEach((listing) => {
        const id = listing.id;
        dataCleaned[id] = {};
        dataCleaned[id].property_type = categorizePropertyType(listing.property_type);
        dataCleaned[id].price = parsePrice(listing.price);
        if (dataCleaned[id].price > maxPrice) {
            maxPrice = dataCleaned[id].price;
        }
        dataCleaned[id].license = listing.license === 't' ? 'Licensed' : 'Unlicensed';
        dataCleaned[id].host_is_superhost = listing.host_is_superhost === 't' ? 'Superhost' : 'Not Superhost';
        dataCleaned[id].neighborhood = listing.neighbourhood_cleansed;
        dataCleaned[id].number_of_reviews = listing.reviews_per_month;
        dataCleaned[id].reviews_score = listing.review_scores_rating;
    });
    const currencySymbol = getCurrencySymbol(listingsData);
    return {'data': dataCleaned, 'maxPrice': maxPrice, 'currencySymbol': currencySymbol};
};

export const formatCalendar = (calendarList, listings) => {
    const monthMap = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };
    const finalStructure = {};
    let maxPrice = 0;

    for (const item of calendarList) {
        const id = item.listing_id;
        const dateParts = item.date.split('-');
        const monthName = monthMap[dateParts[1]];
        const price = parsePrice(item.price);

        if (price > maxPrice) maxPrice = price;
        if (!finalStructure[id]) {
            finalStructure[id] = { 
                property_type: listings[id] ? listings[id].property_type : 'Other', 
                neighborhood: listings[id] ? listings[id].neighborhood : 'Unknown',
                calendar_data: {
                    Jan: [], Feb: [], Mar: [], Apr: [], May: [], Jun: [],
                    Jul: [], Aug: [], Sep: [], Oct: [], Nov: [], Dec: []
                }
            };
        }
        finalStructure[id].calendar_data[monthName].push({
            'available': item.available === 't' ? 1 : 0, 
            'price' : price
        });
    
    }
    return {'calendar_data': finalStructure, 'maxPrice': maxPrice};
};

export function chartConfigsFormat(configData) {
    if (!configData || !Array.isArray(configData)) return [];
    return configData.map(config => {
        return {
            name: config.name,
            chart_type: config.chartType,
            city: config.city,
            parameters: config.filters
        };
    });
}