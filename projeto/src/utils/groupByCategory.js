import { filterListings } from '@/utils/chartFilters';
import { formatListings } from '@/utils/chartHelpers';
import { parsePrice } from '@/utils/chartHelpers';

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

export const categorizeNumberOfReviews = (n_reviews) => {
    let category = "15+ Reviews/mo"
    if (n_reviews === 0){
        category = 'No reviews';
    } else if (n_reviews < 1){
        category = '< 1 Review/mo';
    } else if (n_reviews >= 1 && n_reviews < 2){
        category = '1 - 2 Reviews/mo';
    } else if (n_reviews >= 2 && n_reviews < 5){
        category = '2 - 5 Reviews/mo';
    } else if (n_reviews >= 5 && n_reviews < 10){
        category = '5 - 10 Reviews/mo';
    } else if (n_reviews >= 10 && n_reviews < 15){
        category = '10 - 15 Reviews/mo';
    }
    return category;
};

export const groupDataByCategory = (cleaned, metricSelected) => {
    const counts = {}
    Object.entries(cleaned).forEach(([listingId, listingData]) => {
        let category = 'Other';
        if (metricSelected === "Property Type") {
            category = listingData.property_type;
        } else if (metricSelected === "Reviews") {
            const n_reviews = listingData.number_of_reviews || 0;
            category = categorizeNumberOfReviews(n_reviews);
        } else if (metricSelected === "Host Type") {
            category = listingData.host_is_superhost;
        } else if (metricSelected === "License Status") {
            category = listingData.license;
        }
        counts[category] = (counts[category] || 0) + 1;
    });
    return {
        labels: Object.keys(counts),
        data: Object.values(counts)
    }
};

export const groupByNeighborhoodsByNListings = (data) => {
    const dataGrouped = {};
    Object.entries(data).forEach(([listingId, listingData]) => {
        const neighborhood = listingData.neighborhood;
        if (!dataGrouped[neighborhood]) {
            dataGrouped[neighborhood] = 0;
        }
        dataGrouped[neighborhood] += 1;
    });

    const res = {};
    Object.entries(dataGrouped).forEach(([neighborhood, count]) => {
        if (count >= 5) {
            res[neighborhood] = count;
        } else {
            res['Other'] = (res['Other'] || 0) + count;
        }
    });

    return res;
};

export const getNeighborhoodsList = (data) => {
    const neighborhoodsSet = new Set();
    if (Array.isArray(data)) {
        data.forEach((listing, index) => {
            const neighborhood = listing.neighbourhood_cleansed;
            if (neighborhood && typeof neighborhood === 'string') {
                neighborhoodsSet.add(neighborhood.trim());
            }
        });
    } 
    else{
        Object.entries(data).forEach(([listingId, listingData]) => {
            const neighborhood = listingData.neighborhood;
            neighborhoodsSet.add(neighborhood);
        });
    }
    return Array.from(neighborhoodsSet).sort();
}

export const groupByNeighborhoodsByAvgPrice = (data) => {
    const dataGrouped = {};
    const counts = {};

    Object.entries(data).forEach(([listingId, listingData]) => {
        const neighborhood = listingData.neighborhood;
        const price = listingData.price;
        if (!dataGrouped[neighborhood]) {
            dataGrouped[neighborhood] = 0;
            counts[neighborhood] = 0;
        }
        dataGrouped[neighborhood] += price;
        counts[neighborhood] += 1;
    });

    const res = {};
    let otherScoreSum = 0;
    let otherCount = 0;
    for (const neighborhood in dataGrouped) {
        const avgScore = (dataGrouped[neighborhood] / counts[neighborhood]).toFixed(2);
        if (counts[neighborhood] < 5) {
            otherScoreSum += parseFloat(avgScore);
            otherCount += 1;
        } else {
            res[neighborhood] = avgScore;
        }
    }

    if (otherCount > 0) {
        res['Other'] = (otherScoreSum / otherCount).toFixed(2);
    }

    return res;
}

