import React from 'react';
import ResetPasswordSidebar from './ResetPasswordSidebar';
import AuthWrapper from '../../components/authWrapper';

const ResetPasswordPage: React.FC = () => {
    return (
        <AuthWrapper>
            <ResetPasswordSidebar />
        </AuthWrapper>
    );
};

export default React.memo(ResetPasswordPage);
