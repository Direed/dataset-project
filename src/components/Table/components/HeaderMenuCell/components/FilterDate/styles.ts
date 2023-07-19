import { makeStyles } from '@mui/styles';

export interface IClasses {
    input: string;
    submitButtonWrapper: string;
}

export const useStyles = makeStyles(() => ({
    input: {
        width: 120,
        height: 30,
        borderRadius: 3,
        border: '1px solid #000',
        margin: '10px 10px',
    },
    submitButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
}));
