import fs from 'fs';
import path from 'path';

import config from '../../config.json';

import { log } from './logger';

const DIST_DIR = 'dist';

const COMMENT_MARK = '!';
const SPACE = ' ';
const NEW_LINE = '\n';
const COLON = ':';
const SLASH = '/';

const COMMENT_PREFIX = `${COMMENT_MARK}${SPACE}`;

const HEADER_LINE_SEPARATOR = `${COLON}${SPACE}`;

const VERSION_FILE_NAME = 'version.txt';

const HEADER_PREFIX = {
    TITLE: 'Title',
    DESCRIPTION: 'Description',
    VERSION: 'Version',
    TIME_UPDATED: 'Time Updated',
    ADD_LINK: 'Add Link',
    SUBSCRIBE_LINK: 'Subscribe Link',
};

const EXPIRES_HEADER_LINE = 'Expires: 2 hours';

const LICENSE_HEADER_LINE = 'License: CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed)';

const SAY_STR = 'say';

const filterListsDirRoot = path.resolve(__dirname, '../..');

const rootDist = path.resolve(__dirname, '../../..', DIST_DIR);

const sayListsOutputDir = path.resolve(rootDist, SAY_STR);

const readFile = (filePath: string) => {
    return fs.readFileSync(filePath, 'utf8');
};

/**
 * Returns the current version of the filter list.
 *
 * @param versionPath Absolute path to the version file.
 *
 * @returns The current version of the filter list.
 */
const getCurrentVersion = (versionPath: string) => {
    return readFile(versionPath).trim();
};

const incrementPatchVersion = (inputVersion: string) => {
    const [major, minor, patch] = inputVersion.split('.').map(Number);
    return `${major}.${minor}.${patch + 1}`;
};

type ListConfig = {
    title: string;
    description: string;
    sourceDir: string;
    sourceFiles: string[];
}

const isString = (value: any): value is string => {
    return typeof value === 'string';
};

const isStringArray = (value: any): value is string[] => {
    return Array.isArray(value) && value.every(isString);
};

const isValidListConfig = (listConfig: any): listConfig is ListConfig => {
    return isString(listConfig.title)
        && isString(listConfig.description)
        && isString(listConfig.sourceDir)
        && isStringArray(listConfig.sourceFiles);
}

const getHeaderLine = (key: string, value: string) => {
    return `${COMMENT_PREFIX}${key}${HEADER_LINE_SEPARATOR}${value}`;
};

type HeaderConfig = {
    title: string;
    description: string;
    version: string;
    timeUpdated: string;
};

const generateLinks = (title: string) => {
    const addLink = `https://raw.githubusercontent.com/slavaleleka/webweb/master/${DIST_DIR}/${SAY_STR}/${title}`;
    const subscribeLink = `https://subscribe.adblockplus.org?location=${addLink}`;
    return {
        addLink,
        subscribeLink,
    };
}

const getListHeader = ({
    title,
    description,
    version,
    timeUpdated,
}: HeaderConfig) => {
    const sayTitle = generateSayTitle(title);

    const { addLink, subscribeLink } = generateLinks(title);

    const header = [
        getHeaderLine(HEADER_PREFIX.TITLE, sayTitle),
        getHeaderLine(HEADER_PREFIX.DESCRIPTION, description),
        getHeaderLine(HEADER_PREFIX.VERSION, version),
        getHeaderLine(HEADER_PREFIX.TIME_UPDATED, timeUpdated),
        `${COMMENT_PREFIX}${EXPIRES_HEADER_LINE}`,
        `${COMMENT_PREFIX}${LICENSE_HEADER_LINE}`,
        `${COMMENT_MARK}`,
        getHeaderLine(HEADER_PREFIX.ADD_LINK, addLink),
        getHeaderLine(HEADER_PREFIX.SUBSCRIBE_LINK, subscribeLink),
        `${COMMENT_MARK}`,
    ].join(NEW_LINE);

    return header;
}

const generateSayTitle = (title: string) => `${SAY_STR}${SLASH}${title}`;

const compileList = (listConfig: ListConfig, timeUpdated: string) => {
    const {
        title,
        description,
        sourceDir,
        sourceFiles,
    } = listConfig;

    const listDir = path.resolve(filterListsDirRoot, sourceDir);

    const versionFilePath = path.resolve(listDir, VERSION_FILE_NAME);
    const version = incrementPatchVersion(getCurrentVersion(versionFilePath));

    const header = getListHeader({
        title,
        description,
        version,
        timeUpdated,
    });

    const combinedRulesContent = sourceFiles
        .map((sourceFile) => readFile(path.resolve(listDir, sourceFile)))
        .join(NEW_LINE);

    const outputContent = [
        header,
        combinedRulesContent,
    ].join(NEW_LINE);

    const outputFilePath = path.join(sayListsOutputDir, title);

    if (!fs.existsSync(sayListsOutputDir)) {
        fs.mkdirSync(sayListsOutputDir, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, outputContent);

    fs.writeFileSync(versionFilePath, `${version}${NEW_LINE}`);
};

const compile = (config: any) => {
    if (!fs.existsSync(rootDist)) {
        fs.mkdirSync(rootDist);
    }

    // keys in config are list titles
    const listTitles = Object.keys(config);

    for (const title of listTitles) {
        const rawListConfig = config[title];

        const listConfig = {
            title,
            ...rawListConfig,
        };

        if (!isValidListConfig(listConfig)) {
            throw new Error(`Invalid list config for config key: ${title}`);
        }

        const timeUpdated = (new Date()).toISOString();

        log(`Compiling list '${title}'...`);

        compileList(listConfig, timeUpdated);

        log('Successfully compiled.');
    }
}

compile(config);
