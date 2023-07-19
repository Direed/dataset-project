import { call, put, takeLatest } from 'redux-saga/effects';
import { forgotPasswordFailure, forgotPasswordSuccess } from '../account.actions';
import { AccountActionTypes } from '../account.types';
import { openAlert } from '../../alert/alert.actions';
import { AlertFlow, AlertTypes } from '../../alert/alert.types';
import { AnyAction } from 'redux';
import { forgotPassword } from '../../../libs/api';

export function* forgotPasswordSaga(action: AnyAction): Generator {
    try {
        yield call(forgotPassword, action.payload);
        yield put(
            openAlert(AlertTypes.FORGOT_PASSWORD, {
                open: true,
                content: 'Please check your email',
                status: AlertFlow.SUCCESS,
            })
        );
        yield put(forgotPasswordSuccess());
    } catch (error: any) {
        yield put(
            openAlert(AlertTypes.EXPORT_ROWS, {
                open: true,
                content: 'Something went wrong, try again later!',
                status: AlertFlow.ERROR,
            })
        );
        yield put(forgotPasswordFailure(error?.response?.data?.detail || ''));
    }
}

export function* watcherForgotPasswordSaga(): Generator {
    yield takeLatest(AccountActionTypes.FORGOT_PASSWORD, forgotPasswordSaga);
}
