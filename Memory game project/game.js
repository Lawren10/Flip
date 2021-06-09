// VARIABLES

const button = document.querySelector("#refresh");
const mainCard = document.querySelectorAll(".main-card");
const timeNum = document.querySelector('#time-num');
const flipNum = document.querySelector('#flip-num');
const resume = document.querySelector('#overlay-resume');
const victory = document.querySelector('#overlay-victory');
const resumeBtn = document.querySelector('#resume');
const gameOver = document.querySelector('#overlay-gameover');
const restartBtn = document.querySelector('#restart');
const progress = document.querySelector('#progress');


let timeVar = 100;
let flipVar = 0;
let scoreVar = 0;
let cardFlipped = false;
let hold = false;
let firstCard, secondCard;
let counting = false;

timeNum.innerHTML = timeVar;
 
// FUNCTIONS

const setFlip = ()=>{
    flipVar++;
    flipNum.innerHTML = flipVar;
}

const setScore = () =>{
    scoreVar+= 16.7;
 progress.style.width = `${scoreVar}%`
}

const resetFlip = () =>{
   flipVar = 0;
   flipNum.innerHTML = flipVar;
}

const resetScore = () =>{
 scoreVar = 0;

}

const resetTime = () => {
 timeVar = 100;
}

const shuffle = () => {
      mainCard.forEach( (cards, index, array) => {
      cards.classList.remove('flip');
      let randNum = Math.floor(Math.random() * array.length);
      cards.style.order = randNum;
      cards.addEventListener('click', flipCheck);
    })
}


const resetBoard = () => {
         [cardFlipped, hold] = [false, false];
         [firstCard, secondCard] = [ null, null];
     }

 const flipCheck = (e) => {

    if(hold) return;
     
     let theCard = e.currentTarget; 
     theCard.classList.add('flip');

     if(theCard === firstCard) return;
     

     if(!cardFlipped){
         cardFlipped = true;
         setFlip()
         firstCard = theCard;
         
     }else{
         cardFlipped = false;
         setFlip();
         secondCard = theCard;
         
         
        let firstCheck =  firstCard.childNodes[1].getAttribute('src');
        let secondCheck = secondCard.childNodes[1].getAttribute('src');

        if(firstCheck === secondCheck){

         firstCard.removeEventListener('click', flipCheck);
         secondCard.removeEventListener('click', flipCheck);
         setScore();
         resetBoard();

      }else{
          hold = true;
          setTimeout(() =>{
             firstCard.classList.remove('flip');
             secondCard.classList.remove('flip');
             resetBoard();
        },1000);

           
      }
        

     }
   
}

const countDown = () => {
 counting = setInterval(() => {
  timeVar--;
  timeNum.innerHTML = timeVar;
  if (timeVar === 0) {
   clearInterval(counting);
   gameOver.style.display= 'grid'
  }
  if (scoreVar >= 100) {
   clearInterval(counting);
   victory.style.display='grid'
  }
 }, 1000);
 
}


const restart = () => {
    clearInterval(counting);
    resetTime();
    resetFlip();
    resetScore();
    shuffle();
    countDown();
}

const start = () => {
 resume.style.display = 'none'
 restart();
};

const clearGameOver = () => {
 gameOver.style.display = 'none'
 restart();
 progress.style.width = '0%'
};

const clearVictory = () => {
 victory.style.display = 'none'
 restart();
 progress.style.width = '0%'
};


// EVENTS

mainCard.forEach( (card, index) =>{
    card.addEventListener('click', flipCheck)
})

button.addEventListener('click', start);

resumeBtn.addEventListener('click', clearVictory);

restartBtn.addEventListener('click', clearGameOver);