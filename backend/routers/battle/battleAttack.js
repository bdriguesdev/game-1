const Monster = require('../../models/Monster');
const HuntingPlaces = require('../../models/HuntingPlaces');
const items = require('../../data/items/items');

const damageCalculation = (stats, isBleeding, spell, againstStats, talents) => {
    let totalDamage;
    //crit
    let critMultiplier = 100;
    let critChance = stats.criticalChance;
    if(talents && talents.resistance > 0) {
        againstStats.armor = Math.floor(againstStats.armor * (1 + talents.resistance * 2));
        againstStats.elementalResistence += talents.resistance * 2;
    }
    if(spell) {
        if(talents) {
            critChance += talents.dexterity * 2;
        }
        critChance += spell.criticalChance;
    }
    if(critChance > 0) {
        const critChanceResult = Math.floor(Math.random() * 101) <= critChance;
        if(critChanceResult) {
            critMultiplier += stats.criticalMultiplier + spell.criticalMultiplier;
            if(talents) {
                critMultiplier += talents.dexterity * 2;
            }
        }
    }
    //bleeding
    // if i use bleedchance here isntead of bleedchanceX it conflicts with the spell.bleedchance
    let bleedChance = stats.bleedChance + spell.bleedChance;
    if(talents && talents.strength > 0) {
        bleedChance += talents.strength * 2; 
    }
    if(spell) {
        bleedChance += spell.bleedChance;
    }
    if(bleedChance > 0 && isBleeding === false) {
        const bleedResult =  Math.floor(Math.random() * 101) <= bleedChance;
        if(bleedResult) {
            isBleeding = true;
        }
    }
    //physical damage
    let physicalDamage = stats.physicalDamage;
    if(talents && talents.strength > 0) {
        physicalDamage *= 1 + (talents.strength * 2); 
    }
    if(physicalDamage > 0) {
        if(spell) {
            physicalDamage *= spell.physicalDamage / 100;
        }
        if(isBleeding) {
            physicalDamage *= 1.15;
        }
        //armor
        if(againstStats.armor > 0) {
            physicalDamage *= 1 - (againstStats.armor * 0.15) / 100;
        }
    }
    //fire damage
    let fireDamage = stats.fireDamage;
    if(talents && talents.intelligence > 0) {
        fireDamage *= 1 + (talents.intelligence * 2); 
    }
    if(spell && fireDamage > 0) {
        fireDamage *= spell.elementalDamage / 100;
    }
    //lightning damage
    let lightningDamage = stats.lightningDamage;
    if(talents && talents.intelligence > 0) {
        lightningDamage *= 1 + (talents.intelligence * 2); 
    }
    if(spell && lightningDamage > 0) {
        lightningDamage *= spell.elementalDamage / 100;
    }
    //ele resis
    if(againstStats.elementalResistence > 0) {
        fireDamage *= 1 - againstStats.elementalResistence / 100;
        lightningDamage *= 1 - againstStats.elementalResistence / 100;
    }
    physicalDamage = Math.floor(physicalDamage * (critMultiplier / 100));
    fireDamage = Math.floor(fireDamage * (critMultiplier / 100));
    lightningDamage = Math.floor(lightningDamage * (critMultiplier / 100));
    totalDamage = Math.floor(physicalDamage + fireDamage + lightningDamage);
    return {
        totalDamage,
        physicalDamage,
        fireDamage,
        lightningDamage,
        isBleeding
    };
};

const characterTurn = (characterHealth, characterStats, monsterHealth, monsterStats) => {
    // i need to create the spells to create the dmg, so i dont need to calculate the dmg stuff, just check for defensive stuffs, bleed and crit
};

const monsterTurn = (characterHealth, monster) => {

};

const experience = (character, monsterExp) => {
    //i need to create a new .js file that has this object
    const levels = {
        '1': 0,
        '2': 150,
        '3': 350,
        '4': 500,
        '5': 1000,
        '6': 3000
    };
    character.experience += monsterExp;
    if(character.experience >= character.nextLevel) {
        character.level++;
        character.nextLevel = levels[character.level + 1];
        character.talentPoints += 2;
        character.health += 10;
        character.maxHealth += 10;
        character.stats.physicalDamage += 3;
        character.stats.armor += 5;
    }
    return character;
};

const newMonster = async (characterBattleType) => {
    try {
        const { huntingPlaceId } = characterBattleType.huntingPlace;
        const currentHuntingPlace = await HuntingPlaces.findById(huntingPlaceId);
        if(!currentHuntingPlace) {
            res.json({
                error: 'This hunting place doesnt exist!'
            });
            return;
        }
        const number = Math.floor(Math.random() * currentHuntingPlace.probability + 1);
        const monsterId = currentHuntingPlace.monstersList.filter(monster => {
            return number >= monster.prob[0] && number <= monster.prob[1];
        });
        const monster = await Monster.findById(monsterId[0].monsterId);
        if(!monster) {
            res.json({
                error: 'This monster doesnt exist!'
            });
            return;
        }
        // character = battleDmg(character);
        return [monster];
    } catch (error) {
        console.log(error);
    }
};

