// Expansion - Guardians of the Galaxy
// 25.11.25 20.20

// Global Variables

let shardSupply = 500;
let totalPlayerShards = 0;
let shardsGainedThisTurn = 0;
let playerArtifacts = [];

// Heroes

function draxTheDestroyerKnivesOfTheHunter() {
onscreenConsole.log(`You get +1 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
totalAttackPoints += 1;
cumulativeAttackPoints += 1;
}

function draxTheDestroyerInterstellarTracker() {
return new Promise((resolve) => {
  const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const instinctPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Instinct"),
  ).length;
  
  if (instinctPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
  }
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

    if (instinctPlayed === 0) {
    
    const { confirmButton, denyButton } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="bold-spans">${topCardPlayerDeck.name}</span>. Do you wish to discard or put it back?`,
      "Discard",
      "Put It Back",
    );

    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage = `url('${topCardPlayerDeck.image}')`;
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = async function () {
      playerDeck.pop();
      hideHeroAbilityMayPopup();
      const { returned } =
        await checkDiscardForInvulnerability(topCardPlayerDeck);
      if (returned.length) {
        playerHand.push(...returned);
      }
      updateGameBoard();
      resolve();
    };

    denyButton.onclick = function () {
      console.log(
        `You put ${topCardPlayerDeck.name} back on top of your deck.`,
      );
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`,
      );
      updateGameBoard();
      hideHeroAbilityMayPopup();
      resolve();
    };
    
  } else {
    
    const { confirmButton, otherButton, denyButton  } = showHeroAbilityMayPopup(
      `You revealed the top card of your deck: <span class="bold-spans">${topCardPlayerDeck.name}</span>. You may discard it or put it back. As you have played an <img src="Visual Assets/Icons/Instinct.svg" alt="Instinct Icon" class="console-card-icons"> Hero, you can choose to KO it after discarding.`,
      "Discard",
      "Discard, Then KO",
      "Put it Back",
    );

    const previewArea = document.querySelector(".info-or-choice-popup-preview");
    if (previewArea) {
      previewArea.style.backgroundImage = `url('${topCardPlayerDeck.image}')`;
      previewArea.style.backgroundSize = "contain";
      previewArea.style.backgroundRepeat = "no-repeat";
      previewArea.style.backgroundPosition = "center";
      previewArea.style.display = "block";
    }

    confirmButton.onclick = async function () {
      playerDeck.pop();
      hideHeroAbilityMayPopup();
      const { returned } =
        await checkDiscardForInvulnerability(topCardPlayerDeck);
      if (returned.length) {
        playerHand.push(...returned);
      }
      updateGameBoard();
      resolve();
    };
    
otherButton.onclick = async function () {
  playerDeck.pop();
  hideHeroAbilityMayPopup();
  const { returned } = await checkDiscardForInvulnerability(topCardPlayerDeck);
  
  if (returned.length) {
    koPile.push(...returned);
    onscreenConsole.log(
      `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd.`,
    );
    koBonuses();
  } else {
    // Check if the card is in playerDiscardPile and move it to koPile
    const cardIndex = playerDiscardPile.findIndex(card => 
      card === topCardPlayerDeck || card.id === topCardPlayerDeck.id
    );
    
    if (cardIndex !== -1) {
      const [removedCard] = playerDiscardPile.splice(cardIndex, 1);
      koPile.push(removedCard);
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been KO'd from discard pile.`,
      );
      koBonuses();
    }
  }

  updateGameBoard();
  resolve();
};

    denyButton.onclick = function () {
      console.log(
        `You put ${topCardPlayerDeck.name} back on top of your deck.`,
      );
      onscreenConsole.log(
        `<span class="console-highlights">${topCardPlayerDeck.name}</span> has been returned to the top of your deck.`,
      );
      updateGameBoard();
      hideHeroAbilityMayPopup();
      resolve();
    };
    
    }
  
  });
}

function draxTheDestroyerTheDestroyer() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const guardiansPlayed = previousCards.filter(
    (item) => item.team && item.team === "Guardians of the Galaxy").length;
  
  if (guardiansPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Hero played. Superpower Ability not activated - "other player" Hero effects do not apply in Solo play.`,
  );
  }
  if (guardiansPlayed === 0) {
    onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Heroes played. Superpower Ability not activated - "other player" Hero effects do not apply in Solo play anyway.`,
  );
  }
}

