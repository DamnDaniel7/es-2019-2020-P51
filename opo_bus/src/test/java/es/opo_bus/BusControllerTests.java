/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package es.opo_bus;

import es.opo_bus.entities.Bus;
import es.opo_bus.entities.Record;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 *
 * @author XDLTB50
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BusControllerTests {
    private final String url = "/bus";
    private Bus bus = new Bus();
    private Record record = new Record();
    private boolean ignoreBusTests = false;
    private boolean ignoreRecordTests = false;
    @LocalServerPort
    private int port;

    //Bus Integration tests requires atleast 1 bus and 1 record associated to that bus to properly test
    //There is no add functionality.
    @Before
    public void insert() throws Exception {
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort(""));
        System.out.println(res.getPayload());
        if(res.getPayload().equals("null")){
            ignoreBusTests = true;
        }else {
            JSONArray buses = new JSONArray(res.getPayload());
            if (buses.length() == 0)
                ignoreBusTests = true;
            else {
                JSONObject obj = new JSONObject(buses.get(0).toString());
                bus.setBusID(obj.getString("busID"));
            }
        }
        res = HttpClient.sendGetRequest(createURLWithPort("/records"));
        System.out.println(res.getPayload());
        if(res.getPayload().equals("null")){
            ignoreRecordTests = true;
        }else {
            JSONArray records = new JSONArray(res.getPayload());
            if (records.length() == 0)
                ignoreRecordTests = true;
            else{
            JSONObject rec = new JSONObject(records.get(0).toString());
            record.setRecordsId(rec.getString("recordsId"));
         }
        }
    }

    @Test
    public void getBuses() throws JSONException {
        Assume.assumeFalse(ignoreBusTests);
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort(""));
        assertEquals(200,res.getCode());
        JSONArray buses = new JSONArray(res.getPayload());
        assertTrue(buses.length() > 0);
    }

    @Test
    public void getBus() throws JSONException {
        Assume.assumeFalse(ignoreBusTests);
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort("/"+bus.getBusID()));
        assertEquals(200,res.getCode());
        JSONObject obj = new JSONObject(res.getPayload());
        assertEquals(bus.getBusID(),obj.getString("busID"));
    }

    @Test
    public void getRecords() throws JSONException {
        Assume.assumeFalse(ignoreRecordTests);
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort("/records"));
        assertEquals(200,res.getCode());
        JSONArray records = new JSONArray(res.getPayload());
        assertTrue(records.length() > 0);
    }

    @Test
    public void getLastRecord(){
        Assume.assumeFalse(ignoreRecordTests);
        HttpResponse res = HttpClient.sendGetRequest(createURLWithPort("/lastRecord/"+bus.getBusID()));
        assertEquals(200,res.getCode());
    }



    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + url + uri;
    }
}
