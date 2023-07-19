import React, { useCallback, useState, useEffect } from 'react';
import { Button, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import { useStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters } from '../../../../store/companies/companies.actions';
import { changeKeywordFilters } from '../../../../store/filter/filter.actions';
import { SearchType } from '../../../../enums';
import { IFilterItem, IKeywordFilterItem } from '../../helpers';
import { localStorageType } from '../../../../enums/localStorage';
import CloseIcon from '@mui/icons-material/Close';
import { useLazyTableQuery } from '../../../../hooks/useLazyTableQuery';
import { CellNameType } from '../../../../enums/cellNameType';
import { getCountryCodesData } from '../../../../store/companies/companies.selectors';

interface IProps {
    handleClose: () => void;
}

const FiltersMenuDropdown: React.FC<IProps> = ({ handleClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const countryCodes = useSelector(getCountryCodesData);
    const [checkedFilters, setCheckedFilters] = useState<string[]>([]);

    const { getTableData } = useLazyTableQuery();

    let localStorageSavedFilters;

    try {
        localStorageSavedFilters = JSON.parse(String(localStorage.getItem(localStorageType.SAVED_FILTERS))) || [];
    } catch (e: any) {
        console.warn(e);
    }

    const [savedFilters, setSavedFilters] = useState(localStorageSavedFilters);

    useEffect(() => {
        setCheckedFilters(savedFilters.reduce((accum, obj) => (obj.selected ? accum.concat(obj.name) : accum), []));
    }, []);

    const onSubmit = useCallback(() => {
        let filters: IFilterItem[] = [];
        const updatedSavedFilters = savedFilters.map((item) => {
            const isCheckedItem = checkedFilters.includes(item.name);

            if (isCheckedItem) {
                filters = [...filters, ...item.filters];
            }

            return { ...item, selected: isCheckedItem };
        });

        localStorage.setItem(localStorageType.SAVED_FILTERS, JSON.stringify([...updatedSavedFilters]));

        const filteredFilters = filters.filter(
            (filter, index) => filters.findIndex((item) => item.field_name === filter.field_name && item.value === filter.value) === index
        );

        const companyFilters: IFilterItem[] = filteredFilters.filter((filter) => filter.type !== SearchType.KEYWORD);
        const keywordFilters: IKeywordFilterItem[] = filters.filter((filter) => filter.type === SearchType.KEYWORD && filter.value.length);

        if (keywordFilters.length) {
            const lastKeywordFilter: IKeywordFilterItem = keywordFilters.splice(-1)[0];

            keywordFilters.forEach((filter) => {
                if (
                    filter.category === lastKeywordFilter.category &&
                    filter.field_name === lastKeywordFilter.field_name &&
                    filter.select === lastKeywordFilter.select &&
                    filter.value.length
                ) {
                    lastKeywordFilter.value = [...lastKeywordFilter.value, ...filter.value];
                }
            });
            lastKeywordFilter.value = lastKeywordFilter.value.filter((filter, index) => lastKeywordFilter.value.findIndex((item) => item === filter) === index);
            dispatch(changeKeywordFilters([lastKeywordFilter]));
            localStorage.setItem(localStorageType.FILTERS, JSON.stringify([...companyFilters, lastKeywordFilter]));
        } else {
            dispatch(changeKeywordFilters([]));
            localStorage.setItem(localStorageType.FILTERS, JSON.stringify(companyFilters));
        }
        let updatedFilters = companyFilters;

        if (companyFilters.find((item) => item.field_name === CellNameType.COUNTRY_CODE)) {
            updatedFilters = companyFilters.map((item) =>
                item.field_name === CellNameType.COUNTRY_CODE
                    ? {
                          ...item,
                          value: item.value,
                          label: countryCodes[item.value],
                      }
                    : item
            );
        }
        dispatch(changeFilters(updatedFilters));

        handleClose();
    }, [checkedFilters, savedFilters, getTableData]);

    const onChange = useCallback(
        (filterName) => {
            const defaultSavedFilter = savedFilters.map((filter) => ({ ...filter, selected: false }));
            setSavedFilters(defaultSavedFilter);
            setCheckedFilters([filterName]);
        },
        [savedFilters]
    );

    const onDelete = useCallback(
        (filterName) => {
            const filteredFilters = savedFilters.filter((item) => item.name !== filterName);
            setSavedFilters(filteredFilters);
            localStorage.setItem(localStorageType.SAVED_FILTERS, JSON.stringify([...filteredFilters]));
        },
        [savedFilters]
    );

    useEffect(() => {
        const keyDownHandler = (event): void => {
            if (checkedFilters.length !== 0 && event.key === 'Enter') {
                event.preventDefault();
                onSubmit();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [checkedFilters]);

    return (
        <div className={classes.container}>
            {localStorageSavedFilters.length ? (
                localStorageSavedFilters.map((item, index) => (
                    <div key={`item-${item.name}-${index}`} className={classes.filterElement}>
                        <FormControlLabel
                            control={
                                <Checkbox size="small" checked={checkedFilters.some((filter) => item.name === filter)} onChange={() => onChange(item.name)} />
                            }
                            label={item.name}
                        />
                        <CloseIcon className={classes.closeIcon} onClick={() => onDelete(item.name)} />
                    </div>
                ))
            ) : (
                <Typography>No saved filters</Typography>
            )}
            <Divider sx={{ my: 0.5 }} />
            <div className={classes.buttonContainer}>
                <Button className={classes.button} disabled={!checkedFilters.length} onClick={onSubmit} color="secondary" variant="contained" size="small">
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default React.memo(FiltersMenuDropdown);
