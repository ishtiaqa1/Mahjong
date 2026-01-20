// Quints is the 4th set of hands

const quints = [
    {   // 11111 2222 333 44
        "variance": "consecutive", "id": 401, "hover": "Any four consecutive numbers",
        "contents": [
            { "id": 1, "display": "1", "type": "number", "count": 5, "color": "black" },
            { "id": 2, "display": "2", "type": "number", "count": 4, "color": "black" },
            { "id": 3, "display": "3", "type": "number", "count": 3, "color": "black" },
            { "id": 4, "display": "4", "type": "number", "count": 2, "color": "black" }
        ]
    },

    {   // FFFFF DDDDD 1111
        "variance": "matching", "id": 402, "hover": "Any numbered tile",
        "contents": [
            { "id": 5, "display": "F", "type": "flower", "count": 5, "color": "black" },
            { "id": 6, "display": "D", "type": "dragon", "count": 5, "color": "black" },
            { "id": 7, "display": "1", "type": "number", "count": 4, "color": "black" }
        ]
    },

    {   // 11111 3333 555 DD
        "variance": "none", "id": 403, "hover": "",
        "contents": [
            { "id": 8,  "display": "1", "type": "number", "count": 5, "color": "black" },
            { "id": 9,  "display": "3", "type": "number", "count": 4, "color": "black" },
            { "id": 10, "display": "5", "type": "number", "count": 3, "color": "black" },
            { "id": 11, "display": "D", "type": "dragon", "count": 2, "color": "black" },
        ]
    },

    {   // 55555 7777 999 DD
        "variance": "none", "id": 404, "hover": "",
        "contents": [
            { "id": 12, "display": "5", "type": "number", "count": 5, "color": "black" },
            { "id": 13, "display": "7", "type": "number", "count": 4, "color": "black" },
            { "id": 14, "display": "9", "type": "number", "count": 3, "color": "black" },
            { "id": 15, "display": "D", "type": "dragon", "count": 2, "color": "black" },
        ]
    },

    {   // FFFFF 33 666 9999
        "variance": "none", "id": 405, "hover": "",
        "contents": [
            { "id": 16, "display": "F", "type": "flower", "count": 5, "color": "black" },
            { "id": 17, "display": "3", "type": "number", "count": 2, "color": "black" },
            { "id": 18, "display": "6", "type": "number", "count": 3, "color": "black" },
            { "id": 19, "display": "9", "type": "number", "count": 4, "color": "black" },
        ]
    },

    {   // FFFFF 33 666 9999
        "variance": "none", "id": 406, "hover": "",
        "contents": [
            { "id": 20, "display": "F", "type": "flower", "count": 5, "color": "black" },
            { "id": 21, "display": "3", "type": "number", "count": 2, "color": "red" },
            { "id": 22, "display": "6", "type": "number", "count": 3, "color": "green" },
            { "id": 23, "display": "9", "type": "number", "count": 4, "color": "black" },
        ]
    }
];

export default function Quints() {
    return quints;
}