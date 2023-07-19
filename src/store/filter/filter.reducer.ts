import { AnyAction, Reducer } from 'redux';
import { FilterActionTypes, IColumn, IFilterState, IKeywordsSearch } from './filter.types';
import { CompaniesActionTypes } from '../companies/companies.types';
import { defaultColumns, defaultKeywordsTitle, defaultLpColumn, getKeywordState } from '../../constants';
import { tableColumns } from '../../constants/table/columns';
import { SearchType } from '../../enums';
import { localStorageType } from '../../enums/localStorage';
import { saveColumnsToLocalStorage } from '../../utils/localStorageHelper';

// Logic for visible columns by key word, filtered data

const localStoreData: any = JSON.parse(String(localStorage.getItem(localStorageType.FILTERS)));

const keywordsLocalStorageData = localStoreData?.filter((localStorageItem) => localStorageItem.type === SearchType.KEYWORD);

const initialKeywordState = getKeywordState(keywordsLocalStorageData);

const initialKeywordsSearchState = {
    select: keywordsLocalStorageData ? keywordsLocalStorageData[0]?.select : defaultKeywordsTitle,
    selectedOption: initialKeywordState,
    isChecked: false,
    isCheckedSelectAllButton: true,
    isCheckedSearchButton: false,
};

export const initialState: IFilterState = {
    source: [],
    columns: { ...tableColumns },
    growthMetrics: [],
    keywordsSearch: initialKeywordsSearchState,
};
const keyword = (state: IKeywordsSearch = initialState.keywordsSearch, action: AnyAction): IKeywordsSearch => {
    switch (action.type) {
        case FilterActionTypes.SET_KEYWORD: {
            const { select, data, fieldName } = action.payload;
            return {
                ...state,
                selectedOption: {
                    ...state.selectedOption,
                    [select]: { ...state.selectedOption[select], [fieldName]: data },
                },
                isCheckedSearchButton: false,
            };
        }
        case FilterActionTypes.SET_KEYWORD_COLUMN: {
            const { select, keywordColumn } = action.payload;
            return {
                ...state,
                selectedOption: {
                    ...state.selectedOption,
                    [select]: { ...state.selectedOption[select], columnKeywords: keywordColumn },
                },
            };
        }
        case FilterActionTypes.RESET_ALL_FILTER: {
            return {
                ...initialKeywordsSearchState,
                select: state.select,
            };
        }
        case FilterActionTypes.RESET_FILTER: {
            return {
                ...state,
                selectedOption: initialKeywordState,
            };
        }

        case FilterActionTypes.SET_SEARCH_CLICK: {
            return {
                ...state,
                isCheckedSearchButton: action.payload,
            };
        }

        case FilterActionTypes.DELETE_CHIP: {
            const { select, value } = action.payload;
            const { keywords } = state.selectedOption[select];

            const updatedKeywords = [...keywords];
            const keywordIndex = updatedKeywords.findIndex((keyword) => keyword.value === value);
            if (keywordIndex > -1) {
                updatedKeywords.splice(keywordIndex, 1);
            }

            return {
                ...state,
                selectedOption: {
                    ...state.selectedOption,
                    [select]: {
                        ...state.selectedOption[select],
                        keywords: updatedKeywords,
                    },
                },
            };
        }

        case FilterActionTypes.ON_SELECT_OPTION: {
            return {
                ...state,
                select: action.payload.title,
                selectedOption: initialKeywordState,
                isCheckedSearchButton: false,
            };
        }
        case FilterActionTypes.SET_SELECT_ALL_KEYWORDS_BUTTON: {
            const { title, options } = action.payload;
            const selectCategory = state.selectedOption[title].categoryKeywords;
            return {
                ...state,
                selectedOption: {
                    ...state.selectedOption,
                    [title]: {
                        keywords: title === defaultKeywordsTitle ? options : selectCategory ? options : [],
                        columnKeywords: state.selectedOption[title].columnKeywords,
                        categoryKeywords: state.selectedOption[title].categoryKeywords,
                    },
                },
                isCheckedSelectAllButton: false,
            };
        }
        case FilterActionTypes.SET_RESET_All_KEYWORDS_BUTTON: {
            const select = action.payload;
            return {
                ...state,
                selectedOption: {
                    ...state.selectedOption,
                    [select]: {
                        keywords: [],
                        columnKeywords: select === defaultKeywordsTitle ? '' : defaultLpColumn.value,
                        categoryKeywords: state.selectedOption[select].categoryKeywords,
                    },
                },
                isCheckedSelectAllButton: true,
            };
        }

        case FilterActionTypes.CHANGE_KEYWORD_FILTERS: {
            return {
                ...state,
                select: action.payload?.length ? keywordsLocalStorageData[0]?.select : defaultKeywordsTitle,
                selectedOption: getKeywordState(action.payload),
            };
        }
        default:
            return state;
    }
};
const growthMetric = (state: { field: string; value: number }[] = initialState.growthMetrics, action: AnyAction): { field: string; value: number }[] => {
    switch (action.type) {
        case FilterActionTypes.SET_GROWTH_METRIC: {
            const updatedState = [...state];
            const index = updatedState.findIndex((item) => item.field === action.payload);
            if (index === -1) {
                return [...updatedState, { field: action.payload, value: 0 }];
            } else {
                return [...updatedState.splice(0, index), ...updatedState.splice(index + 1)];
            }
        }
        case FilterActionTypes.SET_GROWTH_METRIC_VALUE: {
            const { title, value } = action.payload;
            const index = state.findIndex((item) => item.field === title);
            const updatedState = [...state];
            updatedState[index] = { value, field: title };
            return updatedState;
        }
        case FilterActionTypes.RESET_FILTER: {
            const updatedState = [...state];
            const index = updatedState.findIndex((item) => item.field === action.payload);
            updatedState.splice(index, 1);
            return updatedState;
        }
        case FilterActionTypes.RESET_ALL_FILTER: {
            return [];
        }
        default:
            return state;
    }
};