const loot = (monsterLoot, lootSlots, monsterGoldDrop) => {
    let itemsDropped = [];
    let goldCoins = 0;
    monsterLoot.forEach(e => {
        const number = Math.floor(Math.random() * 1000 + 1);
        if(number <= e.prob * 10) {
            const itemInfo = items[e.itemId];
            let item = {
                id: itemInfo.id,
                name: itemInfo.name,
                type: itemInfo.type,
                price: itemInfo.price,
                maxStack: itemInfo.maxStack,
                quantity: itemInfo.quantity,
                tier: Math.floor(Math.random() * 3 + 1),
                base: [],
                stats: []
            };
            //base
            item.base = [{
                stat: itemInfo.base[0].stat,
                value: Math.floor(Math.random() * (itemInfo.base[0].range[1] - itemInfo.base[0].range[0] + 1)) + itemInfo.base[0].range[0]
            }]
            //stats
            //usedNumbers is here to prevent to have the same stat more than once, so if the number its already been used its going to generate a new one, until its a new number(new stat)
            const usedNumbers = [];
            for(let x = 0; x < item.tier; x++) {
                let randomNumber = Math.floor(Math.random() * itemInfo.stats.length);
                while(usedNumbers.indexOf(randomNumber) !== -1) {
                    randomNumber = Math.floor(Math.random() * itemInfo.stats.length);
                }
                let stat = itemInfo.stats[randomNumber];
                let newStat = {};
                newStat.stat = stat.stat;
                newStat.value = Math.floor(Math.random() * (stat.range[1] - stat.range[0] + 1)) + stat.range[0];
                usedNumbers.push(randomNumber);
                item.stats.push(newStat);
            }
            itemsDropped.push(item);
        }
    });
    //gold coins drop
    if(monsterGoldDrop.prob > 0) {
        const number = Math.floor(Math.random() * 1000 + 1);
        if(number <= monsterGoldDrop.prob * 10) {
            goldCoins =  Math.floor(Math.random() * (monsterGoldDrop.range[1] - monsterGoldDrop.range[0] + 1)) + monsterGoldDrop.range[0];
        }
    }
    lootSlots = [...itemsDropped, ...lootSlots];
    //here i need to specifie the quantity of slots that i need on the loot stuff
    lootSlots.splice(12);
    return {
        itemsDroppedQuantValue: itemsDropped.length,
        newLootSlots: lootSlots,
        goldCoinsDropped: goldCoins
    };
};

const battle = async (character, spell) => {
    //need to check in the router if the spell exist in the character.
    const characterHealth = character.health;
    const monsterHealth = character.battle[0].health;
    const monster = character.battle[0];

    //subtract the energy thats necessary to use the spell
    character.energy -= spell.energy;
    //object with some info of the attack to the monster from the character
    const characterAttack = damageCalculation(character.stats, character.battle[0].isBleeding, spell, monster.stats);
    //here check if the monster got bleeding in this turn if so its going to save it in the monster info, to know that hes bleeding
    if(characterAttack.isBleeding) {
        character.battle[0].isBleeding = true;
    }
    //here i need to create a monster spell to generate the damage ITS VERY IMPORTANT
    const monsterAttack = damageCalculation(monster.stats, character.isBleeding, monster.spells.basicAttack, character.stats);
    if(monsterAttack.isBleeding) {
        character.isBleeding = true;
    }
    let itemsDroppedQuant = null;
    const newMonsterHealth = monsterHealth - characterAttack.totalDamage;
    character.battle[0].health = newMonsterHealth >= 0 ? newMonsterHealth: 0;
    if(newMonsterHealth <= 0) {
        character.isBleeding = false; 
        //adding experience to the character
        const characterPlusExp = experience(character, character.battle[0].experience);
        character = characterPlusExp;
        //loot
        const { itemsDroppedQuantValue, newLootSlots, goldCoinsDropped } = loot(monster.loot, character.slots.loot, monster.gold);
        itemsDroppedQuant = itemsDroppedQuantValue;
        character.slots.loot = newLootSlots;
        character.goldCoins += goldCoinsDropped;
        //create a new monster
        const newBattle = await newMonster(character.battleType);
        character.battle = newBattle;
    } 
    const newCharacterHealth = characterHealth - monsterAttack.totalDamage;
    character.health = newCharacterHealth >= 0 ? newCharacterHealth: 0;
    //each turn the character receive 1 energy
    character.energy += character.energy + 1 <= 10? 1: 0;
    if(newCharacterHealth <= 0) {
        character.health = character.maxHealth;
        character.goldCoins = parseInt(character.goldCoins * 0.8);
        character.slots.inventory = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    //send the information back to the player?
    return {
        itemsDroppedQuant,
        newCharacter: character,
        monsterAttack,
        characterAttack
    }
    //if create a new monster should i make the player atk it ?
}

module.exports = battle;