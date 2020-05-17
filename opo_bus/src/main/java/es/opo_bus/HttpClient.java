/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package es.opo_bus;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 *
 * @author XDLTB50
 */
public class HttpClient {
    public static HttpResponse sendGetRequest(String requestUrl) {
    try {
        URL url = new URL(requestUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");


        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder jsonString = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
                jsonString.append(line);
        }
        br.close();
        connection.disconnect();

        return HttpResponse.build(connection,jsonString.toString());
    } catch (Exception e) {
        e.printStackTrace();
        return HttpResponse.create(500,"{\"error\":\"Error on connection.\"}");

    }

}

    public static HttpResponse sendPostRequest(String requestUrl, String payload) {
    try {
        URL url = new URL(requestUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream(), StandardCharsets.UTF_8);
        writer.write(payload);
        writer.close();
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder jsonString = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
                jsonString.append(line);
        }
        br.close();
        connection.disconnect();
        return HttpResponse.build(connection,jsonString.toString());

    }
    catch (Exception e) {
        e.printStackTrace();
        return HttpResponse.create(500,"{\"error\":\"Error on connection.\"}");
    }

    }

    public static HttpResponse sendDeleteRequest(String requestUrl, String payload) {
        try {
            URL url = new URL(requestUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setRequestMethod("DELETE");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream(), StandardCharsets.UTF_8);
            writer.write(payload);
            writer.close();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder jsonString = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                jsonString.append(line);
            }
            br.close();
            connection.disconnect();
            return HttpResponse.build(connection,jsonString.toString());

        }
        catch (Exception e) {
            e.printStackTrace();
            return HttpResponse.create(500,"{\"error\":\"Error on connection.\"}");
        }

    }
}
