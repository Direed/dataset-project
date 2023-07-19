import { call, put, takeLatest } from 'redux-saga/effects';
import { CompaniesActionTypes } from '../companies.types';
import { AxiosResponse } from 'axios';
import { getRegions } from '../../../libs/api';
import { getRegionsFailure, getRegionsSuccess } from '../companies.actions';

export function* getRegionsSaga(): Generator {
    try {
        const response = (yield call(getRegions)) as AxiosResponse<any>;
        yield put(getRegionsSuccess(response.data));
    } catch (error: any) {
        yield put(getRegionsFailure(error));
    }
}

export function* watcherRegionsSaga(): Generator {
    yield takeLatest(CompaniesActionTypes.GET_REGIONS, getRegionsSaga);
}
