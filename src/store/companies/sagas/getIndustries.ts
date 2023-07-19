import { call, put, takeLatest } from 'redux-saga/effects';
import { CompaniesActionTypes } from '../companies.types';
import { AxiosResponse } from 'axios';
import { getIndustries } from '../../../libs/api';
import { getIndustriesFailure, getIndustriesSuccess } from '../companies.actions';

export function* getIndustriesSaga(): Generator {
    try {
        const response = (yield call(getIndustries)) as AxiosResponse<any>;
        yield put(getIndustriesSuccess(response.data));
    } catch (error: any) {
        yield put(getIndustriesFailure(error));
    }
}

export function* watcherIndustriesSaga(): Generator {
    yield takeLatest(CompaniesActionTypes.GET_INDUSTRIES, getIndustriesSaga);
}
