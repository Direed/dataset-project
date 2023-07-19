import { makeStyles } from '@mui/styles';

export interface IClasses {
    content: string;
    button: string;
}

export const useStyles = makeStyles(() => ({
    content: {
        textAlign: 'center',
        minWidth: 400,
        padding: '20px 40px',
    },
    button: {
        marginTop: '30px !important',
    },
}));
