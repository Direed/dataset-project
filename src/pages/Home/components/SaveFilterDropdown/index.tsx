import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { useStyles } from './style';
import { localStorageType } from '../../../../enums/localStorage';

interface IProps {
    handleClose: () => void;
}

const SaveFiltersDropdown: React.FC<IProps> = ({ handleClose }) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState<string>('');

    let localStorageSavedFilters;
    let localStorageFilters;

    try {
        localStorageSavedFilters = JSON.parse(String(localStorage.getItem(localStorageType.SAVED_FILTERS))) || [];
        localStorageFilters = JSON.parse(String(localStorage.getItem(localStorageType.FILTERS))) || [];
    } catch (e: any) {
        console.warn(e);
    }

    const onSave = useCallback(() => {
        const filterIndex = localStorageSavedFilters.findIndex((filter) => filter.name === inputValue);
        if (filterIndex >= 0) {
            localStorageSavedFilters[filterIndex].filters = localStorageFilters;
            localStorage.setItem(localStorageType.SAVED_FILTERS, JSON.stringify([...localStorageSavedFilters]));
        } else {
            localStorage.setItem(
                localStorageType.SAVED_FILTERS,
                JSON.stringify([
                    ...localStorageSavedFilters,
                    {
                        name: inputValue,
                        filters: localStorageFilters,
                    },
                ])
            );
        }
        setInputValue('');
        handleClose();
    }, [inputValue, localStorageSavedFilters, localStorageFilters]);

    const onInputChange = (event): void => {
        setInputValue(event.target.value);
    };

    const keyDownHandler = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>): void => {
            if (event.key === 'Enter' && inputValue.length) {
                event.preventDefault();
                onSave();
            }
        },
        [inputValue]
    );

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.inputWrapper}>
                    <input
                        autoFocus
                        className={classes.input}
                        onKeyPress={keyDownHandler}
                        type="text"
                        placeholder="Filter name..."
                        value={inputValue}
                        onChange={onInputChange}
                    />
                </div>
                <Button className={classes.button} onClick={onSave} disabled={!inputValue.length} color="secondary" variant="contained">
                    Save
                </Button>
            </div>
        </div>
    );
};

export default React.memo(SaveFiltersDropdown);
