import React, { useCallback, useMemo } from 'react';
import Sidebar from '../../../Sidebar';
import { ProfileMenu, RoutePaths } from '../../../../enums';
import { Tab, Tabs } from '@mui/material';
import { useStyles } from './style';
import { useHistory, useLocation } from 'react-router-dom';
import { adminProfileTabs, userProfileTabs } from '../../../../constants';
import { useSelector } from 'react-redux';
import { getUserMe } from '../../../../store/account/account.selectors';

const ProfileSidebar: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { role } = useSelector(getUserMe);

    const profileTabs = useMemo(() => (role === 'admin' ? adminProfileTabs : userProfileTabs), [role]);

    const onSelectTab = useCallback((item: RoutePaths) => {
        history.push(item);
    }, []);
    const tabsValue = profileTabs.find((item) => item.route === location.pathname);

    return (
        <Sidebar withoutPadding>
            <div className={classes.content}>
                <Tabs
                    indicatorColor="secondary"
                    textColor="secondary"
                    orientation="vertical"
                    variant="scrollable"
                    value={tabsValue?.label || ProfileMenu.INVITE}
                    className={classes.tabs}
                >
                    {profileTabs.map((item) => (
                        <Tab key={item.label} className={classes.tab} value={item.label} label={item.label} onClick={() => onSelectTab(item.route)} />
                    ))}
                </Tabs>
            </div>
        </Sidebar>
    );
};

export default React.memo(ProfileSidebar);
