import * as core from '@actions/core';

/**
 * Provides basic utilities.
 */
export default {
    /**
     * Attempts to get a truthy input based on the specified name.
     * @param {string} name The name of the input property.
     * @returns {boolean} True when the input property is truthy; otherwise false.
     */
    getBoolean(name: string): boolean {
        const value = core.getInput(name);
        return value === 'true' || value === '1';
    },

    /**
     * Gets the input for the specified name, and splits the value by new line.
     * Credit to https://github.com/softprops
     * @param {string} name The name of the input property.
     * @returns {string[]} The values.
     */
    getMultilineValues(name: string): string[] {
        return core.getInput(name)
            .split(/\r?\n/)
            .filter(name => name)
            .map(name => name.trim());
    }
};
