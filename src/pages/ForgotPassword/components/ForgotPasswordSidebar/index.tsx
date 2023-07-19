import React, { useCallback, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IClasses, useStyles } from './style';
import Sidebar from '../../../../components/Sidebar';
import CustomInput from '../../../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest } from '../../../../store/account/account.actions';
import { useHistory } from 'react-router-dom';
import { getValidEmail } from '../../../../store/account/account.selectors';
import { RoutePaths } from '../../../../enums';

const ForgotPasswordSidebar: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isValidEmail = useSelector(getValidEmail);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(forgotPasswordRequest(values));
        },
    });
    useEffect(() => {
        if (isValidEmail.isValidEmail && !!formik.values.email) {
            history.push(RoutePaths.LOGIN);
        }
    }, [isValidEmail.isValidEmail]);
    const classes: IClasses = useStyles();
    const disableButton = !!Object.keys(formik.touched).length && !!Object.keys(formik.errors).length;
    const onLogin = useCallback(() => history.push(RoutePaths.LOGIN), []);
    return (
        <Sidebar isLeft={true}>
            <CustomInput
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email && !!formik.touched.email}
                errorTitle={formik.errors.email || ''}
            />
            <div className={classes.footer}>
                <Button
                    onClick={() => formik.handleSubmit()}
                    className={classes.button}
                    color="secondary"
                    variant="contained"
                    disabled={disableButton}
                    size="medium"
                >
                    Send
                </Button>
                <Typography onClick={onLogin} className={classes.forgot}>
                    Login
                </Typography>
            </div>
        </Sidebar>
    );
};

const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
});

export default React.memo(ForgotPasswordSidebar);
