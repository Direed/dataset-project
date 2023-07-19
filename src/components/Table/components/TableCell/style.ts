import { makeStyles } from '@mui/styles';

export interface IClasses {}

export const useStyles = makeStyles(() => ({
    nameWrapper: {
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    cell: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maxWidth: 200,
        cursor: 'pointer',
        minWidth: 100,
    },
    tableCell: {
        border: '1px #cecece solid',
        cursor: 'pointer',
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
    highlighted: {
        background: '#00ff90',
    },
    columnLink: {
        overflow: 'hidden',
        maxWidth: 200,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    checkbox: {
        width: 44,
        minWidth: '44px !important',
    },
}));
