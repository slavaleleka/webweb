import {
    COMMENT_MARK,
    COMMENT_PREFIX,
    DIST_DIR,
    HEADER_LINE_SEPARATOR,
    NEW_LINE,
    SAY_STR,
    SLASH,
} from './constants';
import { type HeaderConfig } from './types';

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

const AUTHOR_HEADER_LINE = 'Author: Slava Leleka';

/**
 * Generate so-called "say" title for the filter list header.
 *
 * @param title Input title.
 *
 * @returns "Say" title.
 */
const generateSayTitle = (title: string) => `${SAY_STR}${SLASH}${title}`;


/**
 * Generates a header line.
 *
 * @param key Header key.
 * @param value Header value.
 *
 * @returns Header line.
 */
const getHeaderLine = (key: string, value: string) => {
    return `${COMMENT_PREFIX}${key}${HEADER_LINE_SEPARATOR}${value}`;
};

/**
 * Generates add and subscribe links for the filter list.
 *
 * @param title Filter list title.
 *
 * @returns Links for adding and subscribing to the filter list.
 */
const generateLinks = (title: string): {
    addLink: string;
    subscribeLink: string;
} => {
    const addLink = `https://raw.githubusercontent.com/slavaleleka/webweb/master/${DIST_DIR}/${SAY_STR}/${title}`;
    const subscribeLink = `https://subscribe.adblockplus.org?location=${addLink}`;

    return {
        addLink,
        subscribeLink,
    };
}

/**
 * Generates a header for the filter list.
 *
 * @param data Data for filter list header.
 * @param data.title Filter list title.
 * @param data.description Filter list description.
 * @param data.version Filter list version.
 * @param data.timeUpdated Time when the filter list was last updated.
 *
 * @returns Filter list header.
 */
export const generateHeader = ({
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
        `${COMMENT_PREFIX}${AUTHOR_HEADER_LINE}`,
        `${COMMENT_MARK}`,
        getHeaderLine(HEADER_PREFIX.ADD_LINK, addLink),
        getHeaderLine(HEADER_PREFIX.SUBSCRIBE_LINK, subscribeLink),
        `${COMMENT_MARK}`,
    ].join(NEW_LINE);

    return header;
};
