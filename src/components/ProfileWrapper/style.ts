import { makeStyles } from '@mui/styles';

export interface IClasses {
    content: string;
}

export const useStyles = makeStyles(() => ({
    content: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
}));
