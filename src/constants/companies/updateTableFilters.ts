import { SearchType } from '../../enums';
import { IFilterTable } from '../../store/companies/types/filterTypes';
import { CellNameType } from '../../enums/cellNameType';
import { mappingFundingRounds } from '../table/fundingRounds';
import { cellNameTypes } from '../CellNameTypes';

export const updateTableFilters = (updatedFilters, filterTable = {} as IFilterTable): IFilterTable => {
    const defaultTableFilters: IFilterTable = filterTable;

    if (!Object.keys(filterTable).length) {
        Object.keys(cellNameTypes).map((item) => {
            if (cellNameTypes[item].defaultTableFilter) defaultTableFilters[item] = cellNameTypes[item].defaultTableFilter;
        });
    }
    Object.keys(defaultTableFilters).forEach((storeData) => {
        if (updatedFilters?.some((filtersLocalStoreData) => filtersLocalStoreData.field_name === storeData)) {
            defaultTableFilters[storeData].forEach((data, index) => {
                switch (data.type) {
                    case SearchType.SORT_BY_LOCATION: {
                        const updatefiltersLocalStoreData = updatedFilters.filter((n) => n.field_name === storeData);
                        const updateValue = updatefiltersLocalStoreData.map((i) => {
                            let updatedLabel = i.value;
                            if (storeData === CellNameType.LAST_FUNDING_STAGE) {
                                updatedLabel = mappingFundingRounds[i.value];
                            }
                            if (storeData === CellNameType.COUNTRY_CODE) {
                                updatedLabel = i.label;
                            }
                            return { value: i.value, label: updatedLabel };
                        });
                        defaultTableFilters[storeData][index].value = updateValue;
                        return updateValue;
                    }
                    case SearchType.EQUAL_IN_PART:
                    case SearchType.EQUAL: {
                        const updatefiltersLocalStoreData = updatedFilters.filter((n) => n.field_name === storeData);
                        const updateValue = updatefiltersLocalStoreData.map((i) => {
                            return { value: i.value, label: i.value };
                        });
                        defaultTableFilters[storeData][index].value = updateValue;
                        return updateValue;
                    }
                    case SearchType.SELECT:
                    case SearchType.SEARCH: {
                        const updatefiltersLocalStoreData = updatedFilters.find((n) => n.field_name === storeData && n.type === data.type)?.value;
                        return (defaultTableFilters[storeData][index].value = updatefiltersLocalStoreData);
                    }
                    case SearchType.RANGE_DATE: {
                        const updatefiltersLocalStoreData = updatedFilters.find((n) => n.field_name === storeData && n.type === data.type)?.value;
                        defaultTableFilters[storeData][index].needFilter = true;
                        return (defaultTableFilters[storeData][index].value = updatefiltersLocalStoreData);
                    }
                    case SearchType.PERCENTAGE_RANGE:
                    case SearchType.USD_RANGE:
                    case SearchType.RANGE: {
                        const updatefiltersLocalStoreData = updatedFilters.find((n) => n.field_name === storeData && n.type === data.type)?.value;
                        return (defaultTableFilters[storeData][index].value = updatefiltersLocalStoreData);
                    }
                    case SearchType.CHECKED_RANGE: {
                        const updatefiltersLocalStoreData = updatedFilters.find((n) => n.field_name === storeData && n.type === data.type)?.value;
                        defaultTableFilters[storeData][index].labels = updatefiltersLocalStoreData.labels;
                        return (defaultTableFilters[storeData][index].value = updatefiltersLocalStoreData.value);
                    }
                    case SearchType.SORT_ORDER: {
                        const updatefiltersLocalStoreData = updatedFilters.find((n) => n.field_name === storeData && n.type === data.type)?.value;
                        return (defaultTableFilters[storeData][index].value = updatefiltersLocalStoreData);
                    }
                    default: {
                        return null;
                    }
                }
            });
        }
    });

    return defaultTableFilters;
};
