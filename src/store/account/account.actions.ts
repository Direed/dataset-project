import { AnyAction } from 'redux';
import { action } from 'typesafe-actions';
import { AccountActionTypes } from './account.types';
// Actions for account logic redux
export const loginRequest = (data: { email: string; password: string }): AnyAction => action(AccountActionTypes.LOGIN_REQUEST, data);
export const loginSuccess = (data: { token: string; expire: number; role: string; email: string }): AnyAction =>
    action(AccountActionTypes.LOGIN_SUCCESS, { data });
export const loginFailure = (error: string): AnyAction => action(AccountActionTypes.LOGIN_FAILURE, error);
export const logout = (): AnyAction => action(AccountActionTypes.LOG_OUT);
export const forgotPasswordRequest = (data: { email: string }): AnyAction => action(AccountActionTypes.FORGOT_PASSWORD, data);
export const forgotPasswordSuccess = (): AnyAction => action(AccountActionTypes.FORGOT_PASSWORD_SUCCESS);
export const forgotPasswordFailure = (error: string): AnyAction => action(AccountActionTypes.FORGOT_PASSWORD_FAILURE, error);

export const resetPasswordRequest = (data: { password: string; repeatPassword: string }, token): AnyAction =>
    action(AccountActionTypes.RESET_PASSWORD, { data, token });
export const resetPasswordSuccess = (): AnyAction => action(AccountActionTypes.RESET_PASSWORD_SUCCESS);
export const resetPasswordFailure = (error: string): AnyAction => action(AccountActionTypes.RESET_PASSWORD_FAILURE, error);

export const userMeSuccess = (data: any): AnyAction => action(AccountActionTypes.USER_ME_SUCCESS, data);
export const userMeRequest = (token: string): AnyAction => action(AccountActionTypes.USER_ME_REQUEST, { token });
export const userMeFailure = (data: any): AnyAction => action(AccountActionTypes.USER_ME_FAILURE, data);

export const refreshToken = (token: string): AnyAction => action(AccountActionTypes.REFRESH_TOKEN, token);
export const refreshTokenSuccess = (): AnyAction => action(AccountActionTypes.REFRESH_TOKEN_SUCCESS);
export const refreshTokenFailure = (): AnyAction => action(AccountActionTypes.REFRESH_TOKEN_FAILURE);

export const verifyEmail = (token: string, values): AnyAction => action(AccountActionTypes.VERIFY_EMAIL, { token, values });
export const verifyEmailSuccess = (): AnyAction => action(AccountActionTypes.VERIFY_EMAIL_SUCCESS);
export const verifyEmailFailure = (): AnyAction => action(AccountActionTypes.VERIFY_EMAIL_FAILURE);
