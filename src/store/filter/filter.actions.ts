import { AnyAction } from 'redux';
import { action } from 'typesafe-actions';
import { FilterActionTypes } from './filter.types';
import { IKeywordFilterItem } from '../../pages/Home/helpers';

export const setKeyword = (data: { label: string; value: string }[], select, fieldName: string): AnyAction =>
    action(FilterActionTypes.SET_KEYWORD, {
        data,
        select,
        fieldName,
    });
export const setKeywordColumn = (keywordColumn: string, select): AnyAction =>
    action(FilterActionTypes.SET_KEYWORD_COLUMN, {
        keywordColumn,
        select,
    });
export const setGrowthMetrics = (title: string): AnyAction => action(FilterActionTypes.SET_GROWTH_METRIC, title);
export const setGrowthMetricsValue = (title: string, value: number): AnyAction =>
    action(FilterActionTypes.SET_GROWTH_METRIC_VALUE, {
        title,
        value,
    });
export const resetAllFilter = (): AnyAction => action(FilterActionTypes.RESET_ALL_FILTER);
export const resetKeywordFilter = (title: string): AnyAction => action(FilterActionTypes.RESET_FILTER, title);

export const resetGrowthItemFilter = (title: string): AnyAction => action(FilterActionTypes.RESET_FILTER, title);

export const setSelectedColumn = (title: string, isChecked: boolean): AnyAction =>
    action(FilterActionTypes.SET_SELECTED_COLUMN, {
        title,
        isChecked,
    });

export const clickedSearchButton = (value: boolean): AnyAction => action(FilterActionTypes.SET_SEARCH_CLICK, value);

export const deleteChip = (select: string, value: string): AnyAction => action(FilterActionTypes.DELETE_CHIP, { select, value });

export const hideOtherColumns = (): AnyAction => action(FilterActionTypes.HIDE_OTHER_COLUMNS, {});
export const showOtherColumns = (): AnyAction => action(FilterActionTypes.SHOW_OTHER_COLUMNS, {});

export const setSelectAllColumns = (): AnyAction => action(FilterActionTypes.SET_SELECT_ALL_COLUMNS);
export const selectColumnGroup = (columns, value): AnyAction =>
    action(FilterActionTypes.SELECT_COLUMN_GROUP, {
        columns,
        value,
    });

export const setResetAllColumns = (): AnyAction => action(FilterActionTypes.SET_RESET_ALL_COLUMNS);

export const setOnSelectOption = (title: string): AnyAction => action(FilterActionTypes.ON_SELECT_OPTION, { title });

export const setSelectAllKeywordsButton = (title, options): AnyAction =>
    action(FilterActionTypes.SET_SELECT_ALL_KEYWORDS_BUTTON, {
        title,
        options,
    });

export const setResetAllKeywordsButton = (title): AnyAction => action(FilterActionTypes.SET_RESET_All_KEYWORDS_BUTTON, title);

export const setHideEmptyColumns = (data): AnyAction => action(FilterActionTypes.HIDE_EMPTY_COLUMNS, { data });

export const changeKeywordFilters = (value: IKeywordFilterItem[]): AnyAction => action(FilterActionTypes.CHANGE_KEYWORD_FILTERS, value);
