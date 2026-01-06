export const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^\d.]/g, ''));
};

export const formatCityResource = (cityName) => {
    if (!cityName) return '';
    const formatted = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    return `${cityName.toLowerCase()}.listings${formatted}`;
};

export const filterCalendar = (groupedCalendar, rangePrice, propertyType, metricSelected) => {
    console.log(propertyType);
    if (!groupedCalendar || !rangePrice || rangePrice.length !== 2) return {};

    const [minPrice, maxPrice] = rangePrice;
    const filteredResult = {};

    Object.entries(groupedCalendar).forEach(([listingId, values]) => {
        if ((propertyType === values.property_type) || propertyType === "All"){    
            const monthsArray = values.calendar;
            const filteredMonths = monthsArray.map(([month, entries]) => {
                const validEntries = entries.filter(entry => {
                    const price = parseFloat(entry[1]);
                    // Mesmo filtrando ocupação, geralmente mantemos o filtro de preço do RangeBar
                    return !isNaN(price) && price >= minPrice && price <= maxPrice;
                }).map(entry => {
                    // 3. Retornar apenas o dado necessário para o gráfico
                    if (metricSelected === 'Occupancy Rate') {
                        // Se disponível (true/'t'), ocupação é 0. Se ocupado (false/'f'), ocupação é 1.
                        const isAvailable = entry[0] === 't';
                        return isAvailable ? 0 : 1; 
                    }
                    // Caso contrário, retorna o preço
                    return parseFloat(entry[1]);
                });

                return [month, validEntries];
            }).filter(([month, entries]) => entries.length > 0); 
            if (filteredMonths.length > 0) {
                filteredResult[listingId] = filteredMonths;
            }
        }
    });

    console.log(filteredResult);

    return filteredResult;
}