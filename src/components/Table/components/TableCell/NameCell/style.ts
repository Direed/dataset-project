import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
    cellWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: 16,
        boxShadow: '5px 2px 5px grey',
    },
    infoWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    nameWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        width: '80%',
    },
    textsInfo: {
        marginLeft: 15,
        width: '70%',
    },
    name: {
        fontWeight: '800',
        cursor: 'pointer',
        fontSize: '13px !important',
        margin: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    website: {
        fontSize: '10px !important',
        margin: 0,
        color: '#545353',
        overflow: 'hidden',
        maxWidth: 140,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    logo: {
        height: '25px',
        width: '25px',
    },
    crunchBaseLogo: {
        width: '20%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));
