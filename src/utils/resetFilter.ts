import { SearchType } from '../enums';

export const resetValue = (
    type: SearchType
): { min: string; max: string } | [] | string | null | { value: string; label: string } | undefined | [Date, Date] => {
    const startDateToday = new Date();
    const endDateToday = new Date();
    startDateToday.setHours(0, 0, 0, 0);
    endDateToday.setHours(23, 59, 59, 999);
    switch (type) {
        case SearchType.PERCENTAGE_RANGE:
        case SearchType.USD_RANGE:
        case SearchType.CHECKED_RANGE:
        case SearchType.RANGE: {
            return { min: '', max: '' };
        }
        case SearchType.EQUAL:
        case SearchType.EQUAL_IN_PART: {
            return [];
        }
        case SearchType.SEARCH: {
            return '';
        }
        case SearchType.RANGE_DATE: {
            return [startDateToday, endDateToday];
        }
        case SearchType.SORT_ORDER: {
            return null;
        }
        case SearchType.SORT_BY_LOCATION: {
            return [];
        }
        case SearchType.SELECT: {
            return { value: '', label: '' };
        }
    }
};
