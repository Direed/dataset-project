import { makeStyles } from '@mui/styles';

export interface IClasses {
    infoContainer: string;
    mainContent: string;
    noContent: string;
    boldText: string;
    header: string;
}

export const useStyles = makeStyles(() => ({
    infoContainer: {
        background: '#FFF8EF',
        padding: '45px 35px 20px 35px',
        display: 'flex',
        gridGap: '20px',
        minHeight: 'calc(100vh - 181px)',
    },
    mainContent: {
        display: 'grid',
        justifyContent: 'center',
        gridGap: 20,
        width: '100%',
        height: '100%',
        gridTemplateColumns: 'repeat(auto-fill, 443px)',
    },
    noContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        fontSize: 20,
    },
    boldText: {
        fontWeight: 700,
    },
    header: {
        marginTop: 10,
        marginLeft: 14,
    },
}));
