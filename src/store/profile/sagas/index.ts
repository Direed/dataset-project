import { all, fork } from 'redux-saga/effects';
import { watcherInviteFriendSaga } from './inviteFriend';

export function* profileSaga(): Generator {
    yield all([fork(watcherInviteFriendSaga)]);
}
