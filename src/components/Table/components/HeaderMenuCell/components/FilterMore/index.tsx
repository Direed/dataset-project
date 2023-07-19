import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { changeChipHeader, filterTableBySearch, resetFilter } from '../../../../../../store/companies/companies.actions';
import { useDispatch } from 'react-redux';
import { KeyCode, SearchType } from '../../../../../../enums';
import { useStyles } from './styles';
import { KeywordData } from '../../../../../../pages/Home/components/HeaderMenu';
import { CellNameType } from '../../../../../../enums/cellNameType';
import { removeLocalStorageValues, resetSelectedSavedFilters } from '../../../../../../utils/localStorageHelper';
import { deleteChip, resetKeywordFilter } from '../../../../../../store/filter/filter.actions';
import { cellNameTypes } from '../../../../../../constants/CellNameTypes';

interface IProps {
    activeFilters: KeywordData[];
    addFilterChip: (value: string) => void;
    onClearFilter: (value: string, shouldCleanTitle: boolean) => void;
    selectedTitles: string[];
}

const FilterMore: React.FC<IProps> = ({ activeFilters, addFilterChip, onClearFilter, selectedTitles }) => {
    const dispatch = useDispatch();

    const classes = useStyles();
    const [searchValue, setSearchValue] = useState<string>('');
    const updatedTitleList = useMemo(() => Object.keys(cellNameTypes).filter((item) => item !== CellNameType.CHECKBOX && item !== CellNameType.NAME), []);
    const [activeElement, setActiveElement] = useState<string>(updatedTitleList[0]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const onChangeSearch = useCallback(
        (e) => {
            setSearchValue(e.target.value);
            const activeItem = updatedTitleList.find((title) => cellNameTypes[title].title.toLowerCase().includes(e.target.value.toLowerCase()));

            if (activeItem) {
                setActiveElement(activeItem);
            }
        },
        [updatedTitleList]
    );

    const onDeleteRange = useCallback(
        (type: SearchType, field) => {
            dispatch(resetFilter(field, type));
            removeLocalStorageValues(null, field);
            resetSelectedSavedFilters();
            onClearFilter(field, false);
        },
        [selectedTitles]
    );
    const onDeleteSearch = useCallback(
        (item, field) => {
            if (typeof item.value === 'string') {
                dispatch(filterTableBySearch(field, '', SearchType.SEARCH));
                removeLocalStorageValues(null, field);
                dispatch(resetKeywordFilter(item.selectOption));
            } else {
                dispatch(deleteChip(item.selectOption, item.value));
            }
            resetSelectedSavedFilters();
            onClearFilter(field, false);
        },
        [selectedTitles]
    );

    const onChangeFilters = useCallback(
        (item: string) => {
            const filter = activeFilters.find((filter) => Object.keys(filter)[0] === item);

            if (filter) {
                switch (filter[item].type) {
                    case SearchType.SEARCH: {
                        onDeleteSearch(filter[item], item);
                        return null;
                    }
                    case SearchType.RANGE:
                    case SearchType.PERCENTAGE_RANGE:
                    case SearchType.USD_RANGE:
                    case SearchType.CHECKED_RANGE:
                    case SearchType.RANGE_DATE: {
                        onDeleteRange(filter[item].type, item);
                        return null;
                    }
                    default:
                        return null;
                }
            } else {
                addFilterChip(item);
                dispatch(changeChipHeader(true));
            }
        },
        [selectedTitles, activeFilters]
    );

    const onChangeElementFocus = useCallback(
        (direction: string) => {
            const filteredList = updatedTitleList.filter((title) => cellNameTypes[title].title.toLowerCase().includes(searchValue.toLowerCase()));
            const activeIndex = filteredList.findIndex((title) => title === activeElement);
            let updatedIndex;

            if (filteredList.length - 1 !== activeIndex) {
                scrollRef.current?.children[activeIndex].scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
            if (direction === KeyCode.ARROW_UP) {
                updatedIndex = 0 === activeIndex ? activeIndex : activeIndex - 1;
            } else {
                updatedIndex = filteredList.length - 1 === activeIndex ? activeIndex : activeIndex + 1;
            }

            setActiveElement(filteredList[updatedIndex]);
        },
        [searchValue, activeElement, updatedTitleList]
    );

    useEffect(() => {
        const keyDownHandler = (event): null => {
            switch (event.key) {
                case KeyCode.ENTER:
                    event.preventDefault();
                    onChangeFilters(activeElement);
                    return null;
                case KeyCode.ARROW_UP:
                case KeyCode.ARROW_DOWN:
                    event.preventDefault();
                    onChangeElementFocus(event.key);
                    return null;
                default:
                    return null;
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [activeElement, searchValue]);

    return (
        <div className={classes.container}>
            <div className={classes.inputWrapper}>
                <input autoFocus type="text" className={classes.searchInput} placeholder="Search" onChange={onChangeSearch} value={searchValue} />
                <div className={classes.border} />
            </div>
            <div ref={scrollRef}>
                {updatedTitleList.map((item, index) => {
                    const filter = activeFilters.find((filter) => Object.keys(filter)[0] === item);
                    return (
                        cellNameTypes[item].title.toLowerCase().includes(searchValue.toLowerCase()) && (
                            <div key={`item-${item}-${index}`} className={activeElement === item ? classes.activeInput : classes.input}>
                                <FormControlLabel
                                    onChange={() => onChangeFilters(item)}
                                    control={<Checkbox size="small" checked={!!filter} />}
                                    label={cellNameTypes[item].title}
                                />
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default React.memo(FilterMore);
