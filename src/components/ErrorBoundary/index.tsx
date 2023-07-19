import { Component, ErrorInfo, ReactNode } from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import { Paper, Typography } from '@mui/material';

interface Props {
    children(): ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // eslint-disable-next-line
        console.error('Uncaught error:', error, errorInfo);
    }

    public render(): JSX.Element {
        const { children } = this.props;
        const { hasError } = this.state;
        if (hasError) {
            return (
                <Paper elevation={3}>
                    <Typography variant="body1" align="center">
                        <WarningIcon color="secondary" fontSize="large" />
                        <br />
                        {`We’re sorry - something has gone wrong.`}
                    </Typography>
                </Paper>
            );
        }

        return <>{children()}</>;
    }
}
