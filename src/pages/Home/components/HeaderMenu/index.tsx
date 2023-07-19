import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IClasses, useStyles } from './style';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ExportMenuDropdown from '../ExportMenuDropdown';
import FiltersSidebar from '../FiltersSidebar';
import { MenuType } from '../../../../enums/menuType';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { changeChipHeader, requestData, resetResizing } from '../../../../store/companies/companies.actions';
import HeaderMenuItem from '../HeaderMenuItem';
import {
    getCompaniesTableFilters,
    getCountryCodesListData,
    getIsOpenKeywordSidebar,
    getNeedChipHeader,
    getNeedRefetch,
} from '../../../../store/companies/companies.selectors';
import { checkOnEmpty } from '../../../../utils/checkOnEmpty';
import { SearchType } from '../../../../enums';
import { getKeywordSearch } from '../../../../store/filter/filter.selector';
import FiltersMenuDropdown from '../FiltersMenuDropdown';
import SaveFiltersDropdown from '../SaveFilterDropdown';
import { Button, Chip } from '@mui/material';
import StyledMenu from '../../../../components/StyledMenuBar';
import FilterSearch from '../../../../components/Table/components/HeaderMenuCell/components/FilterSearch';
import FilterEqual from '../../../../components/Table/components/HeaderMenuCell/components/FilterEqual';
import FilterRange from '../../../../components/Table/components/HeaderMenuCell/components/FilterRange';
import FilterDate from '../../../../components/Table/components/HeaderMenuCell/components/FilterDate';
import FilterOrder from '../../../../components/Table/components/HeaderMenuCell/components/FilterSortOrder';
import { headerFilters } from '../../../../components/Table/components/HeaderMenuCell/headerFilters';
import { resetSelectedSavedFilters } from '../../../../utils/localStorageHelper';
import { useLazyTableQuery } from '../../../../hooks/useLazyTableQuery';
import FilterMore from '../../../../components/Table/components/HeaderMenuCell/components/FilterMore';
import FilterLocation from '../../../../components/Table/components/HeaderMenuCell/components/FilterLocation';
import RenderFilter from '../../../../components/RenderFilter';
import FilterSelect from '../../../../components/Table/components/HeaderMenuCell/components/FilterSelect';
import SearchOrganisations from '../../../../components/SearchOrganisations';
import { CellNameType } from '../../../../enums/cellNameType';
import FilterCheckedRange from '../../../../components/Table/components/HeaderMenuCell/components/FilterCheckedRange';

export type KeywordData =
    | {
          [x: string]: {
              value: string[];
              type: string;
              selectOption?: string;
              selectedColumn?: string;
          };
      }
    | { type: string; value: [] };

