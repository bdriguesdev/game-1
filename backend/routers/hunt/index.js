const express = require('express');

const Monster = require('../../models/Monster');
const User = require('../../models/User');
const HuntingPlaces = require('../../models/HuntingPlaces');
const Character = require('../../models/Character');

const router = express.Router();

// need to create a collection of huntingplaces and dungeons
// const huntingPlaces = {
//     beach: [{ id: 'high', prob:[1,90] }, { id: 'low', prob:[91,100] }]
// };

// i was storing a monster in the database
router.post('/monster', async (req, res) => {
    try {
    const monster = new Monster({
        name: "Orc Berserker",
        maxHealth: 200,
        health: 200,
        experience: 10,
        gold: {
            range: [6, 15],
            prob: 60
        },
        spells: {
            basicAttack: {
                name: 'Basic Attack',
                energy: 0,
                physicalDamage: 100
            }
        },
        stats: {
            physicalDamage: 25
        },
        loot: [
            { itemId: 3, prob: 25 },
            { itemId: 6, prob: 5 },
        ]
    });
    await monster.save();
    res.json({
        monster
    });
    return;
    } catch (error) {
        console.log(error);
    }
});

// creating a huntingplace in the db
router.post('/huntingplace', async (req, res) => {
    try {
        const huntingPlace = new HuntingPlaces({
            name: 'Orcs Village',
            probability: 100,
            monstersList: [
                {
                    monsterId:'5e4436499913a52b047d3ee0',
                    prob:[1,50]
                },
                {
                    monsterId:'5e44369951287a4a8c5725e6',
                    prob:[51,89]
                },
                {
                    monsterId:'5e443745ad9048322499ce8e',
                    prob:[90,100]
                }
            ]
        });
        await huntingPlace.save();
        res.json({
            message: 'Created!'
        });
        return;
    } catch (error) {
        console.log(error);    
    }
});

// i need to check if the character already has a hunting place
// or if he have a dungeon i suposed to dont do nothing and alert him(display something the frontend)
router.post('/:name', async (req,res) => {
    // here i need the userid that i assign after validating the jwt 
    const { name } = req.params;
    const { userId, charId } = req.body;
   
    try { 
        const huntingPlace = await HuntingPlaces.findOne({name});
        if(!huntingPlace) {
            res.json({
                error: 'This hunting place doesnt exist!'
            });
            return;
        } 
        const number = Math.floor(Math.random() * huntingPlace.probability + 1);
        const monsterId = huntingPlace.monstersList.filter(monster => {
            return number >= monster.prob[0] && number <= monster.prob[1];
        });
        const monster = await Monster.findById(monsterId[0].monsterId)
        if(!monster) {
            res.json({
                error: 'This monster doesnt exist!'
            });
            return;
        }
        const user = await User.findById(userId);
        if(!user) {
            res.json({
                error: 'This user doesnt exist!'
            });
            return;
        }
        if(user.characters.indexOf(charId) === -1) {
            res.json({
                error: 'This character doesnt exist!'
            });
            return;
        }
        const character = await Character.findById(charId);
        if(!character) {
            res.json({
                error: 'This character doesnt exist!'
            });
            return;
        }
        //if the caracter is in dungeon he cant go to a hunting place!!!!
        //we can do a function do to this outside of here
        character.battleType.huntingPlace.name = name;
        character.battleType.huntingPlace.huntingPlaceId = huntingPlace.id;
        character.battle = [monster];
        await character.save();
        res.json({
            message: 'working',
            number,
            battle: [monster],
            character
        });
        return;
    } catch (error) {
        console.log(error);
        res.json({
            error
        });
    }
    
});

module.exports = router;