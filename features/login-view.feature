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

  Scenario Outline: I, when entering incorrect credentials, should be shown appropriate errors
    Given I have already visited the site as an anonymous user
    And I am looking at the login page
    When I submit a username of '<username>' and a password of '<password>'
    Then an error should be shown for the '<field_name>' field of '<error_message>'

    Examples:
    | username  | password  | field_name     | error_message                                     |
    |           | password  | login-name     | Please fill in your username                      |
    | username  |           | login-password | Please fill in your password                      |
    | incorrect | incorrect | login          | Unable to find identity which matched credentials |
