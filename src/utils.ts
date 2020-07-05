import * as core from '@actions/core';

/**
 * Provides basic utilities.
 */
export default {
    /**
     * Attempts to get a truey input based on the specified name.
     * @param {string} name The name of the input property.
     * @returns {boolean} True when the input property is truey; otherwise false.
     */
    getBoolInput(name: string): boolean {
        var val = core.getInput(name);
        return val.toLowerCase() === 'true' || val === '1';
    }
};
