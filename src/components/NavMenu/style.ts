import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    activeElem: string;
    menuElem: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '22px 14px 0 14px',
    },
    activeElem: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
        height: '42px',
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: '16px',
        borderRadius: '10px 10px 0 0',
        background: '#FFF8EF',
    },
    menuElem: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '42px',
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: '16px',
        borderRadius: '10px 10px 0 0',
    },
}));