export const columnsReducer = (state: IColumn = initialState.columns, action: AnyAction): IColumn => {
    switch (action.type) {
        case FilterActionTypes.SELECT_COLUMN_GROUP: {
            const { columns, value } = action.payload;
            const updateColumns = { ...state };
            columns.map((item) => {
                updateColumns[item] = { ...updateColumns[item], isVisible: value };
            });
            return updateColumns;
        }
        case FilterActionTypes.HIDE_OTHER_COLUMNS: {
            const updateColumns = { ...state };
            const columnKeys = Object.keys(updateColumns);
            columnKeys.map((item) => {
                if (!defaultColumns.includes(item)) {
                    updateColumns[item] = { ...updateColumns[item], isVisible: false };
                }
            });
            return updateColumns;
        }
        case FilterActionTypes.SHOW_OTHER_COLUMNS: {
            const updateColumns = { ...state };
            const columnKeys = Object.keys(updateColumns);
            columnKeys.map((item) => {
                updateColumns[item] = { ...updateColumns[item], isVisible: true };
            });
            return updateColumns;
        }
        case FilterActionTypes.SET_SELECTED_COLUMN: {
            const { title, isChecked } = action.payload;

            const updatedState = { ...state };
            updatedState[title].isVisible = isChecked;

            saveColumnsToLocalStorage(updatedState);
            return updatedState;
        }
        case FilterActionTypes.SET_SELECT_ALL_COLUMNS:
        case FilterActionTypes.RESET_ALL_FILTER: {
            const updateState = { ...state };
            Object.keys(updateState).forEach((key) => {
                updateState[key].isVisible = true;
            });

            saveColumnsToLocalStorage(updateState);
            return updateState;
        }
        case FilterActionTypes.HIDE_EMPTY_COLUMNS: {
            const updateState = { ...state };

            const shownColumns: string[] = [];

            for (const label in updateState) {
                const isAnyCellFilled = action.payload.data.some((dataItem) => dataItem[label]);

                if (isAnyCellFilled) {
                    shownColumns.push(label);
                }
            }
            Object.entries(updateState).forEach(([key, value]: any) => {
                if (key !== 'checkbox') {
                    updateState[key] = {
                        ...value,
                        isVisible: shownColumns.includes(key),
                    };
                }
            });

            saveColumnsToLocalStorage(updateState);

            return updateState;
        }

        case FilterActionTypes.SET_RESET_ALL_COLUMNS: {
            const updateState = { ...state };
            Object.keys(updateState).forEach((key) => {
                if (key !== 'checkbox' && key !== 'name') {
                    updateState[key].isVisible = false;
                }
            });

            saveColumnsToLocalStorage(updateState);
            return updateState;
        }
        case CompaniesActionTypes.CHANGE_TABLE_HEADER_ORDER: {
            const { result } = action.payload;
            const updateState = { ...state };
            const newTableHeader: [string, { isVisible: boolean; order: number }][] = Object.entries(updateState).sort(
                (a, b): number => a[1].order - b[1].order
            );
            const [removed] = newTableHeader.splice(result.source.index, 1);
            newTableHeader.splice(result.destination.index, 0, removed);
            newTableHeader.forEach(([title, value], i) => {
                updateState[title] = {
                    isVisible: value.isVisible,
                    order: i,
                };
            });
            return updateState;
        }
        default:
            return state;
    }
};

export const filterReducer: Reducer<IFilterState> = (state = initialState, action) => ({
    ...initialState,
    columns: columnsReducer(state.columns, action),
    growthMetrics: growthMetric(state.growthMetrics, action),
    keywordsSearch: keyword(state.keywordsSearch, action),
});
