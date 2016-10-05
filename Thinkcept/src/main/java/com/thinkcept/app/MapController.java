package com.thinkcept.app;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/mvc")
public class MapController {
    @RequestMapping(value = "/static", method = RequestMethod.GET)
    public String getStaticpage() {
	return "redirect:/resources/test.html";
    }

    @RequestMapping(value = "/travelerMap", method = RequestMethod.GET)
    public String travelerMap() {
	return "redirect:/resources/travelerMap.html";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String admin() {
	return "redirect:/resources/admin.html";
    }
    @RequestMapping(value = "/travelerMap.htm", method = RequestMethod.GET)
    public String dynamicTravelerMap(@RequestParam double latitude, @RequestParam double longitude,
	    @RequestParam String interest, ModelMap model) {
	model.addAttribute("latitude", latitude);
	model.addAttribute("longitude", longitude);
	model.addAttribute("interest", interest);
	return "travelerMap";
    }

    @ApiOperation(value = "mapRequest", notes = "This service takes latitude and longitude as input and returns a page")
    @ApiImplicitParams({ @ApiImplicitParam(name = "mapRequest", value = "Map Request handler", required = true, dataType = "string", paramType = "longitude", defaultValue = "0") })
    @RequestMapping(value = "/mapRequest", method = RequestMethod.GET)
    public String getStudentName(@RequestParam String latitude, @RequestParam String longitude, ModelMap model) {
	model.addAttribute("LatitudeLongitude", latitude + " " + longitude);
	return "list";
    }
}
