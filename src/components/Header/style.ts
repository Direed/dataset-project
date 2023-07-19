import { makeStyles } from '@mui/styles';

export interface IClasses {
    headerContainer: string;
    profileWrapper: string;
    profileTitle: string;
    headerSearch: string;
    rightBlock: string;
    headerMenu: string;
    logoImage: string;
    profile: string;
    profileIcon: string;
    userIcon: string;
}

export const useStyles = makeStyles(() => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileIcon: {
        marginRight: 5,
    },
    headerMenu: {
        display: 'flex',
    },
    profileTitle: {
        marginRight: '10px !important',
    },
    userIcon: {
        height: '35px',
        marginRight: '10px',
        borderRadius: '50%',
    },
    profileWrapper: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    rightBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    logoImage: {
        width: '100%',
        height: '100%',
        maxWidth: 200,
        cursor: 'pointer',
        marginRight: 20,
    },
}));
