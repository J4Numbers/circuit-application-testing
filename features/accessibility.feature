@Regression @Accessibility
Feature: All the pages of the site when viewed with an accessibility scanner
  Scenario: The homepage of the site should display no accessibility violations
    Given I am an anonymous visitor to the site
    When I load the homepage
    Then there should be no accessibility violations

  Scenario: The login page of the site should display no accessibility violations
    Given I have already visited the site as an anonymous user
    When I load the login page
    Then there should be no accessibility violations

  Scenario: The login page should display errors in a format which does not introduce any accessibility violations
    Given I have already visited the site as an anonymous user
    And I am looking at the login page
    When I submit a username of '' and a password of ''
    Then there should be no accessibility violations
