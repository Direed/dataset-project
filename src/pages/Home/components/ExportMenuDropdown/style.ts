import { makeStyles } from '@mui/styles';

export interface IClasses {
    iconAlertClose: string;
    exportButton: string;
    button: string;
}

export const useStyles = makeStyles(() => ({
    iconAlertClose: {
        cursor: 'pointer',
    },
    exportButton: {
        textDecoration: 'none',
        color: 'black',
    },
    button: {
        width: 180,
    },
}));
