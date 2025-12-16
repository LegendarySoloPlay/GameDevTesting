// Expansion - Guardians of the Galaxy
// 25.11.25 20.20

// Artifacts Popup

function openArtifactsPopup() {
  const artifactsCardsTable = document.getElementById("artifacts-cards-window-cards");
  artifactsCardsTable.innerHTML = "";

  // Close popup when clicking outside
  const popup = document.getElementById("artifacts-cards-window");
  
  // Remove existing event listener to prevent duplicates
  const clickHandler = (e) => {
    if (e.target === popup) {
      closeArtifactsPopup();
    }
  };
  
  // Remove previous listener if it exists, then add new one
  popup.removeEventListener("click", clickHandler);
  popup.addEventListener("click", clickHandler);

  playerArtifacts.forEach((card) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "artifacts-card-container";

    const imgElement = document.createElement("img");
    imgElement.src = card.image;
    imgElement.alt = card.name;
    imgElement.classList.add("pile-card-image");

    // Apply visual effects based on usage state
    if (card.artifactAbilityUsed === true) {
      imgElement.style.opacity = "0.5";
      cardContainer.style.pointerEvents = "none"; // Note: corrected from cursorEvents
    } else {
      imgElement.style.opacity = "0.9";
      
      // Make card interactive only if not used
      imgElement.classList.add("clickable-card", "telepathic-probe-active");
      imgElement.style.cursor = "pointer";
      imgElement.style.border = "3px solid rgb(198, 169, 104)"; // Fixed syntax error (semicolon to comma)
      
      // Create USE button (visible by default based on your requirements)
      const useButton = document.createElement("div");
      useButton.className = "played-cards-focus-button";
      useButton.innerHTML = `
        <span style="filter: drop-shadow(0vh 0vh 0.3vh black);">
          USE
        </span>`;
      useButton.style.display = "block"; // Changed from "none" to show immediately

      // Use button click handler
      useButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Play sound effect
        if (typeof playSFX === "function") {
          playSFX("focus");
        }
        
        // Check if there's a specific ability function for this card
        // Assuming card has a property like abilityFunction or you have a mapping
        const abilityFunction = card.unconditionalAbility;
        
        if (abilityFunction && typeof abilityFunction === "function") {
          try {
            closeArtifactsPopup();
            // Execute the ability
            await abilityFunction(card);
            
            // Mark the artifact as used for this turn
            card.artifactAbilityUsed = true;
            
          } catch (error) {
            console.error(`Error executing ability for ${card.name}:`, error);
          }
        } else {
          console.error(`Ability function not found for ${card.name}`);
          console.log('You need to define the ability function for this card.');
        }
      });

      cardContainer.appendChild(useButton);
    }

    cardContainer.appendChild(imgElement);
    artifactsCardsTable.appendChild(cardContainer);
  });

  // Show the popup
  popup.style.display = "block";
  const overlay = document.getElementById("played-cards-modal-overlay");
  if (overlay) {
    overlay.style.display = "block";
  }
}

// Add necessary variables to endturn including:

playerArtifacts.forEach(card => {
    // Reset all cards except Time Gem
    if (card.name !== "Time Gem") {
      card.artifactAbilityUsed = false;
    }
  });
  

// Global Variables

let shardSupply = 500;
let totalPlayerShards = 0;
let shardsGainedThisTurn = 0;
let playerArtifacts = [];
let rocketRacoonShardBonus = false;
let grootRecruitBonus = false;
let grootRecruitShards = false;
let shardsForRecruitEnabled = false;
let gamoraGodslayerOne = false;
let gamoraGodslayerTwo = false;

//Add to master strike and ambush completion:

if (rocketRacoonShardBonus) {
  await rocketRaccoonIncomingDetectorDecision();
}

// Villains

function mindGemAmbush(gem) {
const shardsToGain = twistCount;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each Scheme Twist in the KO pile and/or stacked next to the Scheme.`);

gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

function mindGemArtifact() {
onscreenConsole.log(`You get +2 <img src="Visual Assets/Icons/Recruit.svg" alt="Recruit Icon" class="console-card-icons">.`);

totalRecruitPoints += 2;
cumulativeRecruitPoints += 2;
updateGameBoard();
}

function powerGemAmbush(gem) {
const shardsToGain = koPile.filter((card) => card.type === "Master Strike").length + 
                                     koPile.filter((card) => card.name === "Mysterio Mastermind Tactic").length + 
                                     victoryPile.filter((card) => card.name === "Mysterio Mastermind Tactic").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each Master Strike in the KO pile and/or stacked next to the Mastermind.`);

gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

