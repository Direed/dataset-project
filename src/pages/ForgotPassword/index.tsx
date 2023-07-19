import React from 'react';
import ForgotPasswordSidebar from './components/ForgotPasswordSidebar';
import AuthWrapper from '../../components/authWrapper';

const ForgotPasswordPage: React.FC = () => {
    return (
        <AuthWrapper>
            <ForgotPasswordSidebar />
        </AuthWrapper>
    );
};

export default React.memo(ForgotPasswordPage);
