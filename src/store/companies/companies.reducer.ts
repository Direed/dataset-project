import { AnyAction, Reducer } from 'redux';
import { CompaniesActionTypes, ICompanies, ICompaniesState, IExportData, ILocationData } from './companies.types';
import { SearchType, SortOrder } from '../../enums';
import { resetValue } from '../../utils/resetFilter';
import { FilterActionTypes } from '../filter/filter.types';
import { tableHeaderColumns } from '../../constants/table/columns';
import { emptyCellValue } from '../../constants/table/emptyCellValues';
import { startPage } from '../../constants/table/rows';
import { IFilterTable } from './types/filterTypes';
import { filteredCompaniesFilters, updateTableFilters } from '../../constants';
import { localStorageType } from '../../enums/localStorage';
import { IKeywordFilterItem } from '../../pages/Home/helpers';
// It's logic for filtered data for table and logic for engine ui
const localStoreData: any = JSON.parse(String(localStorage.getItem(localStorageType.FILTERS)));
const filtersLocalStoreData: IKeywordFilterItem[] = filteredCompaniesFilters(localStoreData);
const filterTable: IFilterTable = updateTableFilters(filtersLocalStoreData);

export const initialState: ICompaniesState = {
    companies: {
        isLoading: true,
        needHeaderSorting: false,
        data: [],
        tableSortArrows: {
            title: '',
            sort: '',
        },
        total: 0,
        infinityLoading: false,
        isLoadMore: false,
        page: startPage,
        globalSearch: '',
        needChipHeader: !!localStoreData?.length,
        findInView: false,
        defaultColumns: [...tableHeaderColumns],
        needResetResize: false,
        filterTable: filterTable,
        currentItem: null,
        tableHeader: [...tableHeaderColumns],
        isOpenKeywordSidebar: false,
        needRefetch: false,
    },
    exportData: {
        dataForExport: [],
        isSelectedAllDataForExport: false,
    },
    locationData: {
        cities: [],
        regions: [],
        countryCodes: {},
        countryCodesList: [],
        fundingRounds: [],
        industries: [],
    },
};

const setNewFilter = (filters, index, filter): Array<any> => [...filters.splice(0, index), filter, ...filters.splice(index + 1)];

