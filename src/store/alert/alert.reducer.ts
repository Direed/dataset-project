import { AnyAction } from 'redux';
import { AlertActionTypes, IAlertState } from './alert.types';
// reducer for controlling process, showing information about statuses of some actions
const initialState: IAlertState = {
    alert: {},
};

export const alertReducer = (state: IAlertState = initialState, action: AnyAction): IAlertState => {
    switch (action.type) {
        case AlertActionTypes.ADD_ALERT: {
            return {
                ...state,
                alert: action.payload.alertData,
            };
        }

        case AlertActionTypes.CLOSE_ALERT: {
            return {
                ...state,
                alert: {},
            };
        }
        default:
            return state;
    }
};
