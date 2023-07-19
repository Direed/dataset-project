import { makeStyles } from '@mui/styles';

export interface IClasses {
    wrapper: string;
    buttonWrapperPrimary: string;
    customButton: string;
}

export const useStyles = makeStyles(() => ({
    wrapper: {
        maxWidth: 250,
    },
    buttonWrapperPrimary: {
        margin: '23px 0',
    },
    customButton: {
        width: 110,
        height: 25,
        '&.MuiButton-containedSecondary': {
            fontSize: 10,
        },
    },
}));
