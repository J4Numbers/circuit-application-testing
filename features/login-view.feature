@Regression @Login
Feature: The login journeys for when a user attempts to log into the site
  Scenario: I, as a new visitor to the site, should be redirected away from the login page initially
    Given I am an anonymous visitor to the site
    When I load the login page
    Then I am on the homepage
    And I have the option to log in

  Scenario: I, as an existing anonymous visitor to the site, should be shown the login page
    Given I have already visited the site as an anonymous user
    When I load the login page
    Then I am on the login page

  Scenario: I, as an existing known user of the site, should be redirected away from the login page
    Given I have already visited the site as a full user
    When I load the login page
    Then I am on the homepage
    And I have the option to log out
