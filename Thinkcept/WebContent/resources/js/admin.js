function showAlert() {
	// var MyDiv2 = document.getElementById("userSelection").value;
	var selectedVal = document.querySelector('input[name = "choice"]:checked').value;
	
	alert(selectedVal);
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	var message =document.getElementById("myTextarea").value;
	var event;
	if(selectedVal=='a'){
		event=1;
	}else if(selectedVal=='b'){
		event=2;
	}else if(selectedVal=='c'){
		event=3;
	}else if(selectedVal=='d'){
		event=4;
	}else{
		event=5;
	}
	
	// alert("window.XMLHttpRequest:::->"+window.XMLHttpRequest);
	var xmlhttp = new XMLHttpRequest();
	// "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=AAA";
	var url = "http://localhost:8085/thinkcept/rest/sendNotification?user=prabhat&event="+event+"&latitude="+latitude+"&longitude="+longitude+"&message="+message;
	
	//var url = "http://localhost:8085/thinkcept/rest/getPNR?pnr=123";
	// var url = "http://html.net/tutorials/javascript/lesson18_test.xml"
	xmlhttp.onreadystatechange = function() {

//		alert("Ajax readyState:::->" + xmlhttp.readyState);
//		alert("Ajax status:::->" + xmlhttp.status);
//		alert("Ajax response:::->" + xmlhttp.response);
//		alert("Ajax responseText:::->" + xmlhttp.responseText);

		if (xmlhttp.readyState == XMLHttpRequest.DONE) {
			if (xmlhttp.status === 200) {
				alert("Ajax Success" + xmlhttp.responseText);
				document.getElementById("myDiv").innerHTML = this.responseText;
			} else if (xmlhttp.status === 400) {
				alert('There was an error 400');
			} else {
				alert('something else other than 200 was returned');
			}
		}
	};
	// alert("test 2");
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
}

function  defaultMessage(){
	var selectedVal = document.querySelector('input[name = "choice"]:checked').value;
	if(selectedVal=='a' || selectedVal=="a"  ){
		document.getElementById("myTextarea").value = "Welcome to SFO airport. Proceed for check in.";
	}
	
	if(selectedVal=='b' || selectedVal=="b"  ){
		document.getElementById("myTextarea").value = "Proceed for security check in.";
	}
	
	if(selectedVal=='c' || selectedVal=="c"  ){
		document.getElementById("myTextarea").value = "It seems you have completed security check in. You can explore the airport.";
	}
	
	if(selectedVal=='d' || selectedVal=="d"  ){
		document.getElementById("myTextarea").value = "Time to board the flight. Happy Journey!";
	}
	
	if(selectedVal=='e' || selectedVal=="e"  ){
		document.getElementById("myTextarea").value = "Text Message.";
	}

}
