import { makeStyles } from '@mui/styles';

export interface IClasses {
    closeIcon: string;
    open: string;
    filterMenu: string;
}

export const useStyles = makeStyles(() => ({
    closeIcon: {
        marginBottom: '20px !important',
    },
    filterMenu: {
        zIndex: 1001,
        position: 'fixed',
        background: '#fff',
        top: 0,
        right: -350,
        width: 300,
        padding: `20px 0`,
        borderRadius: 10,
        maxHeight: 'calc(100vh - 40px)',
        height: '100%',
        overflow: 'auto',
        transition: 'right .25s linear',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },
    open: {
        right: 0,
    },
}));