function powerGemArtifact() {
onscreenConsole.log(`You get +2 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);

totalAttackPoints += 2;
cumulativeAttackPoints += 2;
updateGameBoard();
}

function realityGemAmbush(gem) {
const shardsToGain = city.filter((card) => card.team === "Infinity Gems").length + 
                                     escapedVillainsDeck.filter((card) => card.team === "Infinity Gems").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each Infinity Gem Villain card in the city and/or Escape pile.`);

gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

function realityGemArtifact() {

}

function soulGemAmbush(gem) {
const shardsToGain = city.filter((card) => card.type === "Villain").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each Villain in the city.`);

gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

function soulGemArtifact() {
const soulGem = playerArtifacts.find(card => card.name === "Soul Gem");
onscreenConsole.log(`You gain +${soulGem.shards} <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">.`);
totalAttackPoints += soulGem.shards || 0;
cumulativeAttackPoints += soulGem.shards || 0;
updateGameBoard();
}

function spaceGemAmbush(gem) {
const shardsToGain = citySize - city.filter((card) => card.type === "Villain").length;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> gains ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'} for each empty space in the city.`);

gem.shards += shardsToGain;
shardSupply -= shardsToGain;
}

function spaceGemArtifact() {

  if (isCityEmpty()) {
    onscreenConsole.log(`No Villains in the city to move.`);
    return;
  }

  // Elements for the popup and overlay
  const popup = document.getElementById("villain-movement-popup");
  const overlay = document.getElementById("modal-overlay");
  const noThanksButton = document.getElementById("no-thanks-villain-movement");
  const confirmButton = document.getElementById("confirm-villain-movement");
  const selectionArrow = document.getElementById("selection-arrow");
  confirmButton.disabled = true; // Disable the confirm button
    document.getElementById("villain-movement-context").innerHTML =
    "You may move a Villain to another city space. If another Villain is already there, swap them. If you move any Villains this way, gain a Shard.";

  // Elements representing the rows in the table
  const villainCells = {
    bridge: document.getElementById("villain-bridge"),
    streets: document.getElementById("villain-streets"),
    rooftops: document.getElementById("villain-rooftops"),
    bank: document.getElementById("villain-bank"),
    sewers: document.getElementById("villain-sewers"),
  };

  let selectedCells = []; // To store the selected cells

  function isCellDestroyed(cellElement) {
    // Check if this cell contains a destroyed space
    const destroyedImage = cellElement.querySelector(".destroyed-space");
    return (
      destroyedImage !== null &&
      destroyedImage.src.includes("Galactus_MasterStrike.webp")
    );
  }

  function selectCell(cellElement) {
    // Don't allow selection of destroyed spaces (but allow Dark Portal spaces)
    if (isCellDestroyed(cellElement)) {
      console.log("Destroyed space selected, no action.");
      return;
    }

    const cellText = cellElement.textContent.trim();

    // The cell is considered to have a villain if it's not empty and not destroyed
    // Dark Portal spaces can have villains, so we don't exclude them
    const hasVillain = cellText !== "Empty" && !isCellDestroyed(cellElement);

    // 0. If the player selects an Empty cell first, nothing happens.
    if (!hasVillain && selectedCells.length === 0) {
      console.log("Empty cell selected first, no action.");
      return; // Do nothing if the first selected cell is empty
    }

    // If the selected cell is already in selectedCells, deselect it and remove from the array
    if (selectedCells.includes(cellElement)) {
      cellElement.classList.remove("selected");
      selectedCells = selectedCells.filter((cell) => cell !== cellElement);

      // Check if we need to hide the arrow after deselection
      if (selectedCells.length < 2) {
        selectionArrow.style.display = "none";
        confirmButton.disabled = true; // Disable the confirm button
        console.log(
          "Deselected cell, less than two selections, disabling confirm button.",
        );
      }
      return; // Exit early since we're just deselecting
    }

    // 1. If the player selects a villain, highlight it and add to selectedCells.
    if (hasVillain && selectedCells.length === 0) {
      cellElement.classList.add("selected");
      selectedCells.push(cellElement);
      console.log("First villain selected, added to selection.");
    }
    // 2a. If the player then selects a second villain, highlight it and add to selectedCells.
    else if (hasVillain && selectedCells.length === 1) {
      cellElement.classList.add("selected");
      selectedCells.push(cellElement);
      console.log("Second villain selected, added to selection.");
    }
    // 2b. If the player selects an Empty space after selecting a villain, highlight it and add to selectedCells.
    else if (
      !hasVillain &&
      selectedCells.length === 1 &&
      selectedCells[0].textContent.trim() !== "Empty"
    ) {
      cellElement.classList.add("selected");
      selectedCells.push(cellElement);
      console.log("Empty space selected after villain, added to selection.");
    }

    // 3a. If the player selects another cell (villain or empty), deselect the first choice and highlight the new one.
    if (selectedCells.length > 2) {
      const firstCell = selectedCells.shift(); // Remove the first selected cell
      firstCell.classList.remove("selected"); // Remove the highlight from the first cell
      console.log("More than two selections, deselected the first.");
    }

    // 3b. If the player selects another villain after an empty, deselect everything and highlight the new villain.
    if (
      selectedCells.length === 2 &&
      selectedCells[0].textContent.trim() === "Empty"
    ) {
      selectedCells.forEach((cell) => cell.classList.remove("selected"));
      selectedCells = [cellElement];
      cellElement.classList.add("selected");
      console.log("Selected another villain after an empty, reset selections.");
    }

    // Handle drawing the arrow based on the current selection
    if (selectedCells.length === 2) {
      drawArrow(selectedCells[0], selectedCells[1]);

      // Enable the confirm button if valid combination is selected
      if (
        (selectedCells[0].textContent.trim() !== "Empty" &&
          selectedCells[1].textContent.trim() === "Empty") ||
        (selectedCells[0].textContent.trim() !== "Empty" &&
          selectedCells[1].textContent.trim() !== "Empty")
      ) {
        confirmButton.disabled = false; // Enable the confirm button
        console.log("Valid selection made, enabling confirm button.");
      } else {
        confirmButton.disabled = true; // Disable the confirm button if not valid
        console.log("Invalid selection, disabling confirm button.");
      }
    } else {
      selectionArrow.style.display = "none";
      confirmButton.disabled = true; // Disable the confirm button
      console.log("Less than two selections, disabling confirm button.");
    }
  }

  function updateCityCellsInPopup() {
    for (let i = 0; i < city.length; i++) {
      const cityCellKey = Object.keys(villainCells)[i];
      const cityCellElement = villainCells[cityCellKey];
      cityCellElement.innerHTML = ""; // Clear existing content
      cityCellElement.classList.remove("destroyed"); // Remove destroyed class if present

      // Check if this space is destroyed (Master Strike)
      if (destroyedSpaces[i]) {
        // Create a container to hold the card image and overlays
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        cityCellElement.appendChild(cardContainer);

        // Create destroyed space image
        const cardImage = document.createElement("img");
        cardImage.src = "Visual Assets/Masterminds/Galactus_MasterStrike.webp";
        cardImage.alt = "Destroyed City Space";
        cardImage.classList.add("destroyed-space");
        cardContainer.appendChild(cardImage);
        destroyedImage.classList.add("greyed-out");

        cityCellElement.classList.add("destroyed");
        continue; // Skip the rest for destroyed spaces
      }

      // Create a container to hold the card image and overlays
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card-container");
      cityCellElement.appendChild(cardContainer);

      if (city[i]) {
        // Create an img element for the villain
        const cardImage = document.createElement("img");
        cardImage.src = city[i].image;
        cardImage.classList.add("villain-movement-card-image");
        cardContainer.appendChild(cardImage);

        // Add Dark Portal overlay if this space has a Dark Portal
        if (darkPortalSpaces[i]) {
          const darkPortalOverlay = document.createElement("div");
          darkPortalOverlay.className = "dark-portal-overlay";
          darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
          cardContainer.appendChild(darkPortalOverlay);
        }

        // Add the bystander overlay if there are bystanders
        if (city[i].bystander && city[i].bystander.length > 0) {
          const bystanderOverlay = document.createElement("div");
          bystanderOverlay.className = "bystanders-overlay";
          let overlayText = `<span class="bystanderOverlayNumber">${city[i].bystander.length}</span>`;
          let overlayImage = `<img src="${city[i].bystander[0].image}" alt="Captured Hero" class="villain-bystander">`;
          bystanderOverlay.innerHTML = overlayText + overlayImage;
          bystanderOverlay.style.whiteSpace = "pre-line";
          cardContainer.appendChild(bystanderOverlay);
        }

        updateVillainAttackValues(city[i], i);

        const attackFromMastermind = city[i].attackFromMastermind || 0;
        const attackFromScheme = city[i].attackFromScheme || 0;
        const attackFromOwnEffects = city[i].attackFromOwnEffects || 0;
        const attackFromHeroEffects = city[i].attackFromHeroEffects || 0;
        const currentTempBuff = window[`city${i + 1}TempBuff`] || 0;
        const villainShattered = city[i].shattered || 0;
        const totalAttackModifiers =
          attackFromMastermind +
          attackFromScheme +
          attackFromOwnEffects +
          attackFromHeroEffects +
          currentTempBuff -
          villainShattered;

        if (totalAttackModifiers !== 0) {
          const villainOverlayAttack = document.createElement("div");
          villainOverlayAttack.className = "attack-overlay";
          villainOverlayAttack.innerHTML =
            city[i].attack + totalAttackModifiers;
          cardContainer.appendChild(villainOverlayAttack);
        }

        if (city[i].killbot === true) {
          const killbotOverlay = document.createElement("div");
          killbotOverlay.className = "killbot-overlay";
          killbotOverlay.innerHTML = "KILLBOT";
          cardContainer.appendChild(killbotOverlay);
        }

        if (city[i].babyHope === true) {
          const existingOverlay = cardContainer.querySelector(
            ".villain-baby-overlay",
          );
          if (existingOverlay) existingOverlay.remove();

          const babyOverlay = document.createElement("div");
          babyOverlay.className = "villain-baby-overlay";
          babyOverlay.innerHTML = `<img src="Visual Assets/Other/BabyHope.webp" alt="Baby Hope" class="villain-baby">`;
          cardContainer.appendChild(babyOverlay);
        }

        if (city[i].overlayText) {
          const villainOverlay = document.createElement("div");
          villainOverlay.className = "skrull-overlay";
          villainOverlay.innerHTML = `${city[i].overlayText}`;
          cardContainer.appendChild(villainOverlay);
        }

        if (city[i].capturedOverlayText) {
          const capturedVillainOverlay = document.createElement("div");
          capturedVillainOverlay.className = "captured-overlay";
          capturedVillainOverlay.innerHTML = `${city[i].capturedOverlayText}`;
          cardContainer.appendChild(capturedVillainOverlay);
        }

        if (city[i].XCutionerHeroes && city[i].XCutionerHeroes.length > 0) {
          const XCutionerOverlay = document.createElement("div");
          XCutionerOverlay.className = "XCutioner-overlay";

          let XCutionerOverlayImage = `<img src="${city[i].XCutionerHeroes[0].image}" alt="Captured Hero" class="villain-baby">`;
          let XCutionerOverlayText = `<span class="XCutionerOverlayNumber">${city[i].XCutionerHeroes.length}</span>`;
          const selectedScheme = schemes.find(
            (s) =>
              s.name ===
              document.querySelector(
                "#scheme-section input[type=radio]:checked",
              ).value,
          );

          XCutionerOverlay.innerHTML =
            XCutionerOverlayImage + XCutionerOverlayText;
          XCutionerOverlay.style.whiteSpace = "pre-line";

          const XCutionerExpandedContainer = document.createElement("div");
          XCutionerExpandedContainer.className = "expanded-XCutionerHeroes";
          XCutionerExpandedContainer.style.display = "none";

          city[i].XCutionerHeroes.forEach((hero) => {
            const XCutionerHeroElement = document.createElement("span");
            XCutionerHeroElement.className = "XCutioner-hero-name";
            XCutionerHeroElement.textContent = hero.name;
            XCutionerHeroElement.dataset.image = hero.image;

            XCutionerHeroElement.addEventListener("mouseover", (e) => {
              e.stopPropagation();
              showZoomedImage(hero.image);
              const card = cardLookup[normalizeImagePath(hero.image)];
              if (card) updateRightPanel(card);
            });

            XCutionerHeroElement.addEventListener("mouseout", (e) => {
              e.stopPropagation();
              if (!activeImage) hideZoomedImage();
            });

            XCutionerHeroElement.addEventListener("click", (e) => {
              e.stopPropagation();
              activeImage = activeImage === hero.image ? null : hero.image;
              showZoomedImage(activeImage || "");
            });

            XCutionerExpandedContainer.appendChild(XCutionerHeroElement);
          });

          XCutionerOverlay.addEventListener("click", (e) => {
            e.stopPropagation();
            XCutionerExpandedContainer.style.display =
              XCutionerExpandedContainer.style.display === "none"
                ? "block"
                : "none";

            if (XCutionerExpandedContainer.style.display === "block") {
              setTimeout(() => {
                document.addEventListener(
                  "click",
                  (e) => {
                    if (!XCutionerExpandedContainer.contains(e.target)) {
                      XCutionerExpandedContainer.style.display = "none";
                    }
                  },
                  { once: true },
                );
              }, 50);
            }
          });

          cardContainer.appendChild(XCutionerOverlay);
          cardContainer.appendChild(XCutionerExpandedContainer);
        }

        if (city[i].plutoniumCaptured) {
          const plutoniumOverlay = document.createElement("div");
          plutoniumOverlay.innerHTML = `<span class="plutonium-count">${city[i].plutoniumCaptured.length}</span><img src="Visual Assets/Other/Plutonium.webp" alt="Plutonium" class="captured-plutonium-image-overlay">`;
          cardContainer.appendChild(plutoniumOverlay);
        }
      } else {
        // If no villain, add a blank card image
        const blankCardImage = document.createElement("img");
        blankCardImage.src = "Visual Assets/BlankCardSpace.webp";
        blankCardImage.classList.add("villain-movement-card-image");
        cardContainer.appendChild(blankCardImage);

        // Add Dark Portal overlay if this space has a Dark Portal (even if empty)
        if (darkPortalSpaces[i]) {
          const darkPortalOverlay = document.createElement("div");
          darkPortalOverlay.className = "dark-portal-overlay";
          darkPortalOverlay.innerHTML = `<img src="Visual Assets/Schemes/Custom Twists/portalsToTheDarkDimension.webp" alt="Dark Portal" class="dark-portal-image">`;
          cardContainer.appendChild(darkPortalOverlay);
        }
      }

      // Add the temp buff overlay if there is a buff
      const tempBuffVariableName = `city${i + 1}TempBuff`;
      const currentTempBuff = window[tempBuffVariableName];
      if (currentTempBuff !== 0) {
        const tempBuffOverlay = document.createElement("div");
        tempBuffOverlay.className = "temp-buff-overlay-villain-move";
        tempBuffOverlay.innerHTML = `<p>${currentTempBuff} Attack</p>`;
        cardContainer.appendChild(tempBuffOverlay);
      }

      // Add the perm buff overlay if there is a buff
      const permBuffVariableName = `city${i + 1}PermBuff`;
      const currentPermBuff = window[permBuffVariableName];
      if (currentPermBuff !== 0) {
        const permBuffOverlay = document.createElement("div");
        permBuffOverlay.className = "perm-buff-overlay-villain-move";
        permBuffOverlay.innerHTML = `<p>${currentPermBuff} Attack</p>`;
        cardContainer.appendChild(permBuffOverlay);
      }

      // Add click event listener to each cell for selection (only if not destroyed)
      if (!destroyedSpaces[i]) {
        cityCellElement.onclick = () => selectCell(cityCellElement);
      } else {
        cityCellElement.onclick = null; // Remove click handler for destroyed spaces
      }

      // Ensure the cell has the correct class
      cityCellElement.classList.add("city-cell");
    }

    // Add location attack overlays
    const locations = [
      { value: city1LocationAttack, id: "bridge-label" },
      { value: city2LocationAttack, id: "streets-label" },
      { value: city3LocationAttack, id: "rooftops-label" },
      { value: city4LocationAttack, id: "bank-label" },
      { value: city5LocationAttack, id: "sewers-label" },
    ];

    locations.forEach(({ value, id }) => {
      if (value !== 0) {
        const element = document.getElementById(id);
        const existingOverlay = element.querySelector(
          ".location-attack-changes",
        );
        if (existingOverlay) existingOverlay.remove();

        const attackElement = document.createElement("div");
        attackElement.className = "location-attack-changes";
        attackElement.innerHTML = `<p>${value} <img src='Visual Assets/Icons/Attack.svg' alt='Attack Icon' class='console-card-icons'></p>`;
        element.appendChild(attackElement);
      } else {
        const element = document.getElementById(id);
        const existingOverlay = element.querySelector(
          ".location-attack-changes",
        );
        if (existingOverlay) existingOverlay.remove();
      }
    });
  }

  // Function to hide the popup and overlay
  function hidePopup() {
    selectedCells.forEach((cell) => cell.classList.remove("selected"));
    selectedCells = [];
    popup.style.display = "none";
    overlay.style.display = "none";
    selectionArrow.style.display = "none"; // Hide the arrow when the popup is closed
  }

  function drawArrow(cell1, cell2) {
    // Get the bounding box of the popup
    const popupRect = document
      .getElementById("villain-movement-popup")
      .getBoundingClientRect();

    // Get the bounding box of the selected cells
    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();

    // Calculate the bottom center position of each cell relative to the popup
    const posn1 = {
      x: rect1.left - popupRect.left + rect1.width / 2,
      y: rect1.bottom - popupRect.top, // Bottom of the cell
    };
    const posn2 = {
      x: rect2.left - popupRect.left + rect2.width / 2,
      y: rect2.bottom - popupRect.top, // Bottom of the cell
    };

    console.log("Calculated Position 1:", posn1);
    console.log("Calculated Position 2:", posn2);

    // Calculate control points for a curve that goes under the cells
    const controlX = (posn1.x + posn2.x) / 2;
    const controlY = Math.max(posn1.y, posn2.y) + 30; // Adjust the +50 value for more or less curve

    // Create the curved path
    const dStr =
      `M${posn1.x},${posn1.y} ` +
      `C${controlX},${controlY} ${controlX},${controlY} ${posn2.x},${posn2.y}`;

    console.log("Path Data:", dStr);

    const selectionArrow = document.getElementById("selection-arrow");
    selectionArrow.setAttribute("d", dStr);
    selectionArrow.style.display = "block";
  }

  // Update city cells with the current game state in the popup
  updateCityCellsInPopup();

  // Show the popup and overlay
  popup.style.display = "block";
  overlay.style.display = "block";

  noThanksButton.onclick = () => {
    hidePopup();
    onscreenConsole.log(`You chose to not move any Villains.`);
  };

  confirmButton.onclick = async () => {
    if (selectedCells.length === 2) {
      const firstCell = selectedCells[0];
      const secondCell = selectedCells[1];

      // Find the index of the first and second cells in the city array
      const firstIndex = Object.values(villainCells).indexOf(firstCell);
      const secondIndex = Object.values(villainCells).indexOf(secondCell);

      if (firstIndex === -1 || secondIndex === -1) {
        console.error("Could not find the index of the selected cells.");
        return;
      }

      // Debugging: Log the initial state before any operation
      console.log("Initial State:");
      console.log("First Cell:", city[firstIndex]);
      console.log("Second Cell:", city[secondIndex]);

      // Check if the second cell contains the blank card image (i.e., it's empty)
      const secondCellImage = secondCell.querySelector("img"); // Find the image element in the second cell
      if (
        secondCellImage &&
        secondCellImage.src.includes("BlankCardSpace.webp")
      ) {
        // Move the villain to the empty cell
        console.log("Moving villain to empty space");
        onscreenConsole.log(
          `<span class="console-highlights">${city[firstIndex].name}</span> moved to an empty space.`,
        );

        city[secondIndex] = city[firstIndex]; // Move the villain to the new space
        city[firstIndex] = null; // Clear the original space
      } else if (city[secondIndex] && city[firstIndex]) {
        // Both cells have villains, perform the swap
        console.log("Swapping villains");
        console.log("Before Swap:", city[firstIndex], city[secondIndex]);
        onscreenConsole.log(
          `<span class="console-highlights">${city[firstIndex].name}</span> swapped places with <span class="console-highlights">${city[secondIndex].name}</span>.`,
        );

        // Perform the swap
        const temp = city[secondIndex];
        city[secondIndex] = city[firstIndex];
        city[firstIndex] = temp;

        totalPlayerShards += 1;
        shardsGainedThisTurn += 1;
        shardSupply -= 1;

        console.log("After Swap:", city[firstIndex], city[secondIndex]);
      } else {
        console.error("Cannot swap cells: one of the cells is empty.");
        return;
      }

      // Clear selections and update the game board
      selectedCells.forEach((cell) => cell.classList.remove("selected"));
      selectedCells = [];
      selectionArrow.style.display = "none"; // Hide the arrow
      confirmButton.disabled = true; // Disable the confirm button
      popup.style.display = "none";
      overlay.style.display = "none";
      updateGameBoard(); // Update the actual game board with the new state

      // Debugging: Log the final state after the operation
      console.log("Final State:");
      console.log("First Cell:", city[firstIndex]);
      console.log("Second Cell:", city[secondIndex]);
    }
  };
}

async function timeGemAmbush(gem) {
  const topVillainCard = villainDeck[villainDeck.length - 1];

const shardsToGain = topVillainCard.victoryPoints || 0;

onscreenConsole.log(`Ambush! <span class="console-highlights">${gem.name}</span> forces you to play another card from the Villain Deck. You gain ${shardsToGain} Shard${shardsToGain === 1 ? '' : 's'}, equal to that card's printed Victory Points.`);

gem.shards += shardsToGain;
shardSupply -= shardsToGain;

await drawVillainCard();

}

function timeGemArtifact() {
  if (timeGemUsed) {
    onscreenConsole.log(`The <span class="console-highlights">Time Gem</span> can only be used once per game.`);
    return;
  }

  const mastermind = getSelectedMastermind();

if (
    !finalBlowEnabled &&
    mastermind.tactics.length === 0
  ) {
    delayEndGame = true;
    impossibleToDraw = true;
    onscreenConsole.log(
      `You will be able to use the <span class="console-highlights">Time Gem</span> and take one final turn before claiming your victory!`,
    );
    timeGemUsed = true;
    return;
  } else if (
    finalBlowEnabled &&
    mastermind.tactics.length === 0
  ) {
    doomDelayEndGameFinalBlow = true;
    impossibleToDraw = true;
    mastermindDefeatTurn = turnCount;
    onscreenConsole.log(
      `If you deliver the Final Blow this turn, you will be able to use the <span class="console-highlights">Time Gem</span> to take another before claiming your victory!`,
    );
    timeGemUsed = true;
    return;
  } else {
    onscreenConsole.log(`You use the <span class="console-highlights">Time Gem</span> to take another turn after this one.`)
    timeGemUsed = true;
    return;
  }
}

function captainAtlasEscape() {
onscreenConsole.log(`Escape! Each player loses a Shard. Each player that cannot do so gains a Wound.`);
if (totalPlayerShards > 0) {
  totalPlayerShards -= 1;
  shardSupply += 1;
  onscreenConsole.log(`You lose a Shard.`);
} else {
  drawWound();
}
}

async function demonDruidAmbush() {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Demon Druid</span> allows another Villain in the city to gain two Shards.`)
  updateGameBoard();

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
    titleElement.textContent = "DEMON DRUID";
    instructionsElement.textContent =
      "SELECT A VILLAIN IN THE CITY TO GAIN 2 SHARDS:";

    // Clear preview
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCityIndex = null;
    let selectedCell = null;

    // Find Demon Druid to grey them out
    // Check city[4], then city[3], city[2], etc.
    let demonDruidIndex = -1;
    for (let i = 4; i >= 0; i--) {
      if (city[i] && city[i].name === "Demon Druid") {
        demonDruidIndex = i;
        break;
      }
    }

    // Check if there are any villains in city besides Demon Druid
    const eligibleVillainsInCity = city.some(
      (card, index) =>
        card &&
        (card.type === "Villain" || card.type === "Henchman") &&
        !destroyedSpaces[index] &&
        index !== demonDruidIndex
    );

    if (!eligibleVillainsInCity) {
      onscreenConsole.log(
        "There are no eligible Villains in the city to gain Shards.",
      );
      resolve(false);
      return;
    }

    // Function to render city cards
    function renderCityCards() {
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

          // Determine eligibility - Villains and Henchmen are eligible, but NOT Demon Druid
          const isEligible = (card.type === "Villain" || card.type === "Henchman") && 
                           i !== demonDruidIndex;

          // Apply greyed out styling for ineligible cards
          if (!isEligible) {
            cardImage.classList.add("greyed-out");
          } else {
            cardImage.classList.remove("greyed-out");
          }

          // Add overlays for all cards
          addCardOverlays(cardContainer, card, i, 'city');

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
                  "SELECT A VILLAIN TO GIVE +2 SHARDS:";
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
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain 2 Shards.`;
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

    // Initial render
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
    
    // Hide the other choice button (no more switching between city/HQ)
    otherChoiceButton.style.display = "none";

    // Store the original resolve function to use in event handler
    const originalResolve = resolve;

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (selectedCityIndex === null) return;

      // Give 2 shards to the selected villain
      const selectedCard = city[selectedCityIndex];
      if (selectedCard) {
        selectedCard.shards = (selectedCard.shards || 0) + 2;
        onscreenConsole.log(
          `<span class="console-highlights">${selectedCard.name}</span> gains 2 Shards.`,
        );
        shardSupply -= 2;
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
}

function drMinervaAmbush() {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Dr. Minerva</span> allows each Kree Villain in the city to gain a Shard.`);
  for (let i = 0; i < city.length; i++) {
  const card = city[i];
  if (card && card.team === "Kree Starforce" && shardSupply > 0) {
    card.shards += 1;  // Using += instead of =+ (which would be assignment)
    shardSupply -= 1;
  }
}
}

async function korathThePursuerAmbush() {
  return new Promise((resolve) => {
    setTimeout(() => {
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

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `WOULD YOU LIKE TO DRAW A CARD? IF YOU DO, <span class="console-highlights">Korath the Pursuer</span> GAINS A SHARD.`,
        "YES",
        `NO THANKS!`,
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Korath The Pursuer";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('Visual Assets/Villains/GotG_KorathThePursuer.webp')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

     confirmButton.onclick = async function () {
          closeInfoChoicePopup();
          extarDraw();
          korath.shards += 1;
          shardSupply -= 1;
          onscreenConsole.log(`<span class="console-highlights">Korath the Pursuer</span> gains a Shard.`);
          resolve();
          updateGameBoard();
      };

      denyButton.onclick = async function () {
          closeInfoChoicePopup();
          onscreenConsole.log(`You chose not to draw a card. <span class="console-highlights">Korath the Pursuer</span> does not gain a Shard.`);
          resolve();
      };
    }, 10);
  });
}

function korathThePursuerEscape(korath) {
  onscreenConsole.log(`Escape! If <span class="console-highlights">Korath the Pursuer</span> had any Shards, each player gains a Wound.`);
  if (korath.shards && korath.shards > 0) {
  onscreenConsole.log(`<span class="console-highlights">Korath the Pursuer</span> did have Shards.`);
  drawWound();  
  } else {
  onscreenConsole.log(`<span class="console-highlights">Korath the Pursuer</span> did not have any Shards. You escape gaining a Wound.`);
  return;  
  }
  updateGameBoard();
}

function ronanTheAccuserAmbush() {
  onscreenConsole.log(`Ambush! <span class="console-highlights">Ronan the Accuser</span> forces you to accuse yourself.`);
  drawWound();
  updateGameBoard();
}

function ronanTheAccuserEscape() {
  onscreenConsole.log(`Escape! <span class="console-highlights">Ronan the Accuser</span> forces you to accuse yourself.`);
  drawWound();
  updateGameBoard();
}

function shatteraxFight() {
onscreenConsole.log(`Fight! <span class="console-highlights">Shatterax</span> gives each Hero in the HQ a Shard. When you gain a Hero, you gain their Shard. If they leave the HQ some other way, return that Shard to the supply.`);
for (let i = 0; i < hq.length; i++) {
  const card = hq[i];
  if (card && card.type === "Hero" && shardSupply > 0) {
    card.shards += 1;
    shardSupply -= 1;
  }
}
updateGameBoard();
}

function supremorAmbush(supremor) {
  const mastermind = getSelectedMastermind();
  onscreenConsole.log(`Ambush! <span class="console-highlights">Supremor</span> and <span class="console-highlights">${mastermind.name}</span> each gain a Shard.`);
  supremor.shards += 1;
  mastermind.shards += 1;
  shardSupply -= 2;
  updateGameBoard();
}

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
}

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
        `There are no Villains to gain no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`,
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
                instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will gain no <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons"> from Shards this turn.`;
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
}});
}

