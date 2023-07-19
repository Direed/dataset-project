import { AnyAction, CombinedState, combineReducers, Reducer } from 'redux';
import { storeEntities } from '../enums';
import { accountReducer } from './account/account.reducer';
import { IAccountState } from './account/account.types';
import { ICompaniesState } from './companies/companies.types';
import { IFilterState } from './filter/filter.types';
import { companiesReducer } from './companies/companies.reducer';
import { filterReducer } from './filter/filter.reducer';
import { IAlertState } from './alert/alert.types';
import { alertReducer } from './alert/alert.reducer';
import { IProfileState } from './profile/profile.types';
import { profileReducer } from './profile/profile.reducer';

export interface IStateStore {
    [storeEntities.ACCOUNT]: IAccountState;
    [storeEntities.COMPANIES]: ICompaniesState;
    [storeEntities.FILTERS]: IFilterState;
    [storeEntities.ALERT]: IAlertState;
    [storeEntities.PROFILE]: IProfileState;
}

export const createRootReducer = (): Reducer<CombinedState<IStateStore>> => {
    return combineReducers({
        account: accountReducer,
        companies: companiesReducer,
        filters: filterReducer,
        profile: profileReducer,
        alert: alertReducer,
    });
};

export const rootReducer =
    () =>
    (state: IStateStore | undefined, action: AnyAction): IStateStore => {
        return createRootReducer()(state, action);
    };
