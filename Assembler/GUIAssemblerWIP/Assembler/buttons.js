function openTab(evt, mnemonic) {
    console.log(document.getElementById(mnemonic).style.display);
    if (document.getElementById(mnemonic).style.display == "block") { 
        close(evt,mnemonic);
    } 
    else {
        open(evt,mnemonic);
    }
    
}

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
    document.getElementById(mnemonic).style.display = "block";
    evt.currentTarget.className += " active";
}

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

function mnemButton(evt, mnemonic) {
    //document.getElementById(mnemonic).addEventListener("click", function(){
    console.log(mnemonic.toString())
    var text = document.getElementById("textBox").value;
    if (text != '') {
        text += '\n';
    }
    text += mnemonic;
    document.getElementById("textBox").value = text;
   // });
}





