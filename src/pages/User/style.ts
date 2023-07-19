import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    logoImage: string;
    schemas: string;
    info: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        padding: '20px',
        height: 'calc(100vh - 40px)',
        overflow: 'auto',
    },
    logoImage: {
        width: '100%',
        height: 65,
        maxWidth: 200,
    },
    info: {
        marginTop: 20,
        marginBottom: 20,
    },
    schemas: {
        padding: '20px 10px',
    },
    loader: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
