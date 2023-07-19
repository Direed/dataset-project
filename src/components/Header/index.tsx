import React, { useCallback, useState } from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStyles } from './style';
import { RoutePaths } from '../../enums';
import { logout } from '../../store/account/account.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { getUserMe } from '../../store/account/account.selectors';
import { localStorageType } from '../../enums/localStorage';

interface IProps {
    onlyLogo?: boolean;
}

const Header: React.FC<IProps> = ({ onlyLogo }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { role } = useSelector(getUserMe);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = useCallback((event): void => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback((): void => {
        setAnchorEl(null);
    }, []);
    const onLogOut = useCallback(() => dispatch(logout()), []);
    const onLogoClick = useCallback(() => history.push(RoutePaths.HOME), []);
    const onProfile = useCallback(() => {
        history.push(role === 'admin' ? RoutePaths.INVITE_USER : RoutePaths.SETTINGS);
    }, [role]);
    const userPhoto = localStorage.getItem(localStorageType.USER_PHOTO);
    return (
        <div className={classes.headerContainer}>
            <div className={classes.rightBlock}>
                <img onClick={onLogoClick} className={classes.logoImage} src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
                {/* {location.pathname === RoutePaths.HOME ? <SearchDropdown /> : null} */}
            </div>
            {!onlyLogo && (
                <div className={classes.headerMenu}>
                    <div className={`${classes.profileWrapper}`} onClick={handleClick} aria-controls="basic-menu">
                        {userPhoto ? <img className={classes.userIcon} src={userPhoto} alt="icon" /> : <PersonIcon className={classes.profileIcon} />}
                        <Typography className={classes.profileTitle}>Profile</Typography>
                    </div>
                </div>
            )}
            {!onlyLogo && (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={onProfile}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={onLogOut}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            )}
        </div>
    );
};

export default React.memo(Header);
