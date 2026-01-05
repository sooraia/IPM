export const groupDataByPopertyType = (dataCleaned, priceRange) => {
    const counts = {};
    const min = priceRange[0];
    const max = priceRange[1];

    for (const id in dataCleaned) {
        const price = dataCleaned[id][1];
        if (price <= max && price >= min) {
            const categoria = dataCleaned[id][0];
            const categoria_str = categoria.split(" ");
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
            
            counts[category] = (counts[category] || 0) + 1;
        }
    };
    return {
        labels: Object.keys(counts),
        data: Object.values(counts)
    }
};

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
