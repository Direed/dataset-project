import React from 'react';
import { Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useStyles } from './style';

interface IProps {
    title: string;
    subtitle: string;
}

const HeaderBlock: React.FC<IProps> = ({ title, subtitle }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.info}>
                <Avatar className={classes.avatar}>{title[0]}</Avatar>
                <div>
                    <p className={classes.name}>{title}</p>
                    <p className={classes.website}>{subtitle}</p>
                </div>
            </div>
            <MoreVertIcon color="disabled" />
        </div>
    );
};

export default React.memo(HeaderBlock);
