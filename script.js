const gameContainer = document.getElementById("game");
var card1 = null;
var card2 = null;
var noClicking = false;
var cardsFlipped = 0

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) {
    return;
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (card1 == null && card2 == null) {
    card1 = event.target
    card1.style.backgroundColor = card1.classList[0]
  } else if (card1 != null && card2 == null) {
    noClicking = true;
    card2 = event.target
    card2.style.backgroundColor = card2.classList[0]
    setTimeout(() => {
      if (card1.classList[0] == card2.classList[0]) { // we have a pair
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        cardsFlipped += 2;
      } else { // cards don't match
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
      }
      card1 = null
      card2 = null
      noClicking = false;
      if (cardsFlipped == COLORS.length) {
        alert("Congratulations! You won.")
      }
    }, 1000);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
