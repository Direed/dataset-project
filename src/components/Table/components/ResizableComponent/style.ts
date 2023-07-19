import { makeStyles } from '@mui/styles';

export interface IClasses {
    resizeBlock: string;
}

export const useStyles = makeStyles(() => ({
    resizeBlock: {
        content: '',
        position: 'absolute',
        right: 0,
        top: 0,
        cursor: 'col-resize',
        backgroundColor: 'rgba(224, 224, 224, 1)',
        display: 'block',
        width: '2px',
        height: 42,
    },
}));
