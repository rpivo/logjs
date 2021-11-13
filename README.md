# logjs

A little Chalk logger that gets the job done.

## Prepping a Release

To release a new version:

- Update the version number in the package.json file with `npm version {major/minor/patch}`
- Rebase `release` branch with this new version
- Run `npm release` to create a new tarball.
- Create a new tag at this version: `git tag v{version}`
- Push the tag to GitHub: `git push origin v{version}`
