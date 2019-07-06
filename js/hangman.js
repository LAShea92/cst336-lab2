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
    selectedWord = words[randomInt].toUpperCase();
}

function updateBoard(){
    $("#word").empty();  
    for(var letter of board){
        document.getElementById("word").innerHTML += letter + " ";
    }
}

function updateWord(positions, letter){
    for(var pos of positions){
        board[pos] = letter;
    }
  
    updateBoard();
}

$("letterBtn").click(function(){
    var boxVal = $("#letterbox").val();
    console.log("You pressed the button and it had the value: " + boxVal);
})

$(".letter").click(function(){
    checkLetter($(this).attr("id"));
});

$(".replayBtn").on("click", function(){
    location.reload();
});

function createLetters() {
    for (var letter of alphabet){
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

function updateMan(){
    $("hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win){
    $("#letters").hide();
  
    if(win){
        $('#won').show();
    }
    else{
        $('#lost').show();
    }
}

function checkLetter(letter){
    var positions = new Array();
  
    for(var i = 0; i < selectedWord.length; i++){
        console.log(selectedWord)
        if(letter == selectedWord[i]){
            positions.push(i);
        }
    }
  
    if(positions.length > 0){
        updateWord(positions, letter);
      
        if(!board.includes('_')){
            endGame(true);
        }
    }
    else{
        remainingGuesses -= 1;
        updateMan();
    }
  
    if(remainingGuesses <= 0){
        endGame(false);
    }
}