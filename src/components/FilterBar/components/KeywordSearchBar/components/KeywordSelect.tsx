import React, { useCallback, useEffect, useState } from 'react';
import CustomSelect from '../../../../Select';
import { useDispatch, useSelector } from 'react-redux';
import { clickedSearchButton, setKeyword } from '../../../../../store/filter/filter.actions';
import { getKeywordSearch } from '../../../../../store/filter/filter.selector';
import { emptyColumnsStyles } from './constants';

interface IProps {
    label: string;
    allKeywordsOptions: any;
    setAllKeywordsOptions: (value: any) => void;
}

const KeywordSelect: React.FC<IProps> = ({ label, allKeywordsOptions, setAllKeywordsOptions }: IProps) => {
    const dispatch = useDispatch();

    const { select, selectedOption, isCheckedSearchButton } = useSelector(getKeywordSearch);
    const { columnKeywords, keywords, categoryKeywords } = selectedOption[select];
    const [inputValue, setInputValue] = useState('');
    const onChangeInput = useCallback(
        (value) => {
            setInputValue(value);
            if (isCheckedSearchButton) {
                dispatch(clickedSearchButton(false));
            }
        },
        [isCheckedSearchButton]
    );
    const onAddedValue = useCallback(
        (e) => {
            if (e.code === 'Enter' && inputValue.length > 0) {
                dispatch(setKeyword([...keywordsState.selectedOption[select].keywords, { label: inputValue, value: inputValue }], select, 'keywords'));
                setAllKeywordsOptions([...allKeywordsOptions, { label: inputValue, value: inputValue }]);
                setInputValue('');
            }
        },
        [allKeywordsOptions, inputValue, select]
    );

    useEffect(() => {
        window.addEventListener('keydown', onAddedValue);
        return () => window.removeEventListener('keydown', onAddedValue);
    }, [inputValue]);

    const keywordsState = useSelector(getKeywordSearch);
    const onChangeKeyword = useCallback(
        (value) => {
            dispatch(setKeyword(value || '', select, 'keywords'));
        },
        [select]
    );

    return (
        <CustomSelect
            styles={isCheckedSearchButton && columnKeywords.length && !keywords.length ? emptyColumnsStyles : null}
            options={allKeywordsOptions}
            value={keywords}
            onChange={onChangeKeyword}
            label={label}
            placeholder={'Choose an option'}
            onInputChange={onChangeInput}
            inputValue={inputValue}
            isDisabled={!categoryKeywords?.length}
            isMulti
        />
    );
};

export default React.memo(KeywordSelect);
