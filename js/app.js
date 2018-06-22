let allCards = document.querySelector('.card');
let deck = document.querySelector('.deck');
let moves = document.getElementsByClassName('.card');
let countMoves = 0;
let seconds = 0;
let minutes = 0;
let timer;
let timeItTook;
let lock;
let clickedCards;


function shuffle(){
  for (let i = deck.children.length; i>=0; i--){
  deck.appendChild(deck.children[Math.random() * i | 0]);
  }
}
shuffle();
// Shuffle function from https://stackoverflow.com/a/11972692
//Shuffles cards when the game is started and restarted


document.querySelectorAll('.card').forEach(function (card) {
  card.addEventListener('click', clickCard);
});

let resetChar = document.querySelector('.restart');
resetChar.addEventListener('click', resetButton);

function resetButton(){
  document.querySelectorAll('.card').forEach(function (card) {
    card.classList.remove('open', 'show', 'match')
  });
  shuffle();
  countMoves = 0;
  displayMoves();
  stopTimer();
  displayTimer();
  resetStars();
  document.getElementById('alert').style.display = 'none';
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', clickCard);
  });
};

// resets the game


function clickCard(event) {

  if (!lock) {

    ++countMoves;
    event.target.className += ' open show';
  }

  // lock = true;


  if (countMoves === 1) {
    goTimer();
  }

  displayMoves ();
  starSystem();

clickedCards = document.querySelectorAll('.open');

  if(clickedCards.length === 2) {

    if(clickedCards[0].firstElementChild.getAttribute('id')===clickedCards[1].firstElementChild.getAttribute('id')) {

      clickedCards[0].classList.remove('open');
      clickedCards[1].classList.remove('open');

      clickedCards[0].classList.add('match');
      clickedCards[1].classList.add('match');

      clickedCards[0].removeEventListener('click', clickCard);
      clickedCards[1].removeEventListener('click', clickCard);
      let matchSound = new Audio('../fend-project-memory-game-master/assets/sounds/323436__yugi16dm__wow1.mp3')
      matchSound.play();//sounds from: https://freesound.org/
    }
    else {
      function flipBack(){
        clickedCards[0].classList.remove('open','show');
        clickedCards[1].classList.remove('open','show');
        lock = false;
        let openSound = new Audio('../fend-project-memory-game-master/assets/sounds/johnnypanic.mp3')
        openSound.play();//sounds from: https://freesound.org/
      }
      lock = true;
      setTimeout(flipBack, 400);
    }

  }

  let matchedCards = document.querySelectorAll('.match');
  let starRating = document.querySelector('.stars').innerHTML;
  timeItTook = document.querySelector('#timer').innerHTML;
  let yourMoves = document.querySelector('.moves').innerHTML;
  let button = document.querySelector('.button');

  if(matchedCards.length===16 || true){
    function popUp(){
      document.getElementById('alert').style.display = 'block';
      document.querySelector('.score').innerHTML = 'A win! It took you ' + yourMoves + ' moves ^_^\n';
      document.querySelector('.rating').innerHTML = 'Star rating:' + starRating;
      document.querySelector('.time').innerHTML = 'Time:'+ timeItTook;

      button.innerHTML = 'Play again?';
      button.addEventListener('click', function(){document.getElementById('alert').style.display = 'none';})
      button.addEventListener('click', resetButton);
    }

    stopTimer();

    setTimeout(function(){
      popUp();
      let winSound = new Audio('../fend-project-memory-game-master/assets/sounds/188039_antumdeluge_bicycle-horn.mp3')
      winSound.play();//sounds from: https://freesound.org/
    },500);

      }
    }
//TODO IEVA if a card has class 'match'- removeEventListener('click'; clickCard)





//counts moves and puts them in the html doc;
//click counter help from: https://codepen.io/juliogcampos/pen/BzdjwY

function displayMoves (){
  document.querySelector('.moves').innerHTML = countMoves;
}


//opens cards when clicked;

//compares two clicked cards; if they match compares strings;
//removes class 'open', adds class 'matched';
//if two cards have the class 'open' and they do not match, removes class 'open' and 'show' after one second


let starNodeList = document.getElementsByClassName('fa-star');
let stars = Array.from(starNodeList);
function starSystem(){
  if(countMoves >= 5){
  stars[4].classList.remove('fa-star');
  }
  if(countMoves >=10){
    stars[3].classList.remove('fa-star');
  }
  if(countMoves >=15){
    stars[2].classList.remove('fa-star');
  }
  if (countMoves >=25) {
    stars[1].classList.remove('fa-star');
  }
  if (countMoves >35) {
    stars[0].classList.remove('fa-star');
    stars[0].classList.add('fa-star-half');
  }
};

function resetStars(){
  stars.forEach(function(star){
    star.classList.add('fa-star')
    star.classList.remove('fa-star-half');
  });
}
///

//removes stars according to countMoves


function goTimer() {
  timer = setInterval(function() {
    seconds++;
    if (seconds >= 60) {
      minutes++;
      seconds = 0;
    }
    displayTimer();
  }, 1000);
}


function stopTimer(){
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
}

function displayTimer() {
  let pseudoSec = seconds;
  let pseudoMin = minutes;
  if(seconds<10) {
    pseudoSec = '0' +  seconds;
  }
  if(minutes<10) {
    pseudoMin = '0'+ minutes;
  }
  document.querySelector('#timer').innerHTML = pseudoMin + ":" + pseudoSec;
}
//

//timer help from: https://gwgnanodegrees.slack.com/files/UA8PXHUR3/FB0Q3CSMB/Getting_the_Memory_Game_timer_to_work
