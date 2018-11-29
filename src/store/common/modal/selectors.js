import { createSelector } from 'reselect';
import { filter } from 'lodash';

/**
 * Get current modal
 * @returns {string}
 */
export const getCurrentModal = (state) => state.modal.name;

/**
 * Get list active modals
 */
export const getListModals = (state) => state.modal.modals;

/**
 * Get modal options
 */
export const getModalOptions = createSelector(
    [getListModals, getCurrentModal],
    (modals, name) => {
        const filterModals = filter(modals, (mod) => {
            return  mod.name === name;
        });
        return filterModals.length > 0  ? filterModals[0].options : undefined;
    }
);
