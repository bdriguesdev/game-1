const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vocation: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    nextLevel: {
        type: Number,
        required: true,
        default: 150
    },
    experience: {
        type: Number,
        required: true,
        default: 0
    },
    maxHealth: {
        type: Number,
        required: true,
        default: 100
    },
    health: {
        type: Number,
        required: true,
        default: 100
    },
    maxEnergy: {
        type: Number,
        required: true,
        default: 10
    },
    energy: {
        type: Number,
        required: true,
        default: 10
    },
    isBleeding : {
        type: Boolean,
        required: true,
        default: false
    },
    goldCoins: { type: Number, default: 0 },
    spells: {
        basicAttack: {
            name: { type: String, default: 'Basic Attack'},
            energy: { type: Number, default: 0 },
            physicalDamage: { type: Number, default: 100 },
            elementalDamage: { type: Number, default: 50 },
            bleedChance: { type: Number, default: 0 },
            criticalChance: { type: Number, default: 0 },
            criticalMultiplier: { type: Number, default: 0 }
        }
    },
    hotkeys : {
        potions: { type: Array, default: [0,0,0,0] },
        spells: { type: Array, default: [0,0,0,0,0,0] }
    },
    set: {
        rune: { type: mongoose.Schema.Types.Mixed, default: 0 },
        helmet: { type: mongoose.Schema.Types.Mixed, default: 0 },
        bodyArmour: { type: mongoose.Schema.Types.Mixed, default: 0 },
        legs: { type: mongoose.Schema.Types.Mixed, default: 0 },
        gloves: { type: mongoose.Schema.Types.Mixed, default: 0 },
        boots: { type: mongoose.Schema.Types.Mixed, default: 0 },
        weapon1: { type: mongoose.Schema.Types.Mixed, default: 0 },
        weapon2: { type: mongoose.Schema.Types.Mixed, default: 0 },
        amulet: { type: mongoose.Schema.Types.Mixed, default: 0 },
        ring: { type: mongoose.Schema.Types.Mixed, default: 0 } 
    },
    slots: {
        inventory: { type: Array, default: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
        depot: { type: Array, default: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
        loot: { type: Array, default: [0,0,0,0,0,0,0,0,0,0,0,0] },
        },
    stats: {
        physicalDamage: { type: Number, default: 3 },
        criticalChance: { type: Number, default: 0 },
        criticalMultiplier: { type: Number, default: 100 },
        bleedChance: { type: Number, default: 0 },
        lightningDamage: { type: Number, default: 0 },
        fireDamage: { type: Number, default: 0 },
        armor: { type: Number, default: 5 },
        elementalResistance: { type: Number, default: 0 }
    },
    talentPoints: { type: Number, default: 5 },
    talents: {
        strength: { type: Number, default: 0 },
        dexterity: { type: Number, default: 0 },
        intelligence: { type: Number, default: 0 },
        resistance: { type: Number, default: 0 }
    },
    battleType: {
        huntingPlace: {
            name: {
                type: String,
                default: ''
            },
            huntingPlaceId: {
                type: String,
                default: ''
            }
        }
    },
    battle: { type: Array, default: []},
    createdAt: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('Character', characterSchema);