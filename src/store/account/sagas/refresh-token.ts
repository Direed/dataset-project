import { call, put, takeLatest } from 'redux-saga/effects';
import { refreshTokenFailure } from '../account.actions';
import { AccountActionTypes } from '../account.types';
import { refreshTokenToken } from '../../../libs/api';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';
import { localStorageType } from '../../../enums/localStorage';

export function* refreshTokenSaga(action: AnyAction): Generator {
    try {
        const response = (yield call(refreshTokenToken, action.payload)) as AxiosResponse<{ token: string; expire: number }>;
        localStorage.setItem(localStorageType.TOKEN, response.data?.token);
        localStorage.setItem(localStorageType.TIME, `${response.data?.expire}`);
    } catch (error: any) {
        localStorage.removeItem(localStorageType.TOKEN);
        localStorage.removeItem(localStorageType.USER_PHOTO);
        localStorage.removeItem(localStorageType.TIME);
        yield put(refreshTokenFailure());
    }
}

export function* watcherRefreshTokenSaga(): Generator {
    yield takeLatest(AccountActionTypes.REFRESH_TOKEN, refreshTokenSaga);
}
