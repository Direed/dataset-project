import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    mainInfo: string;
    logos: string;
    redColor: string;
    yellowColor: string;
    greenColor: string;
    title: string;
    text: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        maxWidth: 443,
        padding: '15px 10px 30px 30px',
        boxShadow: '1px 1px 9px rgba(0, 0, 0, 0.1)',
        borderRadius: '7px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        background: '#FFFFFF',
        justifyContent: 'space-between',
        position: 'relative',
    },
    mainInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        gridGap: '20px',
        height: '100%',
    },
    logos: {
        display: 'flex',
        width: '50px',
        justifyContent: 'space-between',
        position: 'absolute',
        top: '16px',
        left: '383px',
    },
    redColor: {
        color: '#EF3125',
    },
    yellowColor: {
        color: '#B9BC10',
    },
    greenColor: {
        color: '#1DB404',
    },
    title: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 17,
    },
    text: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '19px',
        color: '#4A4A4A',
    },
}));
