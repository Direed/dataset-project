import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCitiesData,
    getCompaniesTableFilters,
    getRegionsData,
    getFundingRoundsData,
    getCountryCodesListData,
} from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';
import CustomSelect from '../../../../../Select';
import { filterTableByLocation, getCities, getRegions, getFundingRounds } from '../../../../../../store/companies/companies.actions';
import { selectSize } from '../../../../../../constants/table/rows';
import { CellNameType } from '../../../../../../enums/cellNameType';
import { IOption } from '../../../../../../store/companies/companies.types';

interface IProps {
    title: string;
    onSubmit: () => void;
}

const OPTION_SIZE = 10;

const FilterLocation: React.FC<IProps> = ({ title, onSubmit }) => {
    const [options, setOptions] = useState<IOption[]>([]);
    const [allOptions, setAllOptions] = useState<IOption[]>([]);

    const dispatch = useDispatch();
    const filters = useSelector(getCompaniesTableFilters);
    const cities = useSelector(getCitiesData);
    const regions = useSelector(getRegionsData);
    const countryCodesList = useSelector(getCountryCodesListData);
    const fundingRounds = useSelector(getFundingRoundsData);
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    const dateFilter = filters[title].find((item) => item.type === SearchType.SORT_BY_LOCATION);
    const onChange = useCallback((e) => {
        setTimeout(() => dispatch(filterTableByLocation(title, e, SearchType.SORT_BY_LOCATION)), 0);
    }, []);
    const onInputChange = useCallback(
        (e, { action }) => {
            const updatedOptions = allOptions.filter((option) => option.label.toLowerCase().includes(e.toLowerCase())).slice(0, selectSize);
            setOptions(updatedOptions);

            switch (action) {
                case 'set-value':
                    setMenuIsOpen(false);
                    return;
                case 'input-change':
                    if (!menuIsOpen) {
                        setMenuIsOpen(true);
                    }
                    return;

                default:
                    return;
            }
        },
        [allOptions, menuIsOpen]
    );

    const onBlur = useCallback(() => {
        setMenuIsOpen(false);
    }, []);

    useEffect(() => {
        setTimeout(() => setMenuIsOpen(true), 250);
    }, []);

    useEffect(() => {
        const keyDownHandler = (event): void => {
            if (event.key === 'Enter') {
                event.preventDefault();
                onSubmit();
            }
        };
        !menuIsOpen && document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [menuIsOpen]);

    useEffect(() => {
        if (title === CellNameType.CITY) {
            if (cities.length) {
                setAllOptions(cities);
                setOptions(cities.slice(0, OPTION_SIZE));
            } else {
                dispatch(getCities());
            }
        }
        if (title === CellNameType.REGION) {
            if (regions.length) {
                setAllOptions(regions);
                setOptions(regions.slice(0, OPTION_SIZE));
            } else {
                dispatch(getRegions());
            }
        }
        if (title === CellNameType.COUNTRY_CODE) {
            if (countryCodesList.length) {
                setAllOptions(countryCodesList);
                setOptions(countryCodesList.slice(0, OPTION_SIZE));
            }
        }
        if (title === CellNameType.LAST_FUNDING_STAGE) {
            if (fundingRounds.length) {
                setAllOptions(fundingRounds);
                setOptions(fundingRounds.slice(0, OPTION_SIZE));
            } else {
                dispatch(getFundingRounds());
            }
        }
    }, [cities, regions, countryCodesList, fundingRounds]);

    return (
        <div>
            <CustomSelect
                autoFocus
                onInputChange={onInputChange}
                isMulti
                onChange={onChange}
                options={options}
                value={dateFilter?.value}
                menuIsOpen={menuIsOpen}
                setMenuIsOpen={setMenuIsOpen}
                onBlur={onBlur}
                blurInputOnSelect={false}
                closeMenuOnSelect
            />
        </div>
    );
};

export default React.memo(FilterLocation);
