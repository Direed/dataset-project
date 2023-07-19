import { makeStyles } from '@mui/styles';

export interface IClasses {
    searchMenu: string;
    customInput: string;
}

export const useStyles = makeStyles(() => ({
    searchMenu: {
        padding: '10px 20px',
        maxWidth: 200,
    },
    customInput: {
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
}));
