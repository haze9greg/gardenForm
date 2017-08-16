function trim( theString ){
	//Clear the leading spaces.
	while( theString.length> 0 && (theString.substr(0, 1) == " " || theString.substr(0,1) == "\t" || theString.substr(0,1) == "\r" || theString.substr(0,1) == "\n") ){
		theString = theString.substr(1);
		//At this point the string is equal to itself starting from the second character to the end.
	}
	
	//Clear the trailing spaces
	while( theString.length> 0 && (theString.substr(theString.length-1, 1) == " " || theString.substr(theString.length-1,1) == "\t" || theString.substr(theString.length-1,1) == "\r" || theString.substr(theString.length-1,1) == "\n") ){
		theString = theString.substr(0, theString.length-1);
		//At this point the string is equal to itself starting from the first character to one character before the end.
	}
	
	//It is now possible to send back the cleaned string.
	return theString;
}