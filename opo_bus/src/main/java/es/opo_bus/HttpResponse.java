package es.opo_bus;

import java.io.IOException;
import java.net.HttpURLConnection;

public class HttpResponse {
    private String payload;
    private int code;

    private HttpResponse(int code, String payload) {
        this.payload = payload;
        this.code = code;
    }

    public static HttpResponse create(int code, String payload){
        return new HttpResponse(code,payload);
    }

    public static HttpResponse build(HttpURLConnection connection, String payload){
        try {
            return new HttpResponse(connection.getResponseCode(),payload);
        } catch (IOException e) {
            e.printStackTrace();
            return HttpResponse.create(500,"{\"error\":\"Error on creating response.\"}");
        }
    }
    public String getPayload() {
        return payload;
    }

    public int getCode() {
        return code;
    }
}