const companies = (state: ICompanies = initialState.companies, action: AnyAction): ICompanies => {
    switch (action.type) {
        case CompaniesActionTypes.SET_FILTER_TABLE_DATA: {
            const copyState = { ...state };
            const { filterType, field, type, needReset } = action.payload;
            const filterIndex = copyState.filterTable[field].findIndex((item) => item.type === type);
            const index = copyState.filterTable[field][filterIndex].value.findIndex((item) =>
                filterType.value ? item.value === filterType.value : item === filterType
            );
            const updateFilter = {
                type,
                value:
                    index != -1
                        ? copyState.filterTable?.[field]?.[filterIndex]?.value?.filter((_, i) => i !== index)
                        : [...copyState?.filterTable?.[field]?.[filterIndex]?.value, filterType],
            };
            return {
                ...copyState,
                ...(needReset ? { needChipHeader: true } : {}),
                filterTable: {
                    ...copyState.filterTable,
                    [field]: [...copyState.filterTable[field].splice(0, filterIndex), updateFilter, ...copyState.filterTable[field].splice(filterIndex + 1)],
                },
            };
        }

        case CompaniesActionTypes.CHANGE_FILTERS: {
            const updatedFilters = filteredCompaniesFilters(action.payload);
            const keys = Object.keys(state.filterTable);
            const newFilters = {};
            keys.forEach((filter) => {
                const result = state.filterTable[filter].map((item) => {
                    return {
                        type: item.type,
                        value: resetValue(item.type),
                        ...(item.type === SearchType.RANGE_DATE
                            ? {
                                  needFilter: false,
                              }
                            : {}),
                    };
                });
                newFilters[filter] = result;
            });
            const defaultFilterTable = {
                ...state.filterTable,
                ...newFilters,
            };
            const filterTable: IFilterTable = updateTableFilters(updatedFilters, defaultFilterTable);

            return {
                ...state,
                needRefetch: true,
                filterTable,
            };
        }

        case CompaniesActionTypes.ON_SET_IS_OPEN_KEYWORD_SIDEBAR: {
            const { value } = action.payload;

            return {
                ...state,
                isOpenKeywordSidebar: value,
            };
        }

        case CompaniesActionTypes.SORT_FILTERS: {
            const { title } = action.payload;
            let newTitle: string = title;
            let newSort: string | null = state.tableSortArrows.sort;

            if (state.tableSortArrows.title === title) {
                if (state.tableSortArrows.sort === SortOrder.DESC) {
                    newSort = SortOrder.ASC;
                } else if (state.tableSortArrows.sort === SortOrder.ASC) {
                    newSort = '';
                    newTitle = '';
                }
            } else {
                newSort = SortOrder.DESC;
            }

            return {
                ...state,
                tableSortArrows: {
                    title: newTitle,
                    sort: newSort,
                },
            };
        }
        case CompaniesActionTypes.REQUEST_TABLE_DATA_FAILURE: {
            return {
                ...state,
                isLoading: false,
                infinityLoading: false,
            };
        }
        case CompaniesActionTypes.CHANGE_SOURCE_COLUMN: {
            const { status } = action.payload;
            return {
                ...state,
                needHeaderSorting: status,
            };
        }
        case CompaniesActionTypes.SET_FIELD: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);
            const newFilter = [...state.filterTable[field].splice(0, filterIndex), ...state.filterTable[field].splice(filterIndex + 1)];
            newFilter.push({ value, type });
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: newFilter,
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_SEARCH: {
            const { field, search, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);

            return {
                ...state,
                needRefetch: !search,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        value: search,
                        type,
                    }),
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_SELECT: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);

            return {
                ...state,
                needRefetch: !value.label && !value.value,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        value,
                        type,
                    }),
                },
            };
        }
        case CompaniesActionTypes.CHANGE_GLOBAL_SEARCH: {
            return {
                ...state,
                globalSearch: action.payload,
            };
        }
        case CompaniesActionTypes.CHANGE_FIND_IN_VIEW: {
            return {
                ...state,
                findInView: action.payload,
            };
        }
        case CompaniesActionTypes.SET_NEED_FILTER: {
            const { field, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        value: [state.filterTable[field][filterIndex].value[0], state.filterTable[field][filterIndex].value[1]],
                        type,
                        needFilter: !!state.filterTable[field][filterIndex].value[0] && !!state.filterTable[field][filterIndex].value[1],
                    }),
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_MIN_DATE: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        value: [value, state.filterTable[field][filterIndex].value[1]],
                        type,
                        needFilter: !!value || !!state.filterTable[field][filterIndex].value[1],
                    }),
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_MAX_DATE: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        value: [state.filterTable[field][filterIndex].value[0], value],
                        type,
                        needFilter: !!value || !!state.filterTable[field][filterIndex].value[0],
                    }),
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_RANGE: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        ...state.filterTable[field][filterIndex],
                        value: {
                            min: value[0],
                            max: value[1],
                        },
                        type,
                    }),
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_MIN: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        value: {
                            ...state.filterTable[field][filterIndex].value,
                            min: value,
                        },
                        type,
                    }),
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_MAX: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);

            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        value: {
                            ...state.filterTable[field][filterIndex].value,
                            max: value,
                        },
                        type,
                    }),
                },
            };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_ORDER: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);

            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    [field]: setNewFilter(state.filterTable[field], filterIndex, {
                        ...state.filterTable[field][filterIndex],
                        value,
                        type: SearchType.SORT_ORDER,
                    }),
                },
            };
        }
        case CompaniesActionTypes.REQUEST_TABLE_DATA: {
            const { page } = action.payload;
            return { ...state, isLoading: page === startPage, infinityLoading: page > startPage, needChipHeader: true, needRefetch: false };
        }
        case CompaniesActionTypes.REQUEST_TABLE_DATA_SUCCESS: {
            const { data, page, total, isLoadMore } = action.payload;
            const newData = data.map((item) => {
                const newItem = {
                    checkbox: '',
                    name: String(item.name),
                    website: String(item.website),
                    description: String(item.description),
                };
                for (const key in item) {
                    if (key !== 'name' && key !== 'website' && key !== 'description') {
                        newItem[key] = String(item[key]);
                    }
                }
                Object.entries(newItem).forEach(([key, value]) => {
                    if (emptyCellValue.includes(value)) {
                        newItem[key] = '';
                    }
                });
                return newItem;
            });
            return {
                ...state,
                isLoading: false,
                total,
                page,
                data: page === startPage ? newData : [...state.data, ...newData],
                infinityLoading: false,
                isLoadMore,
            };
        }
        case CompaniesActionTypes.RESET_RESIZING: {
            return { ...state, tableHeader: state.defaultColumns || [], needResetResize: true };
        }
        case CompaniesActionTypes.CLOSE_STATUS_RESIZE: {
            return { ...state, needResetResize: false };
        }
        case CompaniesActionTypes.CHANGE_TABLE_HEADER_ORDER: {
            const { result } = action.payload;
            const newTableHeader = [...state.tableHeader];
            const [removed] = newTableHeader.splice(result.source.index, 1);
            newTableHeader.splice(result.destination.index, 0, removed);
            return { ...state, tableHeader: newTableHeader };
        }
        case CompaniesActionTypes.FILTER_TABLE_BY_LOCATION: {
            const { field, value, type } = action.payload;
            const filterIndex = state.filterTable[field].findIndex((item) => item.type === type);
            return {
                ...state,
                needRefetch: !value.length,
                filterTable: {
                    ...state.filterTable,
                    [field]: [
                        {
                            ...state.filterTable[field][filterIndex],
                            value,
                            type,
                        },
                    ],
                },
            };
        }
        case CompaniesActionTypes.RESET_ALL_FILTERS: {
            const keys = Object.keys(state.filterTable);
            const newFilters = {};
            keys.forEach((filter) => {
                const result = state.filterTable[filter].map((item) => {
                    return {
                        type: item.type,
                        value: resetValue(item.type),
                        ...(item.type === SearchType.RANGE_DATE
                            ? {
                                  needFilter: false,
                              }
                            : {}),
                    };
                });
                newFilters[filter] = result;
            });
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                    ...newFilters,
                },
            };
        }
        case CompaniesActionTypes.RESET_FILTER: {
            const { field } = action.payload;
            const filter = state.filterTable[field];
            const newFilter = filter.map((item) => {
                return {
                    type: item.type,
                    value: resetValue(item.type),
                    ...(item.type === SearchType.RANGE_DATE
                        ? {
                              needFilter: false,
                          }
                        : {}),
                    ...(item.type === SearchType.CHECKED_RANGE
                        ? {
                              labels: item.labels.map((labelItem) => ({
                                  isChecked: false,
                                  label: labelItem.label,
                                  range: labelItem.range,
                              })),
                          }
                        : {}),
                };
            });
            return {
                ...state,
                needRefetch: true,
                filterTable: {
                    ...state.filterTable,
                    [field]: newFilter,
                },
            };
        }
        case CompaniesActionTypes.SET_CURRENT_ITEM: {
            const item = state.data.find((item) => item.name === action.payload.name);
            return {
                ...state,
                currentItem: item?.name ? item : null,
            };
        }
        case FilterActionTypes.RESET_ALL_FILTER: {
            return {
                ...state,
                filterTable: {
                    ...state.filterTable,
                },
            };
        }
        case CompaniesActionTypes.CHANGE_CHIP_HEADER: {
            const { value } = action.payload;
            return { ...state, needChipHeader: value };
        }
        default:
            return state;
    }
};
const exportDataReducer = (state: IExportData = initialState.exportData, action: AnyAction): IExportData => {
    switch (action.type) {
        case CompaniesActionTypes.TOGGLE_EXPORT_DATA: {
            const updatedDataForExport = [...state.dataForExport];

            if (action.payload.shouldAdd) {
                updatedDataForExport.push({
                    id: action.payload.id,
                });
                return {
                    ...state,
                    dataForExport: updatedDataForExport,
                    isSelectedAllDataForExport: action.payload.companiesIds.length === updatedDataForExport.length,
                };
            } else {
                const index = updatedDataForExport.findIndex((company) => company.id === action.payload.id);

                updatedDataForExport.splice(index, 1);
                return {
                    ...state,
                    dataForExport: updatedDataForExport,
                    isSelectedAllDataForExport: false,
                };
            }
        }
        case CompaniesActionTypes.TOGGLE_EXPORT_ALL_DATA: {
            return {
                ...state,
                dataForExport: action.payload.shouldAdd ? action.payload.companiesIds : [],
                isSelectedAllDataForExport: action.payload.shouldAdd,
            };
        }
        default:
            return state;
    }
};
const locationDataReducer = (state: ILocationData = initialState.locationData, action: AnyAction): ILocationData => {
    switch (action.type) {
        case CompaniesActionTypes.GET_CITIES_SUCCESS: {
            const { cities } = action.payload;
            return { ...state, cities };
        }
        case CompaniesActionTypes.GET_REGIONS_SUCCESS: {
            const { regions } = action.payload;
            return { ...state, regions };
        }
        case CompaniesActionTypes.GET_COUNTRY_CODES_SUCCESS: {
            const { countryCodes } = action.payload;
            const countryCodesList = Object.entries(countryCodes).map((item) => ({
                value: item[0],
                label: String(item[1]),
            }));
            return { ...state, countryCodes, countryCodesList };
        }
        case CompaniesActionTypes.GET_FUNDING_ROUNDS_SUCCESS: {
            const { fundingRounds } = action.payload;
            return { ...state, fundingRounds };
        }
        case CompaniesActionTypes.GET_INDUSTRIES_SUCCESS: {
            const { industries } = action.payload;
            return { ...state, industries };
        }
        default:
            return state;
    }
};
export const companiesReducer: Reducer<ICompaniesState> = (state = initialState, action) => ({
    companies: companies(state.companies, action),
    exportData: exportDataReducer(state.exportData, action),
    locationData: locationDataReducer(state.locationData, action),
});
