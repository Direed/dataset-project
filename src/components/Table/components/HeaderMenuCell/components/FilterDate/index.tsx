import React, { useCallback, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters } from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';
import { filterTableByMaxDate, filterTableByMinDate, setNeedFilter } from '../../../../../../store/companies/companies.actions';
import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface IProps {
    title: string;
    onSubmit: () => void;
}

const FilterDate: React.FC<IProps> = ({ onSubmit, title }) => {
    const filters = useSelector(getCompaniesTableFilters);
    const dateFilter = filters[title].find((item) => item.type === SearchType.RANGE_DATE);
    const dispatch = useDispatch();
    const onChangeMinDateFilter = useCallback((value) => {
        dispatch(filterTableByMinDate(title, value, SearchType.RANGE_DATE));
    }, []);
    const onChangeMaxDateFilter = useCallback((value) => {
        dispatch(filterTableByMaxDate(title, value, SearchType.RANGE_DATE));
    }, []);
    useEffect(() => {
        dispatch(setNeedFilter(title, SearchType.RANGE_DATE));
        const keyDownHandler = (event): void => {
            if (event.key === 'Enter') {
                event.preventDefault();
                onSubmit();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    return (
        <div className="date-picker-wrapper">
            <p className="date-picker-title">From</p>
            <DatePicker
                minDate={new Date('1970-01-01')}
                maxDate={new Date(dateFilter.value[1])}
                className="date-picker"
                selected={new Date(dateFilter.value[0] || '')}
                onChange={onChangeMinDateFilter}
            />
            <p className="date-picker-title">To</p>
            <DatePicker
                minDate={new Date(dateFilter.value[0])}
                maxDate={new Date()}
                className="date-picker"
                selected={new Date(dateFilter.value[1] || '')}
                onChange={onChangeMaxDateFilter}
            />
        </div>
    );
};

export default React.memo(FilterDate);
