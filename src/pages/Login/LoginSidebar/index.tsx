import React, { useCallback, useState } from 'react';
import CustomInput from '../../../components/Input';
import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess } from '../../../store/account/account.actions';
import Sidebar from '../../../components/Sidebar';
import { IClasses, useStyles } from './style';
import { getAccount } from '../../../store/account/account.selectors';
import { useHistory } from 'react-router-dom';
import { RoutePaths } from '../../../enums';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { localStorageType } from '../../../enums/localStorage';
import { IUserCredentials } from '../helpers';

const LoginSidebar: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const account = useSelector(getAccount);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginRequest(values));
        },
    });
    const classes: IClasses = useStyles();
    const onForgot = useCallback(() => history.push(RoutePaths.FORGOT_PASSWORD), []);
    const disableButton = !!Object.keys(formik.touched).length && !!Object.keys(formik.errors).length;
    const handleClickShowPassword = (): void => setShowPassword(!showPassword);
    const responseGoogle = (response: { clientId?: string; credential?: string; select_by?: string }): void => {
        if (response.credential) {
            const userCredentials: IUserCredentials = jwt_decode(response.credential);

            localStorage.setItem(localStorageType.TOKEN, response.credential);
            localStorage.setItem(localStorageType.USER_PHOTO, userCredentials.picture);
            dispatch(
                loginSuccess({
                    token: response.credential,
                    expire: new Date().getTime() + 24 * 60 * 60 * 1000,
                    role: 'user',
                    email: userCredentials.email,
                })
            );
        }
    };
    return (
        <Sidebar isLeft={true}>
            <CustomInput
                name="email"
                label="Login"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email && !!formik.touched.email}
                errorTitle={formik.errors.email || ''}
            />
            <CustomInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                icon={showPassword ? <Visibility /> : <VisibilityOff />}
                onIconClick={handleClickShowPassword}
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                variant="outlined"
                withShowPassword
                error={!!formik.errors.password && !!formik.touched.password}
                errorTitle={formik.errors.password || ''}
            />
            {account.error && <Typography className={classes.error}>{account.error}</Typography>}
            <div className={classes.footer}>
                <Button
                    onClick={() => formik.handleSubmit()}
                    className={`${classes.button} ${account.isLoading ? classes.loading : ''}`}
                    color="secondary"
                    variant="contained"
                    disabled={disableButton || account.isLoading}
                    size="medium"
                >
                    {account.isLoading ? 'Loading...' : 'Login'}
                </Button>
                <Typography onClick={onForgot} className={classes.forgot}>
                    Forgot Password
                </Typography>
            </div>
            <div>
                <br />
                <GoogleLogin onSuccess={responseGoogle} />
            </div>
        </Sidebar>
    );
};

const validationSchema = yup.object({
    email: yup.string().required('Login is required'),
    password: yup.string().required('Password is required'),
});

export default React.memo(LoginSidebar);
