import React, { useEffect, useState } from 'react';
import CustomInput from '../../../components/Input';
import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Sidebar from '../../../components/Sidebar';
import { IClasses, useStyles } from './style';
import { useHistory, useLocation } from 'react-router-dom';
import { RoutePaths } from '../../../enums';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordRequest } from '../../../store/account/account.actions';
import { getStatusResetPassword } from '../../../store/account/account.selectors';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const ResetPasswordSidebar: React.FC = () => {
    const [showPassword, setShowPassword] = useState({ password: false, repeatPassword: false });
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const token = location.search?.split('=')?.[1];
    const statusResetPassword = useSelector(getStatusResetPassword);
    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(resetPasswordRequest(values, token || ''));
        },
    });
    useEffect(() => {
        if (statusResetPassword.isSuccess && formik.values.password) {
            history.push(RoutePaths.LOGIN);
        }
    }, [statusResetPassword]);
    const classes: IClasses = useStyles();
    const disableButton =
        (!!Object.keys(formik.touched).length && !!Object.keys(formik.errors).length) || formik.values.password !== formik.values.repeatPassword;
    const handleClickShowPassword = (title: string): void => setShowPassword({ ...showPassword, [title]: !showPassword[title] });
    return (
        <Sidebar>
            <CustomInput
                type={showPassword.password ? 'text' : 'password'}
                name="password"
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                variant="outlined"
                icon={showPassword ? <Visibility /> : <VisibilityOff />}
                onIconClick={() => handleClickShowPassword('password')}
                withShowPassword
                error={!!formik.errors.password && !!formik.touched.password}
                errorTitle={formik.errors.password || ''}
            />
            <CustomInput
                type={showPassword.repeatPassword ? 'text' : 'password'}
                name="repeatPassword"
                label="Repeat Password"
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
                variant="outlined"
                icon={showPassword ? <Visibility /> : <VisibilityOff />}
                onIconClick={() => handleClickShowPassword('repeatPassword')}
                withShowPassword
                error={!!formik.errors.repeatPassword && !!formik.touched.repeatPassword}
                errorTitle={formik.errors.repeatPassword || ''}
            />
            {formik.touched.password && formik.touched.repeatPassword && formik.values.password !== formik.values.repeatPassword && (
                <Typography>Passwords must be same</Typography>
            )}
            <Button
                onClick={() => formik.handleSubmit()}
                className={classes.button}
                color="secondary"
                variant="contained"
                disabled={disableButton}
                size="medium"
            >
                Save
            </Button>
        </Sidebar>
    );
};

const validationSchema = yup.object({
    password: yup.string().required('Login is required'),
    repeatPassword: yup.string().required('Password is required'),
});

export default React.memo(ResetPasswordSidebar);
