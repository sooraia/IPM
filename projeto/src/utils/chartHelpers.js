export const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^\d.]/g, ''));
};

export const formatCityResource = (cityName) => {
    if (!cityName) return '';
    const formatted = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    return `${cityName.toLowerCase()}.listings${formatted}`;
};
