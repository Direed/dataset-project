import { RootState } from '../index';

export const getIsLoadingInviteFriend = (state: RootState): boolean => state.profile.inviteFriend.loading;
