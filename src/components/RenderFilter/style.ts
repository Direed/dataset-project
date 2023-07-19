import { makeStyles } from '@mui/styles';

export interface IClasses {
    moreOptions: string;
    container: string;
}

export const useStyles = makeStyles({
    container: {
        display: 'flex',
    },
    moreOptions: {
        background: '#E5E5E5',
        borderRadius: 7,
        width: 32,
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '10px',
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '15px',
        color: '#696969',
    },
});
