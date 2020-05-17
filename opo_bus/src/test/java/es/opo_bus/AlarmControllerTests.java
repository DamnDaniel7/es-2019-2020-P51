/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package es.opo_bus;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import es.opo_bus.entities.Bus;
import es.opo_bus.entities.User;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AlarmControllerTests {

    User user = new User();
    Bus bus = new Bus();
    private final String url = "";
    @LocalServerPort
    private int port;

    @Before
    public void insert() throws JSONException {
        String account = "{\"username\": \"test\",\"password\": \"test\"}";
        HttpClient.sendPostRequest(createURLWithPort("/user/signin"),account);
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort("/bus"));
        JSONArray buses = new JSONArray(res.getPayload());
        JSONObject obj = new JSONObject(buses.get(0).toString());
        bus.setBusID(obj.getString("busID"));
        user.setUsername("test");

        String payload = "{\"longitude\": \"0\",\"latitude\": \"0\",\"date\": \"0\",\"bus\": \""+bus.getBusID()+"\",\"username\": \""+user.getUsername()+"\"}";
        HttpClient.sendPostRequest(createURLWithPort("/alarm/addalarm"),payload);
    }

    @Test
    public void addAlarms(){
        String payload = "{\"longitude\": \"0\",\"latitude\": \"0\",\"date\": \"0\",\"bus\": \""+bus.getBusID()+"\",\"username\": \""+user.getUsername()+"\"}";
        HttpResponse res = HttpClient.sendPostRequest(createURLWithPort("/alarm/addalarm"),payload);
        assertEquals(201,res.getCode());
    }
    
    @Test
    public void getAlarms() throws JSONException {
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort("/alarm/"+user.getUsername()));
        assertEquals(200,res.getCode());
        System.out.println(res.getPayload());
        JSONArray alarms = new JSONArray(res.getPayload());
        assertTrue(alarms.length() > 0);

    }
    
    @Test
    public void removeAlarms() throws JSONException {
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort("/alarm/"+user.getUsername()));
        assertEquals(200,res.getCode());
        JSONArray alarms = new JSONArray(res.getPayload());
        JSONObject alarm = new JSONObject(alarms.get(0).toString());
        //Delete
        res = HttpClient.sendDeleteRequest(createURLWithPort("/alarm/removealarm/"+alarm.getLong("id")),"");
        assertEquals(200,res.getCode());

        res = HttpClient.sendGetRequest(createURLWithPort("/alarm/"+user.getUsername()));
        JSONArray alarms2 = new JSONArray(res.getPayload());
        assertEquals(alarms.length(),alarms2.length()+1);
    }

    @After
    public void cleanUp(){
        String account = "{\"username\": \"test\",\"password\": \"test\"}";
        HttpClient.sendPostRequest(createURLWithPort("/user/delete"),account);


    }

    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }
 
}