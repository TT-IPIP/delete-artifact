import * as core from '@actions/core';
import { Artifact } from '../typings/github-artifacts';
import IArtifactFilter from './artifactFilter';

/**
 * The default artifact filter; artifacts are filtered based on name equality.
 */
export default class DefaultArtifactFilter implements IArtifactFilter {
    /**
     * Initializes a new instance of a default artifact filter.
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
        for (const name of this.names) {
            const artifact = artifacts.find(a => a.name == name);
            if (artifact != null) {
                yield artifact;
            } else {
                core.warning(`Unable to delete artifact "${name}"; the artifact was not found.`);
            }
        }
    }
}
