@Regression @Accessibility
Feature: All the pages of the site when viewed with an accessibility scanner
  All of the pages that are held within the site should be to a certain level of accessibility standard. Specifically, they should all meet the WCAG 2.1 AA specifications as directed under the GDS design guides found at https://design-system.service.gov.uk/accessibility/.

  This feature covers that by loading the different pages and running the AXE accessibility
  scanner over each of them.

  Scenario: The homepage of the site should display no accessibility violations
    Given I am an anonymous visitor to the site
    When I load the 'home' page
    And I generate an accessibility report
    Then there should be no accessibility violations

  Scenario: The login page of the site should display no accessibility violations
    Given I have already visited the site as an anonymous user
    When I load the 'login' page
    And I generate an accessibility report
    Then there should be no accessibility violations

  Scenario: The login page should display errors in a format which does not introduce any accessibility violations
    Given I have already visited the site as an anonymous user
    And I am looking at the 'login' page
    When I submit a username of '' and a password of ''
    And I generate an accessibility report
    Then there should be no accessibility violations

  Scenario: The calendar page should display no accessibility violations
    Given I have already visited the site as an anonymous user
    When I load the 'calendar' page
    And I generate an accessibility report
    Then there should be no accessibility violations

  Scenario: The calendar manager page should display no accessibility violations
    Given I have already visited the site as a full user
    When I load the 'manager' page
    And I generate an accessibility report
    Then there should be no accessibility violations

  Scenario: The creating a new holiday page should display no accessibility violations
    Given I have already visited the site as a full user
    When I load the 'create new holiday' page
    And I generate an accessibility report
    Then there should be no accessibility violations

  Scenario: The creating a new holiday page should display errors in a format which does not introduce any accessibility violations
    Given I have already visited the site as a full user
    And I am looking at the 'create new holiday' page
    When I submit a title of '' and a date of '' and notes of ''
    And I generate an accessibility report
    Then there should be no accessibility violations
