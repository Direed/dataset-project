import { SearchType } from '../../enums';
import { IKeywordFilterItem } from '../../pages/Home/helpers';

export const filteredCompaniesFilters = (filterList): IKeywordFilterItem[] =>
    filterList?.filter((localStoreItem) => localStoreItem.type !== SearchType.KEYWORD && localStoreItem.type !== SearchType.SORT_ORDER);
