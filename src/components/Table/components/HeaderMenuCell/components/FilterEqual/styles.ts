import { makeStyles } from '@mui/styles';

export interface IClasses {
    input: string;
}

export const useStyles = makeStyles(() => ({
    input: {
        padding: '0 20px',
    },
}));
