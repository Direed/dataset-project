import { axios } from '../../../axios';

export const inviteFriend = async (email: string, token): Promise<any> => {
    return await axios.post('users/invite', {}, { params: { email }, headers: { auth: token } });
};
