import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    title: string;
    image: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        padding: '0px 20px 20px',
        height: '100%',
    },
    title: {
        color: '#ef5350',
        marginBottom: 15,
        fontWeight: 400,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
}));
