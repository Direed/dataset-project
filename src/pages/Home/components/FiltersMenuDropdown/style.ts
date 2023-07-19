import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    button: string;
    buttonContainer: string;
    filterElement: string;
    closeIcon: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        padding: '20px 10px 10px 20px',
    },
    buttonContainer: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        width: 93,
    },
    filterElement: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeIcon: {
        width: '20px !important',
        height: '20px !important',
    },
}));
