// Paint the Town Red Expansion
// 01.10.2025

//Keywords

function feast() {
  if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
        } else {
          onscreenConsole.log(`No cards available for <span class="console-highlights">${card.name}</span> to feast upon.`);.");
        return;
        }
        }
  const topCard = playerDeck[playerDeck.length - 1];
  
  playerDeck.pop();
  koPile.push(topCard);
  onscreenConsole.log(`<span class="console-highlights">${card.name}</span> feasted upon <span class="console-highlights">${topCard.name}</span>, KOing them.`);
  koBonuses();
  updateGameBoard();
}

//Villains

function demogoblinAmbush(demogoblin) {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Demogoblin</span> captures a Bystander!`);
  if (bystanderDeck.length === 0) {
            onscreenConsole.log(`There are no Bystanders left to be captured.`);
            return;
        }

        // If only 1 bystander, automatically capture it
        if (bystanderDeck.length > 0) {
            const card = bystanderDeck.pop();
            const demogoblinIndex = city.findIndex(c => c === demogoblin);
            attachBystanderToVillain(demogoblinIndex, card);
            updateGameBoard();
        }
        }

if (city[i].name === 'Doppelganger') {
  const hqCost = `hq[${i + 1}].cost`;
  city[i].attackFromOwnEffects = hqCost;
  updateGameBoard();
}

function shriekFeast() {
  if (playerDeck.length === 0) {
        if (playerDiscardPile.length > 0) {
          playerDeck = shuffle(playerDiscardPile);
          playerDiscardPile = [];
        } else {
          onscreenConsole.log(`No cards available for <span class="console-highlights">Shriek</span> to feast upon.`);.");
        return;
        }
        }
  const topCard = playerDeck[playerDeck.length - 1];
  
  playerDeck.pop();
  koPile.push(topCard);
  onscreenConsole.log(`<span class="console-highlights">Shriek</span> feasted upon <span class="console-highlights">${topCard.name}</span>, KOing them.`);
  koBonuses();
  
  if (topCard.cost === 0) {
    onscreenConsole.log(`<span class="console-highlights">${topCard.name}</span> cost 0, so Shriek forces you to gain a Wound!`);
    } else {
      onscreenConsole.log(`Thankfully, <span class="console-highlights">${topCard.name}</span> did not cost 0 and youve escaped gaining a Wound.`);
      }
      
  updateGameBoard();
}

async function hobgoblinAmbush() {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Hobgoblin</span> helps each Sinister Six Villain capture a Bystander!`);
  if (bystanderDeck.length === 0) {
            onscreenConsole.log(`There are no Bystanders left to be captured.`);
            return;
        }
        
  if (city[4].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
            const index = 4;
            attachBystanderToVillain(index, card);
            updateGameBoard();
  }
  
  if (city[3].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
            const index = 3;
            attachBystanderToVillain(index, card);
            updateGameBoard();
  }
  
  if (city[2].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
            const index = 2;
            attachBystanderToVillain(index, card);
            updateGameBoard();
  }
  
  if (city[1].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
            const index = 1;
            attachBystanderToVillain(index, card);
            updateGameBoard();
  }
  
  if (city[0].team === "Sinister Six" && bystanderDeck.length > 0) {
    const card = bystanderDeck.pop();
            const index = 0;
            attachBystanderToVillain(index, card);
            updateGameBoard();
  }
}

if (city[i].name === "Kraven the Hunter") {
  const highestCost = hq.length > 0 ? Math.max(...hq.map(obj => obj.cost)) : 0;
  city[i].attackFromOwnEffects = highestCost;
}

if (city[i].name === "Sandman") {
  const villainCount = city.filter(obj => obj.type === "Villain").length;
  city[i].attackFromOwnEffects = villainCount;
}

//Add to escape logic to do extra escape after
if (city[i].name === "Kraven the Hunter") {
await kravenTheHunterEscape();
}

async function kravenTheHunterEscape() {
Borrow from Veranke once popup is updated
}

async function sandmanEscape() {
  borrow instinct or wound logic when popups are fixed
  }
  
async function vultureEscape() {
  borrow instinct or wound logic when popups are fixed
  }
  
async function shockerAmbush() {
  borrow instinct or discard logic when popups are fixed
  }

//Add to ambush logic to do vulture movement after
if (city[i].name === "Vulture") {
await vultureAmbush();
}

async function vultureAmbush() {
  chekc rooftops and bridge for villains. if one, swap vulture abd it. if none, no effect. if two, let the player decide.
  }
  

  
  

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

