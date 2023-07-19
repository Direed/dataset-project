import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        padding: '20px',
    },
}));
