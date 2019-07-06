var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = ["snake", "monkey", "beetle"];

console.log(words[0]);

var randomInt = Math.floor(Math.random() * words.length);
selectedWord = words[randomInt];

function initBoard(){
    for (var letter in selectedWord){
        board.push("_");
    }
}
initBoard();
for(var letter of board){
    document.getElementById("word").innerHTML += letter + "";
}