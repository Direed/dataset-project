import React, { useCallback, useState } from 'react';
import { FormGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SelectList from './SelectList';
import { setOnSelectOption } from '../../../../store/filter/filter.actions';
import { IClasses, useStyles } from '../../styles';
import CustomSelect from '../../../Select';
import { defaultKeywordsBlock, defaultKeywordsTitle, keywordsOptions, lpKeywordsBlock, lpKeywordsOptions, lpKeywordsTitle } from '../../../../constants';
import KeywordSelect from './components/KeywordSelect';
import ColumnSelect from './components/ColumnSelect';
import CategoryKeywordsSelect from './components/CategoryKeywordsSelect';
import { getKeywordSearch } from '../../../../store/filter/filter.selector';

const KeywordSearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const classes: IClasses = useStyles();
    const { select } = useSelector(getKeywordSearch);

    const [allKeywordsOptions, setAllKeywordsOptions] = useState([]);

    const onSelect = useCallback((option) => {
        dispatch(setOnSelectOption(option.value));
    }, []);

    const options = [
        {
            select: defaultKeywordsTitle,
            content: (
                <>
                    <KeywordSelect allKeywordsOptions={allKeywordsOptions} setAllKeywordsOptions={setAllKeywordsOptions} label={defaultKeywordsTitle} />
                    <ColumnSelect label={'Search Keyword in Column'} />
                </>
            ),
            keywordsBlock: defaultKeywordsBlock,
        },
        {
            select: lpKeywordsTitle,
            content: (
                <>
                    <CategoryKeywordsSelect options={lpKeywordsOptions} />
                    <ColumnSelect label={'Select columns'} />
                    <KeywordSelect allKeywordsOptions={allKeywordsOptions} setAllKeywordsOptions={setAllKeywordsOptions} label={lpKeywordsTitle} />
                </>
            ),
            keywordsBlock: lpKeywordsBlock,
        },
    ];

    return (
        <FormGroup className={classes.accordionDetail}>
            <div className={classes.selectKeyWord}>
                <CustomSelect defaultValue={{ label: select, value: select }} label={'Select Keyword Options'} options={keywordsOptions} onChange={onSelect} />
            </div>
            {options.map((option) => (
                <SelectList
                    key={`keywords-select-list-${option.select}`}
                    allKeywordsOptions={allKeywordsOptions}
                    setAllKeywordsOptions={setAllKeywordsOptions}
                    {...option}
                />
            ))}
        </FormGroup>
    );
};

export default React.memo(KeywordSearchBar);
