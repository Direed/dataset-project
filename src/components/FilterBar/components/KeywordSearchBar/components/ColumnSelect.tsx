import React, { useCallback } from 'react';
import CustomSelect from '../../../../Select';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '../../../../../store/filter/filter.actions';
import { getKeywordSearch } from '../../../../../store/filter/filter.selector';
import { columnKeywordsOptions } from '../../../../../constants';
import { emptyColumnsStyles } from './constants';

interface IProps {
    label: string;
}

const ColumnSelect: React.FC<IProps> = ({ label }: IProps) => {
    const dispatch = useDispatch();

    const { select, selectedOption, isCheckedSearchButton } = useSelector(getKeywordSearch);
    const { columnKeywords, keywords } = selectedOption[select];

    const onChangeKeywordColumn = useCallback(
        (option) => {
            dispatch(setKeyword(option?.value || '', select, 'columnKeywords'));
        },
        [select]
    );

    return (
        <CustomSelect
            styles={isCheckedSearchButton && !columnKeywords.length && keywords.length ? emptyColumnsStyles : null}
            options={columnKeywordsOptions}
            value={columnKeywordsOptions?.find((item) => item.value === columnKeywords)}
            onChange={onChangeKeywordColumn}
            label={label}
            placeholder={'Choose an option'}
        />
    );
};

export default React.memo(ColumnSelect);
