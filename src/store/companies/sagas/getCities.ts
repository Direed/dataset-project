import { call, put, takeLatest } from 'redux-saga/effects';
import { CompaniesActionTypes } from '../companies.types';
import { AxiosResponse } from 'axios';
import { getCities } from '../../../libs/api';
import { getCitiesFailure, getCitiesSuccess } from '../companies.actions';

export function* getCitiesSaga(): Generator {
    try {
        const response = (yield call(getCities)) as AxiosResponse<any>;
        yield put(getCitiesSuccess(response.data));
    } catch (error: any) {
        yield put(getCitiesFailure(error));
    }
}

export function* watcherCitiesSaga(): Generator {
    yield takeLatest(CompaniesActionTypes.GET_CITIES, getCitiesSaga);
}
