import { makeStyles } from '@mui/styles';

export interface IClasses {
    input: string;
    errorTitle: string;
}

export const useStyles = makeStyles(() => ({
    input: {
        marginTop: `15px !important`,
    },
    errorTitle: {
        color: '#EF3125',
        fontSize: 12,
    },
}));
