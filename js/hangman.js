// VARIABLES
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = ["snake", "monkey", "beetle"];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//LISTENERS
window.onload = startGame();

//FUNCTIONS
function startGame(){
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
}

function initBoard(){
    for (var letter in selectedWord){
        board.push("_");
    }
}

function pickWord(){
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt];
}

function updateBoard(){
    for(var letter of board){
        document.getElementById("word").innerHTML += letter + " ";
    }
}

$("letterBtn").click(function(){
    var boxVal = $("#letterbox").val();
    console.log("You pressed the button and it had the value: " + boxVal);
})

function createLetters() {
    for (var letter of alphabet){
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}