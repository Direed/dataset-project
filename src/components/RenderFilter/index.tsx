import React, { useCallback } from 'react';
import { Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IClasses, useStyles } from './style';
import { SearchType } from '../../enums';
import { CellNameType } from '../../enums/cellNameType';
import { getKeywordSearch } from '../../store/filter/filter.selector';
import {
    filterTableByLocation,
    filterTableBySearch,
    filterTableBySelect,
    onSetIsOpenKeywordSidebar,
    resetFilter,
    setFilterTable,
} from '../../store/companies/companies.actions';
import { removeLocalStorageValues, resetSelectedSavedFilters } from '../../utils/localStorageHelper';
import { deleteChip, resetKeywordFilter } from '../../store/filter/filter.actions';
import { cellNameTypes } from '../../constants/CellNameTypes';
import { toUSD } from '../../utils/numberFormatted';

interface IProps {
    item: { value: any; type: SearchType; selectOption: string; selectedColumn: string };
    field: CellNameType | string;
    handleClick: (event: React.MouseEvent<HTMLElement>, field: string) => void;
    onClearFilter: (value: string) => void;
}
const RenderFilter: React.FC<IProps> = ({ item, field, handleClick, onClearFilter }) => {
    const dispatch = useDispatch();
    const classes: IClasses = useStyles();

    const keywordsSearch = useSelector(getKeywordSearch);
    const onDeleteEqual = useCallback(
        (value) => {
            dispatch(setFilterTable(field, value, SearchType.EQUAL, true));
            removeLocalStorageValues(value.value);
            resetSelectedSavedFilters();
            onClearFilter(field);
        },
        [onClearFilter]
    );
    const onDeleteEqualInPart = useCallback(
        (value) => {
            dispatch(setFilterTable(field, value, SearchType.EQUAL_IN_PART, true));
            removeLocalStorageValues(value.value, null);
            resetSelectedSavedFilters();
            onClearFilter(field);
        },
        [onClearFilter]
    );
    const onDeleteRange = useCallback(
        (type: SearchType, field) => {
            dispatch(resetFilter(field, type));
            removeLocalStorageValues(null, field);
            resetSelectedSavedFilters();
            onClearFilter(field);
        },
        [onClearFilter]
    );
    const onDeleteSearch = useCallback(
        (value: string) => {
            if (typeof item.value === 'string') {
                dispatch(filterTableBySearch(field, '', SearchType.SEARCH));
                removeLocalStorageValues(null, field);
                dispatch(resetKeywordFilter(item.selectOption));
            } else {
                dispatch(deleteChip(item.selectOption, value));
            }
            resetSelectedSavedFilters();
            onClearFilter(field);
        },
        [item, keywordsSearch, onClearFilter]
    );
    const onDeleteCountry = useCallback(() => {
        dispatch(filterTableByLocation(field, [], item.type));
        removeLocalStorageValues(null, field);
        resetSelectedSavedFilters();
        onClearFilter(field);
    }, [onClearFilter, item, field]);

    const onDeleteSelect = useCallback(() => {
        dispatch(filterTableBySelect(field, { value: '', label: '' }, item.type));
        removeLocalStorageValues(null, field);
        resetSelectedSavedFilters();
        onClearFilter(field);
    }, [onClearFilter, item, field]);
    switch (item.type) {
        case SearchType.EQUAL_IN_PART:
            return (
                <>
                    {item.value.map((value) => (
                        <Chip
                            onDelete={() => onDeleteEqualInPart(value)}
                            key={value.value}
                            color="secondary"
                            label={value.label}
                            onClick={(e) => handleClick(e, field)}
                            clickable={true}
                        />
                    ))}
                </>
            );
        case SearchType.EQUAL:
            return (
                <>
                    {item.value.map((value) => (
                        <Chip
                            onDelete={() => onDeleteEqual(value)}
                            key={value.value}
                            color="secondary"
                            label={value.label}
                            onClick={(e) => handleClick(e, field)}
                            clickable={true}
                        />
                    ))}
                </>
            );
        case SearchType.CHECKED_RANGE:
        case SearchType.PERCENTAGE_RANGE: {
            const suffix = item.value.max ? '%' : '';
            return (
                <Chip
                    color="secondary"
                    onDelete={() => onDeleteRange(SearchType.RANGE, field)}
                    label={`${cellNameTypes[field].title}: ${item.value.min}${suffix} - ${item.value.max}${suffix}`}
                    onClick={(e) => handleClick(e, field)}
                    clickable={true}
                />
            );
        }
        case SearchType.RANGE: {
            return (
                <Chip
                    color="secondary"
                    onDelete={() => onDeleteRange(SearchType.RANGE, field)}
                    label={`${cellNameTypes[field].title}: ${item.value.min} - ${item.value.max}`}
                    onClick={(e) => handleClick(e, field)}
                    clickable={true}
                />
            );
        }
        case SearchType.USD_RANGE: {
            return (
                <Chip
                    color="secondary"
                    onDelete={() => onDeleteRange(SearchType.RANGE, field)}
                    label={`${cellNameTypes[field].title}: ${toUSD(item.value.min)} - ${toUSD(item.value.max)}`}
                    onClick={(e) => handleClick(e, field)}
                    clickable={true}
                />
            );
        }
        case SearchType.RANGE_DATE: {
            return (
                <Chip
                    color="secondary"
                    onDelete={() => onDeleteRange(SearchType.RANGE_DATE, field)}
                    label={
                        item.value[0] && item.value[1]
                            ? `${cellNameTypes[field].title}: ${moment(item.value[0]).format('DD.MM.YYYY')}-${moment(item.value[1]).format('DD.MM.YYYY')}`
                            : `${cellNameTypes[field].title}:`
                    }
                    onClick={(e) => handleClick(e, field)}
                    clickable={true}
                />
            );
        }
        case SearchType.SELECT: {
            return (
                <Chip
                    onDelete={onDeleteSelect}
                    color="secondary"
                    label={`${cellNameTypes[field].title}: ${item.value.value}`}
                    onClick={(e) => handleClick(e, field)}
                    clickable={true}
                />
            );
        }
        case SearchType.SEARCH: {
            if (typeof item.value === 'string') {
                return (
                    <Chip
                        onDelete={onDeleteSearch}
                        color="secondary"
                        label={`${cellNameTypes[field].title}: ${item.value}`}
                        onClick={(e) => handleClick(e, field)}
                        clickable={true}
                    />
                );
            } else {
                return (
                    <>
                        {item.value?.map((value) => (
                            <Chip
                                key={value}
                                onDelete={() => onDeleteSearch(value)}
                                color="secondary"
                                label={value}
                                onClick={() => dispatch(onSetIsOpenKeywordSidebar(true))}
                                clickable={true}
                            />
                        ))}
                    </>
                );
            }
        }
        case SearchType.SORT_BY_LOCATION: {
            return (
                <Chip
                    onDelete={onDeleteCountry}
                    color="secondary"
                    label={
                        <div className={classes.container}>
                            {cellNameTypes[field].title}: {item.value[0]?.label || ''}
                            {item.value.length > 1 && <div className={classes.moreOptions}>+{item.value.length - 1}</div>}
                        </div>
                    }
                    onClick={(e) => handleClick(e, field)}
                    clickable={true}
                />
            );
        }
        case SearchType.SORT_ORDER: {
            return <Chip color="secondary" label={`${cellNameTypes[field].title}: ${item.value}`} onClick={(e) => handleClick(e, field)} clickable={true} />;
        }
        default:
            return <></>;
    }
};

export default React.memo(RenderFilter);
