# circuit-application-testing

A set of application and integration tests for the circuit webapp

The [circuit webapp][1] is a sister project to this which this test suite runs over
to ensure that the functionality is stable and standardised over several browsers.

This app, in particular, is built with NodeJS and several other libraries which are
used to exercise the sister project as required, including:

* Cucumber - A Gherkin-style BDD engine for running tests
* Selenium - A web driver test suite which allows for automated running of tests within a real browser
* AXE - An accessibility suite which is used to validate whether an application has used any anti-accessibility patterns

[1]: https://github.com/j4numbers/circuit-app

## Installation

This project, while it doesn't host the circuit webapp, does run it up as part of its
test suite.

To perform a test of the `develop` branch of the circuit webapp, run the following
commands:

```bash
docker-compose up -d
# Wait for the images to be brought up
npm i && npm t
```

> `npm i` is only required on the first run of the test suite.

This will run the suite three times on three different browsers:
* Chrome
* Firefox
* Microsoft Edge

All of which are defined within the `docker-compose.yml` file as nodes to create.

More browsers can be spun up, as long as they are of a similar `-node` format to the
others which already exist in the compose file.

After running the test suite to completion, six files will have been generated within
the `outputs/` folder - two for each browser.

The `.html` files are built from the `.json` files, and show a report for the suites
that have been run, along with any errors and various details where those errors have
occurred.

Regardless of any errors or failures, the reports should also include a set of
accessibility testing results that can be reviewed as required.
