//Globals
var list = [];
var counter = 0;
var chars = "";
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var nums = "1234567890";
var punctuation = "!$%&*()-+!?_";
var both = nums + punctuation;
var exclude = "";


function genPasswd(length){
var mychars = document.getElementById("mychars").value;
var chars = lowercase + uppercase + mychars;
var length= document.getElementById("length").value;
var special = document.getElementById("special");
var digits = document.getElementById("digits");
var always = document.getElementById("always");
var pass = "";
if (special.checked){chars += punctuation;};
if (digits.checked){chars += nums;};
var j = Math.floor(Math.random() * both.length);
var splice = both.charAt(j);
console.log(splice);
for (var x = 0; x < length; x++) {
    
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
    
    }
    console.log(pass);
    pass = pass.replace(pass.charAt(pass.length/2),splice);
    console.log(pass);
    return pass;

}



function mxPasswd(){
var check = 0;
for (var x = 0; x < list.length; x++) {
    var word = list[x];
    
    for (var i = 0; i < word.length; i++){
    
        var hit = both.search(word.charAt(i));
        if (hit>=0){console.log(hit)};
        //if (word.charAt(i)!= both.charAt(i))
        console.log(word.charAt(i));
        for (var z=0; z < both.length; z++){
        if (both.charAt(z)==word.charAt(i)){
        console.log("hit");
        };
        
        }
        
        }
    
    }
    
    
}
function genList(){

var amount = document.getElementById("amount").value;
amount = parseInt(amount);
amount = amount + counter;
for (var y = counter; y < amount; y++){
list.push(genPasswd());
document.getElementById("passwd").innerHTML += list[y] + "\n";
counter++;
}
console.log(list);
console.log(amount);
return list;

}

function writeStorage(){
var amount = document.getElementById("amount").value;
for (var a = 0; a < amount; a++){
console.log(sessionStorage.getItem("password"+a));
list.push(sessionStorage.getItem("password"+a));
}

fLen = list.length;
text = " ";
for (i = 0; i < fLen; i++) {
text += " " + list[i] + " ";

}
return text;
}

function crList(){
document.getElementById("length").value = 8;
document.getElementById("passwd").innerHTML = "";
counter = 0;
for (var z = list.length -1; z >= 0; --z){
list.pop();
console.log(list);
}

}

function genChars(e){
console.log(e);



}

function saveTextAsFile()
{
var textToWrite = "";

if (list.length == 0){
console.log("empty");
textToWrite = genList();
}else {for (var z = 0; z < list.length; z++){
textToWrite += list[z] + "\r" + "\n";
}};

var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
if (window.URL != null)
{
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
}
else
{
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
downloadLink.onclick = destroyClickedElement;
downloadLink.style.display = "none";
document.body.appendChild(downloadLink);
}

downloadLink.click();
}

document.getElementById("digits").addEventListener("click", function(e){
genChars(e);
});

document.getElementById("gen").addEventListener("click", function(){
genList();
});

document.getElementById("clr").addEventListener("click", function(){
crList();
});

document.getElementById("sav").addEventListener("click", function(){
saveTextAsFile();
});

document.getElementById("ver").addEventListener("click", function(){
mxPasswd();
});
