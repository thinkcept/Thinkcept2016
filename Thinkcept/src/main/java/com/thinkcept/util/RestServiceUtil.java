package com.thinkcept.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RestServiceUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(RestServiceUtil.class);
	
	public static final int WELCOME_EVENT = 0;
	public static final int CHECK_IN_EVENT = 1;
	public static final int SECURITY_CHECK_IN_EVENT = 2;
	public static final int BOARDING_EVENT = 3;
	
	
	public static final String FIREBASE_TOKEN = "firebaseToken";
	private static final String SERVER_KEY = "AIzaSyA4JpWxR3oPE-vA8yX9VHXxTgCj9a3Dxco";
	private static final String FIREBASE_URL = "https://fcm.googleapis.com/fcm/send";
	private static final String FCM_HEADER_CONTENT_TYPE = "Content-Type";
	private static final String FCM_HEADER_AUTHORIZATION = "Authorization";
	
	
	public void storeIntoFile(String tokenName, String tokenValue) throws Exception {
		File fileStore = new File("property_store.properties");
		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			fileStore.createNewFile();
		} catch (IOException e) {
			logger.error("Error while creating property_store file...", e);
			throw e;
		}
		Properties properties = new Properties();
		try {
			fis = new FileInputStream(fileStore);
			properties.load(fis);
			properties.setProperty(tokenName, tokenValue);
		} catch (Exception e) {
			logger.error("Error while lading property_store file...", e);
			throw e;
		} finally {
			try {
				fis.close();
			} catch (Exception ex){}
		}
		try {
			fos = new FileOutputStream(fileStore);
			properties.store(fos, null);
		} catch (Exception e) {
			logger.error("Error while writing property_store file...", e);
			throw e;
		} finally {
			try {
				fos.close();
			} catch (Exception ex){}
		}
	}
	
	public String getTokenValue(String tokenName) throws Exception {
		File fileStore = new File("property_store.properties");
		FileInputStream fis = null;
		if(!fileStore.exists()) {
			throw new Exception("property_store.properties does not exist.");
		}
		Properties properties = new Properties();
		try {
			fis = new FileInputStream(fileStore);
			properties.load(fis);
			return properties.getProperty(tokenName);
		} catch (Exception e) {
			logger.error("Error while lading property_store file...", e);
			throw e;
		} finally {
			try {
				fis.close();
			} catch (Exception ex){}
		}
		
	}
	
	public String sendToFCM(String data) throws Exception {
		HttpClient client = HttpClientBuilder.create().build();
		try {
			HttpPost request = new HttpPost(FIREBASE_URL);
			StringEntity entity = new StringEntity(data);
			request.addHeader(FCM_HEADER_CONTENT_TYPE, "application/json");
			request.addHeader(FCM_HEADER_AUTHORIZATION, "key="+SERVER_KEY);
			request.setEntity(entity);
			HttpResponse response = client.execute(request);
			String responseMessage = EntityUtils.toString(response.getEntity());
			logger.debug("Response from FCM:"+responseMessage);
			return responseMessage;
		} catch(Exception ex) {
			logger.error("Error while sending message to FCM server...", ex);
			throw ex;
		} 
	}
	
	public String sendPushNotification(String user, int event, String latitude, String longitude) throws Exception {
		String registrationToken = getTokenValue(user+"."+FIREBASE_TOKEN);
		if(null == registrationToken || registrationToken.isEmpty()) {
			throw new Exception("No device is registered.");
		}
		switch (event) {
			case WELCOME_EVENT:
				return sendToFCM(getJSONPayLoad(registrationToken, latitude, longitude, "Welcome to SFO airport."));
				
			case CHECK_IN_EVENT:
				return sendToFCM(getJSONPayLoad(registrationToken, latitude, longitude, "Proceed for security check in."));
			
			case SECURITY_CHECK_IN_EVENT:
				return sendToFCM(getJSONPayLoad(registrationToken, latitude, longitude, 
						"It seems you have completed security check in. You can explore the airport."));
				
			case BOARDING_EVENT:
				return sendToFCM(getJSONPayLoad(registrationToken, latitude, longitude, 
						"Time to board the flight. Happy Journey!"));
			default:
				return "Not a valid event";
		}

	}
	
	public String getJSONPayLoad(String to, String latitude, String longitude, String message) throws JSONException {
		JSONObject payLoad = new JSONObject();
		payLoad.put("to", to);
		JSONObject notification = new JSONObject();
		notification.put("title", "Event Notification");
		notification.put("body", message);
		notification.put("icon", "myicon");
		notification.put("sound", "default");
		JSONObject data = new JSONObject();
		data.put("latitude", latitude);
		data.put("longitude", longitude);
		payLoad.put("notification", notification);
		payLoad.put("data", data);
		return payLoad.toString();
	}

}
