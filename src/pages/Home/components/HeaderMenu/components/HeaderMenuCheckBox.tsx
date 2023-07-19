import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setHideEmptyColumns, setSelectAllColumns } from '../../../../../store/filter/filter.actions';
import { getCompaniesData } from '../../../../../store/companies/companies.selectors';

const HeaderMenuCheckBox: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector(getCompaniesData);
    const [isChecked, setIsChecked] = useState(false);
    const handleVisibilityChange = useCallback(
        (e) => {
            setIsChecked(e.target.checked);

            if (e.target.checked) {
                dispatch(setHideEmptyColumns(data));
            } else {
                dispatch(setSelectAllColumns());
            }
        },
        [data]
    );

    useEffect(() => {
        if (isChecked) {
            dispatch(setHideEmptyColumns(data));
        }
    }, [data]);

    return <FormControlLabel control={<Checkbox size="small" checked={isChecked} onChange={handleVisibilityChange} />} label="Hide empty columns" />;
};

export default React.memo(HeaderMenuCheckBox);
