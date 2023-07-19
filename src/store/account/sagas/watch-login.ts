import { call, delay, put, race, takeLatest } from 'redux-saga/effects';
import { loginFailure, loginSuccess } from '../account.actions';
import { AccountActionTypes } from '../account.types';
import { login } from '../../../libs/api';
import { AnyAction } from 'redux';
import { localStorageType } from '../../../enums/localStorage';

export function* loginSaga(action: AnyAction): Generator {
    try {
        const { undo, archive } = (yield race({
            undo: call(login, action.payload),
            archive: delay(60000),
        })) as any;
        if (undo) {
            localStorage.setItem(localStorageType.TOKEN, `${undo.data?.token}`);
            localStorage.setItem(localStorageType.TIME, `${undo.data?.expire}`);
            yield put(loginSuccess(undo.data));
        } else if (archive) {
            yield put(loginFailure('Something went wrong!'));
        }
    } catch (error: any) {
        yield put(loginFailure(error?.response?.data?.detail || 'Something went wrong!'));
    }
}

export function* watcherLoginSaga(): Generator {
    yield takeLatest(AccountActionTypes.LOGIN_REQUEST, loginSaga);
}
