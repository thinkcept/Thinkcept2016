function showAlart() {
	// var MyDiv2 = document.getElementById("userSelection").value;
	var selectedVal = document.querySelector('input[name = "choice"]:checked').value;
	alert(selectedVal);
	// alert(MyDiv2);
	// alert("window.XMLHttpRequest:::->"+window.XMLHttpRequest);
	var xmlhttp = new XMLHttpRequest();
	// var url =
	// "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=AAA";
	var url = "http://localhost:8080/thinkcept/rest/getPNR?pnr=123";
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
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}
