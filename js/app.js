// Matching Game javascript code


 //Creating a list to hold all the cards
 var cards = ["fa-diamond","fa-diamond",
 						"fa-paper-plane-o" , "fa-paper-plane-o",
 						"fa-anchor", "fa-anchor",
 						"fa-bolt" , "fa-bolt",
 						"fa-cube" , "fa-cube" ,
 						"fa-leaf" , "fa-leaf",
 						"fa-bicycle", "fa-bicycle",
 						"fa-bomb" , "fa-bomb" ,
 						];


 // Function to generate all cards dynamically with type
 function generateCard(card){
 		return `<li class="card" type = "${card}"><i class="fa ${card}"></i></li>`
 }



//var to display star rating
var stars = document.getElementsByClassName("fa-star");

// declaring move varible
var moves = 0;

//Creating a local storage
var minMoves = 0;
localStorage.setItem("minMoves",1000);


// declaring an list to hold all matched cards
var matchedcard = []

//Declaring a model variable to diplay after the completion of the game
var modal = document.querySelector(".modal");

//Declaring the close button from model box to close the model box
var closeButton = document.querySelector(".close-button");

//playing again onclick
var playAgain = document.querySelector("#play-again");

//Reset button to restart game
var resetbutton  = document.querySelector(".restart");

// Declaring opencard variable to hold open cards
var opencard =[];

// On loading the page game should restart
document.body.onload = startGame();



// Start game function
function startGame(){
moves = 0;
document.querySelector(".moves").innerHTML = moves;
var deck = document.querySelector('.deck');
//Creating deck of all cards using generatecard function
var cardhtml = shuffle(cards).map(function(card){
		return generateCard(card);

});
deck.innerHTML = cardhtml.join('');

//Initializing moves , timer and stars
moves = 0;
document.querySelector(".moves").innerHTML = moves;
stars[0].style.visibility = "visible";
stars[1].style.visibility = "visible";
stars[2].style.visibility = "visible";

//for (var i = 0; i < stars.length; i++) {
  //  stars[i].style.color = "FFD700";
    //stars[i].style.visibility = "visible";
    //}
        //timer is set to 0
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector("#timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval)
//Calling click event function to add click event to OpenedCards
		click_event();
}


// Creating event listeners for all the cards in the Array
function click_event(){
		var allcards = document.querySelectorAll(".card");
		opencard = [];
	  for (let i of allcards){
	  i.addEventListener("click", displayCard);
	  i.addEventListener("click",openCard);
	  i.addEventListener("click",openModal);
	  }
}


//Display card function to display cards on click event
function displayCard(){
	this.classList.add("open","show","disabled");
}


// Open cards on click event to check if they matches or not
function openCard(){
	opencard.push(this);
	if (opencard.length===2){
		//Increse the move counter after opening two cards
  		moveCounter();
			//Check if both cards are same
  		if(opencard[0].type === opencard[1].type){
			//If same call match function
      match();
      }
      else{
			//If not same call nomatch function
      nomatch();
      }
   }
}


// Match function to match two cards and add them to matchedcard list
function match(){
			//If cards matches add match class to classList
		  opencard[0].classList.add("match");
      opencard[1].classList.add("match");
			//append matched cards to matchedcardlist
      matchedcard.push(opencard[0]);
      matchedcard.push(opencard[1]);
			//Remove all other classes
      opencard[0].classList.remove("open", "show", "disabled");
      opencard[1].classList.remove("open", "show", "disabled");
      opencard= []
}



// Nomatch function to remove all classes from cards which are not matched
function nomatch(){
			//If cards does not matche add nomatch class to classList
		  opencard[0].classList.add("nomatch");
      opencard[1].classList.add("nomatch");
      opencard[0].disabled = true;
      opencard[1].disabled = true;
			//Timeout function to hide cards after 0.8 sec
      setTimeout(function(){
      for (let j of opencard){
      j.disabled = true;
			//Remove all other classess
			j.classList.remove("open", "show", "nomatch", "disabled")
			}
      opencard=[]
		},800);
}

// moveCounter function to increment the moves
function moveCounter(){
	moves += 1;
	  document.querySelector(".moves").innerHTML = moves;
		//Start timer on 1st move
	if(moves===1){
		setTimer();
	}
	//After each move check start rating by calling starRating
  starRating();
}


//Function to display star rating
function starRating(){
	if (moves <= 15) {
        // 3 stars - do nothing
    } else if (moves <= 20) {
        // 2 stars
				//visibility: hidden
       stars[2].style.visibility= "collapse";
    } else {
        // 1 star
        stars[1].style.visibility = "collapse";
        stars[2].style.visibility = "collapse";
    }
}



// setTimer function to start the Timer
var time = document.getElementById("timer");
var interval
function setTimer(){
  var minute = 0;
  var second = 0;
  interval = setInterval(function(){
     second +=1;
     if(second===60){
       minute+=1;
       second = 0;
     }
     timer.innerHTML = minute + ' min' + " " + second +' sec';
   }, 1000);
}



// openModel to display congratulation after completion of game
var totaltime ;
function openModal(){
  if (matchedcard.length===16) {
	 totaltime = timer.innerHTML;
   clearInterval(interval);
	 //To display add show-modal class to classList
    modal.classList.add("show-modal");
		if (moves < parseInt(localStorage.getItem("minMoves"))) {
			//localStorage.setItem("time", totaltime);
		  localStorage.setItem("minMoves", moves);
		}
		var HighScore = localStorage.getItem("minMoves");
		//var time = localStorage.getItem("time");
    var starRating = document.querySelector(".stars").innerHTML;
		document.getElementById("highscore").innerHTML = HighScore;
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = totaltime;
	//	document.querySelector(".totalTime1").innerHTML = time;
    document.getElementById("star-rating").innerHTML = starRating;
		matchedcard = [];
  }
}


// Event listener to close button to close the model box
closeButton.addEventListener("click",playAgain1);
playAgain.addEventListener("click",playAgain1);
resetbutton.addEventListener("click",playAgain1);

//Fucntion to reset the game
function playAgain1(){
  modal.classList.remove("show-modal");
  startGame();
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
