import { AnyAction } from 'redux';
import { action } from 'typesafe-actions';
import { CompaniesActionTypes, ICompany, IExportCompany, IOption, IRequestDataInterface } from './companies.types';
import { SearchType, SortOrder } from '../../enums';
import { rowsCount, startPage } from '../../constants/table/rows';
import { IFilterItem } from '../../pages/Home/helpers';

export const requestData = ({ page = startPage, size = rowsCount, data, getTableData }: IRequestDataInterface = {}): AnyAction =>
    action(CompaniesActionTypes.REQUEST_TABLE_DATA, { page, size, data, getTableData });
export const requestDataSuccess = (data: ICompany, page: number, total: number, isLoadMore = true): AnyAction =>
    action(CompaniesActionTypes.REQUEST_TABLE_DATA_SUCCESS, { data, page, total, isLoadMore });
export const requestDataFailure = (): AnyAction => action(CompaniesActionTypes.REQUEST_TABLE_DATA_FAILURE);
export const setFilterTable = (
    field: string | number,
    filterType: string | { value: string; label: string },
    type: SearchType,
    needReset?: boolean
): AnyAction =>
    action(CompaniesActionTypes.SET_FILTER_TABLE_DATA, {
        field,
        filterType,
        type,
        needReset,
    });
export const filterTableBySearch = (field: string, search: string, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_SEARCH, {
        search,
        field,
        type,
    });

export const filterTableBySelect = (field: string, value: { label: string; value: string }, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_SELECT, { field, value, type });

export const sortTable = (title: string): AnyAction =>
    action(CompaniesActionTypes.SORT_FILTERS, {
        title,
    });

export const filterTableByRange = (field: string, value: number[], type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_RANGE, {
        field,
        value,
        type,
    });

export const filterTableByMin = (field: string, value: number, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_MIN, {
        field,
        value,
        type,
    });
export const filterTableByMax = (field: string, value: number, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_MAX, {
        field,
        value,
        type,
    });
export const filterTableByMaxDate = (field: string, value: Array<string | Date>, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_MAX_DATE, {
        field,
        value,
        type,
    });

export const filterTableByMinDate = (field: string, value: Array<string | Date>, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_MIN_DATE, {
        field,
        value,
        type,
    });
export const filterTableByOrder = (field: string, value: SortOrder, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_ORDER, {
        field,
        value,
        type,
    });

export const filterTableByLocation = (field: string, value: { label: string; value: string }[], type: SearchType): AnyAction =>
    action(CompaniesActionTypes.FILTER_TABLE_BY_LOCATION, { field, value, type });

export const setNeedFilter = (field: string, type: SearchType): AnyAction => action(CompaniesActionTypes.SET_NEED_FILTER, { field, type });

export const resetFilter = (field: string, type: SearchType): AnyAction =>
    action(CompaniesActionTypes.RESET_FILTER, {
        field,
        type,
    });
export const setFilterEqual = (field: string, value: string[], type: SearchType): AnyAction =>
    action(CompaniesActionTypes.SET_FIELD, {
        field,
        type,
        value,
    });
export const setCurrentItem = (name): AnyAction =>
    action(CompaniesActionTypes.SET_CURRENT_ITEM, {
        name,
    });

export const changeTableHeaderOrder = (result): AnyAction =>
    action(CompaniesActionTypes.CHANGE_TABLE_HEADER_ORDER, {
        result,
    });
export const toggleExportCompany = (id: string, shouldAdd: boolean, companiesIds: IExportCompany[]): AnyAction =>
    action(CompaniesActionTypes.TOGGLE_EXPORT_DATA, {
        id,
        shouldAdd,
        companiesIds,
    });
export const toggleExportAllCompany = (companiesIds: IExportCompany[], shouldAdd: boolean): AnyAction =>
    action(CompaniesActionTypes.TOGGLE_EXPORT_ALL_DATA, {
        companiesIds,
        shouldAdd,
    });
export const changeGlobalSearch = (search: string): AnyAction => action(CompaniesActionTypes.CHANGE_GLOBAL_SEARCH, search);
export const changeFindInView = (findInView: boolean): AnyAction => action(CompaniesActionTypes.CHANGE_FIND_IN_VIEW, findInView);

export const getCities = (): AnyAction => action(CompaniesActionTypes.GET_CITIES);
export const getCitiesSuccess = (cities: { label: string; value: string }[]): AnyAction => action(CompaniesActionTypes.GET_CITIES_SUCCESS, { cities });
export const getCitiesFailure = (error: string): AnyAction => action(CompaniesActionTypes.GET_CITIES_FAILURE, { error });

export const getRegions = (): AnyAction => action(CompaniesActionTypes.GET_REGIONS);
export const getRegionsSuccess = (regions: { label: string; value: string }[]): AnyAction => action(CompaniesActionTypes.GET_REGIONS_SUCCESS, { regions });
export const getRegionsFailure = (error: string): AnyAction => action(CompaniesActionTypes.GET_REGIONS_FAILURE, { error });

export const getIndustries = (): AnyAction => action(CompaniesActionTypes.GET_INDUSTRIES);
export const getIndustriesSuccess = (industries: { label: string; value: string }[]): AnyAction =>
    action(CompaniesActionTypes.GET_INDUSTRIES_SUCCESS, { industries });
export const getIndustriesFailure = (error: string): AnyAction => action(CompaniesActionTypes.GET_INDUSTRIES_FAILURE, { error });

export const getCountryCodes = (): AnyAction => action(CompaniesActionTypes.GET_COUNTRY_CODES);
export const getCountryCodesSuccess = (countryCodes: IOption[]): AnyAction => action(CompaniesActionTypes.GET_COUNTRY_CODES_SUCCESS, { countryCodes });
export const getCountryCodesFailure = (error: string): AnyAction => action(CompaniesActionTypes.GET_COUNTRY_CODES_FAILURE, { error });

export const getFundingRounds = (): AnyAction => action(CompaniesActionTypes.GET_FUNDING_ROUNDS);
export const getFundingRoundsSuccess = (fundingRounds: IOption[]): AnyAction => action(CompaniesActionTypes.GET_FUNDING_ROUNDS_SUCCESS, { fundingRounds });
export const getFundingRoundsFailure = (error: string): AnyAction => action(CompaniesActionTypes.GET_FUNDING_ROUNDS_FAILURE, { error });

export const resetResizing = (): AnyAction => action(CompaniesActionTypes.RESET_RESIZING);
export const closeStatusResize = (): AnyAction => action(CompaniesActionTypes.CLOSE_STATUS_RESIZE);

export const changeSourceColumn = (status: boolean): AnyAction => action(CompaniesActionTypes.CHANGE_SOURCE_COLUMN, { status });

export const resetAllFilters = (): AnyAction => action(CompaniesActionTypes.RESET_ALL_FILTERS);

export const changeChipHeader = (value: boolean): AnyAction => action(CompaniesActionTypes.CHANGE_CHIP_HEADER, { value });

export const changeFilters = (value: IFilterItem[]): AnyAction => action(CompaniesActionTypes.CHANGE_FILTERS, value);

export const onSetIsOpenKeywordSidebar = (value: boolean): AnyAction => action(CompaniesActionTypes.ON_SET_IS_OPEN_KEYWORD_SIDEBAR, { value });
