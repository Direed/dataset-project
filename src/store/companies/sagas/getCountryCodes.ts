import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CompaniesActionTypes } from '../companies.types';
import { AxiosResponse } from 'axios';
import { getCountryCodes } from '../../../libs/api';
import { filterTableByLocation, getCountryCodesFailure, getCountryCodesSuccess } from '../companies.actions';
import { CellNameType } from '../../../enums/cellNameType';
import { SearchType } from '../../../enums';
import { getCompaniesTableFilters } from '../companies.selectors';

export function* getCountryCodesSaga(): Generator {
    try {
        const response = (yield call(getCountryCodes)) as AxiosResponse<any>;
        const filters: any = yield select(getCompaniesTableFilters);
        const updatedCountryCodeValue = filters[CellNameType.COUNTRY_CODE][0].value.map((item) => ({ value: item.value, label: response.data[item.value] }));

        yield put(filterTableByLocation(CellNameType.COUNTRY_CODE, updatedCountryCodeValue, SearchType.SORT_BY_LOCATION));
        yield put(getCountryCodesSuccess(response.data));
    } catch (error: any) {
        yield put(getCountryCodesFailure(error));
    }
}

export function* watcherCountryCodesSaga(): Generator {
    yield takeLatest(CompaniesActionTypes.GET_COUNTRY_CODES, getCountryCodesSaga);
}
