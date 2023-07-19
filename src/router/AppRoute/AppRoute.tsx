import React, { Component, ReactNode } from 'react';
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { RootState } from '../../store';
import { IAccount } from '../../store/account/account.types';
import { getAccount } from '../../store/account/account.selectors';
import { connect } from 'react-redux';
import { RoutePaths } from '../../enums';

interface IAppRouteComponentProps {
    /**
     * A React component to render only when the location matches
     * Warning: <AppRoute component> takes precedence over <AppRoute redirect> so don’t use both in the same <AppRoute>.
     */
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | null;

    /**
     * Redirect target of the route
     * Warning: <AppRoute component> takes precedence over <AppRoute redirect> so don’t use both in the same <AppRoute>.
     */
    path?: string | string[];
    exact?: boolean;
}

interface IAppRouteComponentState {
    isInitialized: boolean;
}

interface IAppRouteComponentStateProps {
    account: IAccount;
}

class AppRouteComponent extends Component<IAppRouteComponentProps & IAppRouteComponentStateProps & RouteComponentProps<any>, IAppRouteComponentState> {
    static defaultProps = {
        component: null,
    };

    state = {
        isInitialized: false,
    };

    componentDidMount(): void {
        this.setState({ isInitialized: true });
    }

    isFetching(): boolean {
        return Boolean(!this.state.isInitialized);
    }

    render(): ReactNode {
        const { component, account, ...rest } = this.props;
        const ComponentToRender = component;
        const publicRoutes = [RoutePaths.LOGIN, RoutePaths.FORGOT_PASSWORD, RoutePaths.RESET_PASSWORD, RoutePaths.VERIFY_EMAIL];
        return (
            // @ts-ignore
            <Route
                {...rest}
                render={(props) => (
                    <ErrorBoundary>
                        {() => {
                            if (this.isFetching()) {
                                // TODO create loading
                                // return <ActionPending center />;
                            }
                            // Validate on token extend
                            if (!publicRoutes.includes(rest.path as RoutePaths) && !account.isAuthenticated) {
                                return <Redirect to={RoutePaths.LOGIN} />;
                            }
                            if (ComponentToRender) {
                                // @ts-ignore
                                return <ComponentToRender {...props} />;
                            }
                        }}
                    </ErrorBoundary>
                )}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IAppRouteComponentStateProps => ({
    account: getAccount(state),
});

const mapDispatchToProps = (): {} => ({});

// @ts-ignore
export const AppRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouteComponent));
