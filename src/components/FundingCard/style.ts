import { makeStyles } from '@mui/styles';

export interface IClasses {
    header: string;
    title: string;
    container: string;
    table: string;
    tableBody: string;
    body: string;
    bodyContent: string;
    tableHeaders: string;
    tableBodyRows: string;
    tableHead: string;
    moneyRaised: string;
    tooltipContainer: string;
    tooltipTextSpacing: string;
    boldText: string;
}

export const useStyles = makeStyles(() => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    body: {
        overflow: 'auto',
        height: 'calc(100% - 38px)',
    },
    bodyContent: {
        '&:last-child td, &:last-child th': { border: 0 },
    },
    title: {
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: 20,
    },
    container: {
        padding: '15px 10px 0px 29px',
        width: 906,
        height: 510,
    },
    table: {
        minWidth: 654,
    },
    tableBody: {
        minWidth: 654,
    },
    moneyRaised: {
        display: 'flex',
        flexDirection: 'column',
    },
    tableHead: {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        height: '68px',
        background: 'white',
    },
    tableHeaders: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '19px',
        color: '#4A4A4A',
        borderBottom: '1px solid #4A4A4A',
    },
    tableBodyRows: {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '15px',
        color: '#4A4A4A',
        height: '68px',
        borderBottom: '1px solid #4A4A4A',
    },
    tooltipContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    tooltipTextSpacing: {
        marginBottom: 15,
    },
    boldText: {
        fontFamily: 'Inter',
        fontWeight: '700',
    },
}));
