import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
    container: {
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 20,
    },
    info: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: 0,
    },
    website: {
        color: '#cacaca',
        fontSize: 13,
        margin: 0,
    },
}));
