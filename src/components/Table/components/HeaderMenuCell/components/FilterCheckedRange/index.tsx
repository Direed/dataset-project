import React, { useCallback } from 'react';
import { Divider, Box, FormControlLabel } from '@mui/material';
import { useStyles } from './styles';
import { filterTableByRange } from '../../../../../../store/companies/companies.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters } from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';
import { ranges } from '../../../../../../constants/table/ranges';
import { Checkbox, FormGroup } from '@material-ui/core';

interface IProps {
    title: string;
    type: SearchType;
}

const FilterCheckedRange: React.FC<IProps> = ({ title, type }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const filters = useSelector(getCompaniesTableFilters);
    const rangeFilter = filters[title].find((item) => item.type === type);
    const [controls, setControls] = React.useState(rangeFilter.labels);

    const onFormControlChange = useCallback(
        (label): void => {
            const localRange = { min: ranges[title].max, max: ranges[title].min };
            const resetElement = controls.map((item) => {
                if (item.label === label) {
                    item.isChecked = !item.isChecked;
                }
                if (item.isChecked) {
                    if (item.range.min < localRange.min) {
                        localRange.min = item.range.min;
                    }
                    if (item.range.max > localRange.max) {
                        localRange.max = item.range.max;
                    }
                }
                return item;
            });
            dispatch(filterTableByRange(title, [localRange.min, localRange.max], type));
            setControls([...resetElement]);
        },
        [type, title, controls]
    );
    return (
        <div>
            <Box className={classes.checkedBox}>
                <FormGroup>
                    {controls?.map((item) => (
                        <FormControlLabel
                            key={item.label}
                            control={<Checkbox checked={item.isChecked} onChange={() => onFormControlChange(item.label)} />}
                            label={item.label}
                        />
                    ))}
                </FormGroup>
            </Box>
            <Divider sx={{ my: 0.5 }} />
        </div>
    );
};

export default React.memo(FilterCheckedRange);
