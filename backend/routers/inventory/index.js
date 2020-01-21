const express = require('express');

const User = require('../../models/User');
const Character = require('../../models/Character');

const router = express.Router();

// i need to be sure how im going to check the userid and character
// we need to verifie this stuff when you are logged and select your character
router.post('/', async (req, res, next) => {
    const { from, to, charId } = req.body;
    try {
        let character = await Character.findById(charId);
        if(!character) {
            res.json({
                error: 'Invalid Char ID.'
            });
            return;
        }
        //here i have depot, character inventory and loot
        let allSlots = character.slots;
        if(!allSlots[from.location] || !allSlots[to.location]) {
            res.json({
                error: 'This location doesnt exist.'
            });
            return;
        }
        if(!allSlots[from.location][from.position] || !allSlots[to.location][to.position]) {
            if(!allSlots[from.location][from.position] && allSlots[from.location][from.position] !== 0) {
                res.json({
                    error: 'This position doesnt exist.'
                });
                return;
            }
            if(!allSlots[to.location][to.position] && allSlots[to.location][to.position] !== 0) {
                res.json({
                    error: 'This position doesnt exist.'
                });
                return;
            }
        }
        if(from.location === to.location && from.position == to.position) {
            //error maybe?
            res.end();
            return;
        }
        //You cant move a item to the loot, only move a item from there
        if(to.location === 'loot') {
            res.json({
                error: 'You cant move a item to the loot slot!'
            });
            return;
        }
        //getting all FROM slots and the specific item thats moving
        const fromSlots = allSlots[from.location];
        let fromItemSlot = fromSlots[from.position];
        //getting all TO slots and the item thats being replaced
        const toSlots = allSlots[to.location];
        const toItemSlot = toSlots[to.position];
        
        //transfering the items to their newest slot
        if(from.location === 'loot') {
            if(toItemSlot !== 0) {
                res.json({
                    error: 'You need to move the loot item to an empty slot'
                });
                return;
            }
            fromSlots.splice(from.position, 1);
            fromSlots.push(0); //.loot.push
            allSlots[from.location] = fromSlots;
            allSlots[to.location][to.position] = fromItemSlot;
        } else {
            if(fromItemSlot.id === toItemSlot.id) {
                if(!from.quantity) {
                    res.json({
                        error: 'Quantity!.'
                    });
                    return;
                }
                const maxStack = toItemSlot.maxStack;
                if(maxStack === 1) {
                    allSlots[from.location][from.position] = toItemSlot;
                    allSlots[to.location][to.position] = fromItemSlot;
                } else {
                    const toQuantity = from.quantity + toItemSlot.quantity <= maxStack ? from.quantity: maxStack - to.quantity;
                    toItemSlot.quantity += toQuantity;
                    fromItemSlot.quantity -= toQuantity;
                    if(fromItemSlot.quantity <= 0) {
                        allSlots[from.location][from.position] = 0;
                    } else {
                        allSlots[from.location][from.position] = fromItemSlot;
                    }
                    allSlots[to.location][to.position] = toItemSlot;
                }
            } else {
                allSlots[from.location][from.position] = toItemSlot;
                allSlots[to.location][to.position] = fromItemSlot;
            }
            
        }
        //saving in the db
        character.slots = allSlots;
        await character.save();
        
        res.json({
            message: 'working',
            character
        });
        return;
                
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;