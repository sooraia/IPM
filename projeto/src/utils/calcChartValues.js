import { parsePrice } from '@/utils/chartHelpers';
export const calcAveragePerWeek = (groupedCalendar) => {
    if (!groupedCalendar || typeof groupedCalendar !== 'object') return {};

    const temp = {};
    Object.values(groupedCalendar).forEach((item) => {
        const calendarArray = item.calendar;
        item.forEach(([month, entries]) => {
            if (!temp[month]) temp[month] = [];

            entries.forEach((value, index) => {
                if (!temp[month][index]) {
                    temp[month][index] = [0, 0];
                }
                temp[month][index][0] += value;
                temp[month][index][1] += 1;
            });
        });
    });

    const result = {};

    Object.entries(temp).forEach(([month, weeksArray]) => {
        result[month] = weeksArray.map(([sum, count]) => {
            return count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
        });
    });

    return result; 
};

export const calcAveragePerMonth = (groupedCalendarByWeek) => {
    if (!groupedCalendarByWeek || typeof groupedCalendarByWeek !== 'object') return {};

    const result = {};

    Object.entries(groupedCalendarByWeek).forEach(([month, weeksArray]) => {
        if (!groupedCalendarByWeek || typeof groupedCalendarByWeek !== 'object') return {};

        let totalCount = 0;
        let totalSum = 0;

        for (const value of weeksArray){
            totalSum += value;
            totalCount += 1;
        }
        result[month] = parseFloat((totalSum / totalCount).toFixed(2));
    });

    return result; 
};

export const calcAveragePerQuart = (groupedCalendarByWeek) => {
    if (!groupedCalendarByWeek || typeof groupedCalendarByWeek !== 'object') return {};

    const temp = {'Jan - Mar': [0, 0], 'Apr - Jun': [0, 0], 'Jul - Sep': [0, 0], 'Oct - Dec': [0, 0]};

    const quarterMap = {
        'Jan': 'Jan - Mar', 'Feb': 'Jan - Mar', 'Mar': 'Jan - Mar',
        'Apr': 'Apr - Jun', 'May': 'Apr - Jun', 'Jun': 'Apr - Jun',
        'Jul': 'Jul - Sep', 'Aug': 'Jul - Sep', 'Sep': 'Jul - Sep',
        'Oct': 'Oct - Dec', 'Nov': 'Oct - Dec', 'Dec': 'Oct - Dec'
    };

    Object.entries(groupedCalendarByWeek).forEach(([month, weeksArray]) => {
        weeksArray.forEach(value => {
            const quarter = quarterMap[month];
            temp[quarter][0] += value; 
            temp[quarter][1] += 1;
        });
    });

    const result = {};

    Object.entries(temp).forEach(([quarter, [sum, count]]) => {
        result[quarter] = count > 0 ? parseFloat((sum / count).toFixed(2)) : 0;
    });

    return result; 
};