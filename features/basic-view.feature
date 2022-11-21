@Regression @Homepage
Feature: The basic view when a person visits and views the site
  Scenario: I, as a new visitor to the site, should see a basic set of options and links
    Given I am an anonymous visitor to the site
    When I load the homepage
    Then I am on the homepage
    And I have the option to log in
    And I have the option to visit my calendar view
    And I do not have the option to visit the calendar manager

  Scenario: I, as an existing anonymous visitor to the site, should see a basic set of options and links
    Given I have already visited the site as an anonymous user
    When I load the homepage
    Then I am on the homepage
    And I have the option to log in
    And I have the option to visit my calendar view
    And I do not have the option to visit the calendar manager

  Scenario: I, as an existing known user of the site, should see the full set of options and links
    Given I have already visited the site as a full user
    When I load the homepage
    Then I am on the homepage
    And I have the option to log out
    And I have the option to visit my calendar view
    And I have the option to visit the calendar manager
