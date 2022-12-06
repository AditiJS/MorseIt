var table = {
    "A": ".-",
    "K": "-.-",
    "U": "..-",
    "5": ".....",
    ",": "--..--", 
    "$": "...-..-",
    "B": "-...",
    "L": ".-..",
    "V": "...-",
    "6": "-....",
    "?": "..--..",
    " ": "*",
    "C": "-.-.",
    "M": "--",
    "W": ".--",
    "7": "--...",
    "(": "-.--.",
    "D": "-..",
    "N": "-.",
    "X": "-..-",
    "8": "---..",
    ")": "-.--.-",
    "E": ".",
    "O": "---",
    "Y": "-.--",
    "9": "----.",
    "-": "-....-",
    "F": "..-.",
    "P": ".--.",
    "Z": "--..",
    "0": "-----",
    "\"": ".-..-.",
    "G": "--.",
    "Q": "--.-",
    "1": ".----",
    "/": "-..-.",
    "_": "..--.-",
    "H": "....",
    "R": ".-.",
    "2": "..---",
    "+": ".-.-.",
    "'": ".----.",
    "I": "..",
    "S": "...",
    "3": "...--",
    "=": "-...-",
    ":": "---...",
    "J": ".---",
    "T": "-",
    "4": "....-",
    ".": ".-.-.-",
    ";": "-.-.-."
};

function showENoteField() {
    if(document.getElementById("text").value.length==0){
        document.getElementById("noteDecode").style.display = "none";
        document.getElementById("noteEncode").style.display = "none";
        document.getElementById("emptyIp").style.display = "block";
    }
    else{
    document.getElementById("noteDecode").style.display = "none";
    document.getElementById("noteEncode").style.display = "block";
    document.getElementById("emptyIp").style.display = "none";
    }
}

function showDNoteField(){
    if(document.getElementById("morse").value.length==0){
        document.getElementById("noteDecode").style.display = "none";
        document.getElementById("noteEncode").style.display = "none";
        document.getElementById("emptyIp").style.display = "block";
    }
    else{
    document.getElementById("noteDecode").style.display = "block";
    document.getElementById("noteEncode").style.display = "none";
    document.getElementById("emptyIp").style.display = "none";
    }
}

// encode
function go() {
    var output = ""; //variable for output string
    var input = document.forms[0].STRING.value.toUpperCase();
    // storing user input in input variable

    //converting character by character according to dictionary
    for (var i = 0; i < input.length; i++) {
        var temp = table[input.charAt(i)];
        if (temp) {
            // we cannot assign
            if ("*" == temp) {
                temp = " ";
            }
            output += temp + " ";
        } else output += "  ";
    }

    document.forms[0].MORSECODE.value = output;
}

// decode
function ungo() {
    var output = "";

   // `/   /g` find all the occurrences of the pattern instead of stopping after the first match
    var input = document.forms[0].MORSECODE.value.replace(/   /g, " * ").split(" ");
    console.log(input);

// match character in input string with value in table and if value matches add its key to output string
    for (var ix = 0; ix < input.length; ix++) {
        for (var key in table) {
            if (table[key] == input[ix]) {
                console.log(input[ix]+" "+table[key]+" "+key);
                output += key;
                break;
            }
        }
    }

    // returns output
    document.forms[0].STRING.value = output;
}

// managing and playing all sounds - web audio API
var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var dot = 1.2 / 15;

document.getElementById("play").onclick = function() {
    var t = ctx.currentTime;

    var oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 600;

    var gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, t);

    document.getElementById('morse').value.split("").forEach(function(letter) {
        switch (letter) {
            case ".":
                gainNode.gain.setValueAtTime(1, t);
                t += dot;
                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;

            case "-":
                gainNode.gain.setValueAtTime(1, t);
                t += 3 * dot;
                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;

            case " ":

                t += 7 * dot;
                break;
        }
    });

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();

    // return false;
}