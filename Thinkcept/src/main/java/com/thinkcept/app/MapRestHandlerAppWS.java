package com.thinkcept.app;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thinkcept.bean.MapResponseBean;
import com.thinkcept.exception.CustomException;


@RestController
@RequestMapping("/rest")
public class MapRestHandlerAppWS {
	private static final Logger logger = LoggerFactory.getLogger(MapRestHandlerAppWS.class);
	
	/**
	 * This method returns PNR number for a given customer
	 * @return
	 */
	@ApiOperation(value="getPNR", notes="Returns PNR details for a given customer")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "pnr", value = "PNR", required = true, dataType = "string", paramType = "query", defaultValue="Ashish")
      })
	@RequestMapping(path="/getPNR", method = RequestMethod.GET, headers="Accept=application/json",produces="application/json")
	public MapResponseBean getPNR(@RequestParam(name="pnr")String pnr) {
		logger.info("Test");
		MapResponseBean sb = new MapResponseBean();
		sb.setPnr(pnr);
        return sb;
    }

	/**
	 * This method returns advantage number for a given customer
	 * @return
	 */
	@RequestMapping(path="/getAdv", method = RequestMethod.GET, headers="Accept=application/json",produces="application/json")
    public MapResponseBean getAdv() {
		MapResponseBean sb = new MapResponseBean();
		sb.setAdvNo("Adv#");
        return sb;
    }
	
	@RequestMapping(path="/getDefaultException", method = RequestMethod.GET, headers="Accept=application/json",produces="application/json")
    public String getDefaultException() {
        String name = null;
        System.out.println(name.toLowerCase());   // Null pointer exception will be thrown from here
		return null;
    }
	
	@RequestMapping(path="/getCustomException", method = RequestMethod.GET, headers="Accept=application/json",produces="application/json")
    public String getCustomException() throws CustomException {
		System.out.println("Testing Custom Exception"); 
		if(true) {
        	throw new CustomException("Custom Exception");
        }
		return null;
    }
}
