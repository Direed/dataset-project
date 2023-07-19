import React, { useCallback, useMemo } from 'react';
import { Checkbox, Divider, FormControlLabel } from '@mui/material';
import { setFilterTable } from '../../../../../../store/companies/companies.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters } from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';
import { useStyles } from './styles';

interface IProps {
    filter: {
        value: {
            value: string;
            label: string;
        }[];
        type: SearchType;
    };
    title: string;
}

const FilterEqual: React.FC<IProps> = ({ title, filter }) => {
    const filters = useSelector(getCompaniesTableFilters);
    const classes = useStyles();
    const equalFilter = useMemo(() => filters[title]?.find((item) => item.type === SearchType.EQUAL || item.type === SearchType.EQUAL_IN_PART), [filters]);
    const dispatch = useDispatch();
    const onChangeEqualFilter = useCallback(
        (value: { value: string; label: string }) => {
            dispatch(setFilterTable(title, value, filter.type));
        },
        [title]
    );
    return (
        <div>
            {filter.value.map((item: { value: string; label: string }, index) => (
                <div key={`item-${item.value}-${index}`} className={classes.input}>
                    <FormControlLabel
                        onChange={() => onChangeEqualFilter(item)}
                        control={<Checkbox size="small" checked={equalFilter.value.some((value) => value.value === item.value)} />}
                        label={item.label}
                    />
                </div>
            ))}
            <Divider sx={{ my: 0.5 }} />
        </div>
    );
};

export default React.memo(FilterEqual);
