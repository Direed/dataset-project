export enum AlertActionTypes {
    ADD_ALERT = '@@modal/ADD_ALERT',
    CLOSE_ALERT = '@@modal/CLOSE_ALERT',
}

export enum AlertFlow {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
}

export enum AlertTypes {
    EXPORT_ROWS = 'EXPORT_ROWS',
    INVITE_FRIEND = '@@profile/INVITE_FRIEND',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    RESET_PASSWORD = 'RESET_PASSWORD',
}

export type IAlertData = {
    open?: boolean;
    content?: string;
    status?: AlertFlow;
};

export type IAlertState = { alert: IAlertData };
