import { defaultKeywordsTitle, lpKeywordsTitle } from '../../constants';

export interface IFilterItem {
    select?: string;
    category?: string;
    field_name: string;
    value: string & [] & {};
    type: string;
}

export interface IKeywordFilterItem {
    select?: string;
    category?: string;
    field_name: string;
    value: string[];
    type: string;
}

export interface IKeywordsTitle {
    keywords: { value: string; label: string }[];
    columnKeywords: string;
    categoryKeywords: { label: string; value: string }[];
}

export interface IKeywordState {
    [defaultKeywordsTitle]: IKeywordsTitle;
    [lpKeywordsTitle]: IKeywordsTitle;
}
