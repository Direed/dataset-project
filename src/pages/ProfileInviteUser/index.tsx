import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import CustomInput from '../../components/Input';
import { useStyles } from './style';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { inviteFriend } from '../../store/profile/profile.actions';

const validationSchema = yup.object().shape({
    // email: yup.string().test('email', 'invalid email', (emailValue) => (emailValue ? emailValue?.endsWith('@earlybird.com') : false)),
});
const ProfileInviteUser: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: (values: { email: string }) => {
            dispatch(inviteFriend(values.email));
        },
    });
    return (
        <Paper className={classes.content} elevation={4}>
            <Typography variant="h4">Invite User</Typography>
            <CustomInput
                value={formik.values.email}
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                label="Invite User"
                variant="standard"
                error={!!formik.errors.email && !!formik.touched.email}
                errorTitle={formik.errors?.email}
            />
            <Button onClick={() => formik.handleSubmit()} className={classes.button} color="secondary" variant="contained">
                Invite
            </Button>
        </Paper>
    );
};
export default React.memo(ProfileInviteUser);
