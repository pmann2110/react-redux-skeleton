import { AlertActionTypes, AlertType } from './types';

export const initialState = {
    alertType: undefined,
    message: undefined,
    options: undefined
};

const reducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case AlertActionTypes.ERROR_SHOW:
            return {
                ...state,
                alertType: AlertType.Error,
                message: payload.message,
                options: payload.options
            };
        case AlertActionTypes.INFO_SHOW:
            return {
                ...state,
                alertType: AlertType.Info,
                message: payload.message,
                options: payload.options
            };
        case AlertActionTypes.ALERT_DESTROY:
            return {
                ...state,
                alertType: undefined,
                message: undefined,
                options: undefined
            };
        default:
            return state;
    }
};

export default reducer;
