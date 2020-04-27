Feature: List all buses in a given time
    Everybody can quickly see which buses were available in that time
    
    Scenario: I through the system can view buses
        Given That a bus is available
        And I want to view the bus details
        When I select a bus
        Then Take me to the bus detail page
        And I should see the bus information

    Scenario: I can search for buses.
        Given There are too many buses available
        And I want to take an specific bus
        When I insert a keyword on the search bar
        Then Take me to the result page
        And I should see all the possible matches
