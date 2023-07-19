import React, { ReactNode, useCallback, useEffect } from 'react';
import { Button, FormGroup, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setResetAllKeywordsButton, setSelectAllKeywordsButton } from '../../../../store/filter/filter.actions';
import { getKeywordSearch } from '../../../../store/filter/filter.selector';
import { useStyles } from './styles';

interface IProps {
    select: string;
    allKeywordsOptions: any;
    setAllKeywordsOptions: (value: any) => void;
    content: ReactNode;
    keywordsBlock: { categoryKeywords: string; keywords: { label: string; value: string }[] }[];
}

const SelectList: React.FC<IProps> = ({ select, allKeywordsOptions, setAllKeywordsOptions, content, keywordsBlock }: IProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { select: selectFromRedux, selectedOption } = useSelector(getKeywordSearch);
    const { categoryKeywords } = selectedOption[select];

    useEffect(() => {
        if (categoryKeywords?.length) {
            const activeKeywordBlock = keywordsBlock.find((block) => block.categoryKeywords === categoryKeywords[0].label);

            setAllKeywordsOptions(activeKeywordBlock?.keywords);
        }
    }, [selectFromRedux, categoryKeywords]);

    const handleSelectAllKeywords = useCallback(() => {
        dispatch(setSelectAllKeywordsButton(select, allKeywordsOptions));
    }, [select, allKeywordsOptions]);
    const handleResetAllKeywords = useCallback(() => {
        dispatch(setResetAllKeywordsButton(select));
    }, [select]);

    return selectFromRedux === select ? (
        <>
            <FormGroup className={classes.wrapper}>{content}</FormGroup>

            <div className={classes.buttonWrapperPrimary}>
                <Stack direction="row" spacing={2}>
                    <Button className={classes.customButton} onClick={handleSelectAllKeywords} color="secondary" variant="contained">
                        Select All
                    </Button>
                    <Button className={classes.customButton} color="secondary" onClick={handleResetAllKeywords} variant="contained">
                        Reset All
                    </Button>
                </Stack>
            </div>
        </>
    ) : null;
};
export default SelectList;
