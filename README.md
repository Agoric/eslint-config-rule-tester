# eslint-config-rule-tester (ConfigTester)
ESLint has a great utility for testing custom rules called [RuleTester](https://eslint.org/docs/developer-guide/nodejs-api#ruletester). However, RuleTester requires a Rule object, such as the one in [this source file](https://eslint.org/docs/developer-guide/working-with-rules).

If you want to test a configuration file itself (especially more complex configurations, such as `no-restricted-syntax`), ESLint's RuleTester won't work very well, since you're not creating new rule files, just using ESLint's core rules. ConfigTester allows you to test a specific rule from your config file.


## Get Started

ConfigTester takes in a `ruleName` (a string to be used when printing to the console), a `configFile` (a normal ESLint JavaScript config file), and a `testFile`, which has `valid` and `invalid` tests.

To isolate a certain rule for testing, make sure the `configFile` you pass in only contains the rule that you are testing under `rules`.

The `testFile` should look like this:

```
module.exports = {
	valid: [
		"a === b",
	],
	invalid: [
		{
			code: "if (x == 42) { }",
			errors: ["Expected '===' and instead saw '=='."]
		},
	]
};
```

You can iterate over your config file to test each rule in isolation. 

Please see [eslint-config-jessie](https://github.com/Agoric/eslint-config-jessie) to see ConfigTester in full use. 
