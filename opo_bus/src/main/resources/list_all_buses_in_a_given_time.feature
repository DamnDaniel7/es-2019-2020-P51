Feature: List all buses in a given time
    Everybody can quickly see which buses were available in that time
    
    Scenario: I through the system can view buses
        Given That a bus is available
        And I want to view the bus details
        When I select a bus
        Then Take me to the bus detail page
        And I should see the bus information
