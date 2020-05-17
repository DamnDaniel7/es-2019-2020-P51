/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package es.opo_bus;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.*;

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
public class UserControllerTests {
    String account = "{\"username\": \"test\",\"password\": \"test\"}";
    private final String url = "/user";

    @LocalServerPort
    private int port;

    @Before
    public void insert(){
       HttpClient.sendPostRequest(createURLWithPort("/signin"),account);
    }

    @Test
    public void signIn() throws JSONException {
        String payload = "{\"username\": \"newaccount\",\"password\": \"test\"}";
        HttpResponse res  = HttpClient.sendPostRequest(createURLWithPort("/signin"),payload);
        assertEquals(201,res.getCode(),res.getPayload());
        JSONObject jsonObject = new JSONObject(res.getPayload());
        assertEquals("newaccount",jsonObject.getString("username"));
        assertEquals("test",jsonObject.getString("password"));
        HttpClient.sendPostRequest(createURLWithPort("/delete"),payload);
    }

    @Test
    public void login() throws JSONException {
        HttpResponse res  = HttpClient.sendPostRequest(createURLWithPort("/login"),account);
        assertEquals(200,res.getCode(),res.getPayload());
    }

    @Test
    public void listUsers() throws JSONException {
        HttpResponse res  = HttpClient.sendGetRequest(createURLWithPort("/"));
        assertEquals(200,res.getCode());
        JSONArray obj = new JSONArray(res.getPayload());
        assertTrue(obj.length() > 0);
    }


    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + url + uri;
    }



    @After
    public void cleanUp(){
        HttpClient.sendPostRequest(createURLWithPort("/delete"),account);
    }


}
