import { SearchType, SortOrder } from '../../../enums';
import { CellNameType } from '../../../enums/cellNameType';

interface IFilterTableSelectValue {
    value: string;
    label: string;
}

interface IFilterTableSelect {
    value: IFilterTableSelectValue;
    type: SearchType;
}

export interface IFilterTableEqual {
    value: IFilterTableSelectValue[];
    type: SearchType;
}

export interface IFilterTableSearch {
    value: string;
    type: SearchType;
}

export interface IFilterTableRangeDate {
    value: Array<Date>;
    needFilter: boolean;
    type: SearchType;
}
export interface IFilterTableSortOrder {
    value: SortOrder | null;
    type: SearchType;
}

export interface IFilterTableRangeValue {
    min: string;
    max: string;
}

export interface IFilterTableRange {
    value: IFilterTableRangeValue;
    type: SearchType;
    title: string;
}

export interface IFilterTableSortByLocation {
    value: IFilterTableSortByLocationValue[];
    type: SearchType;
}

export interface IFilterTableSortByLocationValue {
    value: SortOrder | null;
    type: SearchType;
}

export type IFilterTable = Record<
    CellNameType,
    IFilterTableSearch[] &
        IFilterTableSelect[] &
        IFilterTableEqual[] &
        [IFilterTableRangeDate & IFilterTableSortOrder][] &
        [IFilterTableRange & IFilterTableSortOrder][] &
        IFilterTableSortByLocation[] &
        IFilterTableSortOrder[]
>;
