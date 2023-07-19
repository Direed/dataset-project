import { makeStyles } from '@mui/styles';

export interface IClasses {
    input: string;
    slider: string;
    sliderBox: string;
    submitButtonWrapper: string;
}

export const useStyles = makeStyles(() => ({
    input: {
        width: 120,
        height: 20,
        borderRadius: 3,
        border: '1px solid #000',
        margin: '10px 10px',
    },
    sliderBox: {
        marginTop: 20,
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem',
        alignItems: 'center',
    },
}));
