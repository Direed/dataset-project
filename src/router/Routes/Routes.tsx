import { Switch, useLocation } from 'react-router';
import { v4 as uuid } from 'uuid';
import { AppRoute } from '../AppRoute';
import LoginPage from '../../pages/Login';
import HomePage from '../../pages/Home';
import { RoutePaths } from '../../enums';
import CompanyPage from '../../pages/Company';
import ForgotPasswordPage from '../../pages/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword';
import ProfileInviteUser from '../../pages/ProfileInviteUser';
import ProfileSettings from '../../pages/ProfileSettings';
import ProfileWrapper from '../../components/ProfileWrapper';
import VerifyEmailPage from '../../pages/VerifyEmail';
import UserPage from '../../pages/User';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getUserMe } from '../../store/account/account.selectors';

const publicRoutes = [
    {
        path: RoutePaths.HOME,
        exact: true,
        component: HomePage,
    },
    {
        path: RoutePaths.LOGIN,
        exact: true,
        component: LoginPage,
    },
    {
        path: RoutePaths.FORGOT_PASSWORD,
        exact: true,
        component: ForgotPasswordPage,
    },
    {
        path: RoutePaths.RESET_PASSWORD,
        exact: true,
        component: ResetPasswordPage,
    },
    {
        path: RoutePaths.SETTINGS,
        exact: true,
        component: ProfileSettings,
    },
    {
        path: RoutePaths.VERIFY_EMAIL,
        exact: true,
        component: VerifyEmailPage,
    },
    {
        path: RoutePaths.USER,
        exact: true,
        component: UserPage,
    },
    {
        path: RoutePaths.DETAILS,
        exact: true,
        component: CompanyPage,
    },
];

const privateRoutes = [
    {
        path: RoutePaths.INVITE_USER,
        exact: true,
        component: ProfileInviteUser,
    },
];

export const Routes = (): JSX.Element => {
    const location = useLocation();
    const { role } = useSelector(getUserMe);
    const profileRoutes = [RoutePaths.SETTINGS, RoutePaths.INVITE_USER];
    const routes = useMemo(() => [...publicRoutes, ...(role === 'admin' ? privateRoutes : [])], [role]);
    // create wrapper on setting page

    return !profileRoutes.includes(location.pathname as RoutePaths.SETTINGS) ? (
        <Switch>
            {routes.map((route) => (
                // @ts-ignore
                <AppRoute {...route} key={route.path || uuid()} />
            ))}
        </Switch>
    ) : (
        <ProfileWrapper>
            <Switch>
                {routes.map((route) => (
                    // @ts-ignore
                    <AppRoute {...route} key={route.path || uuid()} />
                ))}
            </Switch>
        </ProfileWrapper>
    );
};
