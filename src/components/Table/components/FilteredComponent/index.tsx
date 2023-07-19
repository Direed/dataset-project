import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ICompany } from '../../../../store/companies/companies.types';
import { useSelector } from 'react-redux';
import { getCompaniesData, getCompaniesTableFilters, getGlobalSearch, getGlobalSearchType } from '../../../../store/companies/companies.selectors';
import { getFiltersBar } from '../../../../store/filter/filter.selector';
import { filtersData, IFilter } from './filters';

interface IProps {
    setItems: (items: ICompany[]) => void;
}

const FilteredComponent: React.FC<IProps> = ({ setItems }) => {
    const [filterField, setFilterField] = useState<IFilter>({
        keywordsSearch: false,
        growthMetrics: false,
        affinityStatus: false,
        sourceBar: false,
        globalSearch: false,
    });
    const data = useSelector(getCompaniesData);
    const filters = useSelector(getCompaniesTableFilters);
    const filterParams = useMemo(() => Object.keys(filters), [filters]);
    const filtersBar = useSelector(getFiltersBar);
    const search = useSelector(getGlobalSearch);
    const inFindView = useSelector(getGlobalSearchType);
    const setFilters = useCallback(
        (field: string, value: boolean): void => {
            setFilterField({ ...filterField, [field]: value });
            setItems([...filtersData(data, { ...filterField, [field]: value }, { filterParams, filters, filtersBar, inFindView, search })]);
        },
        [filterField, data, filterParams, filters, filtersBar, inFindView, search]
    );
    useEffect(() => {
        setFilters('filterByTableParams', true);
    }, [filterParams]);
    useEffect(() => {
        setFilters('keywordsSearch', !!filtersBar.keywordsSearch.select);
    }, [filtersBar.keywordsSearch]);
    useEffect(() => {
        setFilters('growthMetrics', !!filtersBar.growthMetrics.length);
    }, [filtersBar.growthMetrics]);
    useEffect(() => {
        setFilters('globalSearch', inFindView && search.length >= 3);
    }, [inFindView, search]);
    return <></>;
};

export default React.memo(FilteredComponent);
