window.onload = leaf;
var mainForm = document.querySelector("#mainForm");


function leaf() {
	/*validate isn't working yet*/
	mainForm.btnSubmit.onclick = validateForm;	
	

	/*all functions used below*/
	mainForm.firstname.onblur = checkFirst;
	/*mainForm.lastName.onblur = checkLast;*/
	mainForm.email.onblur = checkEmail;
	mainForm.phone.onblur = checkPhone;
	mainForm.address1.onblur = checkAddress;
	mainForm.address2.onblur = checkAddress2;
	mainForm.city.onblur = checkCity;
	mainForm.postal.onblur = checkPostal;
	
	/*it made more for the dropdowns to be onclicks. if you make them onchange, clicking away from X initially won't indicate that the field is wrong. The user needs to immdiately realise that they must pick an option from the list */
	mainForm.cDrop.onclick = checkcDrop;
	mainForm.rDrop.onclick = checkrDrop;
	mainForm.agree.onclick = checkChecked;
	
	/*country/region js used from in-class lesson*/
 mainForm.cDrop.onchange = getRegions;
}


/****************************
	FIRST NAME
*****************************/
function checkFirst() {
	var code = /[a-z]{2,40}(\s)[a-z]{2,40}/i;
	/*creates a variable for name, and trims is*/
	var first = trim(mainForm.firstname.value);
	/*var created for good and negative messages*/
	var message = mainForm.firstname.parentNode.querySelector(".message");
	var message2 = mainForm.firstname.parentNode.querySelector(".message2");

	var valid = code.test(first);
	/*console.log(valid);*/
	
	/*check if the field is empty*/
	if (first.length == 0) {
		/*hide the positive message, while creating a red incorrect box*/
		message2.style.display = "none";
		document.getElementById("firstName").placeholder = "Enter your first name";
		document.getElementById("firstName").style.backgroundColor = "#ffc7c7";
		document.getElementById("firstName").style.border = "1px solid red";
		return true;
		
	} else if (valid == false)
		/*(first.length < 2 || first.length > 40) */{
		/*hide the positive message, while creating a red incorrect box and display error text*/
		message.style.display = "block";
		message2.style.display = "none";
		awesomeMessage(mainForm.firstName, "message", "Between 2 and 40 characters");
		document.getElementById("firstName").style.backgroundColor = "#ffc7c7";
		document.getElementById("firstName").style.border = "1px solid red";
		return true;
	} else {
		/*set the input box to positive green and white, while hiding the red box and error message*/
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("firstName").style.backgroundColor = "white";
		document.getElementById("firstName").style.border = "1px solid #00ff00";
		return false;

	}
}

/****************************
	LAST NAME
*****************************/

/*function checkLast() {
	var last = mainForm.lastName.value.trim();
	var message = mainForm.lastName.parentNode.querySelector(".message");
	var message2 = mainForm.lastName.parentNode.querySelector(".message2");

	if (last.length == 0) {
		message2.style.display = "none";
		document.getElementById("lastName").placeholder = "Enter your last name";
		document.getElementById("lastName").style.backgroundColor = "#ffc7c7";
		document.getElementById("lastName").style.border = "1px solid red";
		return true;

	} else if (last.length < 2 || last.length > 40) {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.lastName, "message", "Between 2 and 40 characters");
		document.getElementById("lastName").style.backgroundColor = "#ffc7c7";
		document.getElementById("lastName").style.border = "1px solid red";
		return true;
	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("lastName").style.backgroundColor = "white";
		document.getElementById("lastName").style.border = "1px solid #00ff00";
		return false;
	}
}*/

/****************************
	EMAIL
*****************************/
function checkEmail() {

	var email = trim(mainForm.email.value);
	var message = mainForm.email.parentNode.querySelector(".message");
	var message2 = mainForm.email.parentNode.querySelector(".message2");

	//get the positions of the @ or . symbols
	var firstAt = email.indexOf("@");
	var lastAt = email.lastIndexOf("@");
	var firstDot = email.indexOf(".");
	var lastDot = email.lastIndexOf(".");
	var wrongEmail = false;

	if (firstAt < 1 || firstAt != lastAt) {
		wrongEmail = true;
	}

	if (firstDot == -1 || lastDot < lastAt || lastDot >= email.length - 2) {
		wrongEmail = true;
	}
	

	//check to see if wrongEmail was changed to true

	if (email.length == 0) {
		message2.style.display = "none";
		document.getElementById("email").placeholder = "Enter your e-mail";
		document.getElementById("email").style.backgroundColor = "#ffc7c7";
		document.getElementById("email").style.border = "1px solid red";
		return true;
	} else if (wrongEmail == true) {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.email, "message", "Enter a valid e-mail");
		document.getElementById("email").style.backgroundColor = "#ffc7c7";
		document.getElementById("email").style.border = "1px solid red";
		return true;
	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("email").style.backgroundColor = "white";
		document.getElementById("email").style.border = "1px solid #00ff00";
		return false;
	}

}

