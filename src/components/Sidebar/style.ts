import { makeStyles } from '@mui/styles';

export interface IClasses {
    sidebar: string;
    logoImage: string;
    logoContainer: string;
    isLeft: string;
}

export const useStyles = makeStyles(() => ({
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    isLeft: {
        justifyContent: 'left',
    },
    sidebar: {
        background: '#eaeaea',
        minHeight: '100vh',
        padding: '20px 20px',
        height: '100%',
        '&.active': {
            padding: '20px 0',
        },
    },
    logoImage: {
        width: 200,
        height: 52,
        marginBottom: 30,
        cursor: 'pointer',
    },
}));
