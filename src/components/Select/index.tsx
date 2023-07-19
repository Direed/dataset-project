import React, { useCallback } from 'react';
import Select, { components } from 'react-select';
import './style.scss';

interface IProps {
    autoFocus?: boolean;
    options: { label: string; value: string }[];
    defaultValue?: object;
    value?: object[] | object | null;
    onChange?: (e, item: any) => void;
    withOther?: boolean;
    label?: string;
    isMulti?: boolean;
    placeholder?: string;
    item?: string;
    inputValue?: string;
    onInputChange?: (value, { action: string }) => void;
    isDisabled?: boolean;
    styles?: any;
    menuIsOpen?: boolean;
    setMenuIsOpen?: (value: boolean | ((prev: boolean) => boolean)) => void;
    onBlur?: () => void;
    blurInputOnSelect?: boolean;
    closeMenuOnSelect?: boolean;
}

const CustomSelect: React.FC<IProps> = ({
    autoFocus = false,
    onInputChange,
    defaultValue,
    withOther,
    item,
    options,
    onChange,
    value,
    label = '',
    isMulti = false,
    inputValue,
    placeholder = '',
    isDisabled,
    styles,
    menuIsOpen,
    setMenuIsOpen,
    onBlur,
    blurInputOnSelect = true,
    closeMenuOnSelect = false,
}) => {
    const newOption = withOther ? [...options, { label: 'Other', value: '' }] : options;
    const onSetIsOpenMenu = useCallback(() => {
        setMenuIsOpen && setMenuIsOpen((prev) => !prev);
    }, []);
    const Control = useCallback(
        ({ children, ...props }) => (
            <div onClick={onSetIsOpenMenu}>
                <components.Control {...props}>{children}</components.Control>
            </div>
        ),
        []
    );
    return (
        <>
            {label ? <p className="label">{label}</p> : null}
            <Select
                autoFocus={autoFocus}
                components={{ Control }}
                onInputChange={onInputChange}
                onBlur={onBlur ? () => onBlur() : () => ({})}
                defaultValue={defaultValue}
                blurInputOnSelect={blurInputOnSelect}
                menuPosition={'fixed'}
                styles={styles || customStyles}
                isClearable={true}
                closeMenuOnSelect={closeMenuOnSelect}
                value={value}
                onChange={onChange ? (e) => onChange(e, item) : () => ({})}
                isMulti={isMulti}
                inputValue={inputValue}
                placeholder={placeholder}
                options={newOption}
                isDisabled={isDisabled}
                menuIsOpen={menuIsOpen}
            />
        </>
    );
};

const customStyles = {
    control: (base) => ({
        ...base,
        width: 270,
    }),
    valueContainer: (base) => ({
        ...base,
        overflowX: 'auto',
        flexWrap: 'noWrap',
    }),
    menu: (base) => ({
        ...base,
        zIndex: 10,
    }),
    menuList: (base) => ({
        ...base,
        zIndex: 10,
        width: 270,
    }),
    menuPortal: (base) => ({
        ...base,
        zIndex: 10,
    }),
    multiValue: (base) => ({
        ...base,
        flex: 'none',
    }),
};

export default React.memo(CustomSelect);
