import {
    ModalActionTypes, RemoveModalAction
} from './types';

/**
 * Add new modal to store
 * @param {string} name
 * @param {any} options
 */
export const addModal = (name, options) => {
    return {
        type: ModalActionTypes.MODAL_ADD,
        payload: {name, options}
    };
};

/**
 * Remove modal from store
 * @param {string} modalName
 */
export const removeModal = (modalName) => {
    return {
        type: ModalActionTypes.MODAL_REMOVE,
        payload: modalName
    };
};
