export const categorizePropertyType = (propertyTypeString) => {
    const categoria_str = propertyTypeString.split(" ");
    let category = 'Other';
    if (categoria_str[0] === "Hotel" || categoria_str[2] === "hotel"){
        category = 'Hotel Room';
    } else if (categoria_str[0] === "Entire" || categoria_str[0] === "Home" || categoria_str[1] === "home"){
        category = 'Entire Home';
    } else if ((categoria_str[0] === "Private" && categoria_str[1] === "room") || (categoria_str[0] === "Room")){
        category = 'Private Room';
    } else if (categoria_str[0] === "Shared" && categoria_str[1] === "room"){
        category = 'Shared Room';
    }
    return category;
};

export const groupDataByPopertyType = (dataCleaned, priceRange) => {
    const counts = {};
    const min = priceRange[0];
    const max = priceRange[1];

    for (const id in dataCleaned) {
        const price = dataCleaned[id][1];
        if (price <= max && price >= min) {
            const categoria = dataCleaned[id][0];
            const category = categorizePropertyType(categoria);
            counts[category] = (counts[category] || 0) + 1;
        }
    };
    return {
        labels: Object.keys(counts),
        data: Object.values(counts)
    }
};

export const propertyTypeGrouped = (propertyTypeStr) => {
    const propertyType = propertyTypeStr.split(" ");
    let category = 'Other';
    if (propertyType[0] === "Hotel" || propertyType[2] === "hotel"){
        category = 'Hotel Room';
    } else if (propertyType[0] === "Entire" || propertyType[0] === "Home" || propertyType[1] === "home"){
        category = 'Entire Home';
    } else if ((propertyType[0] === "Private" && propertyType[1] === "room") || (propertyType[0] === "Room")){
        category = 'Private Room';
    } else if (propertyType[0] === "Shared" && propertyType[1] === "room"){
        category = 'Shared Room';
    } 
    return category;
}

export const groupDataByReviewsPerMonth = (dataCleaned, priceRange) => {
    const counts = {};
    const min = priceRange[0];
    const max = priceRange[1];


    for (const id in dataCleaned) {
        const price = dataCleaned[id][1];
        if (price <= max && price >= min) {
            const categoria = dataCleaned[id][0];
            let category = "15+ Reviews/mo"
            if (categoria === 0){
                category = 'No reviews';
            } else if (categoria < 1){
                category = '< 1 Review/mo';
            } else if (categoria >= 1 && categoria < 2){
                category = '1 - 2 Reviews/mo';
            } else if (categoria >= 2 && categoria < 5){
                category = '2 - 5 Reviews/mo';
            } else if (categoria >= 5 && categoria < 10){
                category = '5 - 10 Reviews/mo';
            } else if (categoria >= 10 && categoria < 15){
                category = '10 - 15 Reviews/mo';
            } 
            
            counts[category] = (counts[category] || 0) + 1;
        }
    };
    return {
        labels: Object.keys(counts),
        data: Object.values(counts)
    }
};

export const groupDataByCategory = (cleaned, priceRange) => {
    const [min, max] = priceRange;
    const counts = {}
    for (const id in cleaned) {
        const [category, price] = cleaned[id];
        if (price >= min && price <= max) {
            counts[category] = (counts[category] || 0) + 1;
        }
    }
    return {
        labels: Object.keys(counts),
        data: Object.values(counts)
    };
};


import { parsePrice } from '@/utils/chartHelpers';

export const groupAllCalendarsById = (calendarList, listings) => {
    const monthMap = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };
    const finalStructure = {};
    const propertyTypeByIdList = {};
    for (const item of listings) {
        const id = item.id;
        propertyTypeByIdList[id] = propertyTypeGrouped(item.property_type);
    }

    for (const item of calendarList) {
        const id = item.listing_id;
        const dateParts = item.date.split('-');
        const monthName = monthMap[dateParts[1]];
        const price = parsePrice(item.price);

        if (!finalStructure[id]) {
            finalStructure[id] = { 
                property_type: propertyTypeByIdList[id], 
                calendar: {
                    Jan: [], Feb: [], Mar: [], Apr: [], May: [], Jun: [],
                    Jul: [], Aug: [], Sep: [], Oct: [], Nov: [], Dec: []
                }
            };
        }
        finalStructure[id].calendar[monthName].push([item.available, price]);
    }

    const cleanedStructure = {};
    for (const id in finalStructure) {
        const calendarArray = Object.entries(finalStructure[id].calendar).filter(([_, entries]) => entries.length > 0);
        
        cleanedStructure[id] = {
            property_type: finalStructure[id].property_type,
            calendar: calendarArray
        };
    }

    return cleanedStructure;
};