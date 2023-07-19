import { axios } from '../../../axios';
import { IAccount } from '../../../store/account/account.types';

export const login = async (requestDto: IAccount): Promise<string> => {
    return await axios.post('/users/authenticate', requestDto);
};

export const userMe = async (token: string): Promise<string> => {
    return await axios.post('/users/me', { token });
};

export const forgotPassword = async ({ email }: { email: string }): Promise<string> => {
    return await axios.post('/users/forgot_pass', {}, { params: { email } });
};

export const resetPassword = async (data: { password: string; repeatPassword: string }, token): Promise<string> => {
    return await axios.post('/users/restore', {
        user: {
            password: data.password,
        },
        auth: { token },
    });
};

export const refreshTokenToken = async (token: string): Promise<string> => {
    return await axios.post('/users/refresh_token', { token });
};

export const verifyEmail = async (token: string, { full_name, email, password }: { full_name: string; email: string; password: string }): Promise<string> => {
    const user = { full_name, email, password, role: 'customer' };
    return await axios.post('/users/verify', { user, auth: { token } });
};
