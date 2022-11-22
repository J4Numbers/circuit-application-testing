@Regression @Calendar
Feature: The view of a calendar through the UI
  Scenario: I should be able to reach the calendar through the link in the header
    Given I have already visited the site as an anonymous user
    When I click on the calendar link
    Then I am on the calendar page
    And I have the option to log in
    And I have the option to visit my calendar view
    And I do not have the option to visit the calendar manager

