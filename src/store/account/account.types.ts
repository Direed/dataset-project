export enum AccountActionTypes {
    LOGIN_REQUEST = '@@account/LOGIN_REQUEST',
    LOGIN_SUCCESS = '@@account/LOGIN_SUCCESS',
    LOGIN_FAILURE = '@@account/LOGIN_FAILURE',

    FORGOT_PASSWORD = '@@account/FORGOT_PASSWORD',
    FORGOT_PASSWORD_FAILURE = '@@account/FORGOT_PASSWORD_FAILURE',
    FORGOT_PASSWORD_SUCCESS = '@@account/FORGOT_PASSWORD_SUCCESS',

    USER_ME_REQUEST = '@@account/USER_ME_REQUEST',
    USER_ME_SUCCESS = '@@account/USER_ME_SUCCESS',
    USER_ME_FAILURE = '@@account/USER_ME_FAILURE',

    RESET_PASSWORD = '@@account/RESET_PASSWORD',
    RESET_PASSWORD_FAILURE = '@@account/RESET_PASSWORD_FAILURE',
    RESET_PASSWORD_SUCCESS = '@@account/RESET_PASSWORD_SUCCESS',
    REFRESH_TOKEN = '@@account/REFRESH_TOKEN',
    REFRESH_TOKEN_SUCCESS = '@@account/REFRESH_TOKEN_SUCCESS',
    REFRESH_TOKEN_FAILURE = '@@account/REFRESH_TOKEN_FAILURE',
    LOG_OUT = '@@account/LOG_OUT',

    VERIFY_EMAIL = '@@account/VERIFY_EMAIL',
    VERIFY_EMAIL_SUCCESS = '@@account/VERIFY_EMAIL_SUCCESS',
    VERIFY_EMAIL_FAILURE = '@@account/VERIFY_EMAIL_FAILURE',
}

export interface IAccount {
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
}
export interface IUserInfo {
    email?: string;
    expire: number;
    full_name?: string;
    role?: string;
    team?: string;
    token?: string;
}

export interface IValidEmail {
    isValidEmail: boolean;
    error: string | null;
}

export interface IResetPassword {
    isSuccess: boolean;
    error: string | null;
}

export interface IVerifyEmail {
    isSuccess: boolean;
    error: string | null;
}

export interface IUserMe {
    error: string | null;
    role: string;
    isLoading?: boolean;
}

export interface IAccountState {
    account: IAccount;
    validEmail: IValidEmail;
    resetPassword: IResetPassword;
    verifyEmail: IVerifyEmail;
    userMe: IUserMe;
}
