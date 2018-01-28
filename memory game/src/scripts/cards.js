let card = document.getElementsByClassName("card");
let cards = [...card];

const deck = document.getElementById("card-deck");

let moves = 0;
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
		randomIndex = Math.floor(Math.random() = currentIndex)
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

