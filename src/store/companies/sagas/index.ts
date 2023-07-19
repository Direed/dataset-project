import { all, fork } from 'redux-saga/effects';
import { watcherGetTableDataSaga } from './getTableRows';
import { watcherCitiesSaga } from './getCities';
import { watcherRegionsSaga } from './getRegions';
import { watcherCountryCodesSaga } from './getCountryCodes';
import { watcherFundingRoundsSaga } from './getFundingRounds';
import { watcherIndustriesSaga } from './getIndustries';

export function* companiesSaga(): Generator {
    yield all([
        fork(watcherGetTableDataSaga),
        fork(watcherCitiesSaga),
        fork(watcherRegionsSaga),
        fork(watcherCountryCodesSaga),
        fork(watcherFundingRoundsSaga),
        fork(watcherIndustriesSaga),
    ]);
}
