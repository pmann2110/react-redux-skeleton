import { filter } from 'lodash';

import { ModalActionTypes } from './types';

const isDuplicateModal = (modals, name) => {
    return filter(modals, (mod) => {
        return mod.name === name;
    }).length > 0;
};

export const initialState = {
    name: undefined,
    modals: []
};

const reducer = (state = initialState, action) => {
    const {payload, type} = action;
    const modal = payload;
    switch (type) {
        case ModalActionTypes.MODAL_ADD:
            return isDuplicateModal(state.modals, modal.name) ? state :
                {...state, name: modal.name,
                    modals: [...state.modals, modal]};
        case ModalActionTypes.MODAL_REMOVE:
            return {
                ...state,
                name: undefined,
                modals: filter(state.modals, (i) => i.name === modal.name)
            };
        default:
            return state;
    }
};

export default reducer;
