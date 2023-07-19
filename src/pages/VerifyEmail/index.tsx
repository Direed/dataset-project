import React from 'react';
import VerifyEmailSidebar from './VerifyEmailSidebar';
import AuthWrapper from '../../components/authWrapper';

const VerifyEmailPage: React.FC = () => {
    return (
        <AuthWrapper>
            <VerifyEmailSidebar />
        </AuthWrapper>
    );
};

export default React.memo(VerifyEmailPage);
