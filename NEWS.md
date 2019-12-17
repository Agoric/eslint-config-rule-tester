# Changes to eslint-config-rule-tester

## Release v0.1.0 (12/17/2019)

1. Upgrade dependency on ESLint. The API for the CLIEngine in ESLint
changed as a result of the upgrade. It now takes an options object as
the only parameter.
2. BREAKING CHANGE: `configTester` now takes a JavaScript object
   representing the ESLint configuration to test (`configObj`), rather
   than the `configFile`



```js
const configTester = (ruleName, configObj, testFile) => {
  const cli = new eslint.CLIEngine({ baseConfig: configObj });
```
