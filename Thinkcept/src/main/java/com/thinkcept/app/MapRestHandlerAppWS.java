package com.thinkcept.app;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thinkcept.bean.MapResponseBean;
import com.thinkcept.exception.CustomException;
import com.thinkcept.util.RestServiceUtil;

@RestController
@RequestMapping("/rest")
public class MapRestHandlerAppWS {
	private static final Logger logger = LoggerFactory
			.getLogger(MapRestHandlerAppWS.class);

	/**
	 * This method returns PNR number for a given customer
	 * 
	 * @return
	 */
	@ApiOperation(value = "getPNR", notes = "Returns PNR details for a given customer")
	@ApiImplicitParams({ @ApiImplicitParam(name = "pnr", value = "PNR", required = true, dataType = "string", paramType = "query", defaultValue = "Ashish") })
	@RequestMapping(path = "/getPNR", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public MapResponseBean getPNR(@RequestParam(name = "pnr") String pnr) {
		logger.info("Test");
		MapResponseBean sb = new MapResponseBean();
		sb.setPnr(pnr);
		return sb;
	}
	
	/**
	 * This service store the registration token in server.
	 * 
	 * @return
	 * @throws Exception 
	 */
	@ApiOperation(value = "storeToken", notes = "Store the registration token in server")
	@ApiImplicitParams({ @ApiImplicitParam(name = "user", value = "USER", required = true, dataType = "string", paramType = "query", defaultValue = "prabhat"),
		@ApiImplicitParam(name = "token", value = "TOKEN", required = true, dataType = "string", paramType = "query", defaultValue = "123")})
	@RequestMapping(path = "/storeToken", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public String storeRegistrationToken(@RequestParam(name = "user") String user, @RequestParam(name = "token") String token) throws Exception {
		RestServiceUtil util = new RestServiceUtil();
		logger.debug("user:"+user+" token:"+token);
		if(null != user && null != token) {
			util.storeIntoFile(user+"."+RestServiceUtil.FIREBASE_TOKEN, token);
		}
		return "success";
	}
	
	
	/**
	 * This service send push notification to mobile.
	 * 
	 * @return
	 * @throws Exception 
	 */
	@ApiOperation(value = "sendNotification", notes = "Send push notification to mobile")
	@ApiImplicitParams({ @ApiImplicitParam(name = "user", value = "USER", required = true, dataType = "string", paramType = "query", defaultValue = "prabhat"),
		@ApiImplicitParam(name = "event", value = "EVENT", required = true, dataType = "string", paramType = "query", defaultValue = "0"),
		@ApiImplicitParam(name = "latitude", value = "LATITUDE", required = true, dataType = "string", paramType = "query", defaultValue = "0"),
		@ApiImplicitParam(name = "longitude", value = "LONGITUDE", required = true, dataType = "string", paramType = "query", defaultValue = "1")})
	@RequestMapping(path = "/sendNotification", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public String sendPushNotification(@RequestParam(name = "user") String user, @RequestParam(name = "event") String event,
			@RequestParam(name = "latitude") String latitude, @RequestParam(name = "longitude") String longitude) throws Exception {
		RestServiceUtil util = new RestServiceUtil();
		logger.debug("user:"+user+" event:"+event+" latitude:"+latitude+" longitude:"+longitude);
		if(null != user && null != event && null != latitude && null != longitude) {
			util.sendPushNotification(user, Integer.parseInt(event), latitude, longitude);
		}
		return "success";
	}

	/**
	 * This method returns advantage number for a given customer
	 * 
	 * @return
	 */
	@RequestMapping(path = "/getAdv", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public MapResponseBean getAdv() {
		MapResponseBean sb = new MapResponseBean();
		sb.setAdvNo("Adv#");
		return sb;
	}

	@RequestMapping(path = "/getDefaultException", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public String getDefaultException() {
		String name = null;
		System.out.println(name.toLowerCase()); // Null pointer exception will
												// be thrown from here
		return null;
	}

	@RequestMapping(path = "/getCustomException", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public String getCustomException() throws CustomException {
		System.out.println("Testing Custom Exception");
		if (true) {
			throw new CustomException("Custom Exception");
		}
		return null;
	}

	@RequestMapping(path = "/build", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public String build() throws Exception {
		System.out.println("Updating the code");
		String output = "";
		Process process = Runtime.getRuntime().exec(
				"/home/ubuntu/Code/script/thinkceptbuild.sh");
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				process.getInputStream()));
		String s;
		while ((s = reader.readLine()) != null) {
			output = output + "\n" + s;
		}
		return output;
	}
	
	@RequestMapping(path = "/deploy", method = RequestMethod.GET, headers = "Accept=application/json", produces = "application/json")
	public String deploy() throws Exception {
		System.out.println("Updating the code");
		String output = "";
		Process process = Runtime.getRuntime().exec(
				"/home/ubuntu/Code/script/thinkceptdeploy.sh");
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				process.getInputStream()));
		String s;
		while ((s = reader.readLine()) != null) {
			output = output + "\n" + s;
		}
		return output;
	}
}
