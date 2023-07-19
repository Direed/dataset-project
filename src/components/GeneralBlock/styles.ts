import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
    title: {
        margin: '20px 30px !important',
        fontWeight: 'bold !important',
        fontSize: '16px !important',
        paddingTop: 20,
    },
    blocksContainer: {
        padding: '0 30px',
    },
    subtitle: {
        fontWeight: 'bold !important',
        fontSize: '14px !important',
        paddingTop: 10,
        marginBottom: '5px !important',
    },
    chip: {
        marginRight: 10,
        textDecoration: 'none',
        marginBottom: 10,
    },
    block: {
        display: 'flex',
        marginBottom: 10,
    },
    description: {
        flexBasis: '70%',
        fontSize: 16,
    },
}));
