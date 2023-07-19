import { makeStyles } from '@mui/styles';

export interface IClasses {
    wrapper: string;
    buttonWrapper: string;
    buttonWrapperSecondary: string;
    buttonWrapperPrimary: string;
    customButton: string;
    accordion: string;
    switchBox: string;
    accordionDetail: string;
    slider: string;
    customInput: string;
    selectKeyWord: string;
    mainButton: string;
}

export const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'block !important',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 30px',
        marginTop: 15,
        marginBottom: 30,
    },
    buttonWrapperSecondary: {
        marginBottom: 23,
        padding: 0,
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
    accordion: {
        borderTop: '1px solid #cecece',
        '& .MuiAccordionDetails-root': {
            padding: 0,
        },
    },
    accordionDetail: {
        borderTop: '1px solid #cecece',
        padding: '8px 20px 0',
        '& .css-1fiiycn-container': {
            width: '100%',
        },
    },
    switchBox: {
        borderTop: '1px solid #cecece',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    slider: {
        maxWidth: 250,
    },
    selectKeyWord: {
        marginBottom: 20,
        maxWidth: 250,
    },
    customInput: {
        marginTop: '4px !important',
        '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
        },
        '& .MuiInputLabel-shrink': {
            marginTop: '0 !important',
        },
        '& .MuiInputLabel-root': {
            marginTop: -4,
        },
    },
    mainButton: {
        width: 100,
    },
}));
