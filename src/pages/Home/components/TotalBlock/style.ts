import { makeStyles } from '@mui/styles';

export interface IClasses {
    filters: string;
    highlighted: string;
}

export const useStyles = makeStyles(() => ({
    filters: {
        padding: '0',
        marginTop: 10,
        display: 'flex',
        justifyContent: 'space-between',
    },
    highlighted: {
        color: '#EF3125',
        fontWeight: 'bold',
    },
}));
