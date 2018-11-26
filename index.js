/**
 * @fileoverview helper to test config files.
 * Adapted from ESLint's RuleTester
 * and eslint-config-tester (https://www.npmjs.com/package/eslint-config-tester)
 * @author Agoric
 */


"use strict";

const assert = require('assert');
const eslint = require('eslint');

module.exports = {
	configTester: (ruleName, configFile, testFile) => {
		const cli = new eslint.CLIEngine(configFile);

		/**
		 * Check if the template is valid or not
		 * all valid cases go through this
		 * @param {string} text to run the rule against
		 * @returns {void}
		 * @private
		 */
		function testValidTemplate(text) {

			const report = cli.executeOnText(text);
			const errorCount = report.results.reduce((count, result) => count + result.errorCount, 0);

			assert.strictEqual(
				errorCount, 0,
				`Should have no errors but had ${errorCount}:\n${report.results}`
			);
		}

		/**
		 * Check if the template is invalid or not
		 * all invalid cases go through this.
		 * @param {Object} item Item to run the rule against
		 * @returns {void}
		 * @private
		 */
		function testInvalidTemplate(item) {
			assert.ok(item.errors || item.errors === 0,
				`Did not specify errors for an invalid test`);

			const report = cli.executeOnText(item.code);
			for (const result of report.results) {
				const messages = result.messages;
				assert.strictEqual(
					messages.length, item.errors.length,
					`Should have ${item.errors.length} error${item.errors.length === 1 ? "" : "s"} but had ${messages.length}: \n${messages}`
				);
				for (let i = 0, l = item.errors.length; i < l; i++) {
					const error = item.errors[i];
					const message = messages[i];

					assert(!message.fatal, `A fatal parsing error occurred: ${message.message}`);

					if (typeof error === "string") {

						assert.strictEqual(message.message, error);

					} else {

						// Message was an unexpected type
						assert.fail(`Error should be a string, but found (${message})`);
					}
				}
			}
		}


		// testFile should have valid and invalid examples

		describe(ruleName, () => {
			describe("valid", () => {
				testFile.valid.forEach(valid => {
					it(valid, () => {
						testValidTemplate(valid);
					});
				});
			});


			describe("invalid", () => {
				testFile.invalid.forEach(invalid => {
					it(invalid.code, () => {
						testInvalidTemplate(invalid);
					});
				});
			});
		});
	}
};






