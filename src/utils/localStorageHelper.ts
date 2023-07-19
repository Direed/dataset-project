import { checkOnEmpty } from './checkOnEmpty';
import { SearchType } from '../enums';
import { defaultKeywordsTitle, lpKeywordsTitle } from '../constants';
import { IColumn, IKeywordsSearch } from '../store/filter/filter.types';
import { localStorageType } from '../enums/localStorage';
import { IFilterTable } from '../store/companies/types/filterTypes';

interface ILocalStoreData {
    select?: string;
    category?: string | undefined;
    field_name: string;
    value: string | [] | {};
    type: string;
}

const getFiltersState = (filters: IFilterTable): ILocalStoreData[] => {
    const localStoreData: ILocalStoreData[] = [];
    const keys = Object.keys(filters);
    keys.forEach((item) => {
        filters[item].forEach((filter) => {
            switch (filter.type) {
                case SearchType.SORT_BY_LOCATION:
                case SearchType.EQUAL_IN_PART:
                case SearchType.EQUAL: {
                    return checkOnEmpty(filter, filter.type)
                        ? filter.value.forEach((q) => localStoreData.push({ field_name: item, value: q.value, type: filter.type }))
                        : null;
                }
                case SearchType.SELECT:
                case SearchType.SORT_ORDER:
                case SearchType.RANGE_DATE:
                case SearchType.SEARCH:
                case SearchType.PERCENTAGE_RANGE:
                case SearchType.USD_RANGE:
                case SearchType.RANGE: {
                    return checkOnEmpty(filter, filter.type) ? localStoreData.push({ field_name: item, value: filter.value, type: filter.type }) : null;
                }
                case SearchType.CHECKED_RANGE: {
                    return checkOnEmpty(filter, filter.type) ? localStoreData.push({ field_name: item, value: filter, type: filter.type }) : null;
                }
                default: {
                    return null;
                }
            }
        });
    });
    return localStoreData;
};

const getKeywordsState = (keywords: IKeywordsSearch): any => {
    try {
        const keywordsState: ILocalStoreData[] = [];
        if (keywords.select === defaultKeywordsTitle) {
            keywordsState.push({
                select: keywords.select,
                category: keywords.selectedOption?.[defaultKeywordsTitle]?.categoryKeywords?.[0]?.value,
                field_name: keywords.selectedOption[defaultKeywordsTitle].columnKeywords,
                value: keywords.selectedOption[defaultKeywordsTitle].keywords.map((i) => i.value),
                type: SearchType.KEYWORD,
            });
        } else if (keywords.select === lpKeywordsTitle) {
            keywordsState.push({
                select: keywords.select,
                category: keywords.selectedOption?.[lpKeywordsTitle]?.categoryKeywords?.[0]?.value,
                field_name: keywords.selectedOption[lpKeywordsTitle].columnKeywords,
                value: keywords.selectedOption[lpKeywordsTitle].keywords.map((i) => i.value),
                type: SearchType.KEYWORD,
            });
        }
        return keywordsState;
    } catch (e) {
        console.warn(e);
    }
};

export function removeLocalStorageValues(value: null | string, fieldName: null | string = null): void {
    const localStorageData = JSON.parse(String(localStorage.getItem(localStorageType.FILTERS)));
    const newLocal = localStorageData.filter((item) => {
        if (!fieldName) return item.value !== value;
        else {
            return item.field_name !== fieldName;
        }
    });
    const updatedLocaleStorageData = JSON.stringify(newLocal);
    localStorage.setItem(localStorageType.FILTERS, updatedLocaleStorageData);
}

export const saveToLocalStorage = (filters: IFilterTable, keywords: IKeywordsSearch): void => {
    try {
        const filtersState = getFiltersState(filters);
        const keywordsState = getKeywordsState(keywords);
        const serialisedState = JSON.stringify([...filtersState, ...keywordsState]);
        localStorage.setItem(localStorageType.FILTERS, serialisedState);
    } catch (e) {
        console.warn(e);
    }
};
export const resetSelectedSavedFilters = (): void => {
    const localStorageSavedFilters = JSON.parse(String(localStorage.getItem(localStorageType.SAVED_FILTERS))) || [];
    if (localStorageSavedFilters.length) {
        const updatedLocalStorageSavedFilters = localStorageSavedFilters.map((filter) => ({
            ...filter,
            selected: false,
        }));
        localStorage.setItem(localStorageType.SAVED_FILTERS, JSON.stringify(updatedLocalStorageSavedFilters));
    }
};

export const saveColumnsToLocalStorage = (updatedState: IColumn): void => {
    const updatedDefaultColumns = Object.keys(updatedState).filter((title) => updatedState[title].isVisible);
    localStorage.setItem(localStorageType.COLUMNS, JSON.stringify(updatedDefaultColumns));
};
