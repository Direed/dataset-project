import React, { useCallback, useEffect } from 'react';
import { filterTableBySearch } from '../../../../../../store/companies/companies.actions';
import { useDispatch, useSelector } from 'react-redux';
import { IClasses, useStyles } from './styles';
import { getCompaniesTableFilters } from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';

interface IProps {
    title: string;
    onSubmit: () => void;
}

const FilterSearch: React.FC<IProps> = ({ title, onSubmit }) => {
    const dispatch = useDispatch();
    const filters = useSelector(getCompaniesTableFilters);
    const searchFilter = filters[title].find((item) => item.type === SearchType.SEARCH);
    const onChangeSearch = useCallback((e) => {
        dispatch(filterTableBySearch(title, e.target.value, SearchType.SEARCH));
    }, []);
    const classes: IClasses = useStyles();
    useEffect(() => {
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
        <div>
            <div className={classes.container}>
                <input autoFocus type="text" className={classes.input} placeholder="Search" onChange={onChangeSearch} value={searchFilter.value} />
                <div className={classes.border} />
            </div>
        </div>
    );
};

export default React.memo(FilterSearch);
