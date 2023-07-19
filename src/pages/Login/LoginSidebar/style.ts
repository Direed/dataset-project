import { makeStyles } from '@mui/styles';

export interface IClasses {
    button: string;
    error: string;
    footer: string;
    forgot: string;
    loading: string;
}

export const useStyles = makeStyles(() => ({
    button: {
        marginTop: `20px !important`,
    },
    loading: {
        opacity: 0.7,
    },
    error: {
        color: '#EF3125',
        paddingTop: 15,
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forgot: {
        color: '#EF3125',
        paddingTop: 15,
        cursor: 'pointer',
    },
}));
