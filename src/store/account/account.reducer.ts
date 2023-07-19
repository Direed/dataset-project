import { AnyAction, Reducer } from 'redux';
import { AccountActionTypes, IAccount, IAccountState, IResetPassword, IUserMe, IValidEmail, IVerifyEmail } from './account.types';
import { localStorageType } from '../../enums/localStorage';
// It's reducer for account, logic for make jwt token and add from local storage, and logic for validation and reset password
export const initialState: IAccountState = {
    account: {
        isAuthenticated: !!localStorage.getItem(localStorageType.TOKEN),
        error: null,
        isLoading: false,
    },
    validEmail: {
        isValidEmail: false,
        error: null,
    },
    resetPassword: {
        isSuccess: false,
        error: null,
    },
    verifyEmail: {
        isSuccess: false,
        error: null,
    },
    userMe: {
        error: null,
        role: '',
        isLoading: true,
    },
};

const account = (state: IAccount = initialState.account, action: AnyAction): IAccount => {
    switch (action.type) {
        case AccountActionTypes.LOGIN_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AccountActionTypes.LOGIN_SUCCESS:
        case AccountActionTypes.VERIFY_EMAIL_SUCCESS: {
            return { ...state, isAuthenticated: true, isLoading: false };
        }
        case AccountActionTypes.LOGIN_FAILURE: {
            return { ...state, error: action.payload, isLoading: false };
        }
        case AccountActionTypes.LOG_OUT: {
            localStorage.removeItem(localStorageType.TOKEN);
            localStorage.removeItem(localStorageType.USER_PHOTO);
            localStorage.removeItem(localStorageType.TIME);

            return { ...state, isAuthenticated: false };
        }
        case AccountActionTypes.REFRESH_TOKEN_FAILURE: {
            return { ...state, isAuthenticated: false };
        }
        default:
            return state;
    }
};

const validEmail = (state: IValidEmail = initialState.validEmail, action: AnyAction): IValidEmail => {
    switch (action.type) {
        case AccountActionTypes.FORGOT_PASSWORD: {
            return { ...state };
        }
        case AccountActionTypes.FORGOT_PASSWORD_SUCCESS: {
            return { ...state, isValidEmail: true };
        }
        case AccountActionTypes.FORGOT_PASSWORD_FAILURE: {
            return { ...state, isValidEmail: false, error: action.payload };
        }
        default:
            return state;
    }
};

const userMe = (state: IUserMe = initialState.userMe, action: AnyAction): IUserMe => {
    switch (action.type) {
        case AccountActionTypes.USER_ME_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AccountActionTypes.LOGIN_SUCCESS:
        case AccountActionTypes.USER_ME_SUCCESS: {
            return { ...state, role: action.payload.data?.role, isLoading: false };
        }
        case AccountActionTypes.USER_ME_FAILURE: {
            return { ...state, error: action.payload, isLoading: false };
        }

        default:
            return state;
    }
};

const resetPassword = (state: IResetPassword = initialState.resetPassword, action: AnyAction): IResetPassword => {
    switch (action.type) {
        case AccountActionTypes.RESET_PASSWORD: {
            return { ...state };
        }
        case AccountActionTypes.RESET_PASSWORD_FAILURE:
        case AccountActionTypes.RESET_PASSWORD_SUCCESS: {
            return { ...state, isSuccess: true };
        }
        default:
            return state;
    }
};

const verifyEmail = (state: IVerifyEmail = initialState.verifyEmail, action: AnyAction): IVerifyEmail => {
    switch (action.type) {
        case AccountActionTypes.VERIFY_EMAIL_SUCCESS: {
            return { ...state, isSuccess: true };
        }
        case AccountActionTypes.LOG_OUT: {
            return { ...state, isSuccess: false };
        }
        case AccountActionTypes.VERIFY_EMAIL_FAILURE: {
            return { ...state, error: action.payload.error };
        }
        default:
            return state;
    }
};

export const accountReducer: Reducer<IAccountState> = (state = initialState, action) => ({
    account: account(state.account, action),
    validEmail: validEmail(state.validEmail, action),
    resetPassword: resetPassword(state.resetPassword, action),
    verifyEmail: verifyEmail(state.verifyEmail, action),
    userMe: userMe(state.userMe, action),
});
