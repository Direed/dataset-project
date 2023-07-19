import { makeStyles } from '@mui/styles';

export interface IClasses {
    input: string;
    border: string;
    container: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        maxWidth: 140,
        width: '100%',
        padding: '0 20px',
    },
    input: {
        width: '100%',
        outline: 'none',
        border: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: '6px 0px',
        fontSize: 16,
        background: 'transparent',
        marginBottom: 15,
        marginTop: 10,
    },
    border: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 0,
        width: 0,
        height: 2,
        backgroundColor: '#0076FF',
        transition: 'width 0.4s',
    },
    '.input: focus + .border': {
        width: '100%',
    },
}));