function mysterioMasterStrike() {
currentMasterStrike = koPile.pop();

currentMasterStrike.victoryPoints = 6;
currentMasterStrike.mastermindId = 11;
currentMasterStrike.name = "Mysterio Mastermind Tactic";
currentMasterStrike.type = "Mastermind";
currentMasterStrike.effect = `This Mastermind Tactic was a previous Master Strike. No effect!`;

const mastermind = getSelectedMastermind();

mastermind.tactics.splice(Math.floor(Math.random() * (mastermind.tactics.length + 1)), 0, currentMasterStrike);
updateGameBoard();
}

function mysterioBlurringImages() {
const mastermind = getSelectedMastermind();
const tacticsLeft = mastermind.tactics.length;

onscreenConsole.log(`<span class="console-highlights">Mysterio</span> has ${tacticsLeft} Tactic${tacticsLeft.length === 1 ? '' : 's'} remaining. You get +${tacticsLeft} <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);
totalRecruitPoints += tacticsLeft;
cumulativeRecruitPoints += tacticsLeft;
updateGameBoard();
}

function mysterioCaptiveAudience() {
const mastermind = getSelectedMastermind();
const tacticsLeft = mastermind.tactics.length;

if (tacticsLeft === 0) {
  onscreenConsole.log(`<span class="console-highlights">Mysterio</span> has ${tacticsLeft} Tactics remaining. No effect.`);
  } else {
onscreenConsole.log(`<span class="console-highlights">Mysterio</span> has ${tacticsLeft} Tactic${tacticsLeft.length === 1 ? '' : 's'} remaining. Rescuing ${tacticsLeft} Bystander${tacticsLeft.length === 1 ? '' : 's'}.`);
}

for (let i = 0; i < tacticsLeft; i++) {
    await bystanderRescue();
}

updateGameBoard();
}

function mysterioMasterOfIllusions() {
    const mysterioTactics = playerVictoryPile.filter(card => card.name === "Mysterio Mastermind Tactic");
    
    if (mysterioTactics.length === 0) {
        onscreenConsole.log("No Master Strikes found in Victory Pile.");
        return;
    }
    
    // Randomly select one Mysterio tactic
    const randomIndex = Math.floor(Math.random() * mysterioTactics.length);
    const selectedTactic = mysterioTactics[randomIndex];
    
    // Remove it from player victory pile
    const cardIndex = playerVictoryPile.findIndex(card => card === selectedTactic);
    if (cardIndex > -1) {
        playerVictoryPile.splice(cardIndex, 1);
    }
    
    // Add it to mastermind tactics at random position
    const mastermind = getSelectedMastermind();
    const insertIndex = Math.floor(Math.random() * (mastermind.tactics.length + 1));
    mastermind.tactics.splice(insertIndex, 0, selectedTactic);
    
    onscreenConsole.log(`A Master Strike from your Victory Pile has been shuffled back into <span class="console-highlights">Mysterio</span><span class="bold-spans">'s</span> Tactics.`);
    updateGameBoard();
}

async function mysterioMistsOfDeception() {
    const mastermind = getSelectedMastermind();

    if (mastermind.tactics.length !== 0) {
        onscreenConsole.log(`This is not the final Tactic.`);
        
        // Get top 5 cards from villain deck
        const revealedCards = [];
        for (let i = 0; i < 5 && villainDeck.length > 0; i++) {
            revealedCards.push(villainDeck.pop());
        }

        if (revealedCards.length === 0) {
            onscreenConsole.log("No cards left in the Villain deck to reveal!");
            return;
        }

        // Log revealed cards
        const cardNames = revealedCards.map(card => 
            `<span class="console-highlights">${card.name}</span>`
        ).join(', ');
        onscreenConsole.log(`You revealed the top ${revealedCards.length} card${revealedCards.length !== 1 ? 's' : ''} of the Villain deck: ${cardNames}.`);

        // Separate master strikes from other cards
                const masterStrikes = revealedCards.filter(card => {
            // Try multiple conditions to see which one matches
            return card.name === "Master Strike" || 
                   card.name === "Mysterio Mastermind Tactic"
        });
        const otherCards = revealedCards.filter(card => {
            // Try multiple conditions to see which one matches
            return card.name !== "Master Strike" || 
                   card.name !== "Mysterio Mastermind Tactic"
        });

        // Play master strikes first
        if (masterStrikes.length > 0) {
            
            onscreenConsole.log(`Playing ${masterStrikes.length} Master Strike${masterStrikes.length !== 1 ? 's' : ''} now.`);
            
            // Play each
            for (const strike of masterStrikes) {
                // Add to top of deck first
                villainDeck.push(strike);
                // Then draw it properly
                await drawVillainCard();
            }
        }

        // Handle remaining cards
        if (otherCards.length > 0) {
            shuffleArray(otherCards);
            
            onscreenConsole.log(`Shuffling the other cards and placing them on the bottom of the Villain deck.`);
            
            // Add to bottom of deck
            villainDeck.unshift(...otherCards);
        } else if (masterStrikes.length === 0) {
            onscreenConsole.log("No Master Strikes were revealed. All revealed cards have been shuffled and placed at the bottom of the Villain deck.");
        }
        
        updateGameBoard();
    } else {
        onscreenConsole.log(`This is the final Tactic. No effect.`);
    }
}

{
    id: 38,
    name: "Black Cat",
    cards: [
{
  id:149, heroName: "Black Cat", 
  name: "Black Cat - Pickpocket", 
  type: "Hero", rarity: "Common", 
  team: "Spider Friends", classes: ["Covert"], 
  color: "Red", cost: 1, attack: 0, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "blackCatPickpocket", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_BlackCat_Pickpocket.webp"
},
{
  id:150, heroName: "Black Cat", 
  name: "Black Cat - Casual Bank Robbery", 
  type: "Hero", rarity: "Common 2", 
  team: "Spider Friends", classes: ["Covert"], 
  color: "Red", cost: 4, attack: 0, recruit: 2, 
  attackIcon: false, recruitIcon: true, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "blackCatCasualBankRobbery", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_BlackCat_CasualBankRobbery.webp"
},
{
  id:151, heroName: "Black Cat", 
  name: "Black Cat - Jinx", 
  type: "Hero", rarity: "Uncommon", 
  team: "Spider Friends", classes: ["Instinct"], 
  color: "Yellow", cost: 5, attack: 3, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "blackCatJinx", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_BlackCat_Jinx.webp"
},
{
  id:152, heroName: "Black Cat", 
  name: "Black Cat - Cat Burglar", 
  type: "Hero", rarity: "Rare", 
  team: "Spider Friends", classes: ["Covert"], 
  color: "Red", cost: 8, attack: 5, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "blackCatCatBurglar", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_BlackCat_CatBurglar.webp"
}
  ]
}, 
{
    id: 39,
    name: "Moon Knight",
    cards: [
{
  id:153, heroName: "Moon Knight", 
  name: "Moon Knight - Climbing Claws", 
  type: "Hero", rarity: "Common", 
  team: "Marvel Knights", classes: ["Tech"], 
  color: "Black", cost: 3, attack: 0, recruit: 2, 
  attackIcon: false, recruitIcon: true, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "None", 
  conditionalAbility: "moonKnightClimbingClaws", conditionType: "playedCards", condition: "Instinct", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_MoonKnight_ClimbingClaws.webp"
},
{
  id:154, heroName: "Moon Knight", 
  name: "Moon Knight - Lunar Communion", 
  type: "Hero", rarity: "Common 2", 
  team: "Marvel Knights", classes: ["Instinct"], 
  color: "Yellow", cost: 3, attack: 2, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "moonKnightLunarCommunion", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_MoonKnight_LunarCommunion.webp"
},
{
  id:155, heroName: "Moon Knight", 
  name: "Moon Knight - Crescent Moon Darts", 
  type: "Hero", rarity: "Uncommon", 
  team: "Marvel Knights", classes: ["Tech"], 
  color: "Black", cost: 5, attack: 3, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "moonKnightCrescentMoonDarts", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_MoonKnight_CrescentMoonDarts.webp"
},
{
  id:156, heroName: "Moon Knight", 
  name: "Moon Knight - Golden Ankh of Khonshu", 
  type: "Hero", rarity: "Rare", 
  team: "Marvel Knights", classes: ["Instinct"], 
  color: "Yellow", cost: 8, attack: 6, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "moonKnightGoldenAnkhOfKhonshu", 
  conditionalAbility: "moonKnightGoldenAnkhOfKhonshuTech", conditionType: "playedCards", condition: "Tech", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_MoonKnight_GoldenAnkhOfKhonshu.webp"
}
  ]
}, 
{
    id: 40,
    name: "Scarlet Spider",
    cards: [
{
  id:157, heroName: "Scarlet Spider", 
  name: "Scarlet Spider - Flip Out", 
  type: "Hero", rarity: "Common", 
  team: "Spider Friends", classes: ["Strength"], 
  color: "Green", cost: 2, attack: 0, recruit: 1, 
  attackIcon: false, recruitIcon: true, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "None", 
  conditionalAbility: "scarletSpiderFlipOut", conditionType: "playedCards", condition: "Spider Friends", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_ScarletSpider_FlipOut.webp"
},
{
  id:158, heroName: "Scarlet Spider", 
  name: "Scarlet Spider - Perfect Hunter", 
  type: "Hero", rarity: "Common 2", 
  team: "Spider Friends", classes: ["Instinct"], 
  color: "Yellow", cost: 4, attack: 1, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "scarletSpiderPerfectHunter", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_ScarletSpider_PerfectHunter.webp"
},
{
  id:159, heroName: "Scarlet Spider", 
  name: "Scarlet Spider - Leap from Above", 
  type: "Hero", rarity: "Uncommon", 
  team: "Spider Friends", classes: ["Covert"], 
  color: "Red", cost: 6, attack: 3, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "None", 
  conditionalAbility: "scarletSpiderLeapFromAbove", conditionType: "playedCards", condition: "Instinct", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_ScarletSpider_LeapFromAbove.webp"
},
{
  id:160, heroName: "Scarlet Spider", 
  name: "Scarlet Spider - Sting of the Spider", 
  type: "Hero", rarity: "Rare", 
  team: "Spider Friends", classes: ["Strength"], 
  color: "Green", cost: 7, attack: 5, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "scarletSpiderStingOfTheSpider", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_ScarletSpider_StingOfTheSpider.webp"
}
  ]
},
{
    id: 41,
    name: "Spider-Woman",
    cards: [
{
  id:161, heroName: "Spider-Woman", 
  name: "Spider-Woman - Radioactive Spider", 
  type: "Hero", rarity: "Common", 
  team: "Spider Friends", classes: ["Strength"], 
  color: "Green", cost: 2, attack: 0, recruit: 3, 
  attackIcon: false, recruitIcon: true, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "spiderWomanRadioactiveSpider", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SpiderWoman_RadioactiveSpider.webp"
},
{
  id:162, heroName: "Spider-Woman", 
  name: "Spider-Woman - Bioelectric Shock", 
  type: "Hero", rarity: "Common 2", 
  team: "Spider Friends", classes: ["Range"], 
  color: "Blue", cost: 4, attack: 2, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "spiderWomanBioelectricShock", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SpiderWoman_BioelectricShock.webp"
},
{
  id:163, heroName: "Spider-Woman", 
  name: "Spider-Woman - Venom Blast", 
  type: "Hero", rarity: "Uncommon", 
  team: "Spider Friends", classes: ["Range"], 
  color: "Blue", cost: 6, attack: 3, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "spiderWomanVenomBlast", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SpiderWoman_VenomBlast.webp"
},
{
  id:164, heroName: "Spider-Woman", 
  name: "Spider-Woman - Arachno-Pheromones", 
  type: "Hero", rarity: "Rare", 
  team: "Spider Friends", classes: ["Covert"], 
  color: "Red", cost: 7, attack: 0, recruit: 0, 
  attackIcon: false, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "spiderWomanArachnoPheromones", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SpiderWoman_ArachnoPheromones.webp"
}
  ]
},
{
    id: 42,
    name: "Symbiote Spider-Man",
    cards: [
{
  id:165, heroName: "Symbiote Spider-Man", 
  name: "Symbiote Spider-Man - Dark Strength", 
  type: "Hero", rarity: "Common", 
  team: "Spider Friends", classes: ["Strength"], 
  color: "Green", cost: 2, attack: 1, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "symbioteSpiderManDarkStrength", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SymbioteSpiderMan_DarkStrength.webp"
},
{
  id:166, heroName: "Symbiote Spider-Man", 
  name: "Symbiote Spider-Man - Spider-Sense Tingling", 
  type: "Hero", rarity: "Common 2", 
  team: "Spider Friends", classes: ["Instinct"], 
  color: "Yellow", cost: 2, attack: 0, recruit: 0, 
  attackIcon: false, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "symbioteSpiderManSpiderSenseTingling", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SymbioteSpiderMan_SpiderSenseTingling.webp"
},
{
  id:167, heroName: "Symbiote Spider-Man", 
  name: "Symbiote Spider-Man - Shadowed Spider", 
  type: "Hero", rarity: "Uncommon", 
  team: "Spider Friends", classes: ["Covert"], 
  color: "Red", cost: 2, attack: 1, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "symbioteSpiderManShadowedSpider", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: ["Wall-Crawl"], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SymbioteSpiderMan_ShadowedSpider.webp"
},
{
  id:168, heroName: "Symbiote Spider-Man", 
  name: "Symbiote Spider-Man - Thwip!", 
  type: "Hero", rarity: "Rare", 
  team: "Spider Friends", classes: ["Range"], 
  color: "Blue", cost: 2, attack: 4, recruit: 0, 
  attackIcon: true, recruitIcon: false, 
  bonusAttack: 0, bonusRecruit: 0, 
  multiplier: "None", multiplierAttribute: "None", multiplierLocation: "None", 
  unconditionalAbility: "symbioteSpiderManThwip", 
  conditionalAbility: "None", conditionType: "None", condition: "None", 
  invulnerability: "None", keywords: [], 
  image: "Visual Assets/Heroes/PtTR/PtTR_SymbioteSpiderMan_Thwip.webp"
}
  ]
}


{
  id: 16,
  name: "Maximum Carnage",
  cards: [
      { id: 61, villainId: 16, team: "Maximum Carnage", name: "Carrion", type: "Villain", classes: [], attack: 4, originalAttack: 4, victoryPoints: 3, ambushEffect: "None", fightEffect: "carrionFeast", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: ["Feast"], image: "Visual Assets/Villains/PtTR_MaximumCarnage_Carrion.webp" },
      { id: 62, villainId: 16, team: "Maximum Carnage", name: "Demogoblin", type: "Villain", classes: [], attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "demogoblinAmbush", fightEffect: "demogoblinFeast", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: ["Feast"], image: "Visual Assets/Villains/PtTR_MaximumCarnage_Demogoblin.webp" },
      { id: 63, villainId: 16, team: "Maximum Carnage", name: "Doppelganger", type: "Villain", classes: [], attack: 0, originalAttack: 0, victoryPoints: 3, ambushEffect: "None", fightEffect: "doppelgangerFeast", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: ["Feast"], image: "Visual Assets/Villains/PtTR_MaximumCarnage_Doppelganger.webp" },
      { id: 64, villainId: 16, team: "Maximum Carnage", name: "Shriek", type: "Villain", classes: [], attack: 6, originalAttack: 6, victoryPoints: 4, ambushEffect: "None", fightEffect: "shriekFeast", escapeEffect: "shriekEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: ["Feast"], image: "Visual Assets/Villains/PtTR_MaximumCarnage_Shriek.webp" }
        ]
},
{
  id: 17,
  name: "Sinister Six",
  cards: [
      { id: 65, villainId: 17, team: "Sinister Six", name: "Chameleon", type: "Villain", classes: [], quantity: 1, attack: 6, originalAttack: 6, victoryPoints: 2, ambushEffect: "None", fightEffect: "chameleonFight", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: [], image: "Visual Assets/Villains/PtTR_SinisterSix_Chameleon.webp" },
      { id: 66, villainId: 17, team: "Sinister Six", name: "Hobgoblin", type: "Villain", classes: [], quantity: 1, attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "hobgoblinAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: [], image: "Visual Assets/Villains/PtTR_SinisterSix_Hobgoblin.webp" },
      { id: 67, villainId: 17, team: "Sinister Six", name: "Kraven the Hunter", type: "Villain", classes: [], quantity: 1, attack: 0, originalAttack: 0, victoryPoints: 4, ambushEffect: "None", fightEffect: "None", escapeEffect: "kravenTheHunterEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: [], image: "Visual Assets/Villains/PtTR_SinisterSix_KravenTheHunter.webp" },
      { id: 68, villainId: 17, team: "Sinister Six", name: "Sandman", type: "Villain", classes: [], quantity: 1, attack: 0, originalAttack: 0, victoryPoints: 4, ambushEffect: "None", fightEffect: "None", escapeEffect: "sandmanEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: [], image: "Visual Assets/Villains/PtTR_SinisterSix_Sandman.webp" },
      { id: 69, villainId: 17, team: "Sinister Six", name: "Shocker", type: "Villain", classes: [], quantity: 2, attack: 5, originalAttack: 5, victoryPoints: 3, ambushEffect: "shockerAmbush", fightEffect: "None", escapeEffect: "None", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: [], image: "Visual Assets/Villains/PtTR_SinisterSix_Shocker.webp" },
      { id: 70, villainId: 17, team: "Sinister Six", name: "Vulture", type: "Villain", classes: [], quantity: 2, attack: 4, originalAttack: 4, victoryPoints: 2, ambushEffect: "vultureAmbush", fightEffect: "None", escapeEffect: "vultureEscape", fightCondition: "None", conditionType: "None", condition: "None", alwaysLeads: "false", keywords: [], image: "Visual Assets/Villains/PtTR_SinisterSix_Vulture.webp" },
          ]
}



