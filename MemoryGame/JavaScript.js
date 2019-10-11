const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var cnt = 1;
var numberToLost = 50;
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // קליק ראשון
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // קליק שני
  secondCard = this;

  checkForMatch();
}
//בדיקה אם מתאימים
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch){
    disableCards();
  }else{
    if(numberToLost==0){
      alert("You Are Lost, You Tried :"+--cnt)
    }else{
      numberToLost--;
    }
    console.log("The number of times you have tried: "+cnt++);
    unflipCards();
  }
  //isMatch ? disableCards() : unflipCards();
}

function disableCards() {//המתנה לסגירת הקלפים אם לא מתאים
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
//המתנה של קלף ראשון לקלף שני
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//סידור קלפים רנדומאלי
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 32);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));