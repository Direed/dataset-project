import { AlertActionTypes, AlertTypes, IAlertData } from './alert.types';
import { action } from 'typesafe-actions';
import { AnyAction } from 'redux';

export const openAlert = (alertId: AlertTypes, alertData: IAlertData): AnyAction => action(AlertActionTypes.ADD_ALERT, { alertId, alertData });

export const closeAlert = (alertId: AlertTypes): AnyAction => action(AlertActionTypes.CLOSE_ALERT, { alertId });
