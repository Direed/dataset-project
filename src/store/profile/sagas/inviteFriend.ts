import { call, put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { ProfileActionTypes } from '../profile.types';
import { inviteFriendFailure, inviteFriendSuccess } from '../profile.actions';
import { inviteFriend } from '../../../libs/api';
import { openAlert } from '../../alert/alert.actions';
import { AlertFlow, AlertTypes } from '../../alert/alert.types';
import { localStorageType } from '../../../enums/localStorage';

export function* inviteFriendSaga(action: AnyAction): Generator {
    const { email } = action.payload;
    try {
        const token = localStorage.getItem(localStorageType.TOKEN);
        yield call(inviteFriend, email, token);
        yield put(openAlert(AlertTypes.INVITE_FRIEND, { open: true, content: 'User is successfully invited', status: AlertFlow.SUCCESS }));
        yield put(inviteFriendSuccess());
    } catch (error: any) {
        yield put(openAlert(AlertTypes.INVITE_FRIEND, { open: true, content: 'Failed to invite user', status: AlertFlow.ERROR }));
        yield put(inviteFriendFailure(error));
    }
}

export function* watcherInviteFriendSaga(): Generator {
    yield takeLatest(ProfileActionTypes.INVITE_FRIEND, inviteFriendSaga);
}
