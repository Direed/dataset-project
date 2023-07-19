import { SearchType } from '../enums';
import moment from 'moment';

interface IFilterTransformWithoutPrefix {
    value: string | string[] | { le: number | string | null; ge: number | string | null };
    keyName: string;
}

export const filterTransformWithoutPrefix = (value: any, key: string): IFilterTransformWithoutPrefix => {
    switch (value.type) {
        case SearchType.SEARCH:
            return { value: value.value, keyName: key };
        case SearchType.EQUAL:
            return { value: value.value.map((item) => item.value), keyName: key };
        case SearchType.EQUAL_IN_PART:
            return { value: value.value.map((item) => item.value), keyName: key };
        case SearchType.RANGE:
        case SearchType.USD_RANGE:
            return {
                value: {
                    le: +value.value.max ?? null,
                    ge: +value.value.min ?? null,
                },
                keyName: key,
            };
        case SearchType.CHECKED_RANGE:
        case SearchType.PERCENTAGE_RANGE:
            return {
                value: {
                    le: +value.value.max / 100 ?? null,
                    ge: +value.value.min / 100 ?? null,
                },
                keyName: key,
            };
        case SearchType.SELECT:
            return { value: value.value.label, keyName: key };
        case SearchType.SORT_BY_LOCATION:
            return { value: value.value.map((item) => item.value), keyName: key };
        case SearchType.RANGE_DATE: {
            return {
                value: {
                    le: value.value[1] ? moment(value.value[1]).toISOString() : null,
                    ge: value.value[0] ? moment(value.value[0]).toISOString() : null,
                },
                keyName: key,
            };
        }
        default: {
            return value.value;
        }
    }
};
