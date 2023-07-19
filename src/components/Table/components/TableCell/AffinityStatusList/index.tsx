import { Tooltip } from '@mui/material';
import React from 'react';
import { AffinityStatusType } from '../../../../../enums/affinityStatusType';
import { useStyles } from './styles';

interface IProps {
    title: AffinityStatusType | string;
}

const AffinityStatusCell: React.FC<IProps> = ({ title }) => {
    const classes = useStyles();
    switch (title) {
        case AffinityStatusType.BLACK:
            return (
                <Tooltip title={'No contact with the company'}>
                    <div className={classes.bold}>{title}</div>
                </Tooltip>
            );
        case AffinityStatusType.YELLOW:
            return (
                <Tooltip title={'Last contact was made later than 6 months but before 18 months'}>
                    <div className={`${classes.bold} ${classes.YELLOW}`}>{title}</div>
                </Tooltip>
            );
        case AffinityStatusType.RED:
            return (
                <Tooltip title={'Last contact was made later than 18 months'}>
                    <div className={`${classes.bold} ${classes.RED}`}>{title}</div>
                </Tooltip>
            );
        case AffinityStatusType.GREEN:
            return (
                <Tooltip title={'Last contact was made less than 6 months ago'}>
                    <div className={`${classes.bold} ${classes.GREEN}`}>{title}</div>
                </Tooltip>
            );
        default:
            return <div>{title === '0' || title === 'null' ? '' : title}</div>;
    }
};

export default React.memo(AffinityStatusCell);
