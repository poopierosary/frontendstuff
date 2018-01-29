let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

const deck = document.getElementById("card-deck");

let plays = 0;
let counter = document.querySelector(".plays");

const stars = document.querySelectorAll(".fa-star");

let cardMachted = document.getElementsByClassName("match");

let starList = document.querySelectorAll(".stars li");

let closeicon = document.querySelector(".close");

let modal = document.getElementById("popup-info");

var openCard = [];

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !=0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

document.body.onload = startGame();

function startGame() {
	cards = shuffle(cards);

	for (var i = 0; i < cards.length; i++){
		deck.innerHTML = "";
		[].forEach.call(cards, function(item){
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}

	plays = 0;
	counter.innerHTML = plays;
	for (var i=0; i < stars.length; i++){
		stars[i].style.color = "#FFD700";
		stars[i].style.visibility = "visibile";
	}

	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
}

var displayCard = function(){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
};

function cardOpen() {
	openCard.push(this);
	var len = openCard.length;
	if(len === 2){
		moveCounter();
		if (openCard[0].type === openCard[1].type){
			match();
		} else {
			unmatched();
		}
	}
};

function match(){
	openCard[0].classList.add("match", "disabled");
	openCard[1].classList.add("match", "disabled");
	openCard[0].classList.remove("show","open", "no-event");
	openCard[1].classList.remove("show","open", "no-event");
	openCard = [];
}

function unmatched() {
	openCard[0].classList.add("unmatched");
	openCard[1].classList.add("unmatched");
	disabled();
	setTimeout(function() {
		openCard[0].classList.remove("show", "open", "no-event", "unmatched");
		openCard[1].classList.remove("show", "open", "no-event", "unmatched");
		enable();
		openCard = [];
	}, 1100);
}

function disabled(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.add('disabled');
	});
}

function enable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.remove('disabled');
		for(var i = 0; i < cardMachted.length; i++){
			cardMachted[i].classList.add("disabled");
		}
	});
}


function moveCounter(){
	plays++;
	counter.innerHTML = plays;
	if(plays == 1){
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
	}
	if (plays > 8 && plays < 12) {
		for ( i=0; i<3; i++){
			if(i > 1){
				stars[i].style.visibility = "collapse";
			}
		}
	}
	else if (plays > 13){
		for (i=0; i < 3; i++){
			if(i >0){
				stars[i].style.visibility = "collapse";
			}
		}
	}
}

var second = 0; minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute+"mins "+second+"secs";
		second++;
		if(second == 60){
			minute++;
			second=0;
		}
		if(minute == 60){
			hour++;
			minute = 0;
		}
	}, 1000);
}


function congrats(){
	if (cardMachted.length == 16){
		clearInterval(interval);
		finalTime = timer.innerHTML;

		modal.classList.add("show");

		var starRating = document.querySelector(".stars").innerHTML;

		document.getElementById("finalMove").innerHTML = plays;
		document.getElementById("starRating").innerHTML = starRating;
		document.getElementById("totalTime").innerHTML = finalTime;

		closeModal();
	};
}

function closeModal(){
	closeicon.addEventListener("click", function(e){
		modal.classList.remove("show");
		startGame();
	});
}

function playAgain(){
	modal.classList.remove("show");
	startGame();
}

for (var i=0; i < cards.length; i++){
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", congrats);
};