export function getCurrencySymbol(listings) {
    if (!listings || listings.length === 0) return '';
    
    const firstPrice = listings[0]?.price || '';
    const currencyCode = firstPrice.substring(0, 3);
    
    const currencyMap = {
        'EUR': '€',
        'USD': '$',
        'ZAR': 'R',
        'JPY': '¥'
    };
    
    return currencyMap[currencyCode] || currencyCode;
}