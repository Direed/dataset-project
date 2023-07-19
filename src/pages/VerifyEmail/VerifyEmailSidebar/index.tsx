import React, { useEffect, useState } from 'react';
import CustomInput from '../../../components/Input';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Sidebar from '../../../components/Sidebar';
import { IClasses, useStyles } from './style';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RoutePaths } from '../../../enums';
import { useDispatch, useSelector } from 'react-redux';
import { logout, verifyEmail } from '../../../store/account/account.actions';
import { getVerifyStatus } from '../../../store/account/account.selectors';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const VerifyEmailSidebar: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const params: { email?: string } = useParams();
    const token = location.search?.split('=')?.[1];
    const dispatch = useDispatch();
    const verifyStatus = useSelector(getVerifyStatus);
    const formik = useFormik({
        initialValues: {
            full_name: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: ({ full_name, password }) => {
            dispatch(verifyEmail(token, { password, full_name, email: params?.email || '' }));
        },
    });
    useEffect(() => {
        dispatch(logout());
    }, []);
    useEffect(() => {
        if (verifyStatus) {
            history.push(RoutePaths.HOME);
        }
    }, [verifyStatus]);
    const classes: IClasses = useStyles();
    const disableButton = !!Object.keys(formik.touched).length && !!Object.keys(formik.errors).length;
    const handleClickShowPassword = (): void => setShowPassword(!showPassword);
    const handleMouseDownPassword = (): void => setShowPassword(!showPassword);
    return (
        <Sidebar>
            <CustomInput
                type="text"
                name="full_name"
                label="Full Name"
                onChange={formik.handleChange}
                value={formik.values.full_name}
                variant="outlined"
                error={!!formik.errors.full_name && !!formik.touched.full_name}
                errorTitle={formik.errors.full_name || ''}
            />
            <CustomInput
                type="password"
                name="password"
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                variant="outlined"
                icon={showPassword ? <Visibility /> : <VisibilityOff />}
                onIconClick={handleClickShowPassword}
                onIconMouseDown={handleMouseDownPassword}
                withShowPassword
                error={!!formik.errors.password && !!formik.touched.password}
                errorTitle={formik.errors.password || ''}
            />
            <CustomInput
                type="password"
                name="repeatPassword"
                label="Repeat Password"
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
                variant="outlined"
                icon={showPassword ? <Visibility /> : <VisibilityOff />}
                onIconClick={handleClickShowPassword}
                onIconMouseDown={handleMouseDownPassword}
                withShowPassword
                error={!!formik.errors.repeatPassword && !!formik.touched.repeatPassword}
                errorTitle={formik.errors.repeatPassword || ''}
            />
            <Button
                onClick={() => formik.handleSubmit()}
                className={classes.button}
                color="secondary"
                variant="contained"
                disabled={disableButton}
                size="medium"
            >
                Continue
            </Button>
        </Sidebar>
    );
};

const validationSchema = yup.object({
    password: yup.string().required('Login is required'),
    repeatPassword: yup.string().required('Password is required'),
    full_name: yup.string().required('This field is required'),
});

export default React.memo(VerifyEmailSidebar);
