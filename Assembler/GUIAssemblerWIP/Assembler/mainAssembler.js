//Has all the handlers for converting the text file

//Converter section
let inputElement = document.getElementById("myFile");
inputElement.addEventListener("change", handleFiles, false);
let dissembledFile = undefined;
let assembledFile = undefined;

//Gets the file and converts it
function handleFiles() {
    file = this.files[0];
    
    let reader = new FileReader();
    let result;
    let lines;
    dissembledFile = undefined;
    assembledFile = undefined;
    reader.onload = function(event) {
        result = reader.result; //result = contents of file
        lines = this.result.split('\n');
        if (document.getElementById("convertTypes").value === "assem"){
            assembledFile = assemblerMain(lines);
        }
        else {
            //dissemble
            dissembledFile = dissemblerMain(lines);
        }
    };
    reader.readAsText(file);
}

//File is only downloaded if convert file is clicked
document.getElementById("submitFile").addEventListener("click", function(){
    if (dissembledFile != undefined) {
        download("assemblyProgram.txt",dissembledFile);
    } 
    else if (assembledFile != undefined) {
        download("program.txt",assembledFile);
    }
});

//Downloads the converted file from the text box
document.getElementById("textConvertButton").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("textBox").value;
    lines = text.split('\n');
    download("program.txt",assemblerMain(lines));
}, false);

let txtFileElement = document.getElementById("loadFile");
txtFileElement.addEventListener("change", loadTxt, false);

//Loads up any text files into the text box
function loadTxt() {
    file = this.files[0];
    
    let reader = new FileReader();
    let result;
    let text = "";
    reader.onload = function(event) {
        text += reader.result; //result = contents of file
        console.log(text);
        document.getElementById("textBox").value = text;
    };
    reader.readAsText(file, 'UTF-8')
}



