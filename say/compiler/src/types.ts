/**
 * Filter list base type.
 */
type FilterListBase = {
    /**
     * Filter list title.
     */
    title: string;

    /**
     * Filter list description.
     */
    description: string;
};

/**
 * Configuration for a filter list.
 */
export type ListConfig = FilterListBase & {
    /**
     * Source directory of the filter list.
     */
    sourceDir: string;

    /**
     * Filter list source files in `sourceDir`.
     */
    sourceFiles: string[];
};


/**
 * Configuration for a filter list header building.
 */
export type HeaderConfig = FilterListBase & {
    /**
     * Filter list version.
     */
    version: string;

    /**
     * Time when the filter list was last updated.
     */
    timeUpdated: string;
};
