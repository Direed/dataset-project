import { makeStyles } from '@mui/styles';

export interface IClasses {
    filters: string;
    filterImage: string;
    filterItem: string;
    filtersIcon: string;
    filterChip: string;
    buttonWrapper: string;
}

export const useStyles = makeStyles(() => ({
    filterItem: {
        justifyContent: 'flex-start',
    },
    filters: {
        padding: '10px 0',
        marginTop: 0,
        display: 'flex',
        justifyContent: 'space-between',
    },
    filtersIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    filterImage: {
        width: 20,
        height: '100%',
        marginRight: 10,
    },
    filterChip: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        padding: '5px 10px',
        '&.group': {
            display: 'flex',
            justifyContent: 'center',
        },
    },
}));
