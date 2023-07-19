import { call, put, takeLatest } from 'redux-saga/effects';
import { AccountActionTypes, IUserInfo } from '../account.types';
import { resetPassword } from '../../../libs/api';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';
import { resetPasswordFailure, resetPasswordSuccess } from '../account.actions';
import { openAlert } from '../../alert/alert.actions';
import { AlertFlow, AlertTypes } from '../../alert/alert.types';
import { localStorageType } from '../../../enums/localStorage';

export function* resetPasswordSaga(action: AnyAction): Generator {
    try {
        const { data, token } = action.payload;

        const response = (yield call(resetPassword, data, token || '')) as AxiosResponse<IUserInfo>;
        if (response) {
            localStorage.setItem(localStorageType.TOKEN, `${response.data.token}`);
            localStorage.setItem(localStorageType.TIME, `${response.data.expire}`);
            yield put(resetPasswordSuccess());
            yield put(
                openAlert(AlertTypes.RESET_PASSWORD, {
                    open: true,
                    content: 'Password has successfully changed',
                    status: AlertFlow.SUCCESS,
                })
            );
        }
    } catch (error: any) {
        yield put(
            openAlert(AlertTypes.RESET_PASSWORD, {
                open: true,
                content: 'Something went wrong, try again later!',
                status: AlertFlow.ERROR,
            })
        );
        yield put(resetPasswordFailure(error?.response?.data?.detail));
    }
}

export function* watcherResetPasswordSaga(): Generator {
    yield takeLatest(AccountActionTypes.RESET_PASSWORD, resetPasswordSaga);
}
