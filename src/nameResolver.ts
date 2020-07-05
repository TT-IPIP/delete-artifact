import minimatch from 'minimatch';

/**
 * Provides methods for resolving the name input, and matching them against the artifact names.
 */
export class NameResolver {
    /**
     * Initializes a new instance of a NameResolver.
     * @param {string} name The name input; this can be one or more names.
     * @property {boolean} useGlob Determines whether the supplied names are globs.
     */
    public constructor(name: string, private useGlob: boolean) {
        this.names = this.parseNames(name);
        this.useGlob = useGlob;
    }

    /**
     * Gets the parsed names that were supplied as part of the input.
     */
    readonly names: string[];

    /**
     * 
     */
    //private names: string[];
    //private useGlob: boolean;

    /**
     * Determines whether the specified artifact name matches any within this instance.
     * @param {string} name The name to match.
     * @returns {boolean} True when the name matches a name within this instance; otherwise false.
     */
    public isMatch(name: string): boolean {
        // treat the names as pattern
        if (this.useGlob) {
            return this.names.some(pattern => minimatch(name, pattern));
        }
        
        // otherwise attempt to find the name
        return this.names.includes(name);
    }

    /**
     * Gets the artifact names supplied by the input workflow.
     * Credit to https://github.com/softprops
     * @param {string} name The name input property.
     * @returns {string[]} The names to delete.
     */
    private parseNames(name: string): string[] {
        return name.split(/\r?\n/)
            .filter(name => name)
            .map(name => name.trim());
    }
}
