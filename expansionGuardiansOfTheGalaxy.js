// Expansion - Guardians of the Galaxy
// 25.11.25 20.20

// Global Variables
let shardsGainedThisTurn = 0;

//Add to end turn:
shardsGainedThisTurn = 0;

// Heroes

function draxTheDestroyerKnivesOfTheHunter() {
onscreenConsole.log(`You get +1 ATTACK.`);
totalAttackPoints += 1;
cumulativeAttackPoints += 1;
}

function draxTheDestroyerInterstellarTracker() {

}

function draxTheDestroyerTheDestroyer() {

}

function draxTheDestroyerAvatarOfDestruction() {
const currentAttackPoints = totalAttackPoints;
onscreenConsole.log(`You had ${currentAttackPoints} ATTACK. It has doubled to ${totalAttackPoints + currentAttackPoints} ATTACK.`);

totalAttackPoints += currentAttackPoints;
cumulativeAttackPoints += currentAttackPoints;
}

function gamoraBountyHunter() {

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
  } else {
    onscreenConsole.log(
    `You gain 2 Shards.`,
  );
totalPlayerShards += 2;
shardsGainedThisTurn += 2;
    }
}

function gamoraGalacticAssassin() {

}

function gamoraGodslayerBlade() {

}

function grootSurvivingSprig() {
nextTurnDrawCount += 1;
onscreenConsole.log(`You will draw an extra card at the end of this turn.`);
}

function grootPruneTheGrowths() {

}

function grootGrootAndBranches() {

}

function grootIAmGroot() {

}

function rocketRaccoonGrittyScavenger() {

}

function rocketRaccoonTriggerHappy() {

}

function rocketRaccoonIncomingDetector() {

}

function rocketRaccoonVengeanceIsRocket() {

}

function starLordElementGuns() {

}

function starLordLegendaryOutlaw() {

}

function starLordImplacedMemoryChip() {
extraDraw();
}

function starLordSentientStarship() {

}
