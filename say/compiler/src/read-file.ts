import fs from 'fs';

/**
 * Reads the content of a file.
 *
 * @param filePath Absolute path to the file.
 *
 * @returns Content of the file.
 */
export const readFile = (filePath: string) => {
    return fs.readFileSync(filePath, 'utf8');
};
