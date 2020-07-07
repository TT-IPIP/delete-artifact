import minimatch from 'minimatch';
import IArtifactFilter from './artifactFilter';
import { Artifact } from '../typings/github-artifacts';

/**
 * Glob based filter for artifacts; names are treated as glob patterns.
 */
export default class GlobArtifactFilter implements IArtifactFilter {
    /**
     * Initializes a new instance of a glob based artifact filter.
     * @param names The names supplied by the input.
     * @constructor
     */
    constructor(private names: string[]) {
        this.filter = this.filter.bind(this);
    }

    /**
     * Filters the artifacts.
     * @param artifacts The artifacts to filter.
     * @returns {IterableIterator<Artifact>} The filtered artifacts.
     */
    public* filter(artifacts: Artifact[]): IterableIterator<Artifact> {
        const isMatch = (artifact: Artifact): boolean => this.names.some(pattern => minimatch(artifact.name, pattern));

        for (const artifact of artifacts.filter(isMatch)) {
            yield artifact;
        }
    }
}
