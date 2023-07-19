import { RootState } from '../index';
import { IColumn, IFilterState, IKeywordsSearch } from './filter.types';

export const getKeywordSearch = (state: RootState): IKeywordsSearch => state.filters.keywordsSearch;
export const getFiltersBar = (state: RootState): IFilterState => state.filters;
export const getFiltersColumn = (state: RootState): IColumn => state.filters.columns;
