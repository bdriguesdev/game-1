const express = require('express');

const Monster = require('../../models/Monster');
const User = require('../../models/User');
const HuntingPlaces = require('../../models/HuntingPlaces');
const Character = require('../../models/Character');

const battle = require('./battleAttack.js');

const router = express.Router();

router.post('/', async (req, res, next) => {
    // we can put up all the information about the huntingplaces and stats in the charc info, that would be fast
    // we are doing almos the same thing here as we do in the hunt router
    const { userId, charId } = req.body;
    const character = await Character.findById(charId);
    try {
        if(!character) {
            res.json({
                error: 'This character doenst exist!'
            });
            return;
        }
        const { huntingPlaceId } = character.battleType.huntingPlace;
        const { battle } = character;
        if(huntingPlaceId === '') {
            if(battle.length === 0) {
                res.json({
                    error: 'You dont have anything on the battle/battleList'
                });
                return;
            } else {
                res.json({
                    error: 'Weird shit going on! MONKAS'
                });
                return;
            }
        }
        if(battle.length === 0) {
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
            console.log(monster);
            if(!monster) {
                res.json({
                    error: 'This monster doesnt exist!'
                });
                return;
            }
            character.battle = [monster];
            await character.save()
        }
        res.json({
            message: 'You dont need nothing here mate!'
        });
        //maybe next() ?        
    } catch (error) {
        console.log(error);
    }
});

router.post('/attack', async (req, res) => {
    //maybe search how to invoke a new middleware like a function inside a middleware
    //maybe we can pass some params/query for some special attack? hm
    let { charId, spell } = req.body;
    try {
        let character = await Character.findById(charId);
        if(!character) {
            res.json({
                error: 'This character doenst exist!'
            });
            return;
        }
        if(character.battle.length === 0) {
            res.json({
                error: 'You dont have anything on the battle/battleList'
            });
            return;
        }
        //check if the character has the spell
        if(!character.spells[spell]) {
            res.json({
                error: 'You dont have this spell'
            });
            return;
        }
        //if the character has the spell setting the info of the spell from db here
        spell = character.spells[spell];
        //checking if the char has enough energy to use the spell
        if(character.energy < spell.energy) {
            res.json({
                error: 'This character doesnt have enough energy to use this spell'
            }); 
            return;
        }
        const { newCharacter, itemsDroppedQuant, characterAttack, monsterAttack } = await battle(character, spell);
        //character = newCharacter;
        await character.markModified('battle');
        await character.save();
        res.json({
            message: 'Working',
            itemsDroppedQuant,
            charExp: character.experience,
            charGold: character.goldCoins,
            charEnergy: character.energy,
            charHealth: character.health,
            monsterHealth: character.battle[0].health,
            characterAttack,
            monsterAttack,
            character
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/use', async (req, res) => {
    try {
        const { charId, from} = req.body;
        const character = await Character.findById(charId);
        if(!character) {
            res.json({
                error: "This character doesn't exist."
            });
        }
        let item;
        if(from.location === "potions") {
            item = character.hotkeys.potions[from.position];
            character.hotkeys.potions[from.position] = 0;
        } else if(from.location === "inventory") {
            item = character.slots.inventory[from.position];
            character.slots.inventory[from.position] = 0;
        } else {
            res.json({
                error: "You can't use this item from here."
            });
        }
        if(item === 0) {
            res.json({
                error: "This slot is empty."
            });
        }
        if(item.type !== 'hotkey') {
            res.json({
                error: "You can't use this item."
            });
        }

        const minHealth = item.health[0];
        const maxHealth = item.health[1];
        const health = Math.floor(Math.random() * (maxHealth - minHealth + 1) + minHealth);
        const newHealth = character.health + health;
        character.health = newHealth > character.maxHealth? character.maxHealth: newHealth; 
        character.markModified('slots');
        character.markModified('hotkeys');
        character.save();

        return res.json({
            character
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/test', async (req, res) => {
    try {
        const { charId } = req.body;
        const character = await Character.findById(charId);
        // const currentMonster = character.battle[0];
        // const playerDmg = character.atkDmg;
        // const monsterDmg = currentMonster.atkDmg;
        character.battle[0].health = character.battle[0].health < character.atkDmg ? 0: character.battle[0].health - character.atkDmg;
        character.health = character.health < character.battle[0].atkDmg ? 0: character.health - character.battle[0].atkDmg;
        await character.markModified('battle');
        await character.save();
        console.log(character);
        res.json({
            message: 'Working',
            'monsterHealth': character.battle[0].health,
            'charHealth': character.health
        });  
    } catch (error) {
        console.log(error);
    }
   
});

module.exports = router;