/****************************
	PHONE
*****************************/

function checkPhone() {
	//Checks if phone number is exactly 10 numbers
	var code = /[0-9]{10}/;
	var phone = trim(mainForm.phone.value);
	var message = mainForm.phone.parentNode.querySelector(".message");
	var message2 = mainForm.phone.parentNode.querySelector(".message2");
	
	var result = code.test(phone);

	if (phone.length == 0) {
		message2.style.display = "none";
		document.getElementById("phone").placeholder = "Enter your phone number";
		document.getElementById("phone").style.backgroundColor = "#ffc7c7";
		document.getElementById("phone").style.border = "1px solid red";
		return true;


		/*check to see if the phone number is less than 10 digits. area code required*/
	} else if (phone.length < 10) {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.phone, "message", "Must be 10 characters");
		document.getElementById("phone").style.backgroundColor = "#ffc7c7";
		document.getElementById("phone").style.border = "1px solid red";
		return true;
	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("phone").style.backgroundColor = "white";
		document.getElementById("phone").style.border = "1px solid #00ff00";
		return false;
	}
}

/****************************
 ADDRESS  
*****************************/

function checkAddress() {
	/* requires a number a word and a valid street suffic*/
	var code = /^[0-9]{1,5}(\s)[a-z]{2,40}(\s)(street|st|drive|dr|avenue|ave|lane|ln|court|crt|road|rd|place|pl|private|pvt|crescent|cr)$/i;
	var addr = trim(mainForm.address1.value);
	var message = mainForm.address1.parentNode.querySelector(".message");
	var message2 = mainForm.address1.parentNode.querySelector(".message2");

	var valid = code.test(addr);
	/*console.log(valid);*/
	
	if (addr.length == 0) {
		message2.style.display = "none";
		message.style.display = "block";
		document.getElementById("address1").placeholder = "Enter your address";
		document.getElementById("address1").style.backgroundColor = "#ffc7c7";
		document.getElementById("address1").style.border = "1px solid red";
		return true;

	} else if (valid == false)
		/*(addr.length < 2 || addr.length > 40)*/ {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.address1, "message", "Enter a real address");
		document.getElementById("address1").style.backgroundColor = "#ffc7c7";
		document.getElementById("address1").style.border = "1px solid red";
		return true;
	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("address1").style.backgroundColor = "white";
		document.getElementById("address1").style.border = "1px solid #00ff00";
		return false;
	}
}

/****************************
 ADDRESS 2
*****************************/

function checkAddress2() {
	var code = /^[0-9]{1,5}(\s)[a-z]{2,40}(\s)(street|st|drive|dr|avenue|ave|lane|ln|court|crt|road|rd|place|pl|private|pvt|crescent|cr)$/i;
	var addr = trim(mainForm.address2.value);
	var message = mainForm.address2.parentNode.querySelector(".message");
	var message2 = mainForm.address2.parentNode.querySelector(".message2");

	var valid = code.test(addr);
/*	console.log(valid);*/
	
	if (addr.length == 0) {
		message2.style.display = "none";
		message.style.display = "none";
		document.getElementById("address2").style.backgroundColor = "white";
		document.getElementById("address2").style.border = "none";
		return true;

	} else if (valid == false)
		/*(addr.length < 2 || addr.length > 40)*/ {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.address2, "message", "Enter a real address");
		document.getElementById("address2").style.backgroundColor = "#ffc7c7";
		document.getElementById("address2").style.border = "1px solid red";
		return true;
	}else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("address2").style.backgroundColor = "white";
		document.getElementById("address2").style.border = "1px solid #00ff00";
		return false;
	}
}


/****************************
 CITY
*****************************/

