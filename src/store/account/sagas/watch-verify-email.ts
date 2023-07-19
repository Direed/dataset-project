import { put, takeLatest, call } from 'redux-saga/effects';
import { verifyEmailFailure, verifyEmailSuccess } from '../account.actions';
import { AccountActionTypes, IUserInfo } from '../account.types';
import { AnyAction } from 'redux';
import { verifyEmail } from '../../../libs/api';
import { AxiosResponse } from 'axios';
import { localStorageType } from '../../../enums/localStorage';

export function* verifyEmailSaga(action: AnyAction): Generator {
    try {
        const { token, values } = action.payload;
        const response = (yield call(verifyEmail, token, values)) as AxiosResponse<IUserInfo>;
        localStorage.setItem(localStorageType.TOKEN, `${response.data.token}`);
        localStorage.setItem(localStorageType.TIME, `${response.data.expire}`);
        yield put(verifyEmailSuccess());
    } catch (error: any) {
        yield put(verifyEmailFailure());
    }
}

export function* watcherVerifyEmailSaga(): Generator {
    yield takeLatest(AccountActionTypes.VERIFY_EMAIL, verifyEmailSaga);
}
