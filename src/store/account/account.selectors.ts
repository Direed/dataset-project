import { RootState } from '../index';
import { IAccount, IResetPassword, IUserMe, IValidEmail } from './account.types';

export const getAccount = (state: RootState): IAccount => state.account.account;
export const getValidEmail = (state: RootState): IValidEmail => state.account.validEmail;
export const getStatusResetPassword = (state: RootState): IResetPassword => state.account.resetPassword;
export const getVerifyStatus = (state: RootState): boolean => state.account.verifyEmail.isSuccess;
export const getUserMe = (state: RootState): IUserMe => state.account.userMe;
