// Winds-Dragons is the 7th set of hands

const windrag = [
    {   // NNNN EEE WWW SSSS
        "variance": "none", "id": 701, "hover": "",
        "contents": [
            { "id": 1, "display": "N", "type": "north", "count": 4, "color": "black" },
            { "id": 2, "display": "E", "type": "east",  "count": 3, "color": "black" },
            { "id": 3, "display": "W", "type": "west",  "count": 3, "color": "black" },
            { "id": 4, "display": "S", "type": "south", "count": 4, "color": "black" }
        ]
    },

    {   // FF DDDD N E W S DDDD
        "variance": "none", "id": 702, "hover": "",
        "contents": [
            { "id": 5,  "display": "F", "type": "flower", "count": 2, "color": "black"},
            { "id": 6,  "display": "D", "type": "dragon", "count": 4, "color": "red" },
            { "id": 7,  "display": "N", "type": "north",  "count": 1, "color": "black" },
            { "id": 8,  "display": "E", "type": "east",   "count": 1, "color": "black" },
            { "id": 9,  "display": "W", "type": "west",   "count": 1, "color": "black" },
            { "id": 10, "display": "S", "type": "south",  "count": 1, "color": "black" },
            { "id": 11, "display": "D", "type": "dragon", "count": 4, "color": "green" }
        ]
    },

    {   // FFFF NNNN RR SSSS
        "variance": "none", "id": 703, "hover": "",
        "contents": [
            { "id": 12, "display": "F", "type": "flower", "count": 4, "color": "black" },
            { "id": 13, "display": "N", "type": "north",  "count": 4, "color": "black" },
            { "id": 14, "display": "R", "type": "red",    "count": 2, "color": "red" },
            { "id": 15, "display": "S", "type": "south",  "count": 4, "color": "black" }
        ]
    },

    {   // FFFF EEEE GG WWWW
        "variance": "none", "id": 704, "hover": "",
        "contents": [
            { "id": 16, "display": "F", "type": "flower", "count": 4, "color": "black" },
            { "id": 17, "display": "E", "type": "east",   "count": 4, "color": "black" },
            { "id": 18, "display": "G", "type": "green",  "count": 2, "color": "green" },
            { "id": 19, "display": "W", "type": "west",   "count": 4, "color": "black" }
        ]
    },

    {   // FFFF N EE WWW SSSS
        "variance": "none", "id": 705, "hover": "",
        "contents": [
            { "id": 20, "display": "F", "type": "flower", "count": 4, "color": "black" },
            { "id": 21, "display": "N", "type": "north",  "count": 1, "color": "black" },
            { "id": 22, "display": "E", "type": "east",   "count": 2, "color": "black" },
            { "id": 23, "display": "W", "type": "west",   "count": 3, "color": "black" },
            { "id": 24, "display": "S", "type": "south",  "count": 4, "color": "black" }
        ]
    },

    {   // FF NN 1111 2222 SS
        "variance": "consecutive", "id": 706, "hover": "Any two consecutive numbers",
        "contents": [
            { "id": 25, "display": "F", "type": "flower", "count": 2, "color": "black" },
            { "id": 26, "display": "N", "type": "north",  "count": 2, "color": "black" },
            { "id": 27, "display": "1", "type": "number", "count": 4, "color": "red" },
            { "id": 28, "display": "2", "type": "number", "count": 4, "color": "green" },
            { "id": 29, "display": "S", "type": "south",  "count": 2, "color": "black" }
        ]
    },

    {   // FF EE 1111 2222 WW
        "variance": "consecutive", "id": 707, "hover": "Any two consecutive numbers",
        "contents": [
            { "id": 30, "display": "F", "type": "flower", "count": 2, "color": "black" },
            { "id": 31, "display": "E", "type": "east",   "count": 2, "color": "black" },
            { "id": 32, "display": "1", "type": "number", "count": 4, "color": "red" },
            { "id": 33, "display": "2", "type": "number", "count": 4, "color": "green" },
            { "id": 34, "display": "W", "type": "west",   "count": 2, "color": "black" }
        ]
    },

    {   // NNNN DD DD DD SSSS
        "variance": "none", "id": 708, "hover": "",
        "contents": [
            { "id": 35, "display": "N", "type": "north",  "count": 4, "color": "black" },
            { "id": 36, "display": "D", "type": "dragon", "count": 2, "color": "red" },
            { "id": 37, "display": "D", "type": "dragon", "count": 2, "color": "black" },
            { "id": 38, "display": "D", "type": "dragon", "count": 2, "color": "green" },
            { "id": 39, "display": "S", "type": "south",  "count": 4, "color": "black" }
        ]
    },

    {   // EEEE DD DD DD WWWW
        "variance": "none", "id": 709, "hover": "",
        "contents": [
            { "id": 40, "display": "E", "type": "east",   "count": 4, "color": "black" },
            { "id": 41, "display": "D", "type": "dragon", "count": 2, "color": "red" },
            { "id": 42, "display": "D", "type": "dragon", "count": 2, "color": "black" },
            { "id": 43, "display": "D", "type": "dragon", "count": 2, "color": "green" },
            { "id": 44, "display": "W", "type": "west",   "count": 4, "color": "black" }
        ]
    },

    {   // NN 111 1111 111 SS
        "variance": "matching", "id": 710, "hover": "Any matching odd-numbered tiles",
        "contents": [
            { "id": 45, "display": "N", "type": "north",  "count": 2, "color": "black" },
            { "id": 46, "display": "1", "type": "number", "count": 3, "color": "red" },
            { "id": 47, "display": "1", "type": "number", "count": 4, "color": "black" },
            { "id": 48, "display": "1", "type": "number", "count": 3, "color": "green" },
            { "id": 49, "display": "S", "type": "south",  "count": 2, "color": "black" }
        ]
    },

    {   // EE 222 2222 222 WW
        "variance": "matching", "id": 711, "hover": "Any matching even-numbered tiles",
        "contents": [
            { "id": 50, "display": "E", "type": "east",   "count": 2, "color": "black" },
            { "id": 51, "display": "2", "type": "number", "count": 3, "color": "red" },
            { "id": 52, "display": "2", "type": "number", "count": 4, "color": "black" },
            { "id": 53, "display": "2", "type": "number", "count": 3, "color": "green" },
            { "id": 54, "display": "W", "type": "west",   "count": 2, "color": "black" }
        ]
    },
]

export default function WindsDragons() {
    return windrag;
}