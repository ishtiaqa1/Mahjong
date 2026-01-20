/* Scroll to the bottom of this page to see a guide on how tile ids are constructed. */

const tutorialTiles = [

    // Dealing out starting from LEFT
    //#region LEFT's starting hand (13):
    { "name": "North", "id": 411, "type": "wind", "suit": "north", "locked": false },
    { "name": "2 Crack", "id": 321, "type": "number", "suit": "crack", "num": 2, "locked": false },
    { "name": "Joker", "id": 712, "type": "joker", "locked": false },

    { "name": "Green Dragon", "id": 511, "type": "dragon", "suit": "green", "locked": false },
    { "name": "Green Dragon", "id": 512, "type": "dragon", "suit": "green", "locked": false },
    { "name": "Green Dragon", "id": 513, "type": "dragon", "suit": "green", "locked": false },
    { "name": "Green Dragon", "id": 514, "type": "dragon", "suit": "green", "locked": false },
    { "name": "3 Crack", "id": 331, "type": "number", "suit": "crack", "num": 3, "locked": false },
    { "name": "3 Crack", "id": 332, "type": "number", "suit": "crack", "num": 3, "locked": false },
    { "name": "3 Crack", "id": 333, "type": "number", "suit": "crack", "num": 3, "locked": false },
    { "name": "3 Crack", "id": 334, "type": "number", "suit": "crack", "num": 3, "locked": false },
    { "name": "2 Bam", "id": 221, "type": "number", "suit": "bam", "num": 2, "locked": false },
    { "name": "2 Bam", "id": 222, "type": "number", "suit": "bam", "num": 2, "locked": false },
    //#endregion

    //#region DOWN's starting hand (13):
    { "name": "7 Dot", "id": 171, "type": "number", "suit": "dot", "num": 7, "locked": false },
    { "name": "Red Dragon", "id": 521, "type": "dragon", "suit": "red", "locked": false },
    { "name": "1 Dot", "id": 111, "type": "number", "suit": "dot", "num": 1, "locked": false },
    { "name": "Flower", "id": 611, "type": "flower", "locked": false },
    { "name": "7 Bam", "id": 271, "type": "number", "suit": "bam", "num": 7, "locked": false },
    { "name": "7 Crack", "id": 371, "type": "number", "suit": "crack", "num": 7, "locked": false },
    { "name": "Flower", "id": 612, "type": "flower", "locked": false },
    { "name": "Flower", "id": 613, "type": "flower", "locked": false },
    { "name": "7 Crack", "id": 372, "type": "number", "suit": "crack", "num": 7, "locked": false },
    { "name": "East", "id": 421, "type": "wind", "suit": "east", "locked": false },
    { "name": "Joker", "id": 711, "type": "joker", "locked": false },
    { "name": "8 Bam", "id": 281, "type": "number", "suit": "bam", "num": 8, "locked": false },
    { "name": "White Dragon", "id": 531, "type": "dragon", "suit": "white", "locked": false },
    //#endregion

    //#region RIGHT's starting hand (13):
    { "name": "5 Bam", "id": 251, "type": "number", "suit": "bam", "num": 5, "locked": false },
    { "name": "7 Crack", "id": 373, "type": "number", "suit": "crack", "num": 7, "locked": false },
    { "name": "8 Bam", "id": 282, "type": "number", "suit": "bam", "num": 8, "locked": false },
    { "name": "South", "id": 441, "type": "wind", "suit": "south", "locked": false },
    { "name": "1 Crack", "id": 311, "type": "number", "suit": "crack", "num": 1, "locked": false },

    { "name": "West", "id": 431, "type": "wind", "suit": "west", "locked": false },
    { "name": "West", "id": 432, "type": "wind", "suit": "west", "locked": false },
    { "name": "West", "id": 433, "type": "wind", "suit": "west", "locked": false },
    { "name": "West", "id": 434, "type": "wind", "suit": "west", "locked": false },
    { "name": "9 Crack", "id": 391, "type": "number", "suit": "crack", "num": 9, "locked": false },
    { "name": "9 Crack", "id": 392, "type": "number", "suit": "crack", "num": 9, "locked": false },
    { "name": "9 Crack", "id": 393, "type": "number", "suit": "crack", "num": 9, "locked": false },
    { "name": "9 Crack", "id": 394, "type": "number", "suit": "crack", "num": 9, "locked": false },
    //#endregion

    //#region ACROSS's starting hand (13):
    { "name": "7 Crack", "id": 374, "type": "number", "suit": "crack", "num": 7, "locked": false },
    { "name": "8 Bam", "id": 283, "type": "number", "suit": "bam", "num": 8, "locked": false },
    { "name": "White Dragon", "id": 532, "type": "dragon", "suit": "white", "locked": false },
    { "name": "Joker", "id": 713, "type": "joker", "locked": false },
    { "name": "9 Dot", "id": 191, "type": "number", "suit": "dot", "num": 9, "locked": false },
    { "name": "7 Bam", "id": 272, "type": "number", "suit": "bam", "num": 7, "locked": false },

    { "name": "3 Bam", "id": 231, "type": "number", "suit": "bam", "num": 3, "locked": false },
    { "name": "3 Bam", "id": 232, "type": "number", "suit": "bam", "num": 3, "locked": false },
    { "name": "3 Bam", "id": 233, "type": "number", "suit": "bam", "num": 3, "locked": false },
    { "name": "3 Bam", "id": 234, "type": "number", "suit": "bam", "num": 3, "locked": false },
    { "name": "6 Bam", "id": 261, "type": "number", "suit": "bam", "num": 6, "locked": false },
    { "name": "6 Bam", "id": 262, "type": "number", "suit": "bam", "num": 6, "locked": false },
    { "name": "6 Bam", "id": 263, "type": "number", "suit": "bam", "num": 6, "locked": false },
    //#endregion

    // BONUS tile to LEFT (total 14):
    { "name": "1 Dot", "id": 112, "type": "number", "suit": "dot", "num": 1, "locked": false },

    // DRAW tile order:
    { "name": "Red Dragon", "id": 522, "type": "dragon", "suit": "red", "locked": false },          // Down
    { "name": "1 Dot", "id": 113, "type": "number", "suit": "dot", "num": 1, "locked": false },     // Right
    { "name": "1 Dot", "id": 114, "type": "number", "suit": "dot", "num": 1, "locked": false },     // Across, Down calls
    { "name": "2 Dot", "id": 121, "type": "number", "suit": "dot", "num": 2, "locked": false },     // Right, Across calls
    { "name": "2 Dot", "id": 122, "type": "number", "suit": "dot", "num": 2, "locked": false },     // Left
    { "name": "White Dragon", "id": 533, "type": "dragon", "suit": "white", "locked": false },      // Down
    { "name": "2 Dot", "id": 123, "type": "number", "suit": "dot", "num": 2, "locked": false },     // Right
    { "name": "2 Dot", "id": 124, "type": "number", "suit": "dot", "num": 2, "locked": false },     // Across
    { "name": "3 Dot", "id": 131, "type": "number", "suit": "dot", "num": 3, "locked": false },     // Left
    { "name": "7 Bam", "id": 273, "type": "number", "suit": "bam", "num": 7, "locked": false },     // Down
    { "name": "3 Dot", "id": 132, "type": "number", "suit": "dot", "num": 3, "locked": false },     // Right
    { "name": "3 Dot", "id": 133, "type": "number", "suit": "dot", "num": 3, "locked": false },     // Across


    // REMAINING/UNUSED TILES IN DRAW PILE

    //#region Circles/Dots - 9 tile types, 4 of each tile
    { "name": "3 Dot", "id": 134, "type": "number", "suit": "dot", "num": 3, "locked": false },

    { "name": "4 Dot", "id": 141, "type": "number", "suit": "dot", "num": 4, "locked": false },
    { "name": "4 Dot", "id": 142, "type": "number", "suit": "dot", "num": 4, "locked": false },
    { "name": "4 Dot", "id": 143, "type": "number", "suit": "dot", "num": 4, "locked": false },
    { "name": "4 Dot", "id": 144, "type": "number", "suit": "dot", "num": 4, "locked": false },

    { "name": "5 Dot", "id": 151, "type": "number", "suit": "dot", "num": 5, "locked": false },
    { "name": "5 Dot", "id": 152, "type": "number", "suit": "dot", "num": 5, "locked": false },
    { "name": "5 Dot", "id": 153, "type": "number", "suit": "dot", "num": 5, "locked": false },
    { "name": "5 Dot", "id": 154, "type": "number", "suit": "dot", "num": 5, "locked": false },

    { "name": "6 Dot", "id": 161, "type": "number", "suit": "dot", "num": 6, "locked": false },
    { "name": "6 Dot", "id": 162, "type": "number", "suit": "dot", "num": 6, "locked": false },
    { "name": "6 Dot", "id": 163, "type": "number", "suit": "dot", "num": 6, "locked": false },
    { "name": "6 Dot", "id": 164, "type": "number", "suit": "dot", "num": 6, "locked": false },

    { "name": "7 Dot", "id": 172, "type": "number", "suit": "dot", "num": 7, "locked": false },
    { "name": "7 Dot", "id": 173, "type": "number", "suit": "dot", "num": 7, "locked": false },
    { "name": "7 Dot", "id": 174, "type": "number", "suit": "dot", "num": 7, "locked": false },

    { "name": "8 Dot", "id": 181, "type": "number", "suit": "dot", "num": 8, "locked": false },
    { "name": "8 Dot", "id": 182, "type": "number", "suit": "dot", "num": 8, "locked": false },
    { "name": "8 Dot", "id": 183, "type": "number", "suit": "dot", "num": 8, "locked": false },
    { "name": "8 Dot", "id": 184, "type": "number", "suit": "dot", "num": 8, "locked": false },

    { "name": "9 Dot", "id": 192, "type": "number", "suit": "dot", "num": 9, "locked": false },
    { "name": "9 Dot", "id": 193, "type": "number", "suit": "dot", "num": 9, "locked": false },
    { "name": "9 Dot", "id": 194, "type": "number", "suit": "dot", "num": 9, "locked": false },
    //#endregion

    //#region Bamboos/Bams - 9 tile types, 4 of each tile
    { "name": "1 Bam", "id": 211, "type": "number", "suit": "bam", "num": 1, "locked": false },
    { "name": "1 Bam", "id": 212, "type": "number", "suit": "bam", "num": 1, "locked": false },
    { "name": "1 Bam", "id": 213, "type": "number", "suit": "bam", "num": 1, "locked": false },
    { "name": "1 Bam", "id": 214, "type": "number", "suit": "bam", "num": 1, "locked": false },

    { "name": "2 Bam", "id": 223, "type": "number", "suit": "bam", "num": 2, "locked": false },
    { "name": "2 Bam", "id": 224, "type": "number", "suit": "bam", "num": 2, "locked": false },

    { "name": "4 Bam", "id": 241, "type": "number", "suit": "bam", "num": 4, "locked": false },
    { "name": "4 Bam", "id": 242, "type": "number", "suit": "bam", "num": 4, "locked": false },
    { "name": "4 Bam", "id": 243, "type": "number", "suit": "bam", "num": 4, "locked": false },
    { "name": "4 Bam", "id": 244, "type": "number", "suit": "bam", "num": 4, "locked": false },

    { "name": "5 Bam", "id": 252, "type": "number", "suit": "bam", "num": 5, "locked": false },
    { "name": "5 Bam", "id": 253, "type": "number", "suit": "bam", "num": 5, "locked": false },
    { "name": "5 Bam", "id": 254, "type": "number", "suit": "bam", "num": 5, "locked": false },

    { "name": "6 Bam", "id": 264, "type": "number", "suit": "bam", "num": 6, "locked": false },

    { "name": "7 Bam", "id": 274, "type": "number", "suit": "bam", "num": 7, "locked": false },

    { "name": "8 Bam", "id": 284, "type": "number", "suit": "bam", "num": 8, "locked": false },

    { "name": "9 Bam", "id": 291, "type": "number", "suit": "bam", "num": 9, "locked": false },
    { "name": "9 Bam", "id": 292, "type": "number", "suit": "bam", "num": 9, "locked": false },
    { "name": "9 Bam", "id": 293, "type": "number", "suit": "bam", "num": 9, "locked": false },
    { "name": "9 Bam", "id": 294, "type": "number", "suit": "bam", "num": 9, "locked": false },
    //#endregion

    //#region Characters/Cracks - 9 tile types, 4 of each tile
    { "name": "1 Crack", "id": 312, "type": "number", "suit": "crack", "num": 1, "locked": false },
    { "name": "1 Crack", "id": 313, "type": "number", "suit": "crack", "num": 1, "locked": false },
    { "name": "1 Crack", "id": 314, "type": "number", "suit": "crack", "num": 1, "locked": false },

    { "name": "2 Crack", "id": 322, "type": "number", "suit": "crack", "num": 2, "locked": false },
    { "name": "2 Crack", "id": 323, "type": "number", "suit": "crack", "num": 2, "locked": false },
    { "name": "2 Crack", "id": 324, "type": "number", "suit": "crack", "num": 2, "locked": false },

    { "name": "4 Crack", "id": 341, "type": "number", "suit": "crack", "num": 4, "locked": false },
    { "name": "4 Crack", "id": 342, "type": "number", "suit": "crack", "num": 4, "locked": false },
    { "name": "4 Crack", "id": 343, "type": "number", "suit": "crack", "num": 4, "locked": false },
    { "name": "4 Crack", "id": 344, "type": "number", "suit": "crack", "num": 4, "locked": false },

    { "name": "5 Crack", "id": 351, "type": "number", "suit": "crack", "num": 5, "locked": false },
    { "name": "5 Crack", "id": 352, "type": "number", "suit": "crack", "num": 5, "locked": false },
    { "name": "5 Crack", "id": 353, "type": "number", "suit": "crack", "num": 5, "locked": false },
    { "name": "5 Crack", "id": 354, "type": "number", "suit": "crack", "num": 5, "locked": false },

    { "name": "6 Crack", "id": 361, "type": "number", "suit": "crack", "num": 6, "locked": false },
    { "name": "6 Crack", "id": 362, "type": "number", "suit": "crack", "num": 6, "locked": false },
    { "name": "6 Crack", "id": 363, "type": "number", "suit": "crack", "num": 6, "locked": false },
    { "name": "6 Crack", "id": 364, "type": "number", "suit": "crack", "num": 6, "locked": false },

    { "name": "8 Crack", "id": 381, "type": "number", "suit": "crack", "num": 8, "locked": false },
    { "name": "8 Crack", "id": 382, "type": "number", "suit": "crack", "num": 8, "locked": false },
    { "name": "8 Crack", "id": 383, "type": "number", "suit": "crack", "num": 8, "locked": false },
    { "name": "8 Crack", "id": 384, "type": "number", "suit": "crack", "num": 8, "locked": false },


    //#endregion

    //#region Winds - 4 tile types, 4 of each tile
    { "name": "North", "id": 412, "type": "wind", "suit": "north", "locked": false },
    { "name": "North", "id": 413, "type": "wind", "suit": "north", "locked": false },
    { "name": "North", "id": 414, "type": "wind", "suit": "north", "locked": false },

    { "name": "East", "id": 422, "type": "wind", "suit": "east", "locked": false },
    { "name": "East", "id": 423, "type": "wind", "suit": "east", "locked": false },
    { "name": "East", "id": 424, "type": "wind", "suit": "east", "locked": false },

    { "name": "South", "id": 442, "type": "wind", "suit": "south", "locked": false },
    { "name": "South", "id": 443, "type": "wind", "suit": "south", "locked": false },
    { "name": "South", "id": 444, "type": "wind", "suit": "south", "locked": false },
    //#endregion

    //#region Dragons - 3 tile types, 4 of each tile
    { "name": "Red Dragon", "id": 523, "type": "dragon", "suit": "red", "locked": false },
    { "name": "Red Dragon", "id": 524, "type": "dragon", "suit": "red", "locked": false },

    { "name": "White Dragon", "id": 534, "type": "dragon", "suit": "white", "locked": false },
    //#endregion

    //#region Flowers - 1 tile type, 8 copies
    { "name": "Flower", "id": 614, "type": "flower", "locked": false },
    { "name": "Flower", "id": 615, "type": "flower", "locked": false },
    { "name": "Flower", "id": 616, "type": "flower", "locked": false },
    { "name": "Flower", "id": 617, "type": "flower", "locked": false },
    { "name": "Flower", "id": 618, "type": "flower", "locked": false },
    //#endregion

    //#region Jokers - 1 tile type, 8 copies
    { "name": "Joker", "id": 714, "type": "joker", "locked": false },
    { "name": "Joker", "id": 715, "type": "joker", "locked": false },
    { "name": "Joker", "id": 716, "type": "joker", "locked": false },
    { "name": "Joker", "id": 717, "type": "joker", "locked": false },
    { "name": "Joker", "id": 718, "type": "joker", "locked": false },
    //#endregion
]

export default function TutorialTiles() {
    return tutorialTiles;
}

/* -=-=- GUIDE TO TILE IDS -=-=-
 * Tile ids are a three-digit number, formatted as follows.
 * 
 * DIGIT #1: The first digit is based on the "suit" of the tile:
 *      - 1 = Circles/Dots
 *      - 2 = Bamboos/Bams
 *      - 3 = Characters/Cracks
 *      - 4 = Winds
 *      - 5 = Dragons
 *      - 6 = Flowers
 *      - 7 = Jokers
 * 
 * DIGIT #2: The second digit is based on the "number" of the tile.
 * This is self-evident for the first three suits (1-9), and
 * for Flowers and Jokers (only 1).
 * Wind tiles are "numbered" in NEWS order:
 *      - 1 = North
 *      - 2 = East
 *      - 3 = West
 *      - 4 = South
 * Dragons are "numbered" in GRW order:
 *      - 1 = Green
 *      - 2 = Red
 *      - 3 = White
 * 
 * DIGIT #3: The third digit is based on the "instance" of the tile.
 * Every tile has at least 4 copies of itself (i.e. instances),
 * although all instances of a single tile are functionally the same.
 * This number just helps distinguish tiles with the same names.
 */