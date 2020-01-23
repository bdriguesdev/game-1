//the images could be in the frotend starting with the name of the item so we can do this: url(`/${item}`)
//maybe make more stats like increased damage/life leech and stuff
//separe the items per type? (different files)
//next id 10
const items = [
    {
        id: 0,
        name: 'Body Armour',
        type: 'bodyArmour',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'armor', prob: [], range: [1,2] },
            { stat:'health', prob: [], range: [5,10] },
            { stat:'elementalResistance', prob: [], range: [4,8] },
            { stat:'criticalChance', prob: [], range: [5,8] },
            { stat:'criticalMultiplier', prob: [], range: [8,12] }
        ],
        base: [
            { stat: 'armor', range: [2,5] }
        ]
    },
    {
        id: 1,
        name: 'Legs',
        type: 'legs',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'armor', prob: [], range: [1,2] },
            { stat:'health', prob: [], range: [3,7] },
            { stat:'elementalResistance', prob: [], range: [3,5] },
            { stat:'criticalChance', prob: [], range: [6,9] },
            { stat:'criticalMultiplier', prob: [], range: [10,15] }
        ],
        base: [
            { stat: 'armor', range: [2,3] }
        ]
    },
    {
        id: 2,
        name: 'Gloves',
        type: 'gloves',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'armor', prob: [], range: [1,2] },
            { stat:'health', prob: [], range: [2,4] },
            { stat:'elementalResistance', prob: [], range: [2,3] },
            { stat:'criticalChance', prob: [], range: [8,11] },
            { stat:'criticalMultiplier', prob: [], range: [13,18] }
        ],
        base: [
            { stat: 'armor', range: [1,2] }
        ]
    },
    {
        id: 3,
        name: 'Ring',
        type: 'ring',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'health', prob: [], range: [2,4] },
            { stat:'elementalResistance', prob: [], range: [2,3] },
            { stat:'criticalChance', prob: [], range: [5,8] },
            { stat:'criticalMultiplier', prob: [], range: [8,11] },
            { stat:'physicalDamage', prob: [], range: [2,4] }
        ],
        base: [
            { stat: 'criticalMultiplier', range: [5,8] }
        ]
    },
    {
        id: 4,
        name: 'Amulet',
        type: 'amulet',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'criticalChance', prob: [], range: [5,8] },
            { stat:'criticalMultiplier', prob: [], range: [8,11] },
            { stat:'physicalDamage', prob: [], range: [2,4] },
            { stat:'fireDamage', prob: [], range: [2,4] },
            { stat:'lightningDamage', prob: [], range: [2,4] }
        ],
        base: [
            { stat: 'physicalDamage', range: [2,4] }
        ]
    },
    {
        id: 5,
        name: 'Helmet',
        type: 'helmet',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'armor', prob: [], range: [3,4] },
            { stat:'health', prob: [], range: [3,6] },
            { stat:'elementalResistance', prob: [], range: [4,6] },
            { stat:'criticalChance', prob: [], range: [5,8] },
            { stat:'criticalMultiplier', prob: [], range: [7,11] }
        ],
        base: [
            { stat: 'armor', range: [2,3] }
        ]
    },
    {
        id: 6,
        name: 'Rune',
        type: 'rune',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'criticalChance', prob: [], range: [5,8] },
            { stat:'criticalMultiplier', prob: [], range: [8,11] },
            { stat:'physicalDamage', prob: [], range: [2,4] },
            { stat:'fireDamage', prob: [], range: [2,4] },
            { stat:'lightningDamage', prob: [], range: [2,4] }
        ],
        base: [
            { stat: 'physicalDamage', range: [2,4] }
        ]
    },
    {
        id: 7,
        name: 'Sword',
        type: 'rune',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'criticalChance', prob: [], range: [8,11] },
            { stat:'criticalMultiplier', prob: [], range: [10,15] },
            { stat:'physicalDamage', prob: [], range: [6,11] },
            { stat:'fireDamage', prob: [], range: [3,5] },
            { stat:'lightningDamage', prob: [], range: [3,5] }
        ],
        base: [
            { stat: 'physicalDamage', range: [7,11] }
        ]
    },
    {
        id: 8,
        name: 'Shield',
        type: 'shield',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'armor', prob: [], range: [3,5] },
            { stat:'health', prob: [], range: [5,10] },
            { stat:'elementalResistance', prob: [], range: [4,8] },
            { stat:'criticalChance', prob: [], range: [3,5] },
            { stat:'criticalMultiplier', prob: [], range: [6,10] }
        ],
        base: [
            { stat: 'armor', range: [4,8] }
        ]
    },
    {
        id: 9,
        name: 'Boots',
        type: 'boots',
        price: 1,
        maxStack: 1,
        quantity: 1,
        stats: [
            { stat:'armor', prob: [], range: [1,3] },
            { stat:'health', prob: [], range: [3-6] },
            { stat:'elementalResistance', prob: [], range: [3,5] },
            { stat:'criticalChance', prob: [], range: [3,5] },
            { stat:'criticalMultiplier', prob: [], range: [6,9] }
        ],
        base: [
            { stat: 'armor', range: [3,5] }
        ]
    },
    {
        id: 10,
        name: 'Small Potion',
        type: 'hotkey',
        price: 2,
        maxStack: 1,
        quantity: 1,
        health: [40,100]
    }
];

module.exports = items;