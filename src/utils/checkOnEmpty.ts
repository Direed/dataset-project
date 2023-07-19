import { SearchType } from '../enums';

export const checkOnEmpty = (value: any, type: SearchType): boolean => {
    switch (type) {
        case SearchType.SEARCH:
            return value.value !== '';
        case SearchType.PERCENTAGE_RANGE:
        case SearchType.USD_RANGE:
        case SearchType.RANGE:
        case SearchType.CHECKED_RANGE:
            return value.value.min !== '' || value.value.max !== '';
        case SearchType.EQUAL:
        case SearchType.EQUAL_IN_PART:
            return !!value.value.length;
        case SearchType.SELECT:
            return value.value.value !== '';
        case SearchType.SORT_BY_LOCATION:
            return !!value.value.length;
        case SearchType.SORT_ORDER:
            return !!value.value;
        case SearchType.RANGE_DATE: {
            return value.needFilter;
        }
        default: {
            return value !== '';
        }
    }
};
