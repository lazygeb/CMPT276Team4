
let inputElement = document.getElementById("myFile");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
    file = this.files[0];
    console.log("main");
    
    let reader = new FileReader();
    let result;
    let lines;
    reader.onload = function(event) {
        result = reader.result; //result = contents of file
        lines = this.result.split('\n');
        if (document.getElementById('convertTypes').selectedOptions[0].text){
            assemblerMain(lines);
        }
        else {
            //dissemble
        }
    
    };
    reader.readAsText(file);
}
// Start file download.
document.getElementById("textConvertButton").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("textBox").value;
    lines = text.split('\n');
    assemblerMain(lines);
}, false);

let txtFileElement = document.getElementById("loadFile");
txtFileElement.addEventListener("change", loadTxt, false);

function loadTxt() {
    file = this.files[0];
    
    let reader = new FileReader();
    let result;
    let text = "";
    reader.onload = function(event) {
        text += reader.result; //result = contents of file
        console.log(text);
        document.getElementById("textBox").value = text;
    }
    reader.readAsText(file, 'UTF-8')

    
   // });
}



