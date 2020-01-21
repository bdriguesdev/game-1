const mongoose = require('mongoose');

const huntingPlacesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    probability: {
        type: Number,
        required: true
    },
    monstersList : [
        {
            monsterId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Monster'
            },
            prob: [] // [1,10]
        }
    ]
});

module.exports = mongoose.model('HuntingPlaces', huntingPlacesSchema);