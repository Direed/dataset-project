import React, { useEffect } from 'react';
import LoginSidebar from './LoginSidebar';
import { useSelector } from 'react-redux';
import { getAccount } from '../../store/account/account.selectors';
import { useHistory } from 'react-router';
import { RoutePaths } from '../../enums';
import AuthWrapper from '../../components/authWrapper';

// Page return UI for login user, make authorization request to server,

const LoginPage: React.FC = () => {
    const account = useSelector(getAccount);
    const history = useHistory();
    useEffect(() => {
        if (account.isAuthenticated) {
            history.push(RoutePaths.HOME);
        }
    }, [account]);
    return (
        <AuthWrapper>
            <LoginSidebar />
        </AuthWrapper>
    );
};
export default React.memo(LoginPage);
