// VARIABLES
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{ word: "snake", hint: "It's a reptile"},
             { word: "monkey", hint: "It's a mammal"},
             { word: "beetle", hint: "It's an insect"}];
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
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function updateBoard(){
    $("#word").empty();  
    for(var i = 0; i < board.length; i++){
        $("#word").append(board[i] + " ");
    }
  
    $("#word").append("<br />");
    $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
}

function updateWord(positions, letter){
    for(var pos of positions){
        board[pos] = letter;
    }
  
    updateBoard();
}

function disableButton(btn){
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}

$("letterBtn").click(function(){
    var boxVal = $("#letterbox").val();
    console.log("You pressed the button and it had the value: " + boxVal);
})

$(".replayBtn").on("click", function(){
    location.reload();
});

$(".hintBtn").on("click", function(){
    showHint();
});

$(".letter").click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
})

function createLetters() {
    for (var letter of alphabet){
        $("#letters").append("<button class='btn btn-success letter' id='" + letter + "'>" + letter + "</button>");
    }
}

function updateMan(){
    remainingGuesses -= 1;
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
    console.log(remainingGuesses);
}

function showHint(){
    $("#word").append("<br />");
    $("#hint").append("<span class='hint'>Hint: " + selectedHint + "</span>");
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
        updateMan();
    }
  
    if(remainingGuesses <= 0){
        endGame(false);
    }
}