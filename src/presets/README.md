## Imports Presets

### Contribution Rules

We are excited to hear you want to contribute to the presets! While we are happy to have the common cases covered out-of-box for users to grab easily, we do some rules for adding new presets.

- The package is wellknown and well-documented, and satisfied with one of the following conditions:
  - 1,000 stars on GitHub
  - 1,000 weekly downloads on NPM
- The usage of APIs are repeatedly imported across multiple modules. For example `createRouter` from Vue Router will normally been called once per app only, so it should NOT be included in the preset.

The rules are not fixed and will adjust if needed.

Thanks :)

