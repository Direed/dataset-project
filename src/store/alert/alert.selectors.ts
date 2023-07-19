import { RootState } from '..';
import { IAlertState } from './alert.types';

export const getAlerts = (state: RootState): IAlertState => state.alert;
