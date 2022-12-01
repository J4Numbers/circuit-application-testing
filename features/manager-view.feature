@Regression @Manager
Feature: The journey a user takes when managing their holidays
  Scenario: I, as an existing anonymous visitor to the site, should be shown the homepage when attempting to load the manager page
    Given I have already visited the site as an anonymous user
    When I load the 'manager' page
    Then I am on the home page

  Scenario: I, as an existing known user of the site, should be able to load the manager page
    Given I have already visited the site as a full user
    When I click on the manager link
    Then I am on the manager page
    And I have the option to log out

  Scenario: I, as an existing known user of the site, can visit the creating a new holiday page
    Given I have already visited the site as a full user
    And I am looking at the 'manager' page
    When I click on the add new holiday link
    Then I am on the add new holiday page

  Scenario Outline: I, when entering erroneous information during creating a new holiday, should be shown appropriate errors
    Given I have already visited the site as a full user
    And I am looking at the 'create new holiday' page
    When I submit a title of '<title>' and a date of '<date>' and notes of '<notes>'
    Then 1 error should be shown within an error summary
    And an error should be shown for the '<field_name>' field of '<error_message>'

    Examples:
    | title   | date       | notes | field_name    | error_message                                         |
    |         | 2022-01-05 |       | holiday-title | Please fill in a title for the holiday you are taking |
    | example |            |       | holiday-date  | Please fill in the date you would like to add         |
