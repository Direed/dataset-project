import { all, fork } from 'redux-saga/effects';
import { watcherLoginSaga } from './watch-login';
import { watcherForgotPasswordSaga } from './watch-forgot-password';
import { watcherResetPasswordSaga } from './watch-reset-password';
import { watcherRefreshTokenSaga } from './refresh-token';
import { watcherVerifyEmailSaga } from './watch-verify-email';
import { watcherUserMeSaga } from './watch-me';

export function* accountSaga(): Generator {
    yield all([
        fork(watcherLoginSaga),
        fork(watcherUserMeSaga),
        fork(watcherVerifyEmailSaga),
        fork(watcherForgotPasswordSaga),
        fork(watcherResetPasswordSaga),
        fork(watcherRefreshTokenSaga),
    ]);
}
