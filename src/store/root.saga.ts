import { all, fork } from 'redux-saga/effects';
import { accountSaga } from './account/sagas';
import { companiesSaga } from './companies/sagas';
import { profileSaga } from './profile/sagas';

export function* rootSaga(): Generator {
    yield all([fork(accountSaga), fork(companiesSaga), fork(profileSaga)]);
}
