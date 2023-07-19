import React, { useCallback } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { IClasses, useStyles } from './style';
import CustomInput from '../../../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalSearch } from '../../../../store/companies/companies.selectors';
import { changeFindInView, changeGlobalSearch } from '../../../../store/companies/companies.actions';

const SearchMenuDropdown: React.FC = () => {
    const dispatch = useDispatch();
    const onChange = useCallback((e) => {
        dispatch(changeGlobalSearch(e.target.value));
    }, []);
    const onChangeSearchType = useCallback((_, checked) => {
        dispatch(changeFindInView(checked));
    }, []);
    const search = useSelector(getGlobalSearch);
    const classes: IClasses = useStyles();

    return (
        <div className={classes.searchMenu}>
            <FormControlLabel control={<Checkbox onChange={onChangeSearchType} size="small" />} label="Find in View" />
            <CustomInput onChange={onChange} value={search} className={classes.customInput} label="Search value" />
        </div>
    );
};

export default React.memo(SearchMenuDropdown);
