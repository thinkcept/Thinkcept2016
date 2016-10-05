<!DOCTYPE html>
<html>
<head>
<title>Place searches</title>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="../resources/style.css" />
<script type="text/javascript" src="../resources/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="../resources/travelerMap.js"></script>
</head>
<body>
		
	<div style="display:none;">
		<input type="hidden" value="${latitude}" id="latitude"/>
		<input type="hidden" value="${longitude}" id="longitude"/>
		<input type="hidden" value="${interest}" id="placeType"/>
	</div>
	<div id="floating-panel">

		<table cellpadding="2px" cellspacing="3px">
			<tr>
				<td align="left">Origin :</td>
				<td><input type="text" id="start"
					value="SFO International Terminal" readonly></td>
				<td>Search :</td>
				<td><select id="placeType">
						<option disabled="disabled" selected>Pick a choice</option>
						<option value="restaurant">Restaurant</option>
						<option value="cafe">Cafe</option>
						<option value="book_store">Book Store</option>
						<option value="atm">ATM</option>
						<option value="store">Store</option>
						<option value="jewelry_store">Jewelry Store</option>
				</select></td>
			</tr>
			<tr>
				<td>Destination :</td>
				<td><input type="text" id="end" value="Click on place icon"
					readonly><input type="hidden" id="endLatLng"></td>

				<td><input type="button" value="Route" onclick="getRoute()"></td>
				<td><input type="button" value="Go" onclick=""></td>
			</tr>
		</table>
	</div>
	<div id="map"></div>
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlP_nC8RRwGR5zcsb4PlSA9-MTA7FBtJU&signed_in=true&libraries=places&callback=initMap"
		async defer></script>
</body>
</html>