function draxTheDestroyerAvatarOfDestruction() {
const currentAttackPoints = totalAttackPoints;
onscreenConsole.log(`You had ${currentAttackPoints} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">. It has doubled to ${totalAttackPoints + currentAttackPoints} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

totalAttackPoints += currentAttackPoints;
cumulativeAttackPoints += currentAttackPoints;
}

function gamoraBountyHunter() {
updateGameBoard();
  
  const selectedScheme = schemes.find(
    (s) =>
      s.name ===
      document.querySelector(
        "#scheme-section input[type=radio]:checked",
      ).value,
  );

  return new Promise((resolve) => {
    const popup = document.querySelector(".card-choice-city-hq-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const previewElement = document.querySelector(
      ".card-choice-city-hq-popup-preview",
    );
    const titleElement = document.querySelector(
      ".card-choice-city-hq-popup-title",
    );
    const instructionsElement = document.querySelector(
      ".card-choice-city-hq-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "GAMORA - BOUNTY HUNTER";
    instructionsElement.textContent =
      "SELECT A VILLAIN TO GAIN A SHARD:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedHQIndex = null;
    let selectedCell = null;
    let viewingHQ = false; // Track whether we're viewing city or HQ

    // Check if any villains exist in city (excluding destroyed spaces)
    const villainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index],
    );

    // Check if any villains exist in HQ if scheme is active
    const villainsInHQ = selectedScheme.name === 'Invade the Daily Bugle News HQ' ? 
      hq.some((card, index) => {
        if (card && (card.type === "Villain" || card.type === "Henchman")) {
          const explosionValues = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5];
          const isDestroyed = explosionValues[index] >= 6;
          return !isDestroyed;
        }
        return false;
      }) : false;

    if (!villainsInCity && !villainsInHQ) {
      onscreenConsole.log(
        "There are no Villains in the city or HQ to gain a Shard.",
      );
      resolve(false);
      return;
    }

    // Function to render city cards
    function renderCityCards() {
      viewingHQ = false;
      
      // Process each city slot (0-4)
      for (let i = 0; i < 5; i++) {
        const slot = i + 1;
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );

        const card = city[i];

        // Update label to show city location
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = ["Bridge", "Streets", "Rooftops", "Bank", "Sewers"][i];

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");
        cell.classList.remove("destroyed");

        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        if (explosion) explosion.style.display = "none";
        if (explosionCount) explosionCount.style.display = "none";

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        // Check if this space is destroyed
        if (destroyedSpaces[i]) {
          // For destroyed spaces, use Master Strike image with same styling
          const destroyedImage = document.createElement("img");
          destroyedImage.src =
            "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
          destroyedImage.alt = "Destroyed City Space";
          destroyedImage.className = "city-hq-chosen-card-image";
          destroyedImage.style.cursor = "not-allowed";
          cardContainer.appendChild(destroyedImage);
          destroyedImage.classList.add("greyed-out");

          // Hide the original card image
          cardImage.style.display = "none";

          continue;
        }

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";

          // Apply greyed out styling for ineligible cards (Heroes, etc.)
          if (!isEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible) {
            addCardOverlays(cardContainer, card, i, 'city');
          }

          // Add click handler for eligible cards only
          if (isEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedCityIndex === i) {
                // Deselect
                selectedCityIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  "SELECT A VILLAIN TO GAIN A SHARD:";
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedCityIndex = i;
                selectedHQIndex = null; // Clear HQ selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain a Shard.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedCityIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedCityIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // Empty city slot - show blank card and grey out
          cardImage.src = "Visual Assets/BlankCardSpace.webp";
          cardImage.alt = "Empty City Space";
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);

          // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }
        }
      }
    }

    // Function to render HQ cards
    function renderHQCards() {
      viewingHQ = true;
      
      // Get HQ slots (1-5) and explosion values
      const hqSlots = [1, 2, 3, 4, 5];
      const explosionValues = [
        hqExplosion1,
        hqExplosion2,
        hqExplosion3,
        hqExplosion4,
        hqExplosion5,
      ];

      // Process each HQ slot
      hqSlots.forEach((slot, index) => {
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );
        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        const card = hq[index];
        const explosionValue = explosionValues[index] || 0;

        // Update explosion indicators
        if (explosionValue > 0) {
          explosion.style.display = "block";
          explosionCount.style.display = "block";
          explosionCount.textContent = explosionValue;

          if (explosionValue >= 6) {
            explosion.classList.add("max-explosions");
            cell.classList.add("destroyed");
          } else {
            explosion.classList.remove("max-explosions");
            cell.classList.remove("destroyed");
          }
        } else {
          if (explosion) explosion.style.display = "none";
          if (explosionCount) explosionCount.style.display = "none";
          cell.classList.remove("destroyed");
        }

        // Update label
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = `HQ-${slot}`;

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";
          const isDestroyed = explosionValue >= 6;
          const isActuallyEligible = isEligible && !isDestroyed;

          // Apply greyed out styling for ineligible cards
          if (!isActuallyEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible && card) {
            addCardOverlays(cardContainer, card, index, 'hq');
          }

          // Add click handler for eligible cards only
          if (isActuallyEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedHQIndex === index) {
                // Deselect
                selectedHQIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  "SELECT A VILLAIN TO GAIN A SHARD:";
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedHQIndex = index;
                selectedCityIndex = null; // Clear city selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain a Shard.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedHQIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedHQIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // No card in this slot - show card back and grey out
          cardImage.src = "Visual Assets/CardBack.webp";
          cardImage.alt = "Empty HQ Slot";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);
        }
      });
    }

    // Initial render - start with city
    renderCityCards();

    // Set up button handlers
    const confirmButton = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";

    // Set up Other Choice button as toggle between City and HQ
    if (selectedScheme.name === 'Invade the Daily Bugle News HQ' && villainsInHQ) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = "SWITCH TO HQ";
      otherChoiceButton.disabled = false;

      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Clear any selections
        selectedCityIndex = null;
        selectedHQIndex = null;
        if (selectedCell) {
          selectedCell.classList.remove("selected");
          selectedCell = null;
        }
        previewElement.innerHTML = "";
        previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        confirmButton.disabled = true;

        // Toggle between City and HQ views
        if (viewingHQ) {
          renderCityCards();
          otherChoiceButton.textContent = "SWITCH TO HQ";
          instructionsElement.textContent = "SELECT A VILLAIN TO GAIN A SHARD:";
        } else {
          renderHQCards();
          otherChoiceButton.textContent = "SWITCH TO CITY";
          instructionsElement.textContent = "SELECT A VILLAIN TO GAIN A SHARD:";
        }
      };
    } else {
      otherChoiceButton.style.display = "none";
    }

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (selectedCityIndex === null && selectedHQIndex === null) return;

      shardSupply -= 1;

      if (selectedCityIndex !== null) {
        // Assign the shard to the selected city villain
        city[selectedCityIndex].shards += 1;
        onscreenConsole.log(
          `<span class="console-highlights">${city[selectedCityIndex].name}</span> gained a Shard.`,
        );
      } else if (selectedHQIndex !== null) {
        // Assign the shard to the selected HQ villain
        hq[selectedHQIndex].shards += 1;
        onscreenConsole.log(
          `<span class="console-highlights">${hq[selectedHQIndex].name}</span> gained a Shard.`,
        );
      }

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();
      originalResolve(true);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
  });
}}

function gamoraDeadliestWomanInTheUniverse() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const covertPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Covert"),
  ).length;
  
  if (covertPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
onscreenConsole.log(
    `You gain 3 Shards.`,
  );
totalPlayerShards += 3;
shardsGainedThisTurn += 3;
shardSupply -= 3;
  } else {
    onscreenConsole.log(
    `You gain 2 Shards.`,
  );
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
shardSupply -= 2;
    }
}

function gamoraGalacticAssassin() {
updateGameBoard();
  
  const selectedScheme = schemes.find(
    (s) =>
      s.name ===
      document.querySelector(
        "#scheme-section input[type=radio]:checked",
      ).value,
  );

  return new Promise((resolve) => {
    const popup = document.querySelector(".card-choice-city-hq-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const previewElement = document.querySelector(
      ".card-choice-city-hq-popup-preview",
    );
    const titleElement = document.querySelector(
      ".card-choice-city-hq-popup-title",
    );
    const instructionsElement = document.querySelector(
      ".card-choice-city-hq-popup-instructions",
    );

    // Set popup content
    titleElement.textContent = "GAMORA - BOUNTY HUNTER";
    instructionsElement.textContent =
      `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedHQIndex = null;
    let selectedCell = null;
    let viewingHQ = false; // Track whether we're viewing city or HQ

    // Check if any villains exist in city (excluding destroyed spaces)
    const villainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index],
    );

    // Check if any villains exist in HQ if scheme is active
    const villainsInHQ = selectedScheme.name === 'Invade the Daily Bugle News HQ' ? 
      hq.some((card, index) => {
        if (card && (card.type === "Villain" || card.type === "Henchman")) {
          const explosionValues = [hqExplosion1, hqExplosion2, hqExplosion3, hqExplosion4, hqExplosion5];
          const isDestroyed = explosionValues[index] >= 6;
          return !isDestroyed;
        }
        return false;
      }) : false;

    if (!villainsInCity && !villainsInHQ) {
      onscreenConsole.log(
        `There are no Villains in the city or HQ to gain no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
      );
      resolve(false);
      return;
    }

    // Function to render city cards
    function renderCityCards() {
      viewingHQ = false;
      
      // Process each city slot (0-4)
      for (let i = 0; i < 5; i++) {
        const slot = i + 1;
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );

        const card = city[i];

        // Update label to show city location
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = ["Bridge", "Streets", "Rooftops", "Bank", "Sewers"][i];

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");
        cell.classList.remove("destroyed");

        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        if (explosion) explosion.style.display = "none";
        if (explosionCount) explosionCount.style.display = "none";

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        // Check if this space is destroyed
        if (destroyedSpaces[i]) {
          // For destroyed spaces, use Master Strike image with same styling
          const destroyedImage = document.createElement("img");
          destroyedImage.src =
            "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
          destroyedImage.alt = "Destroyed City Space";
          destroyedImage.className = "city-hq-chosen-card-image";
          destroyedImage.style.cursor = "not-allowed";
          cardContainer.appendChild(destroyedImage);
          destroyedImage.classList.add("greyed-out");

          // Hide the original card image
          cardImage.style.display = "none";

          continue;
        }

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";

          // Apply greyed out styling for ineligible cards (Heroes, etc.)
          if (!isEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible) {
            addCardOverlays(cardContainer, card, i, 'city');
          }

          // Add click handler for eligible cards only
          if (isEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedCityIndex === i) {
                // Deselect
                selectedCityIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedCityIndex = i;
                selectedHQIndex = null; // Clear HQ selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedCityIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedCityIndex !== null && selectedCityIndex !== i) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedCityIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // Empty city slot - show blank card and grey out
          cardImage.src = "Visual Assets/BlankCardSpace.webp";
          cardImage.alt = "Empty City Space";
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);

          // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
          if (darkPortalSpaces[i]) {
            const darkPortalOverlay = document.createElement("div");
            darkPortalOverlay.className = "dark-portal-overlay";
            darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
            cardContainer.appendChild(darkPortalOverlay);
          }
        }
      }
    }

    // Function to render HQ cards
    function renderHQCards() {
      viewingHQ = true;
      
      // Get HQ slots (1-5) and explosion values
      const hqSlots = [1, 2, 3, 4, 5];
      const explosionValues = [
        hqExplosion1,
        hqExplosion2,
        hqExplosion3,
        hqExplosion4,
        hqExplosion5,
      ];

      // Process each HQ slot
      hqSlots.forEach((slot, index) => {
        const cell = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-cell`,
        );
        const cardImage = document.querySelector(
          `#hq-city-table-city-hq-${slot} .city-hq-chosen-card-image`,
        );
        const explosion = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion`,
        );
        const explosionCount = document.querySelector(
          `#hq-city-table-city-hq-${slot} .hq-popup-explosion-count`,
        );

        const card = hq[index];
        const explosionValue = explosionValues[index] || 0;

        // Update explosion indicators
        if (explosionValue > 0) {
          explosion.style.display = "block";
          explosionCount.style.display = "block";
          explosionCount.textContent = explosionValue;

          if (explosionValue >= 6) {
            explosion.classList.add("max-explosions");
            cell.classList.add("destroyed");
          } else {
            explosion.classList.remove("max-explosions");
            cell.classList.remove("destroyed");
          }
        } else {
          if (explosion) explosion.style.display = "none";
          if (explosionCount) explosionCount.style.display = "none";
          cell.classList.remove("destroyed");
        }

        // Update label
        document.getElementById(
          `hq-city-table-city-hq-${slot}-label`,
        ).textContent = `HQ-${slot}`;

        // Remove any existing selection classes from cell
        cell.classList.remove("selected");

        // Remove any existing popup containers before creating a new one
        const existingContainers = cell.querySelectorAll(".popup-card-container");
        existingContainers.forEach((container) => container.remove());

        // Create card container for overlays
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container popup-card-container";
        cell.appendChild(cardContainer);

        if (card) {
          // Set the actual card image and MOVE IT INTO THE CONTAINER
          cardImage.src = card.image;
          cardImage.alt = card.name;
          cardImage.className = "city-hq-chosen-card-image";
          cardImage.style.display = "block";
          cardContainer.appendChild(cardImage);

          // Determine eligibility - Villains and Henchmen are eligible
          const isEligible = card.type === "Villain" || card.type === "Henchman";
          const isDestroyed = explosionValue >= 6;
          const isActuallyEligible = isEligible && !isDestroyed;

          // Apply greyed out styling for ineligible cards
          if (!isActuallyEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Only add overlays for villain/henchman cards
          if (isEligible && card) {
            addCardOverlays(cardContainer, card, index, 'hq');
          }

          // Add click handler for eligible cards only
          if (isActuallyEligible) {
            cardImage.style.cursor = "pointer";

            // Click handler
            cardImage.onclick = (e) => {
              e.stopPropagation();

              if (selectedHQIndex === index) {
                // Deselect
                selectedHQIndex = null;
                cell.classList.remove("selected");
                selectedCell = null;
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor = "var(--panel-backgrounds)";

                // Update instructions and confirm button
                instructionsElement.textContent =
                  `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = true;
              } else {
                // Deselect previous
                if (selectedCell) {
                  selectedCell.classList.remove("selected");
                }

                // Select new
                selectedHQIndex = index;
                selectedCityIndex = null; // Clear city selection
                selectedCell = cell;
                cell.classList.add("selected");

                // Update preview
                previewElement.innerHTML = "";
                const previewImage = document.createElement("img");
                previewImage.src = card.image;
                previewImage.alt = card.name;
                previewImage.className = "popup-card-preview-image";
                previewElement.appendChild(previewImage);
                previewElement.style.backgroundColor = "var(--accent)";

                // Update instructions and confirm button
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`;
                document.getElementById(
                  "card-choice-city-hq-popup-confirm",
                ).disabled = false;
              }
            };

            // Hover effects for eligible cards
            cardImage.onmouseover = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Update preview
              previewElement.innerHTML = "";
              const previewImage = document.createElement("img");
              previewImage.src = card.image;
              previewImage.alt = card.name;
              previewImage.className = "popup-card-preview-image";
              previewElement.appendChild(previewImage);

              // Only change background if no card is selected
              if (selectedHQIndex === null) {
                previewElement.style.backgroundColor = "var(--accent)";
              }
            };

            cardImage.onmouseout = () => {
              if (selectedHQIndex !== null && selectedHQIndex !== index) return;

              // Only clear preview if no card is selected AND we're not hovering over another eligible card
              if (selectedHQIndex === null) {
                setTimeout(() => {
                  const hoveredCard = document.querySelector(
                    ".city-hq-chosen-card-image:hover:not(.greyed-out)",
                  );
                  if (!hoveredCard) {
                    previewElement.innerHTML = "";
                    previewElement.style.backgroundColor =
                      "var(--panel-backgrounds)";
                  }
                }, 50);
              }
            };
          } else {
            // For ineligible cards, remove event handlers and make non-clickable
            cardImage.style.cursor = "not-allowed";
            cardImage.onclick = null;
            cardImage.onmouseover = null;
            cardImage.onmouseout = null;
          }
        } else {
          // No card in this slot - show card back and grey out
          cardImage.src = "Visual Assets/CardBack.webp";
          cardImage.alt = "Empty HQ Slot";
          cardImage.classList.add("greyed-out");
          cardImage.style.cursor = "not-allowed";
          cardImage.onclick = null;
          cardImage.onmouseover = null;
          cardImage.onmouseout = null;
          cardContainer.appendChild(cardImage);
        }
      });
    }

    // Initial render - start with city
    renderCityCards();

    // Set up button handlers
    const confirmButton = document.getElementById(
      "card-choice-city-hq-popup-confirm",
    );
    const otherChoiceButton = document.getElementById(
      "card-choice-city-hq-popup-otherchoice",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";

    // Set up Other Choice button as toggle between City and HQ
    if (selectedScheme.name === 'Invade the Daily Bugle News HQ' && villainsInHQ) {
      otherChoiceButton.style.display = "inline-block";
      otherChoiceButton.textContent = "SWITCH TO HQ";
      otherChoiceButton.disabled = false;

      otherChoiceButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Clear any selections
        selectedCityIndex = null;
        selectedHQIndex = null;
        if (selectedCell) {
          selectedCell.classList.remove("selected");
          selectedCell = null;
        }
        previewElement.innerHTML = "";
        previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        confirmButton.disabled = true;

        // Toggle between City and HQ views
        if (viewingHQ) {
          renderCityCards();
          otherChoiceButton.textContent = "SWITCH TO HQ";
          instructionsElement.textContent = `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
        } else {
          renderHQCards();
          otherChoiceButton.textContent = "SWITCH TO CITY";
          instructionsElement.textContent = `SELECT A VILLAIN TO GAIN NO <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> FROM SHARDS THIS TURN:`;
        }
      };
    } else {
      otherChoiceButton.style.display = "none";
    }

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (selectedCityIndex === null && selectedHQIndex === null) return;

      if (selectedCityIndex !== null) {
        // Assign the shard to the selected city villain
        city[selectedCityIndex].noShardBonus = true;
        onscreenConsole.log(
          `<span class="console-highlights">${city[selectedCityIndex].name}</span> gains no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
        );
      } else if (selectedHQIndex !== null) {
        // Assign the shard to the selected HQ villain
        hq[selectedHQIndex].noShardBonus = true;
        onscreenConsole.log(
          `<span class="console-highlights">${hq[selectedHQIndex].name}</span> gains no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
        );
      }

      closeHQCityCardChoicePopup();
      modalOverlay.style.display = "none";
      updateGameBoard();
      originalResolve(true);
    };

    // Show popup
    modalOverlay.style.display = "block";
    popup.style.display = "block";
    
    const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const covertPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Covert"),
  ).length;
  
  const mastermind = getSelectedMastermind();
  
  if (covertPlayed > 1) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Heroes played. Superpower Ability activated.`,
  );
  mastermind.noShardBonus = true;
onscreenConsole.log(
    `<span class="console-highlights">${mastermind.name}</span> gains no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
  );
}}

function gamoraGodslayerBladeOne() {
onscreenConsole.log(
    `You gain 2 Shards.`,
  );
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
shardSupply -= 2;
}

function gamoraGodslayerBladeTwo() {
if (totalPlayerShards < 5) {
  onscreenConsole.log(
    `You don't have enough Shards.`,
  );
}

totalPlayerShards -= 5;
shardSupply += 5;
totalAttackPoints += 10;
cumulstiveAttackPoints += 10;

onscreenConsole.log(
    `You spent 5 Shards and gained +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
  
}

function grootSurvivingSprig() {
nextTurnDrawCount += 1;
onscreenConsole.log(`You will draw an extra card at the end of this turn.`);
}

function grootPruneTheGrowths() {
return new Promise((resolve) => {
    onscreenConsole.log(
      `<img src="Visual Assets/Icons/Covert.svg" alt="Covert Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
    );

    // Check if there are any bystanders available
    const hasBystanders = bystanderDeck.length > 0;

    if (!hasBystanders) {
      console.log("There are no Bystanders available to be rescued.");
      onscreenConsole.log("There are no Bystanders available to be rescued.");
    }

    if (playerHand.length === 0 && playerDiscardPile.length === 0) {
      console.log("No cards in hand to discard.");
      onscreenConsole.log(`No cards available to be KO'd.`);
      updateGameBoard();
      resolve(false);
      return;
    }

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const selectionRow2 = document.querySelector(
      ".card-choice-popup-selectionrow2",
    );
    const selectionRow1Label = document.querySelector(
      ".card-choice-popup-selectionrow1label",
    );
    const selectionRow2Label = document.querySelector(
      ".card-choice-popup-selectionrow2label",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );

    // Set popup content based on bystander availability
    titleElement.textContent = "Black Widow - Dangerous Rescue";
    if (hasBystanders) {
      instructionsElement.innerHTML = `Select a card to KO and rescue a <span class="bold-spans">Bystander</span>`;
    } else {
      instructionsElement.innerHTML = `There are no Bystanders available, but would you like to KO a card?`;
    }

    // Show both rows and labels
    selectionRow1Label.style.display = "block";
    selectionRow2Label.style.display = "block";
    selectionRow2.style.display = "flex";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "block";
    selectionRow1Label.textContent = "Hand";
    selectionRow2Label.textContent = "Discard Pile";
    document.querySelector(".card-choice-popup-closebutton").style.display =
      "none";

    // Reset row heights to default
    selectionRow1.style.height = "";
    selectionRow2.style.height = "";

    // Clear existing content
    selectionRow1.innerHTML = "";
    selectionRow2.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedCardImage = null;
    let selectedLocation = null;
    let isDragging = false;

    // Create sorted copies for display only
    const sortedDiscardPile = [...playerDiscardPile];
    const sortedHand = [...playerHand];
    genericCardSort(sortedDiscardPile);
    genericCardSort(sortedHand);

    // Update the confirm button state and instructions
    function updateUI() {
      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      confirmButton.disabled = selectedCard === null;

      if (selectedCard === null) {
        if (hasBystanders) {
          instructionsElement.innerHTML = `Select a card to KO and rescue a <span class="bold-spans">Bystander</span>`;
        } else {
          instructionsElement.innerHTML = `There are no Bystanders available, but would you like to KO a card?`;
        }
      } else {
        if (hasBystanders) {
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd to rescue a Bystander.`;
        } else {
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
        }
      }
    }

    const row1 = selectionRow1;
    const row2Visible = true;

    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "40%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "0";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "none";

    // Initialize scroll gradient detection on the container
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card element helper function
    function createCardElement(card, location, row) {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-location", location);

      // Create card image
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = card.name;
      cardImage.className = "popup-card-image";

      // Hover effects
      const handleHover = () => {
        if (isDragging) return;

        // Update preview
        previewElement.innerHTML = "";
        const previewImage = document.createElement("img");
        previewImage.src = card.image;
        previewImage.alt = card.name;
        previewImage.className = "popup-card-preview-image";
        previewElement.appendChild(previewImage);

        // Only change background if no card is selected
        if (selectedCard === null) {
          previewElement.style.backgroundColor = "var(--accent)";
        }
      };

      const handleHoverOut = () => {
        if (isDragging) return;

        // Only clear preview if no card is selected AND we're not hovering over another card
        if (selectedCard === null) {
          setTimeout(() => {
            const isHoveringAnyCard =
              selectionRow1.querySelector(":hover") ||
              selectionRow2.querySelector(":hover");
            if (!isHoveringAnyCard && !isDragging) {
              previewElement.innerHTML = "";
              previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            }
          }, 50);
        }
      };

      cardElement.addEventListener("mouseover", handleHover);
      cardElement.addEventListener("mouseout", handleHoverOut);

      // Selection click handler
      cardElement.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (selectedCard === card && selectedLocation === location) {
          // Deselect
          selectedCard = null;
          selectedCardImage = null;
          selectedLocation = null;
          cardImage.classList.remove("selected");
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedCard = card;
          selectedCardImage = cardImage;
          selectedLocation = location;
          cardImage.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";
        }

        updateUI();
      });

      cardElement.appendChild(cardImage);
      row.appendChild(cardElement);
    }

    // Populate row1 with Hand cards (using sorted copy for display)
    sortedHand.forEach((card) => {
      createCardElement(card, "hand", selectionRow1);
    });

    // Populate row2 with Discard Pile cards (using sorted copy for display)
    sortedDiscardPile.forEach((card) => {
      createCardElement(card, "discard", selectionRow2);
    });

    // Set up drag scrolling for both rows
    setupDragScrolling(selectionRow1);
    setupDragScrolling(selectionRow2);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Configure buttons
    confirmButton.disabled = true;
    confirmButton.textContent = "CONFIRM";
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";
    noThanksButton.textContent = "NO THANKS!";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (selectedCard === null || selectedLocation === null) return;

      setTimeout(async () => {
        // Find the card in the original arrays using object reference
        if (selectedLocation === "discard") {
          const index = playerDiscardPile.indexOf(selectedCard);
          if (index !== -1) playerDiscardPile.splice(index, 1);
        } else {
          const index = playerHand.indexOf(selectedCard);
          if (index !== -1) playerHand.splice(index, 1);
        }

        koPile.push(selectedCard);

        // Only rescue bystander if available
        if (hasBystanders) {
          const bystanderCard = bystanderDeck.pop();
          victoryPile.push(bystanderCard);
          onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd. <span class="console-highlights">${bystanderCard.name}</span> rescued.`,
          );
          bystanderBonuses();
          await rescueBystanderAbility(bystanderCard);
        } else {
          onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd.`,
          );
        }

        koBonuses();

        updateGameBoard();
        closeCardChoicePopup();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(`No card was KO'd.`);
      if (hasBystanders) {
        onscreenConsole.log(
          `You chose not to KO any cards to rescue a Bystander.`,
        );
      } else {
        onscreenConsole.log(`You chose not to KO any cards.`);
      }
      closeCardChoicePopup();
      resolve(false);
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
}

function grootGrootAndBranches() {
shardsForRecruitEnabled = true;

onscreenConsole.log(
    `You gain 2 Shards.`,
  );
  
  onscreenConsole.log(
    `You may spend Shards to get <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons"> this turn.`,
  );
  
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
shardSupply -= 2;

otherPlayerNoEffect();
}

function otherPlayerNoEffect() {
  onscreenConsole.log(
    `Superpower Ability not activated - "other player" Hero effects do not apply in Solo play.`,
  );
  }

function grootIAmGroot() {
grootRecruitBonus = true;

onscreenConsole.log(
    `When you recruit your next Hero this turn, you gain Shards equal to that Hero's cost.`,
  );
}

function grootRecruitShards(hero) {
  onscreenConsole.log(
    `<span class="console-highlights">${hero.name}</span> has a cost of ${hero.cost} <img src="Visual Assets/Icons/Cost.svg" alt="Cost Icon" class="console-card-icons">. <span class="console-highlights">Groot - I Am Groot</span> gives you ${hero.cost} Shards.`,
  );
  totalPlayerShards += hero.cost;
  shardsGainedThisTurn += hero.cost;
  shardSupply -= hero.cost;
  
  grootRecruitBonus = false;
  }

function rocketRaccoonGrittyScavenger() {

}

function rocketRaccoonTriggerHappy() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const guardiansPlayed = previousCards.filter(
    (item) => item.team && item.team === "Guardians of the Galaxy").length;
  
  if (guardiansPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
onscreenConsole.log(
    `You have played ${guardiansPlayed} Hero${guardiansPlayed === 1 ? '' : 'es'} and gain ${guardiansPlayed} Shard${guardiansPlayed === 1 ? '' : 's'}.`,
  );
totalPlayerShards += guardiansPlayed;
shardsGainedThisTurn += guardiansPlayed;
shardSupply -= guardiansPlayed;
  } else {
    onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Guardians of the Galaxy.svg" alt="Guardians of the Galaxy Icon" class="console-card-icons"> Heroes played. No effect.`,
  );
return();
    }
}

