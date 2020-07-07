import { Artifact } from '../typings/github-artifacts';

/**
 * Provides filtering for artifacts.
 */
export default interface IArtifactFilter {
    /**
     * Filters the artifacts based on the input names.
     * @param artifacts The artifacts.
     * @returns {IterableIterator<Artifact>} The filtered artifacts.
     */
    filter(artifacts: Artifact[]): IterableIterator<Artifact>;
}
