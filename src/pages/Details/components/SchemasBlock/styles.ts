import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    chartWrapper: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        minHeight: 200,
        '& .css-1fiiycn-container': {
            width: '100%',
        },
    },
    chartWrapper: {
        minHeight: 350,
    },
}));