function gamoraGodslayerBladeOne() {
onscreenConsole.log(
    `You gain 2 Shards.`,
  );
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
shardSupply -= 2;
gamoraGodslayerOne = true;
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

  gamoraGodslayerTwo = true;
}

async function gamoraGodslayerBlade() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if the player deck is empty and needs reshuffling
      if (gamoraGodslayerOne && gamoraGodslayerTwo) {
        resolve();
        return;
      }

      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        `WHICH ABILITY WOULD YOU LIKE TO USE?`,
        "GAIN TWO SHARDS",
        `SPEND 5 SHARDS FOR +10 <img src="Visual Assets/Icons/Attack.svg" alt="Attack Icon" class="console-card-icons">`,
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "Gamora - Godslayer Blade";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage = `url('Visual Assets/Heroes/Guardians of the Galaxy/GotG_Gamora_GodslayerBlade.webp')`;
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      // Disable buttons based on corresponding variables
      if (gamoraGodslayerOne) {
        confirmButton.disabled = true;
        confirmButton.style.opacity = "0.5";
        confirmButton.style.cursor = "not-allowed";
      }

      if (gamoraGodslayerTwo) {
        denyButton.disabled = true;
        denyButton.style.opacity = "0.5";
        denyButton.style.cursor = "not-allowed";
      }

      confirmButton.onclick = async function () {
        if (!gamoraGodslayerOne) {
          closeInfoChoicePopup();
          resolve();
          gamoraGodslayerBladeOne();
        }
      };

      denyButton.onclick = async function () {
        if (!gamoraGodslayerTwo) {
          closeInfoChoicePopup();
          resolve();
          gamoraGodslayerBladeTwo();
        }
      };
    }, 10);
  });
}

