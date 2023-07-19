import React, { useCallback } from 'react';
import CustomSelect from '../../../../Select';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '../../../../../store/filter/filter.actions';
import { getKeywordSearch } from '../../../../../store/filter/filter.selector';
import { emptyColumnsStyles } from './constants';

interface IProps {
    options: { value: string; label: string }[];
}

const CategoryKeywordsSelect: React.FC<IProps> = ({ options }: IProps) => {
    const dispatch = useDispatch();

    const { select, selectedOption, isCheckedSearchButton } = useSelector(getKeywordSearch);
    const { columnKeywords, categoryKeywords } = selectedOption[select];

    const onChangeKeywordCategory = useCallback(
        (option) => {
            dispatch(setKeyword([], select, 'keywords'));

            const value = option ? [option] : [];
            dispatch(setKeyword(value, select, 'categoryKeywords'));
        },
        [select]
    );

    return (
        <CustomSelect
            styles={isCheckedSearchButton && columnKeywords.length && !categoryKeywords?.length ? emptyColumnsStyles : null}
            options={options}
            value={categoryKeywords}
            onChange={onChangeKeywordCategory}
            label={'Select LP'}
            placeholder={'Choose an option'}
        />
    );
};

export default React.memo(CategoryKeywordsSelect);
