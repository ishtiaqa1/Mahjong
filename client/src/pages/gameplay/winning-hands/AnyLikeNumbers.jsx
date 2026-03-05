// Any Like Numbers is the 2nd set of hands

const anylike = [
    {   // FFFF 1111 11 1111
        "variance": "matching", "id": 201, "hover": "Any matching numbered tiles",
        "contents": [
            { "id": 1, "display": "F", "type": "flower", "count": 4, "color": "black" },
            { "id": 2, "display": "1", "type": "number", "count": 4, "color": "red" },
            { "id": 3, "display": "1", "type": "number", "count": 2, "color": "green" },
            { "id": 4, "display": "1", "type": "number", "count": 4, "color": "black" }
        ]
    },

    {   // FF 1111 DD 1111 DD
        "variance": "matching", "id": 202, "hover": "Any matching numbered tiles",
        "contents": [
            { "id": 5, "display": "F", "type": "flower", "count": 2, "color": "black" },
            { "id": 6, "display": "1", "type": "number", "count": 4, "color": "red" },
            { "id": 7, "display": "D", "type": "dragon", "count": 2, "color": "red" },
            { "id": 8, "display": "1", "type": "number", "count": 4, "color": "green" },
            { "id": 9, "display": "D", "type": "dragon", "count": 2, "color": "green" }
        ]
    },

    {   // FFF 1111 DDD 1111
        "variance": "matching", "id": 203, "hover": "Any matching numbered tiles",
        "contents": [
            { "id": 10, "display": "F", "type": "flower", "count": 3, "color": "black" },
            { "id": 11, "display": "1", "type": "number", "count": 4, "color": "red" },
            { "id": 12, "display": "D", "type": "dragon", "count": 3, "color": "black" },
            { "id": 13, "display": "1", "type": "number", "count": 4, "color": "green" }
        ]
    },

    {   // 11 DD 111 DDD 1111
        "variance": "matching", "id": 204, "hover": "Any matching numbered tiles",
        "contents": [
            { "id": 14, "display": "1", "type": "number", "count": 2, "color": "red" },
            { "id": 15, "display": "D", "type": "dragon", "count": 2, "color": "red" },
            { "id": 16, "display": "1", "type": "number", "count": 3, "color": "green" },
            { "id": 17, "display": "D", "type": "dragon", "count": 3, "color": "green" },
            { "id": 18, "display": "1", "type": "number", "count": 4, "color": "black" }
        ]
    }
];

export default function AnyLikeNumbers() {
    return anylike;
}