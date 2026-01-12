export const filterListings = (data, filters) => {
    const [minPrice, maxPrice] = filters.priceRange;
    const property_type = filters.propertyType;
    const neighborhood = filters.neighborhood;
    const filteredData = {};

    Object.entries(data).forEach(([listingId, listingData]) => {
        let keep = true;
        const price = listingData.price;

        // Filtro de preço
        if (!isNaN(price) && (price < minPrice || price > maxPrice))
            keep = false;
        // Filtro de tipo de propriedade
        if (property_type && property_type !== "All" && listingData.property_type !== property_type) 
            keep = false;
        // Filtro de bairro
        if (neighborhood && neighborhood !== "Entire City") {
            if (listingData.neighborhood !== neighborhood) 
                keep = false;
        }

        if (keep) {
            filteredData[listingId] = listingData;
        }
    });
    return filteredData;
}

export const filterCalendar = (groupedCalendar, rangePrice, propertyType, neighborhood) => {
    console.log(neighborhood);
    const [minPrice, maxPrice] = rangePrice;
    const filteredResult = {};

    Object.entries(groupedCalendar).forEach(([listingId, listingData]) => {
        if (propertyType && propertyType !== "All" && listingData.property_type !== propertyType) {
            return;
        }
        if (neighborhood && neighborhood !== "Entire City" && listingData.neighborhood !== neighborhood) {
            return;
        }

        const filteredCalendarData = {};
        Object.entries(listingData.calendar_data).forEach(([month, entries]) => {
            const validEntries = entries.filter(entry => {
                const price = entry.price;
                return price >= minPrice && price <= maxPrice;
            });
            if (validEntries.length > 0) {
                filteredCalendarData[month] = validEntries;
            }
        });

        if (Object.keys(filteredCalendarData).length > 0) {
            filteredResult[listingId] = {
                property_type: listingData.property_type,
                calendar_data: filteredCalendarData
            };
        }
    });

    return filteredResult;
}
