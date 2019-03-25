

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
        // lines.forEach(function(line) {
        //     console.log("line: " + line);
    
        // });

        assemblerMain(lines);
        
    };
    reader.readAsText(file);
    console.log(file);

   // assemblerMain(file);
}
// Start file download.
document.getElementById("textConvertButton").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("textBox").value;
    var filename = "hello.txt";
    
    download(filename, text);
}, false);