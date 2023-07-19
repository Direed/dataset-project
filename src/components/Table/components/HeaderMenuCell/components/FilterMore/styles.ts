import { makeStyles } from '@mui/styles';

export interface IClasses {
    input: string;
    activeInput: string;
    container: string;
    border: string;
    searchInput: string;
    inputWrapper: string;
}

export const useStyles = makeStyles(() => ({
    input: {
        padding: '0 20px',
    },
    activeInput: {
        backgroundColor: '#B2D4FF',
        padding: '0 20px',
    },
    container: {
        maxHeight: 300,
        overflowY: 'auto',
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
    searchInput: {
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
    '.input: focus + .border': {
        width: '100%',
    },
    inputWrapper: {
        padding: '0 20px',
    },
}));
