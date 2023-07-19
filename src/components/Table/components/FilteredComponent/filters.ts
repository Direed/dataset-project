import { ICompany } from '../../../../store/companies/companies.types';
import { IFilterTable } from '../../../../store/companies/types/filterTypes';
import { IFilterState } from '../../../../store/filter/filter.types';

export interface IFilter {
    filterByTableParams?: boolean;
    keywordsSearch?: boolean;
    growthMetrics?: boolean;
    affinityStatus?: boolean;
    sourceBar?: boolean;
    globalSearch?: boolean;
}

export interface iFiltersProp {
    filterParams: string[];
    filters: IFilterTable;
    filtersBar: IFilterState;
    inFindView: boolean;
    search: string;
}

export const filtersData = (data: ICompany[], filter: IFilter, filters: iFiltersProp): ICompany[] => {
    let filterTable = data;
    if (filter.keywordsSearch) {
        const filterParam = filters.filtersBar.keywordsSearch;
        const select = filterParam.select;
        if (select && filterParam.selectedOption[select].keywords.length && filterParam.selectedOption[select].columnKeywords.length) {
            const keywordsWord = filterParam.selectedOption[select].keywords.map((item) => item.value);
            filterTable = filterTable.filter(
                (element) => !!keywordsWord.filter((keyw) => element[filterParam.selectedOption[select].columnKeywords].includes(keyw)).length
            );
        }
    }
    if (filter.growthMetrics) {
        const filterParam = filters.filtersBar.growthMetrics;
        if (filterParam.length) {
            let sortedData: ICompany[] = [];
            filterParam.forEach((growthMetric) => {
                sortedData = filterTable.filter((element) => +element[growthMetric.field] >= growthMetric.value);
            });
            filterTable = [...sortedData];
        }
    }
    if (filter.globalSearch) {
        filterTable = filterTable.filter((item) => Object.keys(item).some((key) => item[key].toLowerCase().includes(filters.search.toLowerCase())));
    }
    return filterTable;
};
