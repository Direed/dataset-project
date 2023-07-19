import React, { useCallback, useEffect, useState } from 'react';
import { Divider, MenuItem } from '@mui/material';
import { filterTableByOrder, requestData } from '../../../../../../store/companies/companies.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters } from '../../../../../../store/companies/companies.selectors';
import { SearchType, SortOrder } from '../../../../../../enums';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useLazyTableQuery } from '../../../../../../hooks/useLazyTableQuery';

interface IProps {
    title: string;
}

const FilterOrder: React.FC<IProps> = ({ title }) => {
    const filters = useSelector(getCompaniesTableFilters);
    const [isChanged, setIsChanged] = useState(false);
    const orderFilter = filters[title].find((item) => item.type === SearchType.SORT_ORDER);
    const dispatch = useDispatch();
    const { getTableData } = useLazyTableQuery();

    const onChangeOrderFilter = useCallback((value: SortOrder) => {
        dispatch(filterTableByOrder(title, value, SearchType.SORT_ORDER));
        setIsChanged(true);
    }, []);
    useEffect(() => {
        if (isChanged && orderFilter.value) {
            dispatch(
                requestData({
                    getTableData,
                })
            );
        }
    }, [orderFilter]);
    return (
        <div>
            <MenuItem onClick={() => onChangeOrderFilter(SortOrder.DESC)} disableRipple>
                {orderFilter.value === SortOrder.DESC ? <RadioButtonCheckedIcon fontSize="medium" /> : <RadioButtonUncheckedIcon fontSize="large" />}
                DESCENDING
            </MenuItem>
            <MenuItem onClick={() => onChangeOrderFilter(SortOrder.ASC)} disableRipple>
                {orderFilter.value === SortOrder.ASC ? <RadioButtonCheckedIcon fontSize="medium" /> : <RadioButtonUncheckedIcon fontSize="large" />}
                ASCENDING
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
        </div>
    );
};

export default React.memo(FilterOrder);
