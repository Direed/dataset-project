import { takeLatest, call, put } from 'redux-saga/effects';
import { AccountActionTypes } from '../account.types';
import { AnyAction } from 'redux';
import { userMe } from '../../../libs/api';
import { userMeFailure, userMeSuccess } from '../account.actions';

export function* userMeSaga(action: AnyAction): Generator {
    try {
        const { token } = action.payload;
        const response = yield call(userMe, token);
        yield put(userMeSuccess(response));
    } catch (error: any) {
        yield put(userMeFailure(error));
    }
}

export function* watcherUserMeSaga(): Generator {
    yield takeLatest(AccountActionTypes.USER_ME_REQUEST, userMeSaga);
}
