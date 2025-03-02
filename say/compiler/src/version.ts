import { readFile } from './read-file';

/**
 * Returns the current version of the filter list.
 *
 * @param versionPath Absolute path to the version file.
 *
 * @returns The current version of the filter list.
 */
export const getCurrentVersion = (versionPath: string) => {
    return readFile(versionPath).trim();
};

/**
 * Increments the patch version of the input version.
 *
 * @param inputVersion Version to increment.
 *
 * @returns Version with the patch version incremented.
 */
export const incrementPatchVersion = (inputVersion: string) => {
    const [major, minor, patch] = inputVersion.split('.').map(Number);
    return `${major}.${minor}.${patch + 1}`;
};
