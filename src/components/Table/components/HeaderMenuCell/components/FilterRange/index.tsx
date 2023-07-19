import React, { useCallback, useEffect, useRef } from 'react';
import { Divider, MenuItem, Slider, Box } from '@mui/material';
import { useStyles } from './styles';
import { filterTableByMax, filterTableByMin } from '../../../../../../store/companies/companies.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters } from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';
import { useDebounce } from '../../../../../../hooks/useDebounce';
import { CellNameType } from '../../../../../../enums/cellNameType';
import { ranges } from '../../../../../../constants/table/ranges';
import { toMillionFormatter } from '../../../../../../utils/numberFormatted';

interface IProps {
    title: string;
    type: SearchType;
}

const FilterRange: React.FC<IProps> = ({ title, type }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const filters = useSelector(getCompaniesTableFilters);
    const rangeFilter = filters[title].find((item) => item.type === type);
    const [value, setValue] = React.useState<number[]>(
        rangeFilter.value.max ? [rangeFilter.value.min, rangeFilter.value.max] : [ranges[title].min, ranges[title].max]
    );
    const range = { min: ranges[title].min, max: ranges[title].max };
    const debouncedMin = useDebounce(String(value[0]), 300);
    const debouncedMax = useDebounce(String(value[1]), 300);
    const valueText = useCallback(
        (sliderValue: number) => {
            if (type === SearchType.PERCENTAGE_RANGE || type === SearchType.CHECKED_RANGE) {
                return `${sliderValue}%`;
            }
            if (type === SearchType.USD_RANGE) {
                return toMillionFormatter(sliderValue);
            }

            return sliderValue;
        },
        [rangeFilter, value, title, type]
    );
    const handleChange = useCallback((_event: Event, value: number | number[]) => {
        setValue(value as number[]);
    }, []);
    const onChangeMinInput = useCallback(
        (e) => {
            if (+e.target.value >= range.min && e.target.value <= value[1]) {
                setValue([e.target.value !== '' ? e.target.value : '0', value[1]]);
                dispatch(filterTableByMin(title, +e.target.value, type));
            }
        },
        [value, type]
    );
    const onChangeMaxInput = useCallback(
        (e) => {
            if (e.target.value <= range.max && e.target.value > value[0]) {
                setValue([value[0], e.target.value]);
                dispatch(filterTableByMax(title, e.target.value, type));
            }
        },
        [value, type]
    );
    const onMenuItemClick = useCallback((ref) => {
        ref.current.focus();
    }, []);

    useEffect(() => {
        if (debouncedMin) {
            dispatch(filterTableByMin(title, value[0], type));
        }
        if (debouncedMax) {
            dispatch(filterTableByMax(title, value[1], type));
        }
    }, [debouncedMin, debouncedMax]);
    return (
        <div>
            <MenuItem
                onClick={(e) => {
                    onMenuItemClick(minRef);
                    e.stopPropagation();
                }}
            >
                {rangeFilter?.title || 'Amount'} {title === CellNameType.TOTAL_FUNDING && '$'} {`>`}{' '}
                <input ref={minRef} type="number" className={classes.input} placeholder="min" value={value[0]} onChange={onChangeMinInput} />
            </MenuItem>
            <MenuItem
                onClick={(e) => {
                    onMenuItemClick(maxRef);
                    e.stopPropagation();
                }}
            >
                {rangeFilter?.title || 'Amount'} {title === CellNameType.TOTAL_FUNDING && '$'} {`<`}{' '}
                <input ref={maxRef} type="number" className={classes.input} placeholder="max" value={value[1]} onChange={onChangeMaxInput} />
            </MenuItem>
            <Box className={classes.sliderBox}>
                <Slider
                    value={value}
                    min={range.min}
                    max={range.max}
                    onChange={handleChange}
                    color="secondary"
                    valueLabelDisplay="auto"
                    valueLabelFormat={valueText}
                />
            </Box>
            <Divider sx={{ my: 0.5 }} />
        </div>
    );
};

export default React.memo(FilterRange);
