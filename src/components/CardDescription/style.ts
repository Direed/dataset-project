import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    itemBlock: string;
    text: string;
    icon: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gridGap: 17,
    },
    itemBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '19px',
        color: '#4A4A4A',
    },
    icon: {
        marginRight: '24px',
        width: 22,
    },
    redColor: {
        fontFamily: 'Inter',
        color: '#EF3125',
    },
    yellowColor: {
        fontFamily: 'Inter',
        color: '#B9BC10',
    },
    greenColor: {
        fontFamily: 'Inter',
        color: '#1DB404',
    },
}));
