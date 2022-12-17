package com.ssafy.vue.model.service;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.util.Map;

public interface NewsService {
	public String searchKeyword(String keyword);

	public String get(String apiUrl, Map<String, String> requestHeaders);

	public HttpURLConnection connect(String apiUrl);

	public String readBody(InputStream body);
}