export const groupByNeighborhoodsByAvgReviewScore = (data) => {
    const dataGrouped = {};
    const counts = {};
    const res = {};

    Object.entries(data).forEach(([listingId, listingData]) => {
        const neighborhood = listingData.neighborhood;
        const reviewScore = listingData.reviews_score || 0;
        if (!dataGrouped[neighborhood]) {
            dataGrouped[neighborhood] = 0;
            counts[neighborhood] = 0;
        }
        dataGrouped[neighborhood] += reviewScore;
        counts[neighborhood] += 1;
    });

    let otherScoreSum = 0;
    let otherCount = 0;
    for (const neighborhood in dataGrouped) {
        const avgScore = (dataGrouped[neighborhood] / counts[neighborhood]).toFixed(2);
        if (counts[neighborhood] < 5) {
            otherScoreSum += parseFloat(avgScore);
            otherCount += 1;
        } else {
            res[neighborhood] = avgScore;
        }
    }

    if (otherCount > 0) {
        res['Other'] = (otherScoreSum / otherCount).toFixed(2);
    }

    return res;
}

export const groupByNeighborhoodsByLicenseStatus = (data) => {
    const dataGrouped = {'Licensed': 0, 'Unlicensed': 0};
    Object.entries(data).forEach(([listingId, listingData]) => {
        const license = listingData.license;
        dataGrouped[license] += 1;
    });

    return dataGrouped;
};

export const groupedCalendarByWeek = (groupedCalendar) => {
    if (!groupedCalendar || typeof groupedCalendar !== 'object' || Object.keys(groupedCalendar).length === 0) {
        return {};
    }
    const temp = {};
    Object.values(groupedCalendar).forEach((item) => {
        if (!item || !item.calendar_data || typeof item.calendar_data !== 'object') return;

        Object.entries(item.calendar_data).forEach(([month, entries]) => {
            if (!temp[month]) temp[month] = [];
            entries.forEach((entry, index) => {
                const value = entry.price || 0;
                if (!temp[month][index]) {
                    temp[month][index] = [0, 0, 0]; // [sum, count, availableCount]
                }
                temp[month][index][0] += value;
                temp[month][index][1] += 1;
                temp[month][index][2] += parseInt(entry.available);
            });
        });
    });

    const result = {};
    Object.entries(temp).forEach(([month, weeksArray]) => {
        result[month] = weeksArray.map(([sum, count, availability]) => {
            return [count > 0 ? parseFloat((sum / count).toFixed(2)) : 0, parseFloat(((availability/count)*100).toFixed(2))];
        });
    });

    return result; 
};

export const groupedCalendarByMonth = (groupedCalendarByWeek) => {
    if (!groupedCalendarByWeek || typeof groupedCalendarByWeek !== 'object') return {};

    const result = {};
    Object.entries(groupedCalendarByWeek).forEach(([month, weeksArray]) => {
        let totalCount = 0;
        let totalSum = 0;
        let totalOccupancy = 0;
        for (const [value, occupancy] of weeksArray){
            totalSum += value;
            totalCount += 1;
            totalOccupancy += parseFloat(occupancy);
        }
        result[month] = [parseFloat((totalSum / totalCount).toFixed(2)), parseFloat((totalOccupancy / totalCount).toFixed(2))];
    });
    return result;  
};

export const groupedCalendarByQuart = (groupedCalendarByMonth) => {
    if (!groupedCalendarByMonth || typeof groupedCalendarByMonth !== 'object') return {};
    
    const temp = {
        'Jan - Mar': [0, 0, 0], 
        'Apr - Jun': [0, 0, 0], 
        'Jul - Sep': [0, 0, 0], 
        'Oct - Dec': [0, 0, 0]
    };

    const quarterMap = {
        'Jan': 'Jan - Mar', 'Feb': 'Jan - Mar', 'Mar': 'Jan - Mar',
        'Apr': 'Apr - Jun', 'May': 'Apr - Jun', 'Jun': 'Apr - Jun',
        'Jul': 'Jul - Sep', 'Aug': 'Jul - Sep', 'Sep': 'Jul - Sep',
        'Oct': 'Oct - Dec', 'Nov': 'Oct - Dec', 'Dec': 'Oct - Dec'
    };

    Object.entries(groupedCalendarByMonth).forEach(([month, monthData]) => {
        const quart = quarterMap[month];
        const [price, occupancy] = monthData;
        
        temp[quart][0] += price;
        temp[quart][1] += occupancy;
        temp[quart][2] += 1;
    });

    const result = {};

    Object.entries(temp).forEach(([quart, [sumPrice, sumOccupancy, monthCount]]) => {
        result[quart] = [
            parseFloat((parseFloat(sumPrice) / parseFloat(monthCount)).toFixed(2)),
            parseFloat((parseFloat(sumOccupancy) / parseFloat(monthCount)).toFixed(2))
        ];
    });

    return result; 
};