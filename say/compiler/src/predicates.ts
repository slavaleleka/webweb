import { ListConfig } from './types';

/**
 * Checks if the input value is a string.
 *
 * @param value Value to check.
 *
 * @returns True if the input value is a string, false otherwise.
 */
const isString = (value: any): value is string => {
    return typeof value === 'string';
};

/**
 * Checks if the input value is an array of strings.
 *
 * @param value Value to check.
 *
 * @returns True if the input value is an array of strings, false otherwise.
 */
const isStringArray = (value: any): value is string[] => {
    return Array.isArray(value) && value.every(isString);
};

/**
 * Checks if the input value is a valid list configuration.
 *
 * @param listConfig Value to check.
 *
 * @returns True if the input value is a valid list configuration, false otherwise.
 */
export const isValidListConfig = (listConfig: any): listConfig is ListConfig => {
    return isString(listConfig.title)
        && isString(listConfig.description)
        && isString(listConfig.sourceDir)
        && isStringArray(listConfig.sourceFiles);
}
