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

function moonKnightClimbingClaws() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`You get +1 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);

totalRecruitPoints += 1;
cumulativeRecruitPoints += 1;
updateGameBoard();
}

function moonKnightCrescentMoonDarts() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.class1 === "Instinct" || topCardPlayerDeck.class2 === "Instinct" || topCardPlayerDeck.class3 === "Instinct" || topCardPlayerDeck.class1 === "Tech" || topCardPlayerDeck.class2 === "Tech" || topCardPlayerDeck.class3 === "Tech") {
	  playSFX('card-draw');
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It has been drawn.`);
  } else {
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It is not a <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> or <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero and has been returned to the top of your deck.`);
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function scarletSpiderFlipOut() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Spider Friends.svg" alt="Spider Friends Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);

if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to draw.`);
  return;
  }
  
  extraDraw();
}

function scarletSpiderPerfectHunter() {

if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to draw.`);
  return;
  }
  
  extraDraw();
}

function scarletSpiderLeapFromAbove() {
onscreenConsole.log(`<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`);
onscreenConsole.log(`You get +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

totalAttackPoints += 2;
cumulativeAttackPoints += 2;
updateGameBoard();
}

function scarletSpiderStingOfTheSpider() {
onscreenConsole.log(`Whenever you put a card on top of your deck this turn, you may draw that card.`);
stingOfTheSpider = true;
updateGameBoard();
}

function spiderWomanBioelectricShock() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.attackIcon === "true" || topCardPlayerDeck.attackIcon === true) {
	  playSFX('card-draw');
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> which has a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon. It has been drawn.`);
  } else {
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It does not have a <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> icon and has been returned to the top of your deck.`);
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function spiderWomanVenomBlast() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.recruitIcon === "true" || topCardPlayerDeck.recruitIcon === true) {
	  playSFX('card-draw');
    playerDeck.pop(); // Removes the last card from the deck
    playerHand.push(topCardPlayerDeck); // Adds the card to the player's hand
    extraCardsDrawnThisTurn++;
    updateGameBoard();
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> which has a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon. It has been drawn.`);
  } else {
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It does not have a <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> icon and has been returned to the top of your deck.`);
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function symbioteSpiderManDarkStrength() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to reveal.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  if (topCardPlayerDeck.cost === 1 || topCardPlayerDeck.cost === 2) {
    totalAttackPoints += 2;
    cumulativeAttackPoints += 2;
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span> which has a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. You get +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
  topCardPlayerDeck.revealed = true;
  updateGameBoard();
  } else {
    onscreenConsole.log(`You revealed <span class="console-highlights">${topCardPlayerDeck.name}</span>. It does not have a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 1 or 2.`);
    topCardPlayerDeck.revealed = true;
    updateGameBoard();
  }
}

function symbioteSpiderManShadowedSpider() {
const lowCostPlayedHeroes = cardsPlayedThisTurn
    .slice(0, -1) // Exclude the last item
    .filter(card => 
        (card.cost === 1 || card.cost === 2) &&
        !card.isCopied &&
        !card.sidekickToDestroy &&
        !card.markedToDestroy
    );
    
if (lowCostPlayedHeroes.length === 0) {
  onscreenConsole.log(`You haven't played any Heroes with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 1 or 2 this turn.`);
updateGameBoard();
} else {
onscreenConsole.log(`You have played ${lowCostPlayedHeroes.length} Hero${lowCostPlayedHeroes.length === 1 ? 'es' : '' with a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of 1 or 2 this turn. You get +${lowCostPlayedHeroes.length} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
updateGameBoard();
}
}

//Masterminds

async function carnageMasterStrike() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  onscreenConsole.log(`<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
  koBonuses();
  updateGameBoard();
  
  if (topCardPlayerDeck.cost === 0) {
  onscreenConsole.log(`Since <span class="console-highlights">${topCardPlayerDeck.name}</span> is a zero-cost card, you gain a Wound.`);
  await drawWound();
  updateGameBoard();
}
}

async function carnageDroolingJaws() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  onscreenConsole.log(`<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
  koBonuses();
  updateGameBoard();
}

async function carnageEndlessHunger(isRecursiveCall = false) {
  // Only show the initial message for the first call, not recursive calls
  if (!isRecursiveCall) {
    if (playerDeck.length === 0) {
      playerDeck = shuffle(playerDiscardPile);
      playerDiscardPile = [];
    }
    
    if (playerDeck.length === 0) {
      onscreenConsole.log(`No cards available to feast upon.`);
      return;
    }
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];
  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  
  // Single consolidated log message
  if (isRecursiveCall) {
    onscreenConsole.log(`Feasting continues... <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
  } else {
    onscreenConsole.log(`<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
  }
  
  koBonuses();
  updateGameBoard();
  
  if (topCardPlayerDeck.cost === 0) {
    onscreenConsole.log(`Since <span class="console-highlights">${topCardPlayerDeck.name}</span> is a zero-cost card, <span class="console-highlights">Carnage</span> feasts again.`);
    await carnageEndlessHunger(true); // Pass true to indicate recursive call
  }
}

async function carnageFeedMe() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  onscreenConsole.log(`<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
  koBonuses();
  updateGameBoard();
  
  onscreenConsole.log(`<span class="console-highlights">${topCardPlayerDeck.name}</span> had a <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons"> of ${topCardPlayerDeck.cost}. You get +${topCardPlayerDeck.cost} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);
  totalRecruitPoints += topCardPlayerDeck.cost;
  cumulativeRecruitPoints += topCardPlayerDeck.cost;
  updateGameBoard();
}

async function carnageOmNomNom() {
if (playerDeck.length === 0) {
    playerDeck = shuffle(playerDiscardPile);
    playerDiscardPile = [];
  }
  
  if (playerDeck.length === 0) {
    onscreenConsole.log(`No cards available to feast upon.`);
  return;
  }

  // Reveal the top card of the player's deck
  const topCardPlayerDeck = playerDeck[playerDeck.length - 1];

  playerDeck.pop();
  koPile.push(topCardPlayerDeck);
  onscreenConsole.log(`<span class="console-highlights">Carnage</span> feasts on the top card of your deck. <span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`);
  koBonuses();
  updateGameBoard();
  
  if (topCardPlayerDeck.cost === 0) {
  onscreenConsole.log(`Since <span class="console-highlights">${topCardPlayerDeck.name}</span> is a zero-cost card, you must KO a Bystander from your Victory Pile.`);
  if (victoryPile.filter(card => card.type === 'Bystander').length === 0) {
    onscreenConsole.log(`No Bystanders available in the Victory Pile to KO.`);
    return;
    } else {
      BYSTANDER SELECTION
      }
      }
  
  updateGameBoard();
}
}