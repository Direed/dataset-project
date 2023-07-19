import { makeStyles } from '@mui/styles';

export interface IClasses {
    input: string;
    checkedBox: string;
}

export const useStyles = makeStyles(() => ({
    input: {
        width: 120,
        height: 20,
        borderRadius: 3,
        border: '1px solid #000',
        margin: '10px',
    },
    checkedBox: {
        padding: '0 1rem',
        alignItems: 'center',
    },
}));
