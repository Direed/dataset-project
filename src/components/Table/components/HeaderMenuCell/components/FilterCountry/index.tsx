import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters } from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';
import CustomSelect from '../../../../../Select';
import { filterTableByLocation } from '../../../../../../store/companies/companies.actions';
import { countries } from '../../../../../../constants';
import './style.scss';

interface IProps {
    title: string;
}

const FilterCountry: React.FC<IProps> = ({ title }) => {
    const dispatch = useDispatch();
    const filters = useSelector(getCompaniesTableFilters);
    const dateFilter = filters[title].find((item) => item.type === SearchType.SORT_BY_LOCATION);
    const onChange = useCallback(
        (e) => {
            dispatch(filterTableByLocation(title, e, SearchType.SORT_BY_LOCATION));
        },
        [dateFilter]
    );
    return (
        <div className="container">
            <CustomSelect isMulti withOther onChange={onChange} options={countries} value={dateFilter.value} />
        </div>
    );
};

export default React.memo(FilterCountry);
