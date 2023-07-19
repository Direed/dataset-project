import React, { useLayoutEffect } from 'react';
import { Grid } from '@mui/material';
import { useStyles } from './style';
import ProfileSidebar from './components/ProfileSidebar';
import { getUserMe } from '../../store/account/account.selectors';
import { useSelector } from 'react-redux';
import { RoutePaths } from '../../enums';
import { useHistory } from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
}

const ProfileWrapper: React.FC<IProps> = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const { role, isLoading } = useSelector(getUserMe);
    useLayoutEffect(() => {
        if (!isLoading && role !== 'admin') {
            history.push(RoutePaths.SETTINGS);
        }
    }, [role, isLoading]);
    return (
        <Grid container>
            <Grid item xs={3}>
                <ProfileSidebar />
            </Grid>
            <Grid item xs={9} className={classes.content}>
                {children}
            </Grid>
        </Grid>
    );
};

export default React.memo(ProfileWrapper);
