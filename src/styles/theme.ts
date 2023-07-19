import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        secondary: {
            main: '#EF3125',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedSecondary: {
                    background: '#EF3125',
                    backgroundColor: '#EF3125',
                    color: '#ffff',
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#EF3125 !important',
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                colorSecondary: {
                    color: '#EF3125',
                },
                thumbColorSecondary: {
                    color: '#EF3125',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#EF3125 !important',
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#EF3125 !important',
                    },
                },
            },
        },
    },
});