function checkCity() {
	//requires letters between 2-40 characters
	var code = /^[a-z]{2,40}$/i;
	var city = mainForm.city.value.trim();
	var message = mainForm.city.parentNode.querySelector(".message");
	var message2 = mainForm.city.parentNode.querySelector(".message2");

	var valid = code.test(city);
/*	console.log(valid);*/
	
	if (city.length == 0) {
		message2.style.display = "none";
		message.style.display = "block";
		document.getElementById("city").placeholder = "Enter your city";
		document.getElementById("city").style.backgroundColor = "#ffc7c7";
		document.getElementById("city").style.border = "1px solid red";
		return true;

	} else if (valid == false) {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.city, "message", "Enter a real city. Like Gotham.");
		document.getElementById("city").style.backgroundColor = "#ffc7c7";
		document.getElementById("city").style.border = "1px solid red";
		return true;
	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("city").style.backgroundColor = "white";
		document.getElementById("city").style.border = "1px solid #00ff00";
		return false;
	}
}

/****************************
		COUNTRY
*****************************/
function checkcDrop() {
	var message = mainForm.cDrop.parentNode.querySelector(".message");
	var message2 = mainForm.cDrop.parentNode.querySelector(".message2");

	/*If country is set to X, first error appears*/
	if (cDrop.value == "X") {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.cDrop, "message", "Select a country");
		document.getElementById("cDrop").style.backgroundColor = "#ffc7c7";
		document.getElementById("cDrop").style.border = "1px solid red";
		return true;

	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("cDrop").style.backgroundColor = "white";
		document.getElementById("cDrop").style.border = "1px solid #00ff00";
		return false;
	}
}

/****************************
	POSTAL CODE
*****************************/


function checkPostal() {	
	var postalCode ;
 var postal = trim(mainForm.postal.value);
	var message = mainForm.postal.parentNode.querySelector(".message");
	var message2 = mainForm.postal.parentNode.querySelector(".message2");

		/*Change the value of var postalCode*/
	if (mainForm.cDrop.value == "X"){
		message2.style.display = "none";
		message.style.display = "block";
		document.getElementById("postal").style.backgroundColor = "#ffc7c7";
		document.getElementById("postal").style.border = "1px solid red";
		awesomeMessage(mainForm.postal, "message", "Enter a valid postal Code");
		return true;
	}	else if(mainForm.cDrop.value == "AU") {
		postalCode = /^[0-9][0-9][0-9][0-9]$/;
	} else if (mainForm.cDrop.value == "CA") {
		postalCode = /^[a-z][0-9][a-z](\s)?[0-9][a-z][0-9]$/i;		
	} else if (mainForm.cDrop.value == "US") {
		postalCode = /^[0-9][0-9][0-9][0-9][0-9]$/;
	} else if (mainForm.cDrop.value == "MX") {
		postalCode = /^[0-9][0-9][0-9][0-9][0-9]$/;
	} else if (mainForm.cDrop.value == "FN") {
		postalCode = /^[0-9][0-9][0-9][0-9][0-9]$/;
	} else if (mainForm.cDrop.value == "BG") {
		postalCode =  /^[0-9][0-9][0-9][0-9]$/;
	} else if (mainForm.cDrop.value == "CH") {
		postalCode = /^[0-9][0-9][0-9][0-9][0-9][0-9]$/;
	} else{
		postalCode = "";
	};
	
	if (postal.length == 0) {
		message2.style.display = "none";
		message.style.display = "block";
		document.getElementById("postal").placeholder = "Enter your postal code";
		document.getElementById("postal").style.backgroundColor = "#ffc7c7";
		document.getElementById("postal").style.border = "1px solid red";
		return true;
	}

	
 var valid = postalCode.test(postal);
	/*console.log(valid);*/
	
	
	if (valid == false) {
		message2.style.display = "none";
		message.style.display = "block";
		document.getElementById("postal").style.backgroundColor = "#ffc7c7";
		document.getElementById("postal").style.border = "1px solid red";
		awesomeMessage(mainForm.postal, "message", "Enter a valid postal Code");
		return true;
	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("postal").style.backgroundColor = "white";
		document.getElementById("postal").style.border = "1px solid #00ff00";
		return false;
	 }
	
	
}

/****************************
	REGIONS/POSTAL
*****************************/

