import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters } from '../../store/companies/companies.selectors';
import CustomInput from '../Input';
import { IClasses, useStyles } from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { SearchType } from '../../enums';
import { filterTableBySearch, requestData } from '../../store/companies/companies.actions';
import { CellNameType } from '../../enums/cellNameType';
import CloseIcon from '@mui/icons-material/Close';
import { removeLocalStorageValues, resetSelectedSavedFilters } from '../../utils/localStorageHelper';
import { useLazyTableQuery } from '../../hooks/useLazyTableQuery';

interface ISearchDropdown {
    onSubmit: () => void;
}

const SearchOrganisations: React.FC<ISearchDropdown> = ({ onSubmit }) => {
    const ref = useRef<HTMLDivElement>(null);
    const classes: IClasses = useStyles();
    const { getTableData } = useLazyTableQuery();

    const dispatch = useDispatch();
    const filters = useSelector(getCompaniesTableFilters);
    const searchFilter = filters[CellNameType.NAME].find((item) => item.type === SearchType.SEARCH);
    const onChangeSearch = useCallback((e) => {
        dispatch(filterTableBySearch(CellNameType.NAME, e.target.value, SearchType.SEARCH));
    }, []);

    const onDelete = useCallback(() => {
        dispatch(filterTableBySearch(CellNameType.NAME, '', SearchType.SEARCH));
        removeLocalStorageValues(null, CellNameType.NAME);
        resetSelectedSavedFilters();
        dispatch(
            requestData({
                getTableData,
            })
        );
    }, []);

    const keyDownHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    }, []);
    return (
        <div className={classes.wrapper} ref={ref}>
            <CustomInput
                startIcon={<SearchIcon />}
                autoComplete={'off'}
                variant="standard"
                placeholder="Search organisations"
                label=""
                type="text"
                onChange={onChangeSearch}
                value={searchFilter?.value}
                icon={<CloseIcon />}
                withShowPassword={!!searchFilter?.value}
                onIconClick={onDelete}
                onKeyPress={keyDownHandler}
            />
        </div>
    );
};

export default React.memo(SearchOrganisations);
