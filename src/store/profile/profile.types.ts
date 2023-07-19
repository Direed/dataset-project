export enum ProfileActionTypes {
    INVITE_FRIEND = '@@profile/INVITE_FRIEND',
    INVITE_FRIEND_SUCCESS = '@@profile/INVITE_FRIEND_SUCCESS',
    INVITE_FRIEND_FAILURE = '@@profile/INVITE_FRIEND_FAILURE',
}

export interface IInviteFriend {
    loading: boolean;
    error: string | null;
}

export interface IProfileState {
    inviteFriend: IInviteFriend;
}
