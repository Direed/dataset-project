import { makeStyles } from '@mui/styles';

export interface IClasses {
    wrapper: string;
}
export const useStyles = makeStyles({
    wrapper: {
        width: 320,
        position: 'relative',
        marginTop: -15,
        zIndex: 1000,
    },
});
