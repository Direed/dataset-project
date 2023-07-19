import { makeStyles } from '@mui/styles';

export interface IClasses {
    cursorIcon: string;
}

export const useStyles = makeStyles(() => ({
    cursorIcon: {
        cursor: 'pointer',
    },
}));