const HeaderMenu: React.FC = () => {
    const classes: IClasses = useStyles();
    const [activeFilters, setActiveFilters] = useState<KeywordData[]>([]);
    const isOpenKeywordSidebar = useSelector(getIsOpenKeywordSidebar);
    const needChipHeader = useSelector(getNeedChipHeader);
    const needRefetch = useSelector(getNeedRefetch);
    const dispatch = useDispatch();
    const countryCodesList = useSelector(getCountryCodesListData);
    const tableFilter = useSelector(getCompaniesTableFilters);
    const keys = Object.keys(tableFilter);
    const keywordsSearch = useSelector(getKeywordSearch);
    const { getTableData } = useLazyTableQuery();

    const getKeywordData = (state): KeywordData => {
        const checkedOptions = state.select;
        const selectedColumn = state.selectedOption[checkedOptions]?.columnKeywords;
        const selectedKeywords = state.selectedOption[checkedOptions]?.keywords.map((item) => item.value);
        if (selectedColumn?.length) {
            return {
                [selectedColumn]: {
                    value: selectedKeywords,
                    type: 'search',
                    selectOption: checkedOptions,
                    selectedColumn,
                },
            };
        } else {
            return { type: '', value: [] };
        }
    };
    const [title, setTitle] = useState<string>('');
    const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const filter = headerFilters.get(title);
    const filters = useSelector(getCompaniesTableFilters);

    const showSearchButton = useMemo(
        () =>
            filter?.find((item) => item.type === SearchType.RANGE_DATE)?.type ||
            filter?.find((item) => item.type === SearchType.RANGE)?.type ||
            filter?.find((item) => item.type === SearchType.PERCENTAGE_RANGE)?.type ||
            filter?.find((item) => item.type === SearchType.USD_RANGE)?.type ||
            filter?.find((item) => item.type === SearchType.CHECKED_RANGE)?.type ||
            filter?.find((item) => item.type === SearchType.EQUAL)?.type ||
            filter?.find((item) => item.type === SearchType.EQUAL_IN_PART)?.type ||
            filter?.find((item) => item.type === SearchType.SORT_BY_LOCATION)?.type ||
            filter?.find((item) => item.type === SearchType.SEARCH)?.type ||
            filter?.find((item) => item.type === SearchType.SELECT)?.type,
        [filter]
    );

    const disableSearch = useMemo(() => {
        let disable = false;
        const type = filters[title]?.[0]?.type;
        if (type === SearchType.RANGE_DATE) {
            disable = filters[title][0].value[0] && filters[title][0].value[0];
        }
        if (type === SearchType.RANGE || type === SearchType.PERCENTAGE_RANGE || type === SearchType.USD_RANGE || type === SearchType.CHECKED_RANGE) {
            disable = filters[title][0].value.min >= 0 && filters[title][0].value.max;
        }
        if (type === SearchType.EQUAL || type === SearchType.EQUAL_IN_PART) {
            disable = true;
        }
        if (type === SearchType.SORT_BY_LOCATION) {
            disable = filters[title][0].value[0] && filters[title][0].value[0];
        }
        if (type === SearchType.SEARCH) {
            disable = filters[title][0].value[0] && filters[title][0].value[0];
        }
        if (type === SearchType.SELECT) {
            disable = filters[title][0].value?.value;
        }
        return disable;
    }, [filters, title]);

    const onClearFilter = useCallback(
        (value = '', shouldCleanTitle = true): void => {
            const updatedTitles = [...selectedTitles];
            const removedTitleIndex = selectedTitles.findIndex((item) => item === (value || title));

            if (removedTitleIndex >= 0) {
                updatedTitles.splice(removedTitleIndex, 1);
                setSelectedTitles(updatedTitles);
            }

            if (shouldCleanTitle) {
                setTitle('');
            }
        },
        [selectedTitles, title]
    );

    const handleClose = useCallback((): void => {
        setAnchorEl(null);
    }, [anchorEl]);

    const onSubmit = useCallback(() => {
        onClearFilter();
        resetSelectedSavedFilters();
        dispatch(
            requestData({
                getTableData,
            })
        );
        handleClose();
    }, [getTableData, onClearFilter]);

    useEffect(() => {
        if (needChipHeader) {
            const keywordData = getKeywordData(keywordsSearch);
            const newFilters: KeywordData[] = [];
            newFilters.push(keywordData);
            keys.forEach((item) => {
                tableFilter[item].forEach((filter) => {
                    if (
                        (checkOnEmpty(filter, filter.type) || selectedTitles.includes(item)) &&
                        filter.type !== SearchType.SORT_ORDER &&
                        item !== CellNameType.NAME
                    ) {
                        newFilters.push({ [item]: filter });
                    }
                });
            });
            setActiveFilters(newFilters);
            dispatch(changeChipHeader(false));
        }
    }, [needChipHeader, keywordsSearch, tableFilter, selectedTitles]);
    const menuItems = useMemo(
        () => [
            {
                title: 'Export',
                icon: <FileDownloadIcon className={classes.filterImage} />,
                Menu: ExportMenuDropdown,
                menuType: MenuType.DROPDOWN,
            },
            {
                title: 'Reset view',
                icon: <RestartAltIcon className={classes.filterImage} />,
                action: () => dispatch(resetResizing()),
            },
            {
                title: 'Save filter',
                icon: <BookmarkBorderOutlinedIcon className={classes.filterImage} />,
                Menu: SaveFiltersDropdown,
                menuType: MenuType.DROPDOWN,
            },
            {
                title: 'Filters',
                icon: <img className={classes.filterImage} src={process.env.PUBLIC_URL + '/filters.png'} alt="filter" />,
                Menu: FiltersMenuDropdown,
                menuType: MenuType.DROPDOWN,
            },
            {
                title: 'Columns',
                icon: <GridOnOutlinedIcon className={classes.filterImage} />,
                Menu: FiltersSidebar,
                menuType: MenuType.SIDEBAR,
                isOpenKeywordSidebar: isOpenKeywordSidebar,
            },
        ],
        [isOpenKeywordSidebar]
    );
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLElement>, field: string): void => {
            setAnchorEl(event.currentTarget);
            setTitle(field);
        },
        [anchorEl]
    );

    const addFilterChip = useCallback(
        (value) => {
            setTitle(value);
            setSelectedTitles([...selectedTitles, value]);
        },
        [selectedTitles]
    );

    useEffect(() => {
        if (needRefetch) {
            dispatch(
                requestData({
                    getTableData,
                })
            );
        }
    }, [needRefetch]);

    return (
        <>
            <div className={classes.filters}>
                <div className={classes.filterChip}>
                    <SearchOrganisations onSubmit={onSubmit} />
                    {countryCodesList.length !== 0 &&
                        activeFilters.map((item) => {
                            const key = Object.keys(item)[0];
                            return (
                                <RenderFilter item={item[key]} field={key} key={`filter-item-${key}`} handleClick={handleClick} onClearFilter={onClearFilter} />
                            );
                        })}
                    <Chip
                        variant="outlined"
                        color="secondary"
                        label="More"
                        deleteIcon={<AddIcon />}
                        onDelete={(e) => handleClick(e, 'more')}
                        onClick={(e) => handleClick(e, 'more')}
                        clickable={true}
                    />
                    <StyledMenu
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => {
                            handleClose();
                            setTitle('');
                        }}
                    >
                        {filter?.find((item) => item.type === SearchType.SEARCH)?.type ? <FilterSearch onSubmit={onSubmit} title={title} /> : null}
                        {filter?.find((item) => item.type === SearchType.EQUAL || item.type === SearchType.EQUAL_IN_PART)?.type ? (
                            <FilterEqual
                                title={title}
                                filter={filter.find((item) => item.type === SearchType.EQUAL || item.type === SearchType.EQUAL_IN_PART)}
                            />
                        ) : null}
                        {filter?.find(
                            (item) => item.type === SearchType.RANGE || item.type === SearchType.PERCENTAGE_RANGE || item.type === SearchType.USD_RANGE
                        )?.type ? (
                            <FilterRange
                                title={title}
                                type={
                                    filter?.find(
                                        (item) =>
                                            item.type === SearchType.RANGE || item.type === SearchType.PERCENTAGE_RANGE || item.type === SearchType.USD_RANGE
                                    )?.type
                                }
                            />
                        ) : null}
                        {filter?.find((item) => item.type === SearchType.CHECKED_RANGE)?.type ? (
                            <FilterCheckedRange title={title} type={filter?.find((item) => item.type === SearchType.CHECKED_RANGE)?.type} />
                        ) : null}
                        {filter?.find((item) => item.type === SearchType.RANGE_DATE)?.type ? <FilterDate onSubmit={onSubmit} title={title} /> : null}
                        {filter?.find((item) => item.type === SearchType.SORT_ORDER)?.type ? <FilterOrder title={title} /> : null}
                        {filter?.find((item) => item.type === SearchType.SORT_BY_LOCATION)?.type ? <FilterLocation title={title} onSubmit={onSubmit} /> : null}
                        {filter?.find((item) => item.type === SearchType.SELECT)?.type ? <FilterSelect title={title} onSubmit={onSubmit} /> : null}
                        {title === 'more' ? (
                            <FilterMore
                                activeFilters={activeFilters}
                                addFilterChip={addFilterChip}
                                onClearFilter={onClearFilter}
                                selectedTitles={selectedTitles}
                            />
                        ) : (
                            <div className={`${classes.buttonWrapper} ${showSearchButton ? 'group' : ''}`}>
                                {showSearchButton ? (
                                    <Button onClick={onSubmit} disabled={!disableSearch} color="secondary" variant="contained" size="small">
                                        Search
                                    </Button>
                                ) : null}
                            </div>
                        )}
                    </StyledMenu>
                </div>
                <div className={classes.filtersIcon}>
                    {menuItems.map((menuItem) => (
                        <HeaderMenuItem key={`header-menu-item-${menuItem.title}`} {...menuItem} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default React.memo(HeaderMenu);
