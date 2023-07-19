import { select, takeLatest } from 'redux-saga/effects';
import { CompaniesActionTypes } from '../companies.types';
import { AnyAction } from 'redux';
import { getCompaniesTableFilters, getSortedTable } from '../companies.selectors';
import { checkOnEmpty } from '../../../utils/checkOnEmpty';
import { SearchType } from '../../../enums';
import { getKeywordSearch } from '../../filter/filter.selector';
import { rowsCount, startPage } from '../../../constants/table/rows';
import { saveToLocalStorage } from '../../../utils/localStorageHelper';
import { CellNameType } from '../../../enums/cellNameType';
import { filterTransformWithoutPrefix } from '../../../utils/filterTransformWithoutPrefix';
import { IFilterTable } from '../types/filterTypes';

export function* GetTableDataSaga(action: AnyAction): Generator {
    const filters: any = yield select(getCompaniesTableFilters);
    const keywordsSearch: any = yield select(getKeywordSearch);
    const tableSortArrows: any = yield select(getSortedTable);
    const searchFilterData = {};
    const { page, data, getTableData } = action.payload;
    const orderByList: { columnName: string; direction: string }[] = tableSortArrows.title
        ? [{ columnName: tableSortArrows.title, direction: tableSortArrows.sort.toLocaleLowerCase() }]
        : [{ columnName: 'updated_at', direction: 'desc' }];
    const orderBy = {};
    if (!data?.isSidebar) {
        for (const key in filters) {
            const filter = filters[key].filter((item) => checkOnEmpty(item, item.type));
            if (filter.length) {
                filter.map((item) => {
                    if (item.type !== SearchType.SORT_ORDER) {
                        const { keyName, value } = filterTransformWithoutPrefix(item, key);
                        searchFilterData[keyName] = key === CellNameType.NAME ? [value] : value;
                    } else {
                        orderByList.push({ columnName: key, direction: item.value.toLowerCase() });
                    }
                });
            }
        }
    }
    orderByList.forEach((item) => {
        orderBy[item.columnName] = item.direction;
    });
    saveToLocalStorage(filters as IFilterTable, keywordsSearch);

    if (getTableData) {
        getTableData({
            variables: {
                ...searchFilterData,
                orderBy,
                offset: (page - startPage) * rowsCount,
                limit: rowsCount,
            },
        });
    }
}

export function* watcherGetTableDataSaga(): Generator {
    yield takeLatest(CompaniesActionTypes.REQUEST_TABLE_DATA, GetTableDataSaga);
}
