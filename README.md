# Delete artifacts
A GitHub Action for deleting artifacts within the workflow run. This can be useful when artifacts are shared across jobs, but are no longer needed when the workflow is complete.

## ⚡ Usage

See [action.yml](action.yml)

### Delete an individual artifact

```yml
steps:
- uses: actions/checkout@v1

- run: echo hello > world.txt

- uses: actions/upload-artifact@v1
  with:
    name: my-artifact
    path: world.txt

# delete-artifact
- uses: geekyeggo/delete-artifact@v1
  with:
    name: my-artifact
```

### Delete multiple artifacts

```yml
steps:
- uses: geekyeggo/delete-artifact@v1
  with:
    name: |
      artifact-one
      artifact-two
      artifact-three
```

### Glob matching support
```yml
steps:
- uses: geekyeggo/delete-artifact@v1
  with:
    name: artifact-*
    useGlob: true 
```
N.B. Glob matching uses [`minimatch`](https://www.npmjs.com/package/minimatch), and is off by default.

## 

## 🚨 Error vs Fail

By default, the action will fail when it was not possible to delete an artifact (with the exception of name mismatches). When the deletion of an artifact is not integral to the success of a workflow, it is possible to error without failure. All errors are logged.

```yml
steps:
- uses: geekyeggo/delete-artifact@v1
  with:
    name: okay-to-keep
    failOnError: false
```

## ⚠ Disclaimer

This action utilizes a preview version of GitHub's runtime API; the API is subject to change at any time which may result in failures of this action.
