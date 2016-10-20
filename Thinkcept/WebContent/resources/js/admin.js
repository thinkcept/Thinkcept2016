function showAlert() {
	// var MyDiv2 = document.getElementById("userSelection").value;
	var selectedVal = document.querySelector('input[name = "choice"]:checked').value;
	
	//alert(selectedVal);
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	var message =document.getElementById("myTextarea").value;
	var event;
	if(selectedVal=='a'){
		event=0;
	}else if(selectedVal=='b'){
		event=1;
	}else if(selectedVal=='c'){
		event=2;
	}else if(selectedVal=='d'){
		event=3;
	}else{
		event=4;
	}
	
	// alert("window.XMLHttpRequest:::->"+window.XMLHttpRequest);
	var xmlhttp = new XMLHttpRequest();
	// "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=AAA";
	var url = "http://54.218.95.197:8080/thinkcept/rest/sendNotification?user=prabhat&event="+event+"&latitude="+latitude+"&longitude="+longitude+"&message="+message;
	
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
		document.getElementById("myTextarea").value = "Welcome to ORD airport.Wish you a Happy journey.";
		document.getElementById("latitude").value = "41.97927760414138";
		document.getElementById("longitude").value = "-87.90554925826643";
	}
	
	if(selectedVal=='b' || selectedVal=="b"  ){
		document.getElementById("myTextarea").value = "Please Collect your boarding pass.";
		document.getElementById("latitude").value = "41.97898848526869";
		document.getElementById("longitude").value = "87.90561363128279";
	}
	
	if(selectedVal=='c' || selectedVal=="c"  ){
		document.getElementById("myTextarea").value = "It seems you have completed security check in. You can explore the airport.";
		document.getElementById("latitude").value = "41.978976521700844";
		document.getElementById("longitude").value = "87.90615946081732";
	}
	
	if(selectedVal=='d' || selectedVal=="d"  ){
		document.getElementById("myTextarea").value = "Time to board the flight. Happy Journey!";
		document.getElementById("latitude").value = "41.97799948940687";
		document.getElementById("longitude").value = "87.90641158846472";
	}
	
	if(selectedVal=='e' || selectedVal=="e"  ){
		document.getElementById("myTextarea").value = "Text Message.";
	}

}
