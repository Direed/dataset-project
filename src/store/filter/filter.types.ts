import { defaultKeywordsTitle, lpKeywordsTitle } from '../../constants';

export enum FilterActionTypes {
    SET_KEYWORD = '@@filter/SET_KEYWORD',
    SET_KEYWORD_COLUMN = '@@filter/SET_KEYWORD_COLUMN',
    ON_SELECT_OPTION = '@@filter/ON_SELECT_OPTION',
    SET_GROWTH_METRIC = '@@filter/SET_GROWTH_METRIC',
    SET_GROWTH_METRIC_VALUE = '@@filter/SET_GROWTH_METRIC_VALUE',
    RESET_ALL_FILTER = '@@filter/RESET_ALL_FILTER',
    SET_SELECTED_COLUMN = '@@filter/SET_SELECTED_COLUMN',
    SET_SELECT_ALL_COLUMNS = '@@filter/SET_SELECT_COLUMNS',
    SET_RESET_ALL_COLUMNS = '@@filter/SET_RESET_ALL_COLUMNS',
    SET_SELECT_ALL_KEYWORDS_BUTTON = '@@filter/SET_SELECT_ALL_KEYWORDS_BUTTON',
    SET_RESET_All_KEYWORDS_BUTTON = '@@filter/SET_RESET_All_KEYWORDS_BUTTON',
    SELECT_COLUMN_GROUP = '@@filter/SELECT_COLUMN_GROUP',
    HIDE_OTHER_COLUMNS = '@@filter/HIDE_OTHER_COLUMNS',
    SHOW_OTHER_COLUMNS = '@@filter/SHOW_OTHER_COLUMNS',
    HIDE_EMPTY_COLUMNS = '@@filter/HIDE_EMPTY_COLUMNS',
    RESET_FILTER = '@@filter/RESET_FILTER',
    DELETE_CHIP = '@@filter/DELETE_CHIP',
    SET_SEARCH_CLICK = '@@filter/SET_SEARCH_CLICK',
    CHANGE_KEYWORD_FILTERS = '@@filter/CHANGE_KEYWORD_FILTERS',
}

export interface IKeywordsSearch {
    select: string;
    selectedOption: {
        [defaultKeywordsTitle]: {
            keywords: { label: string; value: string }[];
            columnKeywords: string;
            categoryKeywords?: { label: string; value: string }[];
        };
        [lpKeywordsTitle]: {
            keywords: { label: string; value: string }[];
            columnKeywords: string;
            categoryKeywords?: { label: string; value: string }[];
        };
    };
    isChecked: boolean;
    isCheckedSelectAllButton: boolean;
    isCheckedSearchButton: boolean;
}

export interface IFilterState {
    source: string[];
    columns: IColumn;
    growthMetrics: { field: string; value: number }[];
    keywordsSearch: IKeywordsSearch;
}

export interface IColumn {
    [key: string]: { isVisible: boolean; order: number };
}