function grootSurvivingSprig() {
nextTurnDrawCount += 1;
onscreenConsole.log(`You will draw an extra card at the end of this turn.`);
}

function grootPruneTheGrowths() {
return new Promise((resolve) => {
   const previousCards = cardsPlayedThisTurn.slice(0, -1);

  const strengthPlayed = previousCards.filter(
    (item) => item.classes && item.classes.includes("Strength"),
  ).length;
  
  if (strengthPlayed === 0) {
    onscreenConsole.log(
    `No <img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. No effect.`,
  );
  resolve(false);
  return;
}

  onscreenConsole.log(
      `<img src="Visual Assets/Icons/Strength.svg" alt="Strength Icon" class="console-card-icons"> Hero played. Superpower Ability activated.`,
    );

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
    titleElement.textContent = "Groot - Groot and Branches";
    instructionsElement.innerHTML = `You may KO a card from your hard or discard pile. If you do, gain a Shard.`;

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
        instructionsElement.innerHTML = `You may KO a card from your hard or discard pile. If you do, gain a Shard.`;
      } else {
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${selectedCard.name}</span> will be KO'd.`;
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
        closeCardChoicePopup();
        koPile.push(selectedCard);
        onscreenConsole.log(
            `<span class="console-highlights">${selectedCard.name}</span> has been KO'd. You gain a Shard.`,
          );
        koBonuses();
          totalPlayerShards += 1;
          shardsGainedThisTurn += 1;
        
          shardSupply -= 1;
        updateGameBoard();
        resolve();
      }, 100);
    };

    // No Thanks button handler
    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(`No card was KO'd.`);
        onscreenConsole.log(
          `You chose not to KO any cards to gain a Shard.`,
        );
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
return new Promise((resolve) => {
    if (playerHand.length === 0) {
      onscreenConsole.log("You have no cards available to discard.");
      resolve();
      return;
    }

    // Sort the hand FIRST, before any processing
    genericCardSort(playerHand);

    updateGameBoard();

    const cardchoicepopup = document.querySelector(".card-choice-popup");
    const modalOverlay = document.getElementById("modal-overlay");
    const selectionRow1 = document.querySelector(
      ".card-choice-popup-selectionrow1",
    );
    const selectionContainer = document.querySelector(
      ".card-choice-popup-selection-container",
    );
    const previewElement = document.querySelector(".card-choice-popup-preview");
    const titleElement = document.querySelector(".card-choice-popup-title");
    const instructionsElement = document.querySelector(
      ".card-choice-popup-instructions",
    );
    const closeButton = document.querySelector(
      ".card-choice-popup-closebutton",
    );

    // Set popup content
    titleElement.textContent = "Rocket Raccoon - Gritty Scavenger";
    instructionsElement.innerHTML =
      "You may discard a card. If you do, draw a card.";

    // Hide row labels and row2, show close button for "No Thanks"
    document.querySelector(
      ".card-choice-popup-selectionrow1label",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2label",
    ).style.display = "none";
    document.querySelector(".card-choice-popup-selectionrow2").style.display =
      "none";
    document.querySelector(
      ".card-choice-popup-selectionrow2-container",
    ).style.display = "none";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.height = "50%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.top = "28%";
    document.querySelector(
      ".card-choice-popup-selectionrow1-container",
    ).style.transform = "translateY(-50%)";
    closeButton.style.display = "block";

    // Clear existing content
    selectionRow1.innerHTML = "";
    previewElement.innerHTML = "";
    previewElement.style.backgroundColor = "var(--panel-backgrounds)";

    let selectedCard = null;
    let selectedIndex = null;
    let selectedCardImage = null;
    let isDragging = false;

    const row1 = selectionRow1;
    const row2Visible = false;

    // Initialize scroll gradient detection
    setupIndependentScrollGradients(row1, row2Visible ? selectionRow2 : null);

    // Create card elements for each card in hand
    playerHand.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.className = "popup-card";
      cardElement.setAttribute("data-card-id", card.id);
      cardElement.setAttribute("data-card-index", index); // Store index for reference

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
            if (!selectionRow1.querySelector(":hover") && !isDragging) {
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

        const thisIndex = Number(cardElement.getAttribute("data-card-index"));

        if (selectedCard === card) {
          // Deselect
          selectedCard = null;
          selectedIndex = null;
          cardImage.classList.remove("selected");
          selectedCardImage = null;
          previewElement.innerHTML = "";
          previewElement.style.backgroundColor = "var(--panel-backgrounds)";

          // Update instructions and confirm button
          instructionsElement.innerHTML =
            "You may discard a card. If you do, draw a card.";
          document.getElementById("card-choice-popup-confirm").disabled = true;
        } else {
          // Deselect previous
          if (selectedCardImage) {
            selectedCardImage.classList.remove("selected");
          }

          // Select new
          selectedCard = card;
          selectedIndex = thisIndex;
          selectedCardImage = cardImage;
          cardImage.classList.add("selected");

          // Update preview
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          previewElement.style.backgroundColor = "var(--accent)";

          // Update instructions and confirm button
          instructionsElement.innerHTML = `Selected: <span class="console-highlights">${card.name}</span> will be discarded.`;
          document.getElementById("card-choice-popup-confirm").disabled = false;
        }
      });

      cardElement.appendChild(cardImage);
      selectionRow1.appendChild(cardElement);
    });

    if (playerHand.length > 20) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.add("three-row"); // Add a special class for 3-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "75%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "40%";
      selectionRow1.style.gap = "0.3vw";
    } else if (playerHand.length > 10) {
      selectionRow1.classList.add("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles when in multi-row mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else if (playerHand.length > 5) {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "42%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "25%";
    } else {
      selectionRow1.classList.remove("multi-row");
      selectionRow1.classList.remove("three-row"); // Remove 3-row class if present
      // Reset container styles for normal mode
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
    }

    // Drag scrolling functionality
    setupDragScrolling(selectionRow1);

    // Set up button handlers
    const confirmButton = document.getElementById("card-choice-popup-confirm");
    const otherChoiceButton = document.getElementById(
      "card-choice-popup-otherchoice",
    );
    const noThanksButton = document.getElementById(
      "card-choice-popup-nothanks",
    );

    // Configure buttons
    confirmButton.textContent = "Discard Selected Card";
    confirmButton.disabled = true; // Initially disabled until card is selected
    otherChoiceButton.style.display = "none";
    noThanksButton.style.display = "block";

    // Confirm button handler
    confirmButton.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!selectedCard || selectedIndex === null) return;
      closeCardChoicePopup();

      // Use the stored index to remove the correct card
      if (
        selectedIndex >= 0 &&
        selectedIndex < playerHand.length &&
        playerHand[selectedIndex] === selectedCard
      ) {
        const discardedCard = playerHand.splice(selectedIndex, 1)[0];

        const { returned } =
          await checkDiscardForInvulnerability(discardedCard);
        if (returned.length) {
          playerHand.push(...returned);
        }
      } else {
        // Fallback: find by ID if index doesn't match (shouldn't happen with proper sorting)
        const index = playerHand.findIndex(
          (card) => card.id === selectedCard.id,
        );
        if (index !== -1) {
          const discardedCard = playerHand.splice(index, 1)[0];
          const { returned } =
            await checkDiscardForInvulnerability(discardedCard);
          if (returned.length) {
            playerHand.push(...returned);
          }
        }
      }
      extraDraw();
      updateGameBoard();
      resolve();
    };

    // Close button handler (No Thanks action)
    closeButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(`You chose not to discard.`);
      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    noThanksButton.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onscreenConsole.log(`You chose not to discard.`);
      closeCardChoicePopup();
      updateGameBoard();
      resolve();
    };

    // Show popup
    modalOverlay.style.display = "block";
    cardchoicepopup.style.display = "block";
  });
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
return;
    }
}

