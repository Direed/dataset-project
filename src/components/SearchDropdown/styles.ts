import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    wrapper: {
        width: 320,
        position: 'relative',
        marginTop: -15,
        zIndex: 1000,
    },
    searchBlock: {
        position: 'absolute',
        width: '100%',
        marginTop: 5,
        zIndex: 1000,
        maxHeight: 400,
        overflowY: 'auto',
    },
});
