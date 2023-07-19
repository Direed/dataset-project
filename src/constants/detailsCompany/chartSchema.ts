import faker from 'faker';
import cyan from '@mui/material/colors/cyan';
import { pink } from '@mui/material/colors';

const labelsWebTraffic = [
    '1M Web Traffic',
    '2M Web Traffic',
    '3M Web Traffic',
    '4M Web Traffic',
    '5M Web Traffic',
    '6M Web Traffic',
    'AG1M Web Traffic',
    'AG3M Web Traffic',
    'AG6M Web Traffic',
    'AG6M Web Traffic',
    'RG3M Web Traffic',
    'RG6M Web Traffic',
];

const labelsEmployees = [
    '1M Employees',
    '2M Employees',
    '3M Employees',
    '4M Employees',
    '5M Employees',
    '6M Employees',
    'AG1M Employees',
    'AG3M Employees',
    'AG6M Employees',
    'RG1M Employees',
    'RG3M Employees',
    'RG6M Employees',
];
const labelsDate = [
    '01-01-2021',
    '01-02-2021',
    '01-03-2021',
    '01-04-2021',
    '01-05-2021',
    '01-06-2021',
    '01-07-2021',
    '01-08-2021',
    '01-09-2021',
    '01-10-2021',
    '01-11-2021',
    '01-12-2021',
];
export type ChartSchemaType = {
    [key: string]: {
        selectOption: { value: string; label: string }[];
        name: string;
        labels: string[];
        selectPlaceholder: string;
        datasets: { label: string; data: number[]; backgroundColor: string }[];
    };
};

export const chartSchema: ChartSchemaType = {
    'Employee Growth': {
        selectOption: labelsEmployees.map((item) => ({ value: item, label: item })),
        selectPlaceholder: 'Select Employee Growth',
        labels: labelsDate,
        name: 'Employee Growth',
        datasets: [
            {
                label: 'Employees',
                data: labelsDate.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: cyan[400],
            },
        ],
    },
    'Web Traffic': {
        selectOption: labelsWebTraffic.map((item) => ({ value: item, label: item })),
        labels: labelsDate,
        selectPlaceholder: 'Select Web Traffic',
        name: 'Web Traffic',
        datasets: [
            {
                label: 'Web Traffic',
                data: labelsDate.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: pink[400],
            },
        ],
    },
    'Github Forks': {
        selectOption: [],
        labels: labelsDate,
        selectPlaceholder: 'Select Github Forks',
        name: 'Github Forks',
        datasets: [
            {
                label: 'Github Forks',
                data: labelsDate.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: pink[400],
            },
        ],
    },
    'Github Stars': {
        selectOption: [],
        labels: labelsDate,
        selectPlaceholder: 'Select Github Stars',
        name: 'Github Stars',
        datasets: [
            {
                label: 'Github Stars',
                data: labelsDate.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: pink[400],
            },
        ],
    },
    'ProductHunt Votes': {
        selectOption: [],
        labels: labelsDate,
        selectPlaceholder: 'Select ProductHunt Votes',
        name: 'ProductHunt Votes',
        datasets: [
            {
                label: 'ProductHunt Votes',
                data: labelsDate.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: pink[400],
            },
        ],
    },
};
