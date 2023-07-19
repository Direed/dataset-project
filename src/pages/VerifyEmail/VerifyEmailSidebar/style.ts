import { makeStyles } from '@mui/styles';

export interface IClasses {
    button: string;
    error: string;
}

export const useStyles = makeStyles(() => ({
    button: {
        marginTop: `20px !important`,
    },
    error: {
        color: '#EF3125',
        paddingTop: 15,
    },
}));
