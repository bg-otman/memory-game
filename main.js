const mainContainer = document.querySelector(".main-container");

const cards = Array.from(document.querySelectorAll(".card"));

let wrongTries = 0;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

function shuffleCards() {
  const shuffledCards = shuffleArray(cards);
  for (let i = 0; i < shuffledCards.length; i++) {
    mainContainer.appendChild(shuffledCards[i]);
  }
}
shuffleCards();

let choiseOne = "";
let choiseTwo = "";

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("rotate")) {
      card.classList.add("rotate");

      let dataAttribute = card.dataset.picture;

      if (!choiseOne) {
        choiseOne = dataAttribute;
      } else {
        choiseTwo = dataAttribute;

        isSameCard();
      }
    }
  });
});

function removeRotate(arr) {
  arr.forEach((e) => {
    e.classList.remove("rotate");
  });
}
function removeFixedRotate(arr) {
  arr.forEach((e) => {
    e.classList.remove("stay-rotate");
  });
}

function addFixedRotate(cards) {
  cards.forEach((card) => {
    if (card.classList.contains("rotate")) {
      choiseOne = "";
      choiseTwo = "";
      card.classList.add("stay-rotate");
    }
  });
}

let goodTries = 0;

function isSameCard() {
  if (choiseOne === choiseTwo) {
    addFixedRotate(cards);
    goodTries += 1;
    isSoundMuted("win-audio");
    gameWin();
  } else {
    choiseOne = "";
    choiseTwo = "";

    setTimeout(() => {
      removeRotate(cards);
      wrongTriesCount();
    }, 1000);
  }
}

function gameWin() {
  if (goodTries === 10) {
    document.querySelector(".win-popup").style.display = "flex";
    goodTries = 0;

    setTimeout(() => {
      removeFixedRotate(cards);
      removeRotate(cards);
    }, 1000);
  }
}

function tryAgain() {
  document.querySelector(".lost-popup").style.display = "none";
  wrongTries = 0;
  goodTries = 0;
  document.querySelector(".wrong-tries span").innerHTML = wrongTries;

  removeFixedRotate(cards);
  removeRotate(cards);
  shuffleCards();

  setTimeout(() => {
    showCard(cards);
  }, 600);
}
document.querySelector(".try-again").addEventListener("click", () => {
  tryAgain();
});

function wrongTriesCount() {
  wrongTries += 1;
  document.querySelector(".wrong-tries span").innerHTML = wrongTries;
  isSoundMuted("fail-audio");
  if (wrongTries === 10) {
    cards.forEach((e) => {
      e.classList.add("rotate");
    });
    document.querySelector(".lost-popup").style.display = "flex";
  }
}

function showCard(arr) {
  arr.forEach((e) => {
    e.classList.add("rotate");
  });

  setTimeout(() => {
    arr.forEach((e) => {
      e.classList.remove("rotate");
      e.classList.remove("stay-rotate");
    });
  }, 1000);
}

document.querySelector(".start-popup button").addEventListener("click", () => {
  document.querySelector(".start-popup").style.display = "none";
  showCard(cards);
});

document.querySelector(".win-popup button").addEventListener("click", () => {
  document.querySelector(".win-popup").style.display = "none";
  tryAgain();
});

// sound
document.querySelector(".sound").addEventListener("click", function () {
  this.classList.toggle("sound-mute");
  if (this.classList.contains("sound-mute")) {
    document
      .querySelector(".sound img")
      .setAttribute("src", "memory-images/mute.png");
  } else {
    document
      .querySelector(".sound img")
      .setAttribute("src", "memory-images/volume.png");
  }
});

function isSoundMuted(audio) {
  let soundPlay = document.querySelector(`.${audio}`);

  document.querySelector(".sound").classList.contains("sound-mute")
    ? soundPlay
    : soundPlay.play();
}
