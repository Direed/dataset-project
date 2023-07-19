import { makeStyles } from '@mui/styles';

export interface IClasses {
    label: string;
    content: string;
    tabs: string;
    tab: string;
}

export const useStyles = makeStyles(() => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },
    label: {
        fontSize: 13,
        marginTop: '20px !important',
        '&.active': {
            fontWeight: 800,
        },
    },
    tabs: {
        width: '100% !important',
    },
    tab: {
        maxWidth: '100% !important',
    },
}));
