const images = [
    "bild1.png", "bild2.png", "bild3.png", "bild4.png",
    "bild5.png", "bild6.png", "bild7.png", "bild8.png"
];
const cards = [...images, ...images];
cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("game-board");
let firstCard = null, secondCard = null, lockBoard = false, matchedPairs = 0;

cards.forEach((imgSrc, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = imgSrc;
    card.innerHTML = `<img src="${imgSrc}" alt="Memory Bild">`;
    
    card.addEventListener("click", () => revealCard(card));
    gameBoard.appendChild(card);
});

function revealCard(card) {
    if (lockBoard || card.classList.contains("matched")) return;

    const img = card.querySelector("img");
    img.style.display = "block";

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;

        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === 8) {
            setTimeout(() => alert("Herzlichen Glückwunsch! Du hast alle Paare gefunden!"), 500);
        }
    } else {
        firstCard.querySelector("img").style.display = "none";
        secondCard.querySelector("img").style.display = "none";
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}