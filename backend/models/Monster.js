const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxHealth: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true,
        default: 1
    },
    gold: { range:{ type: Array, default: [1,3]}, prob: { type: Number, default: 0 } },
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
    stats: {
        physicalDamage: { type: Number, default: 2 },
        criticalChance: { type: Number, default: 0 },
        criticalMultiplier: { type: Number, default: 100 },
        bleedChance: { type: Number, default: 0 },
        lightningDamage: { type: Number, default: 0 },
        fireDamage: { type: Number, default: 0 },
        armor: { type: Number, default: 0 },
        elementalResistance: { type: Number, default: 0 }
    },
    loot : [
        {
            itemId: { type: Number, required: true },
            prob: { type: Number, default: 0 }
        }
    ],
    isBleeding: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Monster', monsterSchema);