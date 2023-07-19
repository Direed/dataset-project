import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableFilters, getIndustriesData } from '../../../../../../store/companies/companies.selectors';
import { SearchType } from '../../../../../../enums';
import CustomSelect from '../../../../../Select';
import { filterTableBySelect, getIndustries } from '../../../../../../store/companies/companies.actions';
import { selectSize } from '../../../../../../constants/table/rows';
import { CellNameType } from '../../../../../../enums/cellNameType';
import { IOption } from '../../../../../../store/companies/companies.types';

interface IProps {
    title: string;
    onSubmit: () => void;
}

const FilterSelect: React.FC<IProps> = ({ title, onSubmit }) => {
    const [options, setOptions] = useState<IOption[]>([]);
    const [allOptions, setAllOptions] = useState<IOption[]>([]);

    const dispatch = useDispatch();
    const filters = useSelector(getCompaniesTableFilters);
    const industries = useSelector(getIndustriesData);
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    const dateFilter = filters[title].find((item) => item.type === SearchType.SELECT);
    const onChange = useCallback((e) => {
        setTimeout(() => dispatch(filterTableBySelect(title, e, SearchType.SELECT)), 0);
    }, []);

    const onInputChange = useCallback(
        (e, { action }) => {
            const updatedOptions = allOptions.filter((option) => option.value.toLowerCase().includes(e.toLowerCase())).slice(0, selectSize);
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
        if (title === CellNameType.INDUSTRIES) {
            if (industries.length) {
                setAllOptions(industries);
                setOptions(industries);
            } else {
                dispatch(getIndustries());
            }
        }
    }, [industries]);

    return (
        <div>
            <CustomSelect
                autoFocus
                onInputChange={onInputChange}
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

export default React.memo(FilterSelect);
