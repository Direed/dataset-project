import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { IClasses, useStyles } from './style';

interface IProps {
    children: React.ReactNode;
}

const AuthWrapper: React.FC<IProps> = ({ children }) => {
    const classes: IClasses = useStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className={classes.container}>
            <div className={`${classes.sidebar} ${isSmall ? 'mobile' : ''}`}>{children}</div>
            {!isSmall && (
                <div className={classes.content}>
                    <img className={classes.image} alt="image" src={process.env.PUBLIC_URL + '/authBG.png'} />
                </div>
            )}
        </div>
    );
};

export default React.memo(AuthWrapper);