function getRegions() {
	/*code will be defined once a country is selected*/
	

	/*if statement evaluates the choice of the user*/
	if (mainForm.cDrop.value == "AU") {
		currentRegions = australia;
		/*CHANGE THE PLACEHOLDER DEPENDING ON THE COUNTRY*/
		document.getElementById("postal").placeholder = "1234";
	} else if (mainForm.cDrop.value == "CA") {
		currentRegions = canada;
		document.getElementById("postal").placeholder = "1A2B3C";
	} else if (mainForm.cDrop.value == "US") {
		currentRegions = usa;
		document.getElementById("postal").placeholder = "12345";
	} else if (mainForm.cDrop.value == "MX") {
		currentRegions = mexico;
		document.getElementById("postal").placeholder = "12345";
	} else if (mainForm.cDrop.value == "FN") {
		currentRegions = finland;
		document.getElementById("postal").placeholder = "12345";
	} else if (mainForm.cDrop.value == "BG") {
		currentRegions = belgium;
		document.getElementById("postal").placeholder = "1234";
	} else if (mainForm.cDrop.value == "CH") {
		currentRegions = china;
		document.getElementById("postal").placeholder = "123456";
	} else {
		/*default region is displayed, unless user picks a country*/
		currentRegions = ["X:Select country first"]
	};
	
		
	/*removes the options currently in the region field*/
	var opts = mainForm.rDrop.querySelectorAll("option");
	for (var o = 0; o < opts.length; o++) {
		opts[o].parentNode.removeChild(opts[o]);
	}


	for (var i = 0; i < currentRegions.length; i++) {
		/*split the regions into value and text. set as 0 and 1*/
		var region = currentRegions[i].split(":");
		var optTag = document.createElement("option");

		optTag.value = region[0];
		optTag.text = region[1];
		mainForm.rDrop.appendChild(optTag);
	}
	
}

/****************************
	REGION MESSAGE
*****************************/

function checkrDrop() {
	var message = mainForm.rDrop.parentNode.querySelector(".message");
	var message2 = mainForm.rDrop.parentNode.querySelector(".message2");

	if (rDrop.value == "X") {
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.rDrop, "message", "Select a region");
		document.getElementById("rDrop").style.backgroundColor = "#ffc7c7";
		document.getElementById("rDrop").style.border = "1px solid red";
		return true;

	} else {
		message2.style.display = "block";
		message.style.display = "none";
		document.getElementById("rDrop").style.backgroundColor = "white";
		document.getElementById("rDrop").style.border = "1px solid #00ff00";
		return false;
	}
}

/****************************
	RADIO  CHECKED BY DEFAULT. ALWAYS VALID
*****************************/
/*function checkRadio(){	
 var radio = document.querySelector(".options")
	var message = radio.parentNode.querySelector(".message");
	var message2 = radio.parentNode.querySelector(".message2");
	
	if (radio.checked == true){		
		return "X";
	} else{		
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(radio, "message", "Pick a gender");
		document.getElementById("gender").style.backgroundColor = "#ffc7c7";
		document.getElementById("gender").style.border = "1px solid red";
		return true;
	}
}*/

/****************************
	CHECKBOX
*****************************/
function checkChecked(){	
	var message = mainForm.agree.parentNode.querySelector(".message");
	var message2 = mainForm.agree.parentNode.querySelector(".message2");
	
	if (mainForm.agree.checked == true){	
		message.style.display = "none";
		return "X";		
	} else{		
		message2.style.display = "none";
		message.style.display = "block";
		awesomeMessage(mainForm.agree, "message", "You must agree");
		document.getElementById("agree").style.backgroundColor = "#ffc7c7";
		document.getElementById("agree").style.border = "1px solid red";
		return true;
	}
}

/****************************
	VALIDATE
*****************************/

function validateForm() { 
	
	var err = false;
	var first = checkFirst();
	/*var last = checkLast();*/
	var email = checkEmail();
	var phone = checkPhone();
	var address = checkAddress();
	var city = checkCity();
	var postal = checkPostal();
	var country = checkcDrop();
	var region = checkrDrop();
	var check = checkChecked();
	/*var radio = checkRadio();*/
	
	if (first == true) {
		err = true;
	}
	
	/*if (last == true) {
		err = true;
	}*/

	if (email == true) {
		err = true;
	}

	if (phone == true) {
		err = true;
	}

	if (address == true) {
		err = true;
	}
	
	if (city == true) {
		err = true;
	}

	if (postal == true) {
		err = true;
	}
	
	if (country == true) {
		err = true;
	}
	
	if (region == true) {
		err = true;
	}
	
	if (check == true){
		err= true;
	}
	
	/*if (radio = true){
		err = true;
	}*/
	
	

	if (err == true) {
		return false;
	}

}

/************************
    MESSAGE BOX
************************/
function awesomeMessage(formField, messageClass, message) {
	formField.parentNode.querySelector(".message").innerHTML = message;
	formField.parentNode.querySelector(".message").className = messageClass;
}