function rocketRaccoonIncomingDetector() {

}

function rocketRaccoonVengeanceIsRocket() {
const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const techPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Tech"),
  ).length;
  
  const masterStrikeCount = koPile.filter((item) => item.name === "Master Strike").length;
  
  if (techPlayed > 0) {
    onscreenConsole.log(
    `<img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
  );
onscreenConsole.log(
    `There are ${masterStrikeCount} Master Strike${masterStrikeCount === 1 ? '' : 's'} in the KO pile and/or stacked next to the Mastermind. You get +${masterStrikeCount} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`,
  );
totalPlayerAttack += masterStrikeCount;
cumulativePlayerAttack += masterStrikeCount;
  } else {
        onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Tech.svg" alt="Tech Icon" class="console-card-icons"> Heroes played. No effect.`,
  );
  return();
    }
}

function starLordElementGuns() {
onscreenConsole.log(
    `You gain 1 Shard.`,
  );
totalPlayerShards += 1;
shardsGainedThisTurn += 1;
shardSupply -= 1;
}

function starLordLegendaryOutlaw() {

}

function starLordImplacedMemoryChip() {
extraDraw();
}

function starLordSentientStarship() {
onscreenConsole.log(
    `You currently control ${playerArtifacts.length} Artifact${playerArtifacts.length === 1 ? '' : 's'} and gain ${playerArtifacts.length} Shard${playerArtifacts.length === 1 ? '' : 's'}.`,
  );
totalPlayerShards += playerArtifacts.length;
shardsGainedThisTurn += playerArtifacts.length;
shardSupply -= playerArtifacts.length;
}
