import AxeBuilder from '@axe-core/webdriverjs';
import { createHtmlReport } from 'axe-html-reporter';

/**
 * Generate an accessibility report for the work that the webdriver has
 * been performing so far.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @returns {Promise<void>} To be returned on completion.
 */
// eslint-disable-next-line import/prefer-default-export
export async function generateAccessibilityReport(world) {
  const results = await new AxeBuilder(world.webdriver)
    .withTags(['wcag21aa'])
    .analyze();

  const reportText = createHtmlReport({
    results,
    options: {
      projectKey: world.scenario.testCaseStartedId,
      reportFileName: `accessibility-report-${world.scenario.testCaseStartedId}.html`,
      outputDirPath: 'outputs/',
    },
  });

  world.attach(reportText);
  world.reportResults = results;
}