function rocketRaccoonIncomingDetector() {
onscreenConsole.log(
    `Whenever a Master Strike or Villain's Ambush ability is completed, you may gain a Shard.`,
  );
rocketRacoonShardBonus = true;
}

async function rocketRaccoonIncomingDetectorDecision() {
    return new Promise((resolve) => {

    setTimeout(() => {
      const { confirmButton, denyButton } = showHeroAbilityMayPopup(
        "DO YOU WISH TO GAIN A SHARD?",
        "Yes",
        "No Thanks!",
      );

      // Update title
      document.querySelector(".info-or-choice-popup-title").innerHTML =
        "ROCKECT RACCOON - INCOMING DETECTOR";

      // Hide close button
      document.querySelector(
        ".info-or-choice-popup-closebutton",
      ).style.display = "none";

      // Use preview area for images
      const previewArea = document.querySelector(
        ".info-or-choice-popup-preview",
      );
      if (previewArea) {
        previewArea.style.backgroundImage =
          "url('Visual Assets/Heroes/Guardians of the Galaxy/GotG_RocketRaccoon_IncomingDetector.webp')";
        previewArea.style.backgroundSize = "contain";
        previewArea.style.backgroundRepeat = "no-repeat";
        previewArea.style.backgroundPosition = "center";
        previewArea.style.display = "block";
      }

      confirmButton.onclick = () => {
        onscreenConsole.log(
          `You gain a Shard.`,
        );
        totalPlayerShards += 1;
        shardsGainedThisTurn += 1;
        shardSupply -= 1;
        closeInfoChoicePopup();
        resolve();
      };

      denyButton.onclick = () => {
        onscreenConsole.log(
          `You have chosen not to gain a Shard.`,
        );
        closeInfoChoicePopup();
        resolve();
      };
    }, 10);
  });
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
  return;
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
  return new Promise((resolve, reject) => {
    try {
      if (playerArtifacts.length === 0) {
        console.log("No Artifacts available to copy.");
        onscreenConsole.log("No Artifacts available to copy.");
        resolve(false);
        return;
      }

      updateGameBoard();

      const cardchoicepopup = document.querySelector(".card-choice-popup");
      const modalOverlay = document.getElementById("modal-overlay");
      const selectionRow1 = document.querySelector(
        ".card-choice-popup-selectionrow1",
      );
      const previewElement = document.querySelector(
        ".card-choice-popup-preview",
      );
      const titleElement = document.querySelector(".card-choice-popup-title");
      const instructionsElement = document.querySelector(
        ".card-choice-popup-instructions",
      );
      const closeButton = document.querySelector(
        ".card-choice-popup-closebutton",
      );

      titleElement.textContent = "Star-Lord - Legendary Outlaw";
      instructionsElement.innerHTML =
        `Choose an Artifact you control with a "once per turn" ability. Play a copy of one of those abilities.`;

      document.querySelector(
        ".card-choice-popup-selectionrow1label",
      ).style.display = "none";
      document.querySelector(
        ".card-choice-popup-selectionrow2label",
      ).style.display = "none";
      document.querySelector(".card-choice-popup-selectionrow2").style.display =
        "none";
      document.querySelector(
        ".card-choice-popup-selectionrow2-container",
      ).style.display = "none";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.height = "50%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.top = "28%";
      document.querySelector(
        ".card-choice-popup-selectionrow1-container",
      ).style.transform = "translateY(-50%)";

      selectionRow1.innerHTML = "";
      previewElement.innerHTML = "";
      previewElement.style.backgroundColor = "var(--panel-backgrounds)";

      let selectedCard = null;
      let selectedCardImage = null;
      let isDragging = false;

      // ✨ Use a sorted copy (don't mutate playerHand)
      const handForUI = [...playerArtifacts];
      genericCardSort(handForUI);

      setupIndependentScrollGradients(selectionRow1, null);

      handForUI.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "popup-card";

        const cardImage = document.createElement("img");
        cardImage.src = card.image;
        cardImage.alt = card.name;
        cardImage.className = "popup-card-image";

        const handleHover = () => {
          if (isDragging) return;
          previewElement.innerHTML = "";
          const previewImage = document.createElement("img");
          previewImage.src = card.image;
          previewImage.alt = card.name;
          previewImage.className = "popup-card-preview-image";
          previewElement.appendChild(previewImage);
          if (selectedCard === null)
            previewElement.style.backgroundColor = "var(--accent)";
        };

        const handleHoverOut = () => {
          if (isDragging) return;
          if (selectedCard === null) {
            setTimeout(() => {
              if (!selectionRow1.querySelector(":hover") && !isDragging) {
                previewElement.innerHTML = "";
                previewElement.style.backgroundColor =
                  "var(--panel-backgrounds)";
              }
            }, 50);
          }
        };

        cardElement.addEventListener("mouseover", handleHover);
        cardElement.addEventListener("mouseout", handleHoverOut);

        cardElement.addEventListener("click", (e) => {
          if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          if (selectedCard === card) {
            selectedCard = null;
            cardImage.classList.remove("selected");
            selectedCardImage = null;
            previewElement.innerHTML = "";
            previewElement.style.backgroundColor = "var(--panel-backgrounds)";
            instructionsElement.innerHTML =
              'Choose an Artifact you control with a "once per turn" ability. Play a copy of one of those abilities.';
            document.getElementById("card-choice-popup-confirm").disabled =
              true;
          } else {
            if (selectedCardImage)
              selectedCardImage.classList.remove("selected");
            selectedCard = card;
            selectedCardImage = cardImage;
            cardImage.classList.add("selected");

            previewElement.innerHTML = "";
            const previewImage = document.createElement("img");
            previewImage.src = card.image;
            previewImage.alt = card.name;
            previewImage.className = "popup-card-preview-image";
            previewElement.appendChild(previewImage);
            previewElement.style.backgroundColor = "var(--accent)";

            instructionsElement.innerHTML = `Selected: A copy of <span class="console-highlights">${card.name}</span><span class="bold-spans">'s</span> ability will be played.`;
            document.getElementById("card-choice-popup-confirm").disabled =
              false;
          }
        });

        cardElement.appendChild(cardImage);
        selectionRow1.appendChild(cardElement);
      });

      // existing multi-row sizing logic unchanged …

      setupDragScrolling(selectionRow1);

      const confirmButton = document.getElementById(
        "card-choice-popup-confirm",
      );
      const otherChoiceButton = document.getElementById(
        "card-choice-popup-otherchoice",
      );
      const noThanksButton = document.getElementById(
        "card-choice-popup-nothanks",
      );

      confirmButton.disabled = true;
      otherChoiceButton.style.display = "none";
      noThanksButton.style.display = "none";

      confirmButton.onclick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!selectedCard) return;

        closeCardChoicePopup();

        onscreenConsole.log(
          `You chose to play a copy of <span class="console-highlights">${selectedCard.name}</span><span class="bold-spans">'s</span> "once per turn" ability.`,
        );

        let abilityPromise = Promise.resolve();
        if (
          selectedCard.unconditionalAbility &&
          selectedCard.unconditionalAbility !== "None"
        ) {
          const abilityFunction = window[selectedCard.unconditionalAbility];
          if (typeof abilityFunction === "function") {
            abilityPromise = new Promise((resolveAbility, rejectAbility) => {
              try {
                const result = abilityFunction(selectedCard);
                if (result instanceof Promise) {
                  result.then(resolveAbility).catch(rejectAbility);
                } else {
                  resolveAbility(result);
                }
              } catch (error) {
                rejectAbility(error);
              }
            });
          } else {
            console.error(
              `Unconditional ability function ${selectedCard.unconditionalAbility} not found`,
            );
          }
        }

        try {
          await abilityPromise;
          resolve(true);
        } catch (error) {
          console.error("Error executing ability:", error);
          reject(error);
        }
      };

      modalOverlay.style.display = "block";
      cardchoicepopup.style.display = "block";
    } catch (error) {
      reject(error);
    }
  });
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
