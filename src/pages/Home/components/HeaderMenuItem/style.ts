import { makeStyles } from '@mui/styles';

export interface IClasses {
    filter: string;
    title: string;
}

export const useStyles = makeStyles(() => ({
    filter: {
        cursor: 'pointer',
        display: 'flex',
        marginLeft: 30,
        alignItems: 'center',
    },
    title: {
        whiteSpace: 'nowrap',
    },
}));
