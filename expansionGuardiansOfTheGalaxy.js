// Expansion - Guardians of the Galaxy
// 25.11.25 20.20

// Global Variables

let shardSupply = 500;
let totalPlayerShards = 0;
let shardsGainedThisTurn = 0;

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

}

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
    `You spent 5 Shards and gained +10 ATTACK.`,
  );
  
}

function grootSurvivingSprig() {
nextTurnDrawCount += 1;
onscreenConsole.log(`You will draw an extra card at the end of this turn.`);
}

function grootPruneTheGrowths() {

}

function grootGrootAndBranches() {
shardsForRecruitEnabled = true;

onscreenConsole.log(
    `You gain 2 Shards.`,
  );
  
  onscreenConsole.log(
    `You may spend Shards to get RECRUIT this turn.`,
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
    `<span class="console-highlights">${hero.name}</span> has a cost of ${hero.cost} COST. <span class="console-highlights">Groot - I Am Groot</span> gives you ${hero.cost} Shards.`,
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
