const express = require('express');

const Character = require('../../models/Character');
const User = require('../../models/User');

const router = express.Router();

router.post('/create', async (req, res) => {
    // create a handle and validate for invalid body or the creation of user ( email,,, vocation,.. etc) 
    const { userId, name} = req.body;
    console.log(userId);
    if(!userId) {
        res.json({
            error: 'You need to send a valid user ID!'
        });
        return;
    }
    try {
        const user = await User.findById(userId);
        if(!user) {
            res.json({
                error: 'You need to send a valid user ID!'
            });
            return;
        }
        
        let character = new Character({
            name,
            vocation: 'warrior'
        });
        //character.stats.physicalDamage = 20;
        await character.save();
        user.characters.push(character._id);
        await user.save();
        console.log(character);
        res.json({
            message: 'Character created!',
            character
        });
        return;

    } catch (error) {
        console.log(error);
        res.json({
            error: error
        });
    }
    
});

router.post('/set', async (req, res, next) => {
    //
    //  WHAT HAPPEN IF IM REMOVING A ITEM FROM SET TO INV => DO THE SCRIPT PUT 0 IN THE SLOT?
    //  I ALSO NEED TO CREATE THE SET INSIDE THE CHARACTER MODEL
    //
    const { charId, from, to } = req.body;
    console.log(to);
    try {
        let character = await Character.findById(charId);
        if(!character) {
            res.json({
                error: 'This character doesnt exist!'
            });
            return;
        }
        let oldItemSet;
        let newItemSet;
        if(from.location === 'set') {
            oldItemSet = character.set[from.position]
            newItemSet = character.slots[to.location][to.position];
        } else {
            oldItemSet = character.set[to.position];
            newItemSet = character.slots[from.location][from.position];  
        }
        
        if(from.position === 'loot') {
            res.json({
                error: `You cant move a item to the set from loot.`
            });
            return;
        }
        if(newItemSet.type !== to.position && to.position !== 'weapon1' && to.position !== 'weapon2') {
            if(newItemSet !== 0) {
                console.log(to, newItemSet);
                res.json({
                    error: `This slot only accept ${to.position} items.`
                });
                return; 
            }
        }
        if(newItemSet === 0 && from.location !== 'set') {
            res.json({
                error: `You need to move an actual item to the set!`
            });
            return;
        }
        //if has a item in the slot here im going to remove the stats that this item is providing the character
        if(oldItemSet !== 0) {
            oldItemSet.base.forEach(statInfo => {
                if(stat === 'health') {
                    character.health -= statInfo.value;
                }
                else {
                    character.stats[statInfo.stat] -= statInfo.value;
                }
            });
            oldItemSet.stats.forEach(statInfo => {
                if(stat === 'health') {
                    character.health -= statInfo.value;
                }
                else {
                    character.stats[statInfo.stat] -= statInfo.value;
                }
            });
        }
        //adding the new stats from the new item placed in the set
        if(newItemSet !== 0) {
            newItemSet.base.forEach(statInfo => {
                if(stat === 'health') {
                    character.health += statInfo.value;
                }
                else {
                    character.stats[statInfo.stat] += statInfo.value;
                }
            });
            newItemSet.stats.forEach(statInfo => {
                if(stat === 'health') {
                    character.health += statInfo.value;
                }
                else {
                    character.stats[statInfo.stat] += statInfo.value;
                }
            });
        }
        
        if(to.position === 'weapon1' || to.position === 'weapon2') {
            if(newItemSet.type !== 'sword' && newItemSet.type !== 'axe' && newItemSet.type !== 'shield') {
                res.json({
                    error: 'This slot dont accept this item! Only sword/axe/shield.'
                });
                return;
            }
            if(character.set[`weapon${to.position[to.position.length - 1] === '1'? '2': '1'}`].type === 'shield' && newItemSet.type === 'shield') {
                res.json({
                    error: 'You cant use 2 shields.'
                });
                return;
            }
        } else if(from.position === 'weapon1' || from.position === 'weapon2') {
            if(newItemSet.type !== 'sword' && newItemSet.type !== 'axe' && newItemSet.type !== 'shield') {
                res.json({
                    error: 'This slot dont accept this item! Only sword/axe/shield.'
                });
                return;
            }
            if(character.set[`weapon${from.position[from.position.length - 1] === '1'? '2': '1'}`].type === 'shield' && newItemSet.type === 'shield') {
                res.json({
                    error: 'You cant use 2 shields.'
                });
                return;
            }
        }
        //changing locations
        character.set[to.position] = newItemSet;
        character.slots[from.location][from.position] = oldItemSet;

        res.json({
            character
        });
        return;
        
    } catch (error) {
        console.log(error);
    }
});

