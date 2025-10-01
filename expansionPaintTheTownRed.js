// Paint the Town Red Expansion
// 01.10.2025

//Heroes

function blackCatPickpocket() {
if (playerDeck.length === 0 && playerDiscardPile.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
    return;
  }
    
if (playerDeck.length === 0 && playerDiscardPile.length > 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
topCardPlayerDeck.revealed = true;
const topCardPlayerDeckAttackAndRecruit = topCardPlayerDeck.attack + topCardPlayerDeck.recruit;

totalAttackPoints += topCardPlayerDeckAttackAndRecruit;
cumulativeAttackPoints += topCardPlayerDeckAttackAndRecruit;

onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. They have ${topCardPlayerDeck.attack} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> and ${topCardPlayerDeck.recruit} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">. You get +${topCardPlayerDeckAttackAndRecruit} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
updateGameBoard();
}

function blackCatCasualBankRobbery() {
hq4ReserveRecruit++;
onscreenConsole.log(`You gain 1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> usable only to recruit the Hero in the HQ Space under the Bank.`);
updateGameBoard();
}

function blackCatJinx() {
return new Promise((resolve) => {
        // Check if the player deck is empty and needs reshuffling
        if (playerDeck.length === 0) {
            if (playerDiscardPile.length > 0) {
                playerDeck = shuffle(playerDiscardPile);
                playerDiscardPile = [];
            } else {
                console.log("No cards available to be drawn.");
onscreenConsole.log("No cards available to be drawn.");
                resolve();
                return;
            }
        }

    const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

topCardPlayerDeck.revealed = true;

    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="bold-spans">${topCardPlayerDeck.name}</span>. Do you wish to discard or return to deck?`,
      "Discard",
      "Return to Deck"
    );

const cardImage = document.getElementById('hero-ability-may-card');
cardImage.style.display = 'block';
cardImage.src = topCardPlayerDeck.image;

const hoverText = document.getElementById('heroAbilityHoverText');
hoverText.style.display = 'none';

    confirmButton.onclick = async function() {
      playerDeck.pop();
      
      const { returned } = await checkDiscardForInvulnerability(topCardPlayerDeck);
                        if (returned.length) {
                        playerHand.push(...returned);
                        }

      console.log(`You discarded ${topCardPlayerDeck.name}.`);
onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been discarded.`);
     updateGameBoard();
      hideHeroAbilityMayPopup();
hoverText.style.display = 'block';
cardImage.style.display = 'none';
      resolve();
    };

    denyButton.onclick = function() {
      console.log(`You put ${topCardPlayerDeck.name} back on top of your deck.`);
onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`);
      updateGameBoard();
      hideHeroAbilityMayPopup();
hoverText.style.display = 'block';
cardImage.style.display = 'none';
      resolve();
    };
  });
}
}

function blackCatCasualCatBurglarNonEffect() {
onscreenConsole.log(`Special Ability not activated - "each other player" Hero effects do not apply in Solo play.`);
}

function blackCatCasualCatBurglar() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Spider Friends.svg" alt="Spider Friends Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`You've rescued ${bystandersRescuedThisTurn} Bystander${bystandersRescuedThisTurn = 1 ? '' : 's'} this turn. +${bystandersRescuedThisTurn} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> gained.`);

totalAttackPoints += bystandersRescuedThisTurn;
cumulativeAttackPoints += bystandersRescuedThisTurn;
updateGameBoard();
}

function moonKnight() {

}

function scarletSpider() {

}

function spiderWoman() {

}

function symbioteSpiderMan() {

}