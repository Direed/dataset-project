import React, { ReactNode, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAlerts } from '../../store/alert/alert.selectors';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { IClasses, useStyles } from './style';

interface IProps {
    children: React.ReactNode;
}

const AlertBox: React.FC<IProps> = ({ children }) => {
    const classes: IClasses = useStyles();
    const alerts = useSelector(getAlerts);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const keyAlerts = Object.keys(alerts);
    const activeAlerts = keyAlerts.filter((alert) => alerts[alert]?.open);
    const action = useCallback(
        (key): ReactNode => (
            <CloseIcon
                className={classes.cursorIcon}
                onClick={() => {
                    closeSnackbar(key);
                }}
            />
        ),
        []
    );
    useEffect(() => {
        if (activeAlerts.length) {
            activeAlerts?.forEach((item) => {
                enqueueSnackbar(alerts[item].content, {
                    variant: alerts[item].status,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 5000,
                    action,
                });
            });
        }
    }, [alerts]);

    return <>{children}</>;
};
export default React.memo(AlertBox);
