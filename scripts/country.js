window.onload = countries;

var formy;

function countries(){
	alert("hey");
	//get the form and put it in the global variable
	
	formy = document.querySelector("form");
	
	//put an onchange on the dropdown menu (when the value becomes something else)
	//does not work on text fields, will not trigger until the user clicks away
	formy.cDrop.onchange = getRegions;
}

function getRegions(){
	//create a local variable to store the array we are working with
	//array of regions come from the regions.js (which must be attached before this javascript file)
	
	var currentRegions; //will change to become specific array of regions
	
	if (formy.cDrop.value =="AU"){
		//user picked australia
		currentRegions = australia;
	} else if (formy.cDrop.value == "CA"){
		currentRegions = canada;
	} else if (formy.cDrop.value == "US"){
		currentRegions = usa;
	} else if (formy.cDrop.value == "MX"){
		currentRegions = mexico;
	} else if (formy.cDrop.value == "BG"){
		currentRegions = belgium;
	} else if (formy.cDrop.value == "CH"){
		currentRegions = china;
	} else {
		currentRegions = ["X:Please choose a country first"]
	}
	
	/*we need to remove any option tags that are currently in the regions dropdown before we can add new ones. first get all the optio tags ( but only inside the regions dropdown*/
	var opts = formy.rDrop.querySelectorAll("option");
	for (var o=0; o<opts.length; o++){
		opts[o].parentNode.removeChild(opts[o]);
	}
	
	for (var i=0; i<currentRegions.length; i++){
		//each region has 2 pieces of info, the value and name. we are going to use the code for the value attribute of our option tags, and the name as the text the user actualy sees. theses two values are always separated by a :
		
		//we use a function called split to seperate these two pieces on info and gets rid of the :
		//split creates a new array from that string
		
		var region = currentRegions[i].split(":");
		console.log(region[0]); //this is the value, not name
		
		//we can now use that info to create option tags for the dropdown menu
		
		var optTag = document.createElement("option");
		//add the code as the value attribute
		optTag.value = region[0];
		//add the region name as the text
		optTag.text = region[1];
		
		//put this new option tag into the regions dropdown menu )it has the name rDrop
		
		formy.rDrop.appendChild(optTag);
	}	
	

}