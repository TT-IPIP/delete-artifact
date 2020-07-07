import * as core from '@actions/core';
import InputHelper from './inputHelper';
import RuntimeHttpClient from './runtimeHttpClient';
import { DefaultArtifactFilter, GlobArtifactFilter, IArtifactFilter } from './artifactFilters/';

/**
 * Gets the filter to be used based on whether `useGlob` is true.
 * @returns {IArtifactFilter} The artifact filterer.
 */
function getFilter() : IArtifactFilter {
    const names = InputHelper.getMultilineValues('name');
    console.log('getFilter_names', names);

    return InputHelper.getBoolean('useGlob')
        ? new GlobArtifactFilter(names)
        : new DefaultArtifactFilter(names);
}

/**
 * Attempts to fail the action based on the `failOnError` input; otherwise an error is logged.
 * @param {string} msg The message to log as the error, or the failure.
 */
function fail(msg: string): void {
    if (InputHelper.getBoolean('failOnError')) {
        core.setFailed(msg);
    } else {
        core.error(msg);
    }
}

/**
 * The main run function.
 */
async function run() : Promise<void> {
    const client = new RuntimeHttpClient();
    
    // get the artifacts
    const artifacts = await client.listArtifacts();
    if (!artifacts.success) {
        fail('Failed to load artifacts; debug logs may be available.');
        return;
    }
    
    let success = true;
    const { filter } = getFilter();

    // iterate over the matching artifacts
    for (const artifact of filter(artifacts.data.value)) {
        const del = await client.deleteArtifact(artifact.url);
        if (del.success) {
            core.info(`Successfully deleted artifact "${artifact.name}".`);
        } else {
            core.error(`Failed to delete artifact "${artifact.name}"; debug logs may be available.`);
            success = false;
        }
    }

    // determine the overall success
    if (!success) {
        fail('1 or more artifacts failed to delete.');
    }
}

run();
