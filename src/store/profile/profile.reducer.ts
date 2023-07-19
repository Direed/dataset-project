import { AnyAction, Reducer } from 'redux';
import { IInviteFriend, IProfileState, ProfileActionTypes } from './profile.types';

export const initialState: IProfileState = {
    inviteFriend: { loading: false, error: null },
};
const invitedFriendState = (state: IInviteFriend = initialState.inviteFriend, action: AnyAction): IInviteFriend => {
    switch (action.type) {
        case ProfileActionTypes.INVITE_FRIEND: {
            return {
                ...state,
                loading: true,
            };
        }
        case ProfileActionTypes.INVITE_FRIEND_SUCCESS: {
            return {
                ...state,
                loading: false,
            };
        }
        case ProfileActionTypes.INVITE_FRIEND_FAILURE: {
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error: error,
            };
        }
        default:
            return state;
    }
};

export const profileReducer: Reducer<IProfileState> = (state = initialState, action) => ({
    ...initialState,
    inviteFriend: invitedFriendState(state.inviteFriend, action),
});
