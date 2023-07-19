import { AnyAction } from 'redux';
import { action } from 'typesafe-actions';
import { ProfileActionTypes } from './profile.types';

export const inviteFriend = (email: string): AnyAction => action(ProfileActionTypes.INVITE_FRIEND, { email });
export const inviteFriendSuccess = (): AnyAction => action(ProfileActionTypes.INVITE_FRIEND_SUCCESS);
export const inviteFriendFailure = (error: string): AnyAction => action(ProfileActionTypes.INVITE_FRIEND_FAILURE, { error });
