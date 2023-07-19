import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { IClasses, useStyles } from './style';

interface IProps {
    variant?: 'outlined' | 'standard' | 'filled';
    withShowPassword?: boolean;
    onChange?: (e) => void;
    placeholder?: string;
    errorTitle?: string;
    fullWidth?: boolean;
    className?: string;
    value?: string;
    label: string;
    name?: string;
    type?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    error?: boolean;
    autoComplete?: string;
    icon?: JSX.Element;
    startIcon?: JSX.Element;
    onIconClick?: () => void;
    onIconMouseDown?: () => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<IProps> = ({
    className,
    type = 'text',
    withShowPassword,
    onChange,
    value,
    fullWidth = true,
    name = '',
    label = '',
    variant = 'outlined',
    placeholder = '',
    error = false,
    errorTitle,
    onBlur,
    onFocus,
    autoComplete,
    icon,
    onIconClick,
    onIconMouseDown,
    startIcon,
    onKeyPress,
}) => {
    const classes: IClasses = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (): void => setShowPassword(!showPassword);
    const handleMouseDownPassword = (): void => setShowPassword(!showPassword);
    const needToShowPassword = withShowPassword && showPassword ? 'text' : 'password';
    return (
        <>
            <TextField
                placeholder={placeholder}
                type={type === 'password' ? needToShowPassword : type}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                fullWidth={fullWidth}
                className={`${classes.input} ${className}`}
                name={name}
                label={label}
                variant={variant}
                color="secondary"
                error={error}
                autoComplete={autoComplete}
                InputProps={{
                    endAdornment: withShowPassword && (
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={onIconClick} onMouseDown={onIconMouseDown}>
                                {icon}
                            </IconButton>
                        </InputAdornment>
                    ),
                    startAdornment: startIcon && (
                        <InputAdornment position="start">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                {startIcon}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {error && (
                <Typography className={classes.errorTitle} variant="subtitle2">
                    {errorTitle}
                </Typography>
            )}
        </>
    );
};

export default React.memo(CustomInput);
