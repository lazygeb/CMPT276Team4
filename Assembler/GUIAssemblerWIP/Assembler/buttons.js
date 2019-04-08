//Handlers for all the buttons on the page: Mnemonics buttons & Manual button
//https://www.w3schools.com/howto/howto_js_tabs.asp is used for the open and close functions 

//Allows the tabs in the mnemonics to be open and closed
function openTab(evt, mnemonic) {
    if (document.getElementById(mnemonic).style.display == "inline-block") { 
        close(evt,mnemonic);
    } 
    else {
        open(evt,mnemonic);
    }
    
}

//Opens the tab
function open(evt, mnemonic) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(mnemonic).style.display = "inline-block";
    evt.currentTarget.className += " active";
}

//Closes the tab
function close(evt, mnemonic) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active","");
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(mnemonic).style.display = "none";
    evt.currentTarget.className += "";
}
//prints the mnemonic into the text box
function mnemButton(evt, mnemonic) {
    let text = document.getElementById("textBox").value;
    if (text != '') {
        text += '\n';
    }
    text += mnemonic;
    document.getElementById("textBox").value = text;
}

//hides all the assembler features when the disassembler option is chosen
function hideElements() {
	let scroll = document.getElementById("convertTypes");
	if (scroll.options[scroll.selectedIndex].value === "disem") {
		document.getElementById("mnemonicOptions").style.display = "none";
		document.getElementById("secondWrapper").style.display = "none";
	} else {
		document.getElementById("mnemonicOptions").style.display = "inline-block";
		document.getElementById("secondWrapper").style.display = "inline-block";
	}
}

//clears the text box
document.getElementById("clearButton").addEventListener("click", function(){
    let text = "";
    document.getElementById("textBox").value = text;
});

//opens up the manual
document.getElementById("manualButton").addEventListener("click", function(){
    if (document.getElementById("manualText").style.display == "inline-block") {
        document.getElementById("manualText").style.display = "none";
    }
    else {
        document.getElementById("manualText").style.display = "inline-block";
    }
    
});





