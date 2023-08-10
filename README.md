# Are larger runners worth the cost increase?

GitHub's [Larger runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners) have more CPU, RAM, and disk space. They also cost more. Are they worth it?

This repository contains a simple benchmark that runs on the default and larger runners. It runs a simple Javascript script that computes the first 100,000,000 prime numbers. It runs the script 10 times and reports the average time.

## How to run the benchmark

### Generating the runners

You could create the runners manually but I made a workflow that does this for you!

There is a workflow called [`generate-runners-larger.yml`](https://github.com/octodemo/is-larger-worth/blob/main/.github/workflows/generate-runners-larger.yml) that will create a runner group for you called `larger-runners` and then add all the different runner sizes to that group: `4-core`, `8-core`, `16-core`, `32-core`, `64-core`.

You MUST add a new secret called `PAT` that is a GitHub Personal Access token with the permissions to create these runners/group.

### Running the test

The basic test is called `larger.yml` and it calls `benchmark.yml` for each of the different runner sizes. Once you've generated the runners from the previous step you can execute this workflow manually using workflow dispatch.

<img width="725" alt="Screenshot 2023-08-09 at 12 44 02 PM" src="https://github.com/octodemo/is-larger-worth/assets/22425467/9fdbbb16-081f-49ab-8a19-264c8c719d57">

### CodeQL

There is also a prewritten workflow for testing larger runners with CodeQL [`codeql-analysis-larger.yml`](https://github.com/octodemo/is-larger-worth/blob/main/.github/workflows/codeql-analysis-larger.yml). You will need to modify your `codeql.yml` workflow file slightly.

Replace your workflow event with the `workflow_call` event so that it can be called as a reusable workflow. Define the `runs-on` input variable so we can pass it in.
```yml
on:
  workflow_call:
    inputs:
      runs-on:
        default: 'ubuntu-latest'
        required: false
        type: string
```

Then replace the `runs-on` label in the workflow file with the new variable we are passing in.
```yml
    runs-on: ${{ inputs.runs-on }}
```

That's it! Now you can trigger codeql scans from the workflow `codeql-analysis-larger.yml` and it will simutaniously run the codeql workflow with all different larger runner types.
