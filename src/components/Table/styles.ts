import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    headerCell: {
        padding: '11px 5px !important',
        border: '1px #cecece solid',
        cursor: 'pointer',
        background: '#ffff',
        height: 'auto',
    },
    head: {
        position: 'sticky',
        top: 0,
        zIndex: 999,
    },
    stickyHeader: {
        zIndex: '10 !important',
    },
    hide: {
        display: 'none !important',
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        margin: 30,
        position: 'sticky',
        left: 0,
    },
    sticky: {
        position: 'sticky',
        left: 0,
        background: 'white',
        boxShadow: '5px 2px 5px grey',
        zIndex: 1,
        padding: '0 !important',
        border: '1px #fffff solid',
    },
    stickyName: {
        left: 46,
        maxWidth: 230,
    },
    checkbox: {
        width: 44,
        minWidth: '44px !important',
    },
    infinityWrapper: {
        position: 'relative',
    },
    loading: {
        position: 'absolute',
        top: 40,
        width: '100%',
        zIndex: 1000,
    },
});
