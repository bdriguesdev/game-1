const express = require('express');

const Character = require('../../models/Character');

const router = express.Router();

router.post('/', async (req, res, next) => {
    // i need to create the shop object with the items thats going to sell there
    const { charId, from, to } = req.body;
    const shop = [0,0,0,0,0,0,0,0,0,0,0,0];
    const tierPercentPrice = [0,0.3,0.8];
    const itemShop = shop[from.position];

    try {
        if(from.location !== 'inventory' && from.location !== 'shop') {
            res.json({
                error: 'FROM Error.'
            });
            return;
        }
        if(to.location !== 'inventory' && to.location !== 'shop') {
            res.json({
                error: 'TO Error.'
            });
            return;
        }
        let character = await Character.findById(charId);
        if(!character) {
            res.json({
                error: 'This character doesnt exist.'
            });
            return;
        }
        
        if(from.location ===  'shop') {
            if(to.location === 'shop' || !from.quantity) {
                res.json({
                    error: 'Error.'
                });
                return;
            }
            if(!shop[from.position] || shop[from.position] === 0) {
                res.json({
                    error: 'This item doesnt exist in the shop.'
                });
                return;
            }
            let inventoryItem = character.slots.inventory[to.position];
            if(inventoryItem !== 0 && inventoryItem.name !== itemShop.name) {
                res.json({
                    error: 'You already have a item in this slot.'
                });
                return;
            }
            if(from.quantity < 1 || from.quantity > itemShop.maxStack || inventoryItem.quantity === inventoryItem.maxStack) {
                res.json({
                    error: 'Quantity/maxstack error.'
                });
                return;
            }
            //here im checking if the player has free stacks to buy the amount of the item that he wants, if not buy the max we can
            const itemQuantity = inventoryItem.maxStack - inventoryItem.quantity < from.quantity ? inventoryItem.maxStack - inventoryItem.quantity: from.quantity; 
            const price = itemShop.price * itemQuantity;
            if(character.goldCoins < price) {
                res.json({
                    error: 'You dont have enough gold.'
                });
                return;
            }
            inventoryItem.quantity += itemQuantity;
            character.goldCoins -= price;
            character.slots.inventory[to.position] = inventoryItem;
            //maybe i dont need the item shop here, i just need to see if the item sells here
            //above im only doing if the inv slot its empty i also need to do this if the inv slot has the same item thats stackable
            //stackable items
        } else {
            if(to.location === 'shop') {
                if(!from.quantity) {
                    res.json({
                        error: 'Quantity error.'
                    });
                    return;
                }
                const item = character.slots.inventory[from.position];
                if(item.quantity < from.quantity) {
                    res.json({
                        error: 'Quantity error.'
                    });
                    return;
                } else if (from.quantity > 1) {
                    if(item.quantity - from.quantity === 0) {
                        character.slots.inventory[from.position] = 0;
                    } else {
                        item.quantity -= from.quantity;
                        character.slots.inventory[from.position] = item;
                    }
                } else {
                    character.slots.inventory[from.position] = 0;
                }
                character.goldCoins += Math.ceil((item.price * from.quantity) * (1 + tierPercentPrice[item.tier - 1]));
            } else {
                if(!from.quantity) {
                    res.json({
                        error: 'Quantity error.'
                    });
                    return;
                }
                let fromItem = character.slots.inventory[from.position];
                let toItem = character.slots.inventory[to.position];
                if(fromItem.name !== toItem.name) {
                    //move the items
                    character.slots.inventory[to.position] = fromItem;
                    character.slots.inventory[from.position] = toItem;
                } else {
                    const maxStack = from.maxStack;
                    if(maxStack === 1) {
                        res.end();
                        return;
                    }
                    const toQuantity = maxStack - to.quantity < from.quantity ? maxStack - to.quantity: from.quantity;
                    if(fromItem.quantity - toQuantity === 0) {
                        character.slots.inventory[from.position] = 0;
                    } else {
                        character.slots.inventory[from.position].quantity -= toQuantity;
                    }
                    toItem.quantity += toQuantity;
                    character.slots.inventory[to.position].quantity += toQuantity;
                }
            }
        }
        await character.markModified('slots');
        await character.save()
        res.json({
            message: 'Working',
            character
        });
        return;
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;