router.post('/hotkeys', async (req, res, next) => {
    const { charId, from, to } = req.body;
    
    try {
        let character = await Character.findById(charId);
        let charHotkeys = character.hotkeys;
        let charInventory = character.slots.inventory;
        if(!character) {
            res.json({
                error: 'This character doesnt exist.'
            });
            return;
        }
        if(to.location === 'potions') {
            const potion = charInventory[from.position].type;
            const toItem = charHotkeys[to.location][to.position];
            if(!potion) {
                res.json({
                    error: 'This item doesnt exist.'
                });
                return;
            }
            if(!toItem) {
                res.json({
                    error: 'This item doesnt exist.'
                });
                return;
            }
            if(from.location !== 'inventory') {
                res.json({
                    error: 'You can only move a potion from your character inventory.'
                });
                return;
            }
            if(potion !== 'potion') {
                res.json({
                    error: 'You can only move a potion there.'
                });
                return;
            }
            if(to.position > 3 && to.position < 0 ) {
                res.json({
                    error: 'You cant move the potion to this position.'
                });
                return;
            }
            charInventory[from.position] = toItem;
            charHotkeys[to.location][to.position] = potion;
            character.slots.inventory = charInventory;
            character.hotkeys = charHotkeys;
        } else if (to.location === 'spells') {
            const spellName = to.spell;
            if(!character.spells[spellName]) {
                res.json({
                    error: 'You dont have this spell.'
                });
                return;
            }
            charHotkeys[to.location][to.position] = character.spells[spellName];
            character.hotkeys = charHotkeys;
        } else {
            res.json({
                error: 'This place doesnt exist.'
            });
            return;
        }

        await character.save();
        
        return character;

    } catch (error) {
        console.log(error);
    }
});

router.post('/talents', async (req, res, next) => {
    const { charId } = req.body;
    const newTalents = req.body.talents;
    try {
        if(!newTalents.strength || !newTalents.dexterity || !newTalents.intelligence || !newTalents.resistance) {
            if(!newTalents.strength && newTalents.strength !== 0) {
               res.json({
                error: 'Error.'
                });
                return; 
            }
            if(!newTalents.dexterity && newTalents.dexterity !== 0) {
                res.json({
                error: 'Error.'
                });
                return; 
            }
            if(!newTalents.intelligence && newTalents.intelligence !== 0) {
            res.json({
                error: 'Error.'
                });
                return; 
            }
            if(!newTalents.resistance && newTalents.resistance !== 0) {
            res.json({
                error: 'Error.'
                });
                return; 
            }
        }
        const character = await Character.findById(charId);
        if(!character) {
            res.json({
                error: 'This character doesnt exist.'
            });
            return;
        }
        const talentPoints = character.talentPoints;
        let countingPoints = 0;
        countingPoints += newTalents.strength;
        countingPoints += newTalents.dexterity;
        countingPoints += newTalents.intelligence;
        countingPoints += newTalents.resistance;
        if(countingPoints > talentPoints) {
            res.json({
                error: 'You need more talent points.'
            });
            return;
        }
        character.talents = newTalents;
        await character.save();

        res.json(character);
        return;
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;