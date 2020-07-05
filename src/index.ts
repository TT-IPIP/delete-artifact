import { NameResolver } from './nameResolver';
import { RuntimeHttpClient } from './runtimeHttpClient';
import Utils from './utils';
import * as core from '@actions/core';

/**
 * Attempts to fail the action based on the `failOnError` input; otherwise an error is logged.
 * @param {string} msg The message to log as the error, or the failure.
 */
function fail(msg: string): void {
    if (Utils.getBoolInput('failOnError')) {
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
    
    const nameResolver = new NameResolver(
        core.getInput('name'),
        Utils.getBoolInput('useGlob'));

    let success = true;
    
    // iterate over the matching artifacts
    for (const artifact of artifacts.data.value.filter(a => nameResolver.isMatch(a.name))) {
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
