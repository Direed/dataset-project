import React, { useCallback } from 'react';
import { IClasses, useStyles } from './style';
import { useHistory } from 'react-router-dom';
import { RoutePaths } from '../../enums';
import { useSelector } from 'react-redux';
import { getAccount } from '../../store/account/account.selectors';

interface IProps {
    children?: React.ReactNode;
    withActions?: boolean;
    withoutPadding?: boolean;
    isLeft?: boolean;
}

const Sidebar: React.FC<IProps> = ({ children, withoutPadding, isLeft }) => {
    const classes: IClasses = useStyles();
    const history = useHistory();
    const account = useSelector(getAccount);
    const onLogoClick = useCallback(() => {
        if (account.isAuthenticated) {
            history.push(RoutePaths.HOME);
        }
    }, []);
    return (
        <div className={`${classes.sidebar} ${withoutPadding ? 'active' : ''}`}>
            <div className={`${classes.logoContainer} ${isLeft ? classes.isLeft : ''}`}>
                <img className={classes.logoImage} onClick={onLogoClick} src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
            </div>
            {children}
        </div>
    );
};

export default React.memo(Sidebar);
