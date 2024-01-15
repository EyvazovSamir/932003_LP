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
//console.log(list);

//generates the password
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
//if (always.checked){};
//console.log(chars);	
var j = Math.floor(Math.random() * both.length);
var splice = both.charAt(j);
console.log(splice);
for (var x = 0; x < length; x++) {
    
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
    
    }
    console.log(pass);
    //here i replace the middle char with a random special character
    pass = pass.replace(pass.charAt(pass.length/2),splice);
    console.log(pass);
    return pass;

}



function mxPasswd(){
var check = 0;
//console.log(list[0]);
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
        
        //console.log(both.charAt(z));
        }
        
        //console.log(hit);
        //console.log(check);
        }
    
    }
    
    
}
//generates a list array from the genPasswd function and prints it to document
//returns the array list[an array of passwords]
function genList(){

var amount = document.getElementById("amount").value;
//amount + counter knows how many times function has run to keep track of passwords and add to the end of the existing list
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

//function to write to sessions storage
//dont need this now, can write to an array in the genList function instead
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

//my reset clear function
function crList(){
document.getElementById("length").value = 8;
document.getElementById("passwd").innerHTML = "";
counter = 0;
//backwards loop to clear array
for (var z = list.length -1; z >= 0; --z){
list.pop();
console.log(list);
}

}

function genChars(e){
console.log(e);
//chars += this;



}

function saveTextAsFile()
{
var textToWrite = "";
//var textToWrite = document.getElementById("passwd").innerHTML;

//if list is empty run genlist
//else loop through list and write that text
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
// Chrome allows the link to be clicked
// without actually adding it to the DOM.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
}
else
{
// Firefox requires the link to be added to the DOM
// before it can be clicked.
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
