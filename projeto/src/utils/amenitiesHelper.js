export function groupAmenities(amenitiesList) {
    const amenityGroups = {
        'TV': ['tv', 'television', 'inch tv', 'hdtv', 'inch hdtv'],
        'Wifi': ['wifi', 'wi-fi', 'internet', 'wireless', 'fast wifi'],
        'Sound system': ['sound system', 'bluetooth', 'speakers', 'record player'],
        'Kitchen': ['kitchen', 'kitchenette'],
        'Refrigerator': ['refrigerator', 'fridge', 'freezer'],
        'Microwave': ['microwave'],
        'Dishwasher': ['dishwasher'],
        'Coffee maker': ['coffee maker', 'coffee machine', 'nespresso', 'espresso'],
        'Stove': ['stove', 'gas stove', 'electric stove', 'cooktop'],
        'Oven': ['oven'],
        'Cooking basics': ['cooking basics', 'dishes and silverware', 'wine glasses', 'baking sheet'],
        'Dining table': ['dining table', 'dining area'],
        'Toaster': ['toaster'],
        'Blender': ['blender', 'food processor'],
        'Kettle': ['kettle', 'hot water kettle'],
        'Rice maker': ['rice maker'],
        'Trash compactor': ['trash compactor'],
        'Air conditioning': ['air conditioning', 'ac ', 'cooling', 'ac -'],
        'Heating': ['heating', 'heater', 'central heating', 'radiant heating'],
        'Washer': ['washer', 'washing machine', 'free washer', 'paid washer'],
        'Dryer': ['dryer', 'drying machine', 'free dryer', 'paid dryer'],
        'Drying rack': ['drying rack'],
        'Hair dryer': ['hair dryer', 'hairdryer', 'blow dryer'],
        'Bathtub': ['bathtub', 'bath tub'],
        'Shampoo': ['shampoo'],
        'Body soap': ['body soap', 'soap', 'shower gel'],
        'Conditioner': ['conditioner'],
        'Hot water': ['hot water'],
        'Bidet': ['bidet'],
        'Essentials': ['essentials', 'towels', 'bed sheets', 'toilet paper', 'bed linens'],
        'Hangers': ['hangers'],
        'Clothing storage': ['clothing storage', 'closet', 'dresser', 'wardrobe', 'walk-in closet'],
        'Extra pillows and blankets': ['extra pillows', 'pillows and blankets'],
        'Iron': ['iron', 'ironing board'],
        'Patio or balcony': ['patio', 'balcony', 'terrace', 'private patio', 'shared patio'],
        'Garden': ['garden', 'backyard', 'yard'],
        'Outdoor furniture': ['outdoor furniture', 'sun loungers'],
        'BBQ grill': ['bbq', 'grill', 'barbecue'],
        'Beach access': ['beach access', 'beachfront', 'beach essentials'],
        'Pool': ['pool', 'swimming pool', 'shared pool', 'private pool', 'shared outdoor pool'],
        'Hot tub': ['hot tub', 'jacuzzi'],
        'City view': ['city view', 'city skyline'],
        'Ocean view': ['ocean view', 'sea view', 'waterfront'],
        'Mountain view': ['mountain view'],
        'Lake view': ['lake'],
        'River view': ['river view'],
        'Park view': ['park view'],
        'Garden view': ['garden view'],
        'Valley view': ['valley view'],
        'Courtyard view': ['courtyard view'],
        'Smoke alarm': ['smoke alarm', 'smoke detector'],
        'Carbon monoxide alarm': ['carbon monoxide alarm', 'co alarm'],
        'Fire extinguisher': ['fire extinguisher'],
        'First aid kit': ['first aid kit'],
        'Security cameras': ['security cameras', 'exterior security cameras'],
        'Safe': ['safe'],
        'Lock on bedroom door': ['lock on bedroom door'],
        'Self check-in': ['self check-in', 'lockbox', 'keypad'],
        'Elevator': ['elevator', 'lift'],
        'Free parking': ['free parking', 'free street parking', 'free residential garage', 'parking on premises'],
        'Paid parking': ['paid parking', 'paid parking off premises', 'paid street parking'],
        'Private entrance': ['private entrance'],
        'Single level home': ['single level home'],
        'Workspace': ['workspace', 'dedicated workspace', 'desk'],
        'Fast wifi': ['fast wifi', 'ethernet'],
        'Crib': ['crib', 'baby cot', 'pack \'n play', 'travel crib'],
        'High chair': ['high chair'],
        'Baby safety gates': ['baby safety gates', 'table corner guards'],
        'Children\'s items': ['children\'s books', 'children\'s dinnerware', 'baby bath', 'changing table'],
        'Babysitter recommendations': ['babysitter'],
        'Gym': ['gym', 'fitness', 'exercise', 'private gym'],
        'Bikes': ['bikes', 'bicycle'],
        'Board games': ['board games', 'games'],
        'Books': ['books', 'reading material'],
        'Luggage dropoff': ['luggage dropoff'],
        'Long term stays allowed': ['long term stays'],
        'Pets allowed': ['pets allowed'],
        'Smoking allowed': ['smoking allowed'],
        'Host greets you': ['host greets you'],
        'Cleaning available': ['cleaning available'],
        'Indoor fireplace': ['fireplace', 'indoor fireplace'],
        'Hammock': ['hammock'],
        'Mosquito net': ['mosquito net'],
        'Piano': ['piano'],
        'Portable fans': ['portable fans'],
        'Room-darkening shades': ['room-darkening', 'blackout'],
    };

    const normalized = new Set();

    amenitiesList.forEach(amenity => {
        if (!amenity) return;
        
        const lowerAmenity = amenity.toLowerCase().trim();
        let matched = false;

        for (const [groupName, keywords] of Object.entries(amenityGroups)) {
            if (keywords.some(keyword => lowerAmenity.includes(keyword))) {
                normalized.add(groupName);
                matched = true;
                break;
            }
        }

        if (!matched && 
            !lowerAmenity.match(/\d+\s*inch/) && 
            !lowerAmenity.includes('available upon request') &&
            !lowerAmenity.includes('specific hours') &&
            lowerAmenity.length < 50) {

            normalized.add(amenity.trim());
        }
    });

    return Array.from(normalized).sort();
}