import { CellNameType } from '../enums/cellNameType';
import { SearchType } from '../enums';
import CheckboxCell from '../components/Table/components/TableCell/CheckboxCell';
import NameCell from '../components/Table/components/TableCell/NameCell';
import { Tooltip } from '@mui/material';
import moment from 'moment';
import { mappingFundingRounds } from './table/fundingRounds';
import { shortenLongNumber } from '../utils/numberFormatted';

const startDateToday = new Date();
const endDateToday = new Date();
startDateToday.setHours(0, 0, 0, 0);
endDateToday.setHours(23, 59, 59, 999);

export const cellNameTypes = {
    [CellNameType.CHECKBOX]: {
        title: '#',
        defaultColumn: true,
        render: ({ id }) => <CheckboxCell id={id} />,
    },
    [CellNameType.NAME]: {
        title: 'Name',
        defaultColumn: true,
        defaultTableFilter: [{ value: '', type: SearchType.SEARCH }],
        render: ({ name, row }) => <NameCell name={name} row={row} />,
    },
    [CellNameType.DESCRIPTION]: {
        title: 'Description',
        defaultColumn: true,
        defaultTableFilter: [{ value: '', type: SearchType.SEARCH }],
        render: ({ textArray, maxWidth, className }) => (
            <Tooltip title={textArray}>
                <div style={{ maxWidth }} className={className}>
                    {textArray}
                </div>
            </Tooltip>
        ),
    },
    [CellNameType.INDUSTRIES]: {
        title: 'Industries',
        defaultColumn: true,
        defaultTableFilter: [{ value: { value: '', label: '' }, type: SearchType.SELECT }],
        render: ({ textArray, maxWidth, className }) => {
            const industryValue = textArray[0].trim() === 'Missing' ? '' : textArray;
            return (
                <Tooltip title={industryValue}>
                    <div style={{ maxWidth }} className={className}>
                        {industryValue}
                    </div>
                </Tooltip>
            );
        },
    },
    [CellNameType.PROBABILITY_OF_SUCCESS]: {
        title: 'Probability of success',
        defaultColumn: true,
        defaultTableFilter: [
            {
                value: { min: '', max: '' },
                labels: [
                    { label: 'High (>95th percentile)', range: { min: 71.6, max: 100 }, isChecked: false },
                    { label: 'Average (5th-95th percentile)', range: { min: 36.3, max: 71.6 }, isChecked: false },
                    { label: 'Low (<5th percentile)', range: { min: 0, max: 36.3 }, isChecked: false },
                ],
                type: SearchType.CHECKED_RANGE,
            },
        ],
        tooltip: 'The probability that the startup will complete any post-seed funding round (series A, series B, …) within five years after being founded',
        render: ({ textArray, maxWidth, className, successColor }) => (
            <div style={{ maxWidth, textAlign: 'center', color: successColor(textArray[0]) }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FOUNDED_AT]: {
        title: 'Founded at',
        defaultColumn: true,
        defaultTableFilter: [
            {
                value: [startDateToday, endDateToday],
                type: SearchType.RANGE_DATE,
                needFilter: false,
            },
        ],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? moment(textArray[0].trim()).format('YYYY-MM-DD') : textArray}
            </div>
        ),
    },
    [CellNameType.COUNTRY_CODE]: {
        title: 'Country code',
        defaultColumn: true,
        defaultTableFilter: [{ value: [], type: SearchType.SORT_BY_LOCATION }],
        render: ({ textArray, maxWidth, className, countryCodes }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? countryCodes[textArray[0].trim()] : textArray}
            </div>
        ),
    },
    [CellNameType.REGION]: {
        title: 'Region',
        defaultColumn: false,
        defaultTableFilter: [{ value: [], type: SearchType.SORT_BY_LOCATION }],
    },
    [CellNameType.CITY]: {
        title: 'City',
        defaultColumn: true,
        defaultTableFilter: [{ value: [], type: SearchType.SORT_BY_LOCATION }],
    },
    [CellNameType.FRACTION_FEMALE_FOUNDERS]: {
        title: 'Fraction female founders',
        defaultColumn: true,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FRACTION_MISSING_GENDER_FOUNDERS]: {
        title: 'Fraction missing gender founders',
        defaultColumn: true,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FRACTION_MALE_FOUNDERS]: {
        title: 'Fraction male founders',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FRACTION_OTHER_FOUNDERS]: {
        title: 'Fraction other founders',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FRACTION_FEMALE_EXECUTIVES]: {
        title: 'Fraction female executives',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FRACTION_MALE_EXECUTIVES]: {
        title: 'Fraction male executives',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FRACTION_OTHER_EXECUTIVES]: {
        title: 'Fraction other executives',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FRACTION_MISSING_GENDER_EXECUTIVES]: {
        title: 'Fraction missing gender executives',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.FOUNDER_IS_CEO]: {
        title: 'CEO is founder',
        defaultColumn: true,
        defaultTableFilter: [{ value: '', type: SearchType.SEARCH }],
    },
    [CellNameType.BUSINESS_ROLES_COUNT]: {
        title: 'Business roles count',
        defaultColumn: false,
        defaultTableFilter: [{ value: '', type: SearchType.SEARCH }],
    },
    [CellNameType.FRACTION_BUSINESS_ROLES]: {
        title: 'Fraction business roles',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.OTHER_ROLES_COUNT]: {
        title: 'Other roles count',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.EXECUTIVES_COUNT]: {
        title: 'Executives count',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.FOUNDERS_COUNT]: {
        title: 'Founders count',
        defaultColumn: true,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.TEAM_FOUNDERS_IN_EXECUTIVES]: {
        title: 'Fraction founders in executive team',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.PERCENTAGE_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0]
                    ? Number(textArray[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : textArray}
            </div>
        ),
    },
    [CellNameType.INSTITUTION_NAME_NUNIQUE_FOUNDERS]: {
        title: 'Number of universities attended by founders',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.INSTITUTION_NAME_COUNT_FOUNDERS]: {
        title: 'Institution name count founders',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.INSTITUTION_NAME_COUNT_EXECUTIVES]: {
        title: 'Institution name count executives',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.SUBJECT_AGGREGATED_NUNIQUE_FOUNDERS]: {
        title: 'Number of subjects studied by founders',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MEAN_FOUNDERS]: {
        title: 'Founders average degree level',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
        tooltip: 'The degree level has been mapped to a scalar. Mapping: No degree = 0, Bachelor = 1, Master = 2, Ph.D = 3',
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? Number(textArray[0]).toFixed(1) : textArray}
            </div>
        ),
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MAX_FOUNDERS]: {
        title: 'Founders highest degree level',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
        tooltip: 'The degree level has been mapped to a scalar. Mapping: No degree = 0, Bachelor = 1, Master = 2, Ph.D = 3',
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? Number(textArray[0]).toFixed(1) : textArray}
            </div>
        ),
    },
    [CellNameType.DEGREE_TYPE_AGGREGATED_NUNIQUE_EXECUTIVES]: {
        title: 'Degree type aggregated nunique executives',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_STD_FOUNDERS]: {
        title: 'Degree type numeric std founders',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.DEGREE_TYPE_AGGREGATED_NUNIQUE_FOUNDERS]: {
        title: 'Degree type aggregated nunique founders',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.SUBJECT_AGGREGATED_NUNIQUE_EXECUTIVES]: {
        title: 'Number of subjects studied by executives',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MEAN_EXECUTIVES]: {
        title: 'Executives average degree level',
        defaultColumn: true,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
        tooltip: 'The degree level has been mapped to a scalar. Mapping: No degree = 0, Bachelor = 1, Master = 2, Ph.D = 3',
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? Number(textArray[0]).toFixed(1) : textArray}
            </div>
        ),
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_STD_EXECUTIVES]: {
        title: 'Degree type numeric std executives',
        defaultColumn: true,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? Number(textArray[0]).toFixed(1) : textArray}
            </div>
        ),
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MAX_EXECUTIVES]: {
        title: 'Executives highest degree level',
        defaultColumn: false,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.RANGE }],
        tooltip: 'The degree level has been mapped to a scalar. Mapping: No degree = 0, Bachelor = 1, Master = 2, Ph.D = 3',
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? Number(textArray[0]).toFixed(1) : textArray}
            </div>
        ),
    },
    [CellNameType.LAST_FUNDING_STAGE]: {
        title: 'Latest funding round',
        defaultColumn: true,
        defaultTableFilter: [{ value: [], type: SearchType.SORT_BY_LOCATION }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? mappingFundingRounds[textArray[0].trim()] : textArray}
            </div>
        ),
    },
    [CellNameType.LAST_FUNDING_DATE]: {
        title: 'Latest funding date',
        defaultColumn: true,
        defaultTableFilter: [
            {
                value: [startDateToday, endDateToday],
                type: SearchType.RANGE_DATE,
                needFilter: false,
            },
        ],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? moment(textArray[0].trim()).format('YYYY-MM-DD HH:mm') : textArray}
            </div>
        ),
    },
    [CellNameType.TOTAL_FUNDING]: {
        title: 'Total funding (USD)',
        defaultColumn: true,
        defaultTableFilter: [{ value: { min: '', max: '' }, type: SearchType.USD_RANGE }],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? shortenLongNumber(textArray[0]) : textArray}
            </div>
        ),
    },
    [CellNameType.UPDATED_AT]: {
        title: 'Updated at',
        defaultColumn: true,
        defaultTableFilter: [
            {
                value: [startDateToday, endDateToday],
                type: SearchType.RANGE_DATE,
                needFilter: false,
            },
        ],
        render: ({ textArray, maxWidth, className }) => (
            <div style={{ maxWidth }} className={className}>
                {textArray[0] ? moment(textArray[0].trim()).format('YYYY-MM-DD HH:mm') : textArray}
            </div>
        ),
    },
};
