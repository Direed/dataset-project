import { makeStyles } from '@mui/styles';

export interface IClasses {
    button: string;
    buttonContainer: string;
    container: string;
    inputWrapper: string;
    input: string;
    wrapper: string;
}

export const useStyles = makeStyles(() => ({
    buttonContainer: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        width: 93,
    },
    inputWrapper: {
        marginRight: 8,
    },
    input: {
        width: '100%',
        outline: 'none',
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '6px 0px',
        fontSize: 16,
        background: 'transparent',
    },
    container: {
        padding: '13px 22px',
        width: 280,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
}));
