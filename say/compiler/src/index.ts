import fs from 'fs';
import path from 'path';

import config from '../../config.json';

import { log } from './logger';
import { isValidListConfig } from './predicates';
import { type ListConfig } from './types';
import { getCurrentVersion, incrementPatchVersion } from './version';
import { readFile } from './read-file';
import { generateHeader } from './header';
import { DIST_DIR, NEW_LINE, SAY_STR } from './constants';

const VERSION_FILE_NAME = 'version';

const filterListsDirRoot = path.resolve(__dirname, '../..');

const rootDist = path.resolve(__dirname, '../../..', DIST_DIR);

const sayListsOutputDir = path.resolve(rootDist, SAY_STR);

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

    const header = generateHeader({
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
