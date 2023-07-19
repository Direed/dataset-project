import { makeStyles } from '@mui/styles';

export interface IClasses {
    container: string;
    photoContainer: string;
    phoneNumber: string;
    email: string;
    photo: string;
    name: string;
    position: string;
    education: string;
    educations: string;
    tag: string;
    tags: string;
    withoutEducationText: string;
    educationIcon: string;
    educationText: string;
    grid: string;
    mainInfo: string;
    social: string;
    logos: string;
}

export const useStyles = makeStyles(() => ({
    container: {
        padding: '19px 13px 18px 8px',
        boxShadow: '1px 1px 9px rgba(0, 0, 0, 0.1)',
        borderRadius: '7px',
        background: '#FFFFFF',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        gridColumnGap: '28px',
        marginBottom: 47,
    },
    photoContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    photo: {
        height: '77px',
        width: '77px',
        marginBottom: '16px',
        marginLeft: '14px',
    },
    phoneNumber: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        marginBottom: '8px',
        color: '#313131',
        whiteSpace: 'nowrap',
    },
    email: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        color: '#313131',
    },
    name: {
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '14px',
        marginBottom: '7px',
    },
    position: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        color: '#696969',
        marginBottom: '34px',
    },
    education: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '15px',
    },
    educationIcon: {
        height: '37px',
        width: '37px',
        marginRight: '13px',
    },
    educationText: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '15px',
        color: '#313131',
    },
    educations: {
        marginBottom: 43,
    },
    social: {
        position: 'absolute',
        top: 19,
        right: 15,
    },
    tags: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 17,
        alignItems: 'flex-end',
    },
    tag: {
        padding: '3px 6px',
        background: '#FFFFFF',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '12px',
        color: '#696969',
        marginRight: '5px',
        marginBottom: '5px',
    },
    mainInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        gridGap: '20px',
        height: '100%',
    },
    logos: {
        display: 'flex',
        width: '50px',
        justifyContent: 'space-between',
        position: 'absolute',
        top: '16px',
        left: '383px',
    },
    withoutEducationText: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '15px',
    },
}));
