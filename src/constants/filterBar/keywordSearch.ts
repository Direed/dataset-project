import { IKeywordState } from '../../pages/Home/helpers';
import { defaultKeywordsOptions } from './keywordsOptions/defaultKeywordsOptions';
import { lpKeywordsSartorius, lpKeywordsSartorius2 } from './keywordsOptions/lpKeywordsOptions';

export const defaultKeywordsBlock = [
    {
        categoryKeywords: 'Default keywords',
        keywords: defaultKeywordsOptions,
    },
];

export const lpKeywordsBlock = [
    { categoryKeywords: 'Sartorius', keywords: lpKeywordsSartorius },
    { categoryKeywords: 'Sartorius 2', keywords: lpKeywordsSartorius2 },
    // { categoryKeywords: 'Sartorius 3', keywords: lpKeywordsSartorius3 },
];

export const lpKeywordsOptions = lpKeywordsBlock.map(({ categoryKeywords }) => ({
    value: categoryKeywords,
    label: categoryKeywords,
}));

export const columnKeywordsOptions = [
    { label: 'Description', value: 'description' },
    { label: 'Industries', value: 'industries' },
    { label: 'All Investors', value: 'all_investors' },
    { label: 'Grant Project', value: 'grant_project' },
];

export const defaultLpColumn = columnKeywordsOptions[0];

export const defaultKeywordsTitle = 'Select keywords';
export const lpKeywordsTitle = 'Select LP keywords';
export const keywordsOptions = [
    { label: defaultKeywordsTitle, value: defaultKeywordsTitle },
    { label: lpKeywordsTitle, value: lpKeywordsTitle },
];

export const checkKeyword = (keywordsData, keywordSelect): boolean => keywordsData?.length && keywordsData[0]?.select === keywordSelect;

export const getKeywordState = (keywordsData): IKeywordState => ({
    [defaultKeywordsTitle]: {
        keywords: checkKeyword(keywordsData, defaultKeywordsTitle) ? keywordsData[0]?.value.map((item) => ({ value: item, label: item })) : [],
        columnKeywords: checkKeyword(keywordsData, defaultKeywordsTitle) ? keywordsData[0]?.field_name : '',
        categoryKeywords: checkKeyword(keywordsData, defaultKeywordsTitle)
            ? [{ label: keywordsData[0]?.category, value: keywordsData[0]?.category }]
            : [{ label: defaultKeywordsBlock[0].categoryKeywords, value: defaultKeywordsBlock[0].categoryKeywords }],
    },
    [lpKeywordsTitle]: {
        keywords: checkKeyword(keywordsData, lpKeywordsTitle) ? keywordsData[0]?.value.map((item) => ({ value: item, label: item })) : [],
        columnKeywords: checkKeyword(keywordsData, lpKeywordsTitle) ? keywordsData[0]?.field_name : defaultLpColumn.value,
        categoryKeywords: checkKeyword(keywordsData, lpKeywordsTitle) ? [{ label: keywordsData[0]?.category, value: keywordsData[0]?.category }] : [],
    },
});
