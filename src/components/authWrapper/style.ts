import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    image: string;
    content: string;
    sidebar: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        maxHeight: '100vh',
    },
    sidebar: {
        maxWidth: 500,
        width: '100%',
        '&.mobile': {
            maxWidth: '100%',
        },
        ['@media (max-width:1440px)']: {
            maxWidth: 400,
        },
    },
    content: {
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
}));
