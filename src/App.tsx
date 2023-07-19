import { FC, memo, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Routes } from './router/Routes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { useDispatch } from 'react-redux';
import { refreshToken, userMeRequest } from './store/account/account.actions';
import { SnackbarProvider } from 'notistack';
import AlertBox from './components/AlertBox';
import { localStorageType } from './enums/localStorage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const SnackBarComponent = SnackbarProvider as any;

const App: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem(localStorageType.TOKEN);
        const timeInSeconds = Number(localStorage.getItem(localStorageType.TIME) || 0);
        const timeInMs = timeInSeconds ? timeInSeconds * 1000 : 0;
        const currentTime = new Date().getTime();
        if (token && timeInSeconds && timeInMs < currentTime) {
            dispatch(refreshToken(token));
        } else if (token) {
            dispatch(userMeRequest(token));
        }
    }, []);
    return (
        <GoogleOAuthProvider clientId="231566094654-hpp3r0l79bvv6fnrgtk4o820stgmmv2e.apps.googleusercontent.com">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <ErrorBoundary>
                        {() => (
                            <div>
                                <SnackBarComponent maxSnack={3}>
                                    <AlertBox>
                                        <Routes />
                                    </AlertBox>
                                </SnackBarComponent>
                            </div>
                        )}
                    </ErrorBoundary>
                </BrowserRouter>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
};

export default memo(App);
