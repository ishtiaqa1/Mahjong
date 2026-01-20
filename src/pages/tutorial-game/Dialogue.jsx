export default function Dialogue() {
    const dialogue = {
        //#region Introduction, starting deal, score card pt.1
        0: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<h1>Mahjong Tutorial</h1><br />"
        },

        1: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p>Welcome to the mahjong tutorial game!</p><p>In this tutorial, we'll walk through the basic rules and gameplay of American mahjong by playing through a fixed example game.</p><p>You can return to the <b>Instructions</b> page at any time by clicking the <span class='mahjong-green'>&#8617;</span> button in the top right corner.</p>"
        },

        2: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p>Mahjong is a four-player strategy game played with tiles.</p><p>A typical game involves many rounds where players draw, discard, and call tiles to curate their hand. The goal of the game is to make your tiles match one of the possible winning hands.</p><p>For this example game, our other three players will be <b>Luke</b> on our left, <b>Andy</b> across from us, and <b>Rachel</b> on our right.</p>"
        },

        3: {
            popup: "tpc medium", background: "", highlight: "", button: false,
            text: "<p>We start by rolling a pair of dice. Whoever rolls the highest number will become the <b>dealer</b> to start the game.</p><p>Go ahead and click on the <b>Dice 🎲</b> button below to roll.</p>"
        },

        5: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Looks like <b>Luke</b> is our dealer today. That means it's his turn first. After that, play will continue <b>counterclockwise</b>.</p>"
        },

        6: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Now, it's time to play the game!</p>"
        },

        7: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>To begin, every player is dealt <b>thirteen</b> tiles.</p><p>The <b>dealer</b> (Luke) gets an extra <b>fourteenth</b> tile.</p>"
        },

        8: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Let's take a moment to examine the game board.</p>"
        },

        9: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-full-rack", button: true,
            text: "<p>This is your <b>tile rack</b>, where your <b>hand</b> is kept.</p>"
        },

        10: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>These are your <b>hidden</b> tiles. No other player can see these tiles, and you cannot see theirs.</p><p>You can move them around by dragging and dropping them, or click on the <b>Sort Tiles</b> tab to order them automatically.</p>"
        },

        11: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-exposed", button: true,
            text: "<p>This is where your <b>exposed</b> tiles will go later on. All players can see these tiles.</p>"
        },

        12: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>Next, let's see what kinds of tiles we've been dealt.</p>"
        },

        13: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>We have three <b>Flowers</b>, an <b>East</b> wind, some <b>numbered</b> tiles of different <b>suits</b> (especially a lot of <b>sevens</b>), a few <b>Dragons</b>...</p>"
        },

        14: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>Ooh, and a <b>Joker</b>!</p><p><b>Jokers</b> are a powerful type of tile. They act like <b>wild cards</b>, and can stand in for <b>any tile</b> in a group of three or more.</p>"
        },

        15: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-scorecard", button: false,
            text: "<p>Our next step should be to take a look at the score card.</p><p>Go ahead and click on the <b>Score Card</b> tab below to open it.</p>"
        },

        16: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>The <b>score card</b> contains every possible winning hand in the game. In order to win mahjong, our tiles must perfectly match one of these hands.</p><p>Notice that all winning hands consist of <b>fourteen</b> tiles. That means we can only call mahjong during our turn, but we can view the score card at any time.</p>"
        },

        17: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>There are a few different categories of winning hands, each grouped by common characteristics.</p><p>For example, the <b>Any Like Numbers</b> category involves collecting lots of matching numbered tiles.</p>"
        },

        18: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>The score card uses <b>abbreviations</b> to indicate different tiles:</p>"
        },

        19: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Matching tiles are often <b>grouped</b> together:</p>"
        },

        20: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Different <b>colors</b> of tile groups indicate different tile suits. Only numbered tiles and dragons have suits.</p><p>For numbered tiles (1-9), the suits are <b>Dots</b> (or <b>Circles</b>), <b>Bams</b> (or <b>Bamboos</b>), and <b>Cracks</b> (or <b>Characters</b>).</p><p>For dragons (D), the suits are <b>Red Dragons</b>, <b>Green Dragons</b>, and <b>White Dragons</b> (or <b>Soaps</b>).</p>"
        },

        21: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Any suit can be used for any color you want. However, tiles of the same color within a hand must be the same suit, and tiles of different colors must be of different suits.</p><p>In short, the number of colors simply indicates how many different suits are needed in a hand.</p>"
        },

        22: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Lastly, some hands have special <b>conditions</b>. These hands will be highlighted in green. You can hover over or click on a highlighted hand to see the details of its condition.</p>"
        },

        23: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>For example, consider this hand from the <b>Any Like Numbers</b> category.</p><p title='Any matching numbered tiles'><mark class='winning-hand'> FFF <span class='mahjong-red'>1111</span> DDD <span class='mahjong-green'>1111</span></mark></p><p>On the <b>score card</b>, hovering over or clicking on this hand shows the condition <b>\"any matching numbered tiles\"</b>. That means all the <b>1</b>s in this hand can be substituted for any other number of your choice.</p><p>In general for these hands, the rule is to maintain the <b>pattern</b> of numbers (in this case, all matching numbers), but you should always check the details to be safe.</p>"
        },

        24: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Mastering the score card is frequently considered the most difficult part of learning American mahjong.</p><p>For this reason, there is a <b>Reading Guide</b> attached to your score card in case you ever need a refresher. You can find this reading guide by clicking the &#x2754; button at the top of the card.</p>"
        },

        25: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Feel free to take your time reading through the score card and its reading guide. When you are ready to resume the tutorial, close the score card by clicking the <span class='mahjong-red'>&#x2716;</span> button in the top right corner.</p>"
        },
        //#endregion

        //#region Left discard, Down draw, score card pt.2
        27: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Now, let's play some mahjong!</p>"
        },

        28: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>To kick off the game, the <b>dealer</b> (Luke) has <b>fourteen</b> tiles in hand, so he must <b>discard</b> one of his tiles.</p>"
        },

        30: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>When you <b>discard</b> a tile, it is placed in the center of the game board for all other players to see.</p>"
        },

        31: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>Each player must then either <b>pass</b> on the tile or <b>call</b> it for themselves.</p>"
        },

        32: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-pass", button: true,
            text: "<p>When you <b>pass</b> on a tile, you are simply passing it by. This is the typical choice in any round.</p>"
        },

        33: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-call", button: true,
            text: "<p>When you <b>call</b> a tile, it joins your hand as an <b>exposed</b> tile. We'll cover this in more detail soon.</p>"
        },

        34: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-pass", button: false,
            text: "<p>For now, it doesn't look like we need a <b>North</b> tile. Go ahead and click the <b>PASS</b> button to pass on this tile.</p>"
        },

        36: {
            popup: "tpc superhigh", background: "", highlight: "", button: true,
            text: "<p>All players have passed on this tile.</p>"
        },

        37: {
            popup: "tpc superhigh", background: "", highlight: "", button: true,
            text: "<p>The tile is now moved into the full <b>discard pile</b> and completely removed from the game.</p>"
        },

        38: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-counter", button: true,
            text: "<p>You can see how many tiles of each type have been discarded at any time by clicking on the <b>Tile Counter</b> tab below.</p>"
        },

        39: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Now it's our turn!</p>"
        },

        40: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>We begin by drawing a new tile from the deck.</p><p>Looks like we drew another <b>Red Dragon</b> tile.</p>"
        },

        41: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-scorecard", button: false,
            text: "<p>Let's check the <b>score card</b> again.</p><p>Go ahead and click the <b>Score Card</b> tab below.</p>"
        },

        42: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Now is a good time to start thinking about the possible winning combinations we should work toward.</p><p>Our hand has a lot of flowers, dragons, and sevens, so the <b>Any Like Numbers</b> category might be a good fit for us.</p><p>Let's look at some of our options.</p>"
        },

        43: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Here's one hand option:</p><p title='Any matching numbered tiles'><mark class='winning-hand'>FFFF <span class='mahjong-red'>1111</span> <span class='mahjong-green'>11</span> 1111</mark></p><p>We already have three <b>Flowers</b>, one <b>7 Dot</b>, one <b>7 Bam</b>, and two <b>7 Cracks</b>. We also have a <b>Joker</b> to use as a wild card in any group of three or more.</p><p>That means we're currently only <b>six tiles away</b> from winning with this hand. That's pretty good!</p>"
        },

        44: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>But what are our other options?</p>"
        },

        45: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>How about this hand?</p><p title='Any matching numbered tiles'><mark class='winning-hand'> FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>For this hand, we already have two <b>Flowers</b>, one <b>7 Dot</b> (or one <b>7 Bam</b>), two <b>Red Dragons</b>, two <b>7 Cracks</b>, and a <b>White Dragon</b>. We also have a <b>Joker</b>.</p><p>That means we're only <b>five tiles away</b> from winning with this hand!</p>"
        },

        46: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>But wait!</p><p title='Any matching numbered tiles'><mark class='winning-hand'><span class='mahjong-red'>11 DD</span> <span class='mahjong-green'>111 DDD</span> 1111</mark></p><p>We're only <b>six tiles away</b> from winning with this one too!</p>"
        },

        47: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Early in the game, there are many different paths we can take. It's a good idea to keep our options open, but we should start playing in the <b>direction</b> of some hands.</p>"
        },

        48: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>For now, we have a lot of <b>Flowers</b> and <b>Dragons</b>, in our hand, plus some like numbers (<b>7 Cracks</b>, <b>7 Bams</b>, and <b>7 Dots</b>).</p>"
        },

        49: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>This hand will make use of all those tiles. We're also closest to winning with this one right now.</p><p>However, this hand has a lot of pairs. You cannot call a discarded tile for a single or pair unless you're declaring mahjong.</p><p>We also can't use Jokers in pairs or singles.</p>"
        },

        50: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>Either way, let's pursue this hand for now. We can always change our strategy later.</p>"
        },

        51: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Go ahead and close the score card whenever you're ready to keep playing.</p>"
        },
        //#endregion

        //#region Down discard, Right draw and discard
        53: {
            popup: "tpc medium", background: "", highlight: "", button: true,
            text: "<p>After drawing a tile on your turn, you will see two <b>boxes</b> appear above your tile rack.</p>"
        },

        54: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-discard", button: true,
            text: "<p>This is the <b>discard box</b>. When you want to discard a tile, you drag the tile to discard in here.</p>"
        },

        55: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-swap", button: true,
            text: "<p>This is the <b>swap box</b>. When you want to perform a <b>Joker swap</b>, you drag the tile to swap in here. We'll cover Joker swaps in more detail soon.</p>"
        },

        56: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>Now, since we drew a tile and currently have <b>fourteen</b> tiles, it's our turn to <b>discard</b>.</p><p>Let's pick a tile we don't think we'll need later.</p>"
        },

        57: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>How about your <b>East</b> wind tile?</p>"
        },

        58: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: false,
            text: "<p>Go ahead and drag the <b>East</b> tile into the <b>discard box</b> below.</p>"
        },

        59: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: false,
            text: "<p>Now click the <span class='mahjong-green'>&#x2714;</span> button to <b>confirm</b> your discard.</p><p>You can also try clicking the <span class='mahjong-red'>&#x2716;</span> button to <b>undo</b> the discard.</p>"
        },

        60: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>Well done! Now, let's see what the other players do.</p>"
        },

        62: {
            popup: "tpc superhigh", background: "", highlight: "", button: true,
            text: "<p>All players have passed on this tile.</p>"
        },

        63: {
            popup: "tpc superhigh", background: "", highlight: "", button: true,
            text: "<p>The tile is then removed from the game.</p>"
        },

        64: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Now it's <b>Rachel</b>'s turn on the right.</p>"
        },

        65: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Rachel <b>draws</b> a tile...</p>"
        },

        67: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>Then <b>discards</b> a tile.</p>"
        },

        68: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-pass", button: false,
            text: "<p>We don't need any <b>5 Bam</b> tiles right now.</p><p>Go ahead and <b>pass</b>.</p>"
        },

        70: {
            popup: "tpc superhigh", background: "", highlight: "", button: true,
            text: "<p>All players pass.</p>"
        },
        //#endregion

        //#region Across draw and discard, Down calls for and collects kong
        72: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Now it's <b>Andy</b>'s turn overhead.</p>"
        },

        74: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>Andy has discarded a <b>7 Crack</b>. We need one of those tiles for our winning hand! That means it might be time to <b>call</b>.</p>"
        },

        75: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p>When you <b>call</b> a discarded tile in mahjong, you group it with a set of two or more tiles from your hand and move it to the <b>exposed</b> rack. All players will now be able to see these tiles, and they will be <b>locked</b> in place.</p><p>In addition, if you use <b>Jokers</b> to complete the tile group, they can now be taken by other players in a <b>Joker swap</b>.</p>"
        },

        76: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p>Calling a tile is a bold but risky move. It can quickly get you closer to mahjong, but if you don't find the other tiles you need, it will restrict your options. You could lose Jokers to other players this way. More advanced players might even figure out what hand you're working toward and use it against you.</p><p>For these reasons, it can be just as common to <b>pass</b> on a tile you need, especially in the early stages of a game.</p>"
        },

        77: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>Earlier, this was the winning hand we decided to pursue. This hand requires two <b>kongs</b> (groups of four tiles) of matching numbers. Since we already had four <b>sevens</b> in hand, we decided to use sevens as our matching number.</p>"
        },

        78: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>If we choose to expose a <b>kong</b> of <b>7 Crack</b> tiles, we will be one step closer to mahjong. However, since we only have two <b>7 Crack</b> tiles in hand, we will have to expose a <b>Joker</b> too.</p><p>On the other hand, there are only <b>four</b> of each numbered tile in the game. If we pass on this tile now, we may not find one later, and will either have to use more <b>Jokers</b> or change our strategy.</p>"
        },

        79: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p>In a regular game of mahjong, the decision to pass or call comes down to the context of the game and your personal strategy. The more experienced you become, the more confident you will be in your decisions.</p><p>In this case, a <b>kong of sevens</b> can be found in various other hands, so it will get us closer to mahjong without restricting our hand options too badly in case we need to pivot later.</p>"
        },

        80: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p>So, let's call the tile!</p>"
        },
        
        81: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-call", button: false,
            text: "<p>To call a discarded tile, we must first click the <b>CALL</b> button. Go ahead and click the button now.</p>"
        },

        82: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-callopts", button: true,
            text: "<p>Now we must decide <b>how many tiles</b> to expose. A <b>pong</b> is three tiles, a <b>kong</b> is four, and a <b>quint</b> is five.</p>"
        },

        83: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-callmahjong", button: true,
            text: "<p>If you are ready to win, you can also directly <b>call mahjong</b> when you call a tile. This gives you priority over other calling players, and is the <b>only time</b> you can call for a <b>single</b> or <b>pair</b>.</p>"
        },

        84: {
            popup: "tpc high", background: "tpb", highlight: "highlight hl-kong", button: false,
            text: "<p>In this case, we want to click the <b>KONG</b> button. This will use the discarded <b>7 Crack</b> tile, the two <b>7 Crack</b> tiles in our hand, and the <b>Joker</b> in our hand.</p><p>You can also try clicking the <span class='mahjong-red'>&#x2716;</span> button to <b>undo</b> the call.</p>"
        },

        85: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>Great job!</p><p>Now, let's see what the other players do. If another player correctly calls the tile for <b>mahjong</b>, they automatically take the tile and win. If they do not call for mahjong, but have an <b>earlier turn</b> than us, they will still get priority.</p>"
        },

        87: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>Looks like no one else is calling the tile. That means it's all ours!</p>"
        },

        89: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-exposed", button: true,
            text: "<p>You did it! We now have a <b>kong of 7 Crack</b> tiles.</p>"
        },

        90: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-exposed", button: true,
            text: "<p>Now that we've laid these tiles down, they are <b>locked</b> in place. That means we cannot <b>discard</b> them, nor can we move them back to our <b>hidden</b> rack. If we want to win mahjong, we must now do it with a hand that can use a kong of sevens.</p>"
        },

        91: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-exposed", button: true,
            text: "<p>However, <b>exposed Jokers</b> have special rules.</p><p>Currently, our exposed Joker is standing in for a <b>7 Crack</b> tile. If any player (including us!) has a <b>7 Crack</b> tile, they can <b>swap</b> it with that exposed Joker during their turn!</p><p>This is called a <b>Joker swap</b>.</p>"
        },

        92: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>Because we called a tile, we now have <b>fourteen</b> total tiles in our hand again. That means it's our turn, and we need to <b>discard</b> another tile we don't need.</p>"
        },

        93: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>How about that <b>1 Dot</b> tile?</p>"
        },

        94: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: false,
            text: "<p>Go ahead and drag the <b>1 Dot</b> into the <b>discard box</b> now, then <b>confirm</b> the discard by clicking the <span class='mahjong-green'>&#x2714;</span> button.</p>"
        },

        95: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: false,
            text: "<p>Go ahead and drag the <b>1 Dot</b> into the <b>discard box</b> now, then <b>confirm</b> the discard by clicking the <span class='mahjong-green'>&#x2714;</span> button.</p>"
        },
        //#endregion
        
        //#region Full turn, including: Right Joker swaps with Down, multi-call, no call for pair
        97: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Oh! It looks like <b>Rachel</b> is ready to do a <b>Joker swap</b> right now!</p>"
        },

        98: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>When this happens, Rachel will take our <b>exposed Joker</b> tile and \"swap\" it with the <b>7 Crack</b> tile in her hidden hand. Then the <b>Joker</b> is unlocked and added into her hand to use however she wants.</p>"
        },

        100: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Now our <b>kong of sevens</b> consists only of <b>7 Crack</b> tiles.</p>"
        },

        102: {
            popup: "tpc high", background: "", highlight: "", button: false,
            text: "<p>We don't need any <b>8 Bam</b> tiles. Go ahead and pass.</p>"
        },

        104: {
            popup: "tpc low", background: "", highlight: "", button: true,
            text: "<p>Both <b>Luke</b> and <b>Andy</b> have called the tile!</p><p>However, Andy's turn comes before Luke's, so they get the tile this time.</p>"
        },

        106: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>There's another tile we need! A <b>White Dragon</b>.</p>"
        },

        107: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>However, in our tracked hand, we only need a <b>pair</b> of white dragons. You cannot call a discarded tile for a pair or single unless you also <b>call mahjong</b> to win.</p>"
        },

        108: {
            popup: "tpc high", background: "", highlight: "", button: false,
            text: "<p>In that case, let's <b>pass</b> on this tile.</p>"
        },

        110: {
            popup: "tpc high", background: "", highlight: "", button: false,
            text: "<p>We don't need any <b>2 Crack</b> tiles. Let's <b>pass</b>.</p>"
        },
        //#endregion

        //#region Joker swap, Flower discard, full ~uneventful turns
        112: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>Ah, there's that <b>White Dragon</b> we were looking for!</p>"
        },

        113: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>We're getting close to mahjong now: only <b>three tiles away</b>.</p>"
        },

        114: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-andyex", button: true,
            text: "<p>But first, take a look at the <b>pong</b> that <b>Andy</b> just laid down.</p>"
        },

        115: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-andyex", button: true,
            text: "<p>They're currently using a <b>Joker</b> to replace an <b>8 Bam</b> tile.</p>"
        },

        116: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>We have an <b>8 Bam</b> tile! That means we can do a <b>Joker swap</b>.</p>"
        },

        117: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: false,
            text: "<p>Just like discarding, drag your <b>8 Bam</b> tile into the <b>swap box</b> below.</p>"
        },

        118: {
            popup: "tpc medium", background: "tpb", highlight: "highlight hl-hidden", button: false,
            text: "<p>Then click the <span class='mahjong-green'>&#x2714;</span> button to confirm it.</p>"
        },

        120: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Excellent! Now we have a <b>Joker</b> at our disposal again. That means we're only <b>two tiles away</b> from winning mahjong now. All we need is <b>sevens</b>.</p>"
        },

        121: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>For now, our winning hand only needs a <b>pair</b> of <b>Flower</b> tiles. We have an extra, so we can discard one.</p>"
        },
        
        122: {
            popup: "tpc medium", background: "", highlight: "", button: false,
            text: "<p>Go ahead and fully discard a <b>Flower</b> tile.</p>"
        },

        123: {
            popup: "tpc medium", background: "", highlight: "", button: false,
            text: "<p>Go ahead and fully discard a <b>Flower</b> tile.</p>"
        },

        125: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Now try going through a typical round on your own!</p><p>Remember, we only need <b>7 Dot</b> or <b>7 Bam</b> tiles.</p>"
        },
        
        126: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-help", button: true,
            text: "<p>If you get stuck or need a reminder, click on the <b>help button</b> in the bottom right corner of your tile rack. When it's your turn to act, it will give you a hint on what to do.</p>"
        },

        128: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p><b>Hint:</b> we don't need any <b>South</b> tiles, so you should <b>pass</b>.</p>"
        },

        130: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p><b>Hint:</b> we don't need any <b>9 Dot</b> tiles, so you should <b>pass</b>.</p>"
        },

        131: {
            popup: "tpc high", background: "", highlight: "", button: true,
            text: "<p>Discarded <b>Jokers</b> are considered <b>dead tiles</b>. They cannot be called by any player, so there is no choice but to <b>pass</b>.</p>"
        },

        133: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>Well done! Now it's our turn again.</p>"
        },

        134: {
            popup: "tpc", background: "tpb", highlight: "highlight hl-hidden", button: true,
            text: "<p>Looks like we drew a <b>7 Bam</b> tile. Now we're only <b>one tile away</b> from winning!</p>"
        },

        135: {
            popup: "tpc medium", background: "", highlight: "", button: false,
            text: "<p>Go ahead and discard the <b>7 Dot</b> tile, then keep playing on your own. You can use the <b>hint button</b> if you get stuck.</p>"
        },

        136: {
            popup: "tpc medium", background: "", highlight: "", button: false,
            text: "<p>Go ahead and discard the <b>7 Dot</b> tile, then keep playing on your own. You can use the <b>hint button</b> if you get stuck.</p>"
        },

        138: {
            popup: "tpc", background: "tpb", highlight: "", button: true,
            text: "<p><b>Hint:</b> we don't need any <b>1 Crack</b> tiles, so you should <b>pass</b>.</p>"
        },
        //#endregion

        //#region Calling for mahjong, rules on multi-mahjong, winning by score card, ending
        140: {
            popup: "tpc high", background: "", highlight: "", button: false,
            text: "<p>There's the last tile we need to win! Let's <b>call</b> it.</p>"
        },

        141: {
            popup: "tpc high", background: "", highlight: "", button: false,
            text: "<p>Then click the <b>MAHJONG</b> button to call <b>mahjong</b>.</p>"
        },

        142: {
            popup: "tpc medium", background: "", highlight: "", button: true,
            text: "<p>Now, let's wait and make sure no one else is calling <b>mahjong</b>.</p><p>If multiple players call mahjong at the same time, the player who is <b>closest in turn</b> takes priority.</p>"
        },

        144: {
            popup: "tpc medium", background: "", highlight: "", button: true,
            text: "<p>Looks like <b>Luke</b> is attempting to call a <b>pong</b>. Even though he is ahead of us in turn, calling <b>mahjong</b> has a stronger priority than a <b>pong</b>, <b>kong</b>, or <b>quint</b>.</p><p>However, if we <b>incorrectly</b> called a tile for mahjong, we would lose priority, and the tile would go to Luke.</p>"
        },

        145: {
            popup: "tpc", background: "", highlight: "", button: true,
            text: "<p>In this case, the tile is ours! Now we get to declare mahjong properly.</p>"
        },

        146: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Whenever we <b>call mahjong</b>, whether from calling a tile or simply drawing one, we have to do it from the <b>score card</b>.</p><p>In a normal game, if you had drawn mahjong instead of called it, you would have to open your <b>score card</b> manually. However, every other step is the same.</p>"
        },

        147: {
            popup: "tpc card low", background: "", highlight: "", button: false,
            text: "<p>First, go ahead and click the <b>CALL MAHJONG</b> button at the top of the <b>score card</b>.</p>"
        },

        148: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Now we must find and click on our selected <b>winning hand</b>. Remember, this is the hand we chose:</p><p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p>"
        },

        149: {
            popup: "tpc card bottom", background: "", highlight: "", button: false,
            text: "<p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p><p>Find and click this hand under the <b>Any Like Numbers</b> category of the score card.</p>"
        },

        150: {
            popup: "tpc", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Now, we get one last chance to make sure we've done everything correctly before we call <b>mahjong</b>.</p><p>Let's take a look.</p>"
        },

        151: {
            popup: "tpc card left", background: "", highlight: "", button: true,
            text: "<p>We have a <b>pair of Flowers</b>.</p>"
        },

        152: {
            popup: "tpc card left", background: "", highlight: "", button: true,
            text: "<p>We have a <b>kong of 7 Cracks</b>.</p>"
        },

        153: {
            popup: "tpc card left", background: "", highlight: "", button: true,
            text: "<p>We have a <b>pair of Red Dragons</b>.</p>"
        },

        154: {
            popup: "tpc card left", background: "", highlight: "", button: true,
            text: "<p>We have three <b>7 Bams</b> and a <b>Joker</b> for the second <b>kong</b>.</p>"
        },

        155: {
            popup: "tpc card left", background: "", highlight: "", button: true,
            text: "<p>And lastly, we have a <b>pair of White Dragons</b>.</p>"
        },

        156: {
            popup: "tpc card center", background: "tpb-card-dialogue-bg", highlight: "", button: true,
            text: "<p>Everything matches. Now, it's time to <b>call mahjong</b> and <b>win the game</b>.</p>"
        },
        //#endregion
    }

    // The winning hand we're tracking:
    // <p title='Any matching numbered tiles'><mark class='winning-hand'>FF <span class='mahjong-red'>1111 DD</span> <span class='mahjong-green'>1111 DD</span></mark></p>

    return dialogue;
}