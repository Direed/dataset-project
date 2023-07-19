import { call, put, takeLatest } from 'redux-saga/effects';
import { CompaniesActionTypes } from '../companies.types';
import { AxiosResponse } from 'axios';
import { getFundingRounds } from '../../../libs/api';
import { getFundingRoundsFailure, getFundingRoundsSuccess } from '../companies.actions';

export function* getFundingRoundsSaga(): Generator {
    try {
        const response = (yield call(getFundingRounds)) as AxiosResponse<any>;
        yield put(getFundingRoundsSuccess(response.data));
    } catch (error: any) {
        yield put(getFundingRoundsFailure(error));
    }
}

export function* watcherFundingRoundsSaga(): Generator {
    yield takeLatest(CompaniesActionTypes.GET_FUNDING_ROUNDS, getFundingRoundsSaga);
}
