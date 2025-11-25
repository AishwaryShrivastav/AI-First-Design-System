# Changesets

This folder contains changeset files which describe changes to be released in the next version.

## What are changesets?

Changesets are a way to manage versioning and changelogs with a focus on monorepos. They allow contributors to declare how their changes should be released, then automate the versioning and changelog generation.

## How to add a changeset

When you make a change that should be released:

```bash
npm run changeset
```

Follow the prompts to:

1. Select which packages are affected
2. Choose the type of change (major, minor, patch)
3. Describe the change

## Learn More

Visit https://github.com/changesets/changesets for full documentation.
