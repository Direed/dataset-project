import { makeStyles } from '@mui/styles';

export interface IClasses {
    contentWrapper: string;
    icon: string;
    input: string;
    border: string;
    buttonWrapper: string;
    title: string;
    noselect: string;
    name: string;
    titleWrapper: string;
    unactiveArrow: string;
    infoIcon: string;
}

export const useStyles = makeStyles(() => ({
    noselect: {
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
    },
    name: {
        minWidth: 200,
    },
    contentWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    contentWrapperLeft: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sticky: {
        boxShadow: '5px 2px 5px grey',
        padding: '0 15px !important',
        height: 40,
    },
    infoIcon: {
        margin: '0 5px',
    },
    checkbox: {
        justifyContent: 'center',
        minWidth: 44,
        width: 44,
        padding: '0 !important',
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        background: 'transparent',
        border: 0,
        outline: 'none',
    },
    titleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightButton: {
        position: 'absolute',
        right: 0,
    },
    unactiveArrow: {
        opacity: '.3',
    },
    leftIcon: {
        fontSize: '18px !important',
        paddingRight: 5,
    },
    rightIcon: {
        fontSize: '13px !important',
    },
    input: {
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
    '.input: focus + .border': {
        width: '100%',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px 10px',
        '&.group': {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
        },
    },
    button: {},
    title: {
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        fontSize: '13px !important',
        fontWeight: 'bold !important',
    },
}));
