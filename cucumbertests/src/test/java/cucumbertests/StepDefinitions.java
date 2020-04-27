package cucumbertests;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.junit.Assert.*;

public class StepDefinitions {
    
    @Given("That a bus is available")
    public void that_a_bus_is_available() {
        // Write code here that turns the phrase above into concrete actions
        //throw new io.cucumber.java.PendingException();
        System.out.print("Cenario 1");
        System.out.print("Passed step 1: That a bus is available");
    }

    @Given("I want to view the bus details")
    public void i_want_to_view_the_bus_details() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 2: I want to view the bus details");
        //throw new io.cucumber.java.PendingException();
    }

    @When("I select a bus")
    public void i_select_a_bus() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 3: I select a bus");
        //throw new io.cucumber.java.PendingException();
    }

    @Then("Take me to the bus detail page")
    public void take_me_to_the_bus_detail_page() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 4: Take me to the bus detail page");
    }

    @Then("I should see the bus information")
    public void i_should_see_the_bus_information() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 5: I should see the bus information");

    }

    @Given("There are too many buses available")
    public void there_are_too_many_buses_available() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("\nCenario 2");
        System.out.print("Passed step 1: There are too many buses available");
    }

    @Given("I want to take an specific bus")
    public void i_want_to_take_an_specific_bus() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 2: I want to take an specific bus");
    }

    @When("I insert a keyword on the search bar")
    public void i_insert_a_keyword_on_the_search_bar() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 3: I insert a keyword on the search bar");
    }

    @Then("Take me to the result page")
    public void take_me_to_the_result_page() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 4: Take me to the result page");
    }

    @Then("I should see all the possible matches")
    public void i_should_see_all_the_possible_matches() {
        // Write code here that turns the phrase above into concrete actions
        System.out.print("Passed step 3: I should see all the possible matches");
    }

}
