// =============================================================================
// CARD DEFINITIONS
// Defined once. All decks reference these shared lists.
// =============================================================================

const MAJOR_ARCANA = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Divine Timing",
    "Judgement", "The World"
];

const CUPS = [
    "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups",
    "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups",
    "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups"
];

const PENTACLES = [
    "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles",
    "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles",
    "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
];

const SWORDS = [
    "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
    "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
    "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords"
];

const WANDS = [
    "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
    "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
    "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands"
];

const STANDARD_78 = [...MAJOR_ARCANA, ...CUPS, ...PENTACLES, ...SWORDS, ...WANDS];

// =============================================================================
// DECK REGISTRY
// =============================================================================

const deckConfig = {};

// =============================================================================
// IMAGE PATH RESOLVER
// All decks are custom (user-uploaded); images are looked up by stable card id.
// =============================================================================

function getCardImagePath(deckName, cardId) {
    const cfg = deckConfig[deckName];
    if (!cfg) return null;
    return cfg.cardMap[cardId] || null;
}

// =============================================================================
// LAYOUTS
// Add new layouts here — positions and draw order only.
// =============================================================================

const layouts = {
    tarot: {
        cardSize: { width: '200px', height: '300px' },
        1: { x: '25%', y: '25%' },
        2: { x: '42%', y: '25%' },
        3: { x: '59%', y: '25%' },
        4: { x: '76%', y: '25%' },
        5: { x: '25%', y: '72%' },
        6: { x: '42%', y: '72%' },
        7: { x: '59%', y: '72%' },
        8: { x: '76%', y: '72%' },
    },
    dragon: {
        cardSize: { width: '80px', height: '130px' },
        // 1, 2, 10, 5 form the center spine (x45%), shifted up slightly
        // from their old 10/39/67 spots to leave room for 5 as a 4th card
        // underneath instead of off in its own column to the left.
        1:  { x: '45%', y: '7%' },
        2:  { x: '45%', y: '34%' },
        3:  { x: '55%', y: '15%' },
        4:  { x: '35%', y: '15%' },
        5:  { x: '45%', y: '86%' },
        6:  { x: '25%', y: '40%' },
        7:  { x: '15%', y: '30%' },
        8:  { x: '65%', y: '40%' },
        9:  { x: '75%', y: '30%' },
        10: { x: '45%', y: '60%' },
    },
    circle: {
        cardSize: { width: '110px', height: '170px' },
        // 5 points on a ring around a center card (6). The y-radius (37)
        // is deliberately much bigger than the x-radius (24) — the table
        // is wider than it is tall, so equalizing the two would look like
        // a flat oval, not a circle. Checked by hand against a fairly
        // small table (~900x600, well under most windows) so none of the
        // 6 cards clip each other or the table edge; my previous pass
        // only checked against a much roomier assumed table and that's
        // why it overlapped for real.
        1: { x: '50%', y: '17%' },
        2: { x: '73%', y: '43%' },
        3: { x: '64%', y: '84%' },
        4: { x: '36%', y: '84%' },
        5: { x: '27%', y: '43%' },
        6: { x: '50%', y: '54%' },
    },
    slant: {
        cardSize: { width: '120px', height: '200px' },
        // Card 1 shifted right so its left edge sits the same distance from
        // the deck bar as the tarot layout's card 1 (which is wider, so it
        // needs a bigger x% for the same edge position) — cards 2-4 shifted
        // by the same +2% to keep the diagonal's spacing unchanged.
        1: { x: '22%', y: '20%' },
        2: { x: '37%', y: '35%' },
        3: { x: '52%', y: '50%' },
        4: { x: '67%', y: '65%' },
    },
    vformation: {
        cardSize: { width: '120px', height: '200px' },
        1: { x: '8%',  y: '8%'  },  // 1 – left tip
        2: { x: '24%', y: '28%' },  // 2
        3: { x: '38%', y: '52%' },  // 3
        4: { x: '50%', y: '85%' },  // 4 – bottom point
        5: { x: '62%', y: '52%' },  // 5
        6: { x: '76%', y: '28%' },  // 6
        7: { x: '92%', y: '8%'  },  // 7 – right tip
    },

    celtic: {
        cardSize: { width: '120px', height: '200px' },
        // 1 and 2 (the crossing pair) are untouched. 3/4 pulled further
        // still from center. 7-10 (the right-hand column) shifted up and
        // given a little more breathing room between cards.
        1:  { x: '35%', y: '40%' },
        2:  { x: '35%', y: '40%', rotate: 90 },
        3:  { x: '35%', y: '6%' },
        4:  { x: '35%', y: '74%' },
        5:  { x: '15%', y: '40%' },
        6:  { x: '55%', y: '40%' },
        7:  { x: '75%', y: '86%' },
        8:  { x: '75%', y: '59%' },
        9:  { x: '75%', y: '32%' },
        10: { x: '75%', y: '5%' },
},

};

const drawOrders = {
    tarot:  [1, 2, 3, 4, 5, 6, 7, 8],
    dragon: [4, 1, 3, 6, 2, 8, 7, 9, 5, 10],
    circle: [1, 2, 3, 4, 5, 6],
    slant: [1, 2, 3, 4],
    celtic: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    vformation: [1, 7, 2, 6, 3, 5, 4],
    // ADD THIS:
    custom: [],
};

// =============================================================================
// RUNTIME STATE
// =============================================================================

let currentDeckName = null;
let currentDeck     = [];
let activeDeckType  = "tarot";
let layoutIndex     = 0;
let currentLayout = 'tarot';
let positions       = layouts.tarot;      // default layout
let drawOrder       = drawOrders.tarot;   // default draw order

// =============================================================================
// LAYOUT SWITCHER
// =============================================================================

function setLayout(name) {
    if (name === "dragon") {
        // This formation needs the full table width to size its cards up
        // well, so claim it by collapsing the deck-selector panel (the
        // settings panel already auto-collapses after a layout is chosen,
        // via closeLayoutPicker()).
        document.getElementById("deckSelector")?.classList.add("collapsed");
        document.getElementById("toggleDeckBar")?.classList.add("collapsed");
        fitDragonLayout();
    }
    currentLayout = name;
    positions   = layouts[name];
    drawOrder   = drawOrders[name];
    layoutIndex = 0;
    document.getElementById("table").innerHTML = "";
    createDeck();
    adjustDeckForLayout();
}

// The dragon rune layout's cards are small (80x130) by default. setLayout()
// collapses the deck-selector panel and the settings panel auto-collapses
// right after via closeLayoutPicker(), so both sit off-screen by the time
// this is visible — size cards to fill the table's full width/height
// (minus a small edge buffer), as large as possible without any two of
// the 10 points' cards overlapping.
const DRAGON_BASE = JSON.parse(JSON.stringify(layouts.dragon));

function fitDragonLayout() {
    const table = document.getElementById("table");
    if (!table) return;
    const tableRect = table.getBoundingClientRect();
    const tableW = tableRect.width  || window.innerWidth;
    const tableH = tableRect.height || (window.innerHeight - 70);

    const BUFFER_PX  = 20;
    const insetLeft  = BUFFER_PX;
    const insetRight = tableW - BUFFER_PX;
    const insetTop    = BUFFER_PX;
    const insetBottom = tableH - BUFFER_PX;
    const availW = Math.max(1, insetRight - insetLeft);
    const availH = Math.max(1, insetBottom - insetTop);

    const pointKeys = Object.keys(DRAGON_BASE).filter(key => key !== "cardSize");
    const pxPoints = {};
    pointKeys.forEach(key => {
        const base = DRAGON_BASE[key];
        pxPoints[key] = {
            xPx: insetLeft + (parseFloat(base.x) / 100) * availW,
            yPx: insetTop  + (parseFloat(base.y) / 100) * availH,
            rotate: base.rotate || 0,
        };
    });

    // Largest scale (relative to the base 80x130 size) at which no two
    // points' card boxes overlap: for each pair, a scale is safe as long
    // as EITHER axis keeps them apart, so the per-pair limit is
    // max(dx/baseW, dy/baseH); the layout's limit is the tightest pair.
    const baseW = DRAGON_BASE.cardSize && parseFloat(DRAGON_BASE.cardSize.width)  || 80;
    const baseH = DRAGON_BASE.cardSize && parseFloat(DRAGON_BASE.cardSize.height) || 130;
    let pairScale = Infinity;
    for (let i = 0; i < pointKeys.length; i++) {
        for (let j = i + 1; j < pointKeys.length; j++) {
            const a = pxPoints[pointKeys[i]], b = pxPoints[pointKeys[j]];
            const dx = Math.abs(a.xPx - b.xPx), dy = Math.abs(a.yPx - b.yPx);
            pairScale = Math.min(pairScale, Math.max(dx / baseW, dy / baseH));
        }
    }
    const GUTTER = 0.85; // leave breathing room between adjacent cards
    const scale = Math.min(2.5, Math.max(0.5, pairScale * GUTTER));

    layouts.dragon.cardSize = {
        width:  `${Math.round(baseW * scale)}px`,
        height: `${Math.round(baseH * scale)}px`,
    };
    pointKeys.forEach(key => {
        layouts.dragon[key] = {
            x: `${(pxPoints[key].xPx / tableW) * 100}%`,
            y: `${(pxPoints[key].yPx / tableH) * 100}%`,
            rotate: pxPoints[key].rotate,
        };
    });
}

// The draw pile (#deck) sits at a fixed spot by default (see its CSS
// margin-top). A tall layout (3+ rows) — a custom one, or a built-in one
// whose lowest row sits well below the others (dragon, circle, celtic) —
// can reach further down than that default spot, so push the pile down to
// clear the lowest row instead of shrinking cards to fit above it. Other
// built-in layouts are hand-tuned against the pile's default CSS position
// already, so leave them alone entirely.
function adjustDeckForLayout() {
    const deck = document.getElementById("deck");
    if (!deck) return;

    if (currentLayout !== "custom" && currentLayout !== "dragon" && currentLayout !== "circle" && currentLayout !== "celtic") {
        deck.style.top       = "";
        deck.style.marginTop = "";
        return;
    }

    const table = document.getElementById("table");
    if (!table) return;

    const size = layouts[currentLayout] && layouts[currentLayout].cardSize;
    if (!size) return;

    const tableH  = table.getBoundingClientRect().height || (window.innerHeight - 70);
    const cardHPx = parseFloat(size.height) || 0;

    let maxBottomPx = 0;
    Object.keys(positions).forEach(key => {
        const pos = positions[key];
        if (!pos || typeof pos.y === "undefined") return;
        const bottomPx = (parseFloat(pos.y) / 100) * tableH + cardHPx / 2;
        if (bottomPx > maxBottomPx) maxBottomPx = bottomPx;
    });

    const DECK_DEFAULT_CLEARANCE_PX = 750; // matches the pile's original fixed position
    const DECK_BUFFER_PX = 20;
    const clearance = Math.max(DECK_DEFAULT_CLEARANCE_PX, maxBottomPx + DECK_BUFFER_PX);

    deck.style.marginTop = "0px";
    deck.style.top = `${table.offsetTop + clearance}px`;
}

// =============================================================================
// UI — DECK SELECTOR BUTTONS + TAB TOGGLE
// =============================================================================

const deckSelector    = document.getElementById("deckSelector");
const deckButtonGrid  = document.getElementById("deckButtonGrid");
const deckPagerPrev   = document.getElementById("deckPagePrev");
const deckPagerNext   = document.getElementById("deckPageNext");
const deckPageIndicator = document.getElementById("deckPageIndicator");
const deckPagerControls = document.getElementById("deckPagerControls");

// Custom deck buttons are added dynamically by registerCustomDeck().

// Decks are shown 2-per-row, one page at a time per tab, so a deck bar with
// many decks doesn't turn into an endless scroll.
const DECKS_PER_PAGE = 6;
const deckPage = { tarot: 0, oracle: 0 };

function updateDeckPagination() {
    const type = activeDeckType;
    const allButtons   = Array.from(deckButtonGrid.children);
    const buttonsOfType = allButtons.filter(b => b.dataset.type === type);
    const totalPages   = Math.max(1, Math.ceil(buttonsOfType.length / DECKS_PER_PAGE));

    if (deckPage[type] >= totalPages) deckPage[type] = totalPages - 1;
    if (deckPage[type] < 0) deckPage[type] = 0;
    const page = deckPage[type];

    allButtons.forEach(b => { b.style.display = "none"; });
    buttonsOfType.forEach((b, i) => {
        b.style.display = Math.floor(i / DECKS_PER_PAGE) === page ? "flex" : "none";
    });

    const showPager = buttonsOfType.length > DECKS_PER_PAGE;
    deckPagerControls.style.display = showPager ? "flex" : "none";
    if (showPager) {
        deckPagerPrev.disabled = page === 0;
        deckPagerNext.disabled = page >= totalPages - 1;
        deckPageIndicator.textContent = `${page + 1} / ${totalPages}`;
    }
}

deckPagerPrev.onclick = () => {
    deckPage[activeDeckType]--;
    updateDeckPagination();
};

deckPagerNext.onclick = () => {
    deckPage[activeDeckType]++;
    updateDeckPagination();
};

document.querySelectorAll(".deckTypeBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedType = btn.dataset.type;
        if (selectedType === activeDeckType) return;
        activeDeckType = selectedType;

        document.querySelectorAll(".deckTypeBtn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        updateDeckPagination();
    });
});

// =============================================================================
// UI — PANEL TOGGLES
// =============================================================================

document.getElementById("toggleDeckBar").onclick = function () {
    deckSelector.classList.toggle("collapsed");
    const collapsed = deckSelector.classList.contains("collapsed");
    this.classList.toggle("collapsed", collapsed);
};

document.addEventListener("DOMContentLoaded", () => {
    const settingsBar = document.getElementById("settingsBar");
    const toggleBtn   = document.getElementById("toggleSettingsBar");
    settingsBar.classList.add("collapsed");
    toggleBtn.onclick = () => settingsBar.classList.toggle("collapsed");
});

// =============================================================================
// BACKGROUND PICKER MODAL
// =============================================================================

const BG_CATEGORIES = {

    caves: [
        { file: "background.jpg",   label: "Default" },
        { file: "background23.jpeg",   label: "Slot Canyon 1" },
        { file: "background51.jpg", label: "Slot Canyon 2" },
        { file: "background56.jpg", label: "Slot Canyon 3" },

    ],

    floral: [
        { file: "background20.jpeg", label: "Pink Blossoms" },
        { file: "background21.jpeg", label: "Pink Blossoms 2" },
        { file: "background22.jpeg", label: "Blossoms Study" },
        { file: "background11.jpeg", label: "Yellow Blossoms" },
        { file: "background16.jpeg", label: "Hot Pink Blossoms" },
        { file: "background18.jpeg", label: "Lavender"},
        { file: "background13.jpeg", label: "Purple Flowers" },
        { file: "background17.jpeg", label: "Pink Wildflowers" },
        { file: "background10.jpeg", label: "Yellow Wildflowers" },
        { file: "background15.jpeg", label: "Orange Flowers" },
        { file: "background14.jpeg", label: "Pink and Orange Wildflowers" },
        { file: "background107.jpeg", label: "Pink Peony" },
        { file: "background127.png", label: "Woman In Spring Office"},
    ],

    marble: [
        { file: "background73.jpeg", label: "White Marble" },
        { file: "background89.jpeg", label: "White Marble 2" },
        { file: "background91.jpeg", label: "White Marble 3" },
        { file: "background323.jpeg", label: "Pink Marble" },
        { file: "background325.jpeg", label: "Pink Marble 2" },
        { file: "background424.jpeg", label: "Pink Marble 3" },
        { file: "background86.jpeg", label: "Black Marble"},
        
    ],

    stone: [
        { file: "background4.jpg", label: "Stone Henge"},
        { file: "background120.jpeg", label: "Balancing Stones"},
        { file: "background124.jpeg", label: "Blue Stones"},
        { file: "background114.jpeg", label: "Mossy Rock" },
    ],

    mystical: [
        { file: "background24.png", label: "Knight"},
        { file: "background41.jpeg", label: "Snow Globe"},
        { file: "background7.jpeg", label: "Fairy Village"},
        { file: "dragon2.jpg", label: "Dragon Meditation"},
    ],

    forestandleaves: [
        { file: "background12.jpeg", label: "Christmas Forest" },
        { file: "background32.jpeg", label: "Summer Forest" },
        { file: "background108.jpeg", label: "Autumn Leaves and Acorns" },
        { file: "background550.jpeg", label: "Autumn Leaves and Acorns 2" },
        { file: "background600.jpeg", label: "Pumpkins and Leaves" },
        { file: "background106.jpeg", label: "Suculants" },
        { file: "background47.jpeg", label: "Mushrooms"},
        
    ],

    animals: [
        { file: "background8.jpg", label: "Reindeer" },
        { file: "background9.jpg", label: "Highland Cow" },
        { file: "background30.jpeg", label: "Sheep" },
    ],

    lakesandrivers: [
        { file: "background35.jpeg", label: "Mountain and Flowers"},
        { file: "background36.jpeg", label: "Dreamy Lake"},
        { file: "background39.jpeg", label: "Autumn River"},
        { file: "background2.jpeg", label: "Mystical Lake"},
    ],

    ocean: [
        { file: "background3.jpeg",  label: "Ocean Swing" },
        { file: "background50.jpeg", label: "Sea Grass" },
        { file: "background74.jpeg", label: "Sand"},
        { file: "background75.jpeg", label: "Sand and Waves" },
        { file: "ocean-shells2.jpg", label: "Shell 1" },
        { file: "ocean-shells3.jpg", label: "Shell 2" },

    ],

};

const CATEGORY_LABELS = {
    caves:  "Caves",
    floral: "Floral",
    marble:    "Marble",
    stone:     "Stones",
    mystical:  "Mystical",
    forestandleaves:   "Forest & Leaves",
    animals:  "Animals",
    lakesandrivers: "Lakes & Rivers",
    ocean:    "Ocean",
};

const ALL_IMAGES = Object.values(BG_CATEGORIES).flat();

document.addEventListener("DOMContentLoaded", () => {
    const overlay       = document.getElementById("bgPickerOverlay");
    const allGrid       = document.getElementById("bgAllGrid");
    const catGrid       = document.getElementById("bgPickerGrid");
    const confirmBtn    = document.getElementById("bgPickerConfirm");
    const cancelBtn     = document.getElementById("bgPickerCancel");
    const openPickerBtn = document.getElementById("openBgPicker");

    let pendingBg = null;

    function makeThumb(imgData) {
        const value = `img/background/${imgData.file}`;
        const thumb = document.createElement("div");
        thumb.className = "bgThumb";
        thumb.dataset.value = value;
        thumb.dataset.theme = imgData.theme || "dark";  // ← ADD THIS LINE

        const img = document.createElement("img");
        img.src = value;
        img.alt = imgData.label;

        const label = document.createElement("span");
        label.textContent = imgData.label;

        thumb.appendChild(img);
        thumb.appendChild(label);

        thumb.addEventListener("click", () => {
            document.querySelectorAll(".bgThumb").forEach(t => t.classList.remove("selected"));
            thumb.classList.add("selected");
            pendingBg = value;
        });

        return thumb;
    }

    ALL_IMAGES.forEach(imgData => {
        allGrid.appendChild(makeThumb(imgData));
    });

    Object.entries(BG_CATEGORIES).forEach(([categoryKey, images]) => {
        const section = document.createElement("div");
        section.className = "bgCategorySection";

        const title = document.createElement("h4");
        title.className = "bgCategoryTitle";
        title.textContent = CATEGORY_LABELS[categoryKey];
        section.appendChild(title);

        const row = document.createElement("div");
        row.className = "bgCarouselRow";

        const prevBtn = document.createElement("button");
        prevBtn.className = "bgCarouselArrow bgCarouselPrev";
        prevBtn.innerHTML = "&#10094;";

        const track = document.createElement("div");
        track.className = "bgCarouselTrack";

        const nextBtn = document.createElement("button");
        nextBtn.className = "bgCarouselArrow bgCarouselNext";
        nextBtn.innerHTML = "&#10095;";

        images.forEach(imgData => {
            track.appendChild(makeThumb(imgData));
        });

        const scrollAmount = 220;
        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        row.appendChild(prevBtn);
        row.appendChild(track);
        row.appendChild(nextBtn);
        section.appendChild(row);
        catGrid.appendChild(section);
    });

    catGrid.style.display = "none";

    document.getElementById("showAll").addEventListener("click", () => {
        document.getElementById("showAll").classList.add("active");
        document.getElementById("showCategories").classList.remove("active");
        allGrid.style.display = "grid";
        catGrid.style.display = "none";
    });

    document.getElementById("showCategories").addEventListener("click", () => {
        document.getElementById("showCategories").classList.add("active");
        document.getElementById("showAll").classList.remove("active");
        allGrid.style.display = "none";
        catGrid.style.display = "flex";
    });

    openPickerBtn.addEventListener("click", () => {
        pendingBg = null;
        document.querySelectorAll(".bgThumb").forEach(t => t.classList.remove("selected"));
        document.getElementById("showAll").classList.add("active");
        document.getElementById("showCategories").classList.remove("active");
        allGrid.style.display = "grid";
        catGrid.style.display = "none";
        overlay.classList.add("open");
    });

    cancelBtn.addEventListener("click", () => {
        overlay.classList.remove("open");
    });

    confirmBtn.addEventListener("click", () => {
        if (pendingBg) {
            document.body.style.backgroundImage = `url('${pendingBg}')`;
            const selectedThumb = document.querySelector(".bgThumb.selected");  // ← ADD THIS LINE
            const theme = selectedThumb ? selectedThumb.dataset.theme : "dark";
            document.body.classList.remove("theme-dark", "theme-light");
            document.body.classList.add(`theme-${theme}`);
        }
        overlay.classList.remove("open");
        document.getElementById("settingsBar").classList.add("collapsed");
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("open");
    });

    document.getElementById("bgUpload").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => { document.body.style.backgroundImage = `url('${e.target.result}')`; };
        reader.readAsDataURL(file);
    });

    createDeck();

    // =============================================================================
    // LAYOUT PICKER MODAL
    // =============================================================================

    document.getElementById("openLayoutPicker").addEventListener("click", () => {
        document.getElementById("layoutPickerOverlay").classList.add("open");
    });

    document.getElementById("layoutPickerCancel").addEventListener("click", () => {
        document.getElementById("layoutPickerOverlay").classList.remove("open");
    });

    document.getElementById("layoutPickerOverlay").addEventListener("click", (e) => {
        if (e.target === document.getElementById("layoutPickerOverlay")) {
            document.getElementById("layoutPickerOverlay").classList.remove("open");
        }
    });

    // =============================================================================
    // AUDIO LIBRARY MODAL
    // =============================================================================

    const audioOverlay = document.getElementById("audioLibraryOverlay");

    document.getElementById("openAudioLibrary").addEventListener("click", () => {
        audioOverlay.classList.add("open");
    });

    document.getElementById("audioLibraryCancel").addEventListener("click", () => {
        audioOverlay.classList.remove("open");
    });

    audioOverlay.addEventListener("click", (e) => {
        if (e.target === audioOverlay) audioOverlay.classList.remove("open");
    });

}); // end DOMContentLoaded



// =============================================================================
// LAYOUT PICKER CLOSE HELPER
// =============================================================================

function closeLayoutPicker() {
    document.getElementById("layoutPickerOverlay").classList.remove("open");
    document.getElementById("settingsBar").classList.add("collapsed");
}

// =============================================================================
// CUSTOM LAYOUT BUILDER
// =============================================================================

function saveCustomLayout(selectedCells) {
    // Only size/space the grid around the rows and columns the user
    // actually used, not the full 6x6 picker grid.
    const cellCols = selectedCells.map(cell => cell.c);
    const cellRows = selectedCells.map(cell => cell.r);
    const minC = Math.min(...cellCols), maxC = Math.max(...cellCols);
    const minR = Math.min(...cellRows), maxR = Math.max(...cellRows);
    const usedCols = maxC - minC + 1;
    const usedRows = maxR - minR + 1;

    const table  = document.getElementById('table');
    const rect   = table.getBoundingClientRect();
    const tableW = rect.width  || window.innerWidth;
    const tableH = rect.height || (window.innerHeight - 70);

    // Cards are always the built-in "2x4" layout's own fixed size —
    // never shrunk for denser grids — so every custom layout looks and
    // feels the same regardless of row/column count. If a tall layout
    // reaches past the card deck pile below the table, adjustDeckForLayout()
    // (called via setLayout() below) pushes the pile down to clear it
    // instead.
    const cardW = 200;
    const cardH = 300;

    // MARGIN_PCT matches the ~25% edge margin the built-in "2x4" layout
    // uses on both axes (its positions run 25%-76% horizontally and
    // 25%-72% vertically). Step is derived from the fixed card size with
    // the same fill factor, so column/row spacing follows the same rule
    // the "2x4" layout uses no matter how many rows or columns are used.
    const MARGIN_PCT = 25;
    const stepXPct = usedCols > 1 ? ((cardW / 0.85) / tableW) * 100 : 0;
    const stepYPct = usedRows > 1 ? ((cardH / 0.85) / tableH) * 100 : 0;

    layouts.custom     = { cardSize: { width: `${cardW}px`, height: `${cardH}px` } };
    drawOrders.custom  = [];

    selectedCells.forEach((cell, i) => {
        const posNum = i + 1;
        const xPct = usedCols === 1
            ? 50
            : Math.round(MARGIN_PCT + (cell.c - minC) * stepXPct);
        const yPct = usedRows === 1
            ? 50
            : Math.round(MARGIN_PCT + (cell.r - minR) * stepYPct);

        layouts.custom[posNum] = {
            x: `${xPct}%`,
            y: `${yPct}%`,
            rotate: cell.rotate || 0,
        };
        drawOrders.custom.push(posNum);
    });

    setLayout('custom');
    document.getElementById('customLayoutOverlay').classList.remove('open');
    closeLayoutPicker();
}

function openCustomLayoutBuilder() {
    document.getElementById('layoutPickerOverlay').classList.remove('open');
    document.getElementById('customLayoutOverlay').classList.add('open');
}

// =============================================================================
// AUDIO PLAYBACK
// =============================================================================

const audioPlayer = document.getElementById("audioPlayer");
let activePlayBtn = null;

function playTrack(btn, src) {
    if (activePlayBtn === btn && !audioPlayer.paused) {
        audioPlayer.pause();
        btn.textContent = "▶ Play";
        btn.classList.remove("playing");
        activePlayBtn = null;
        return;
    }

    if (activePlayBtn) {
        activePlayBtn.textContent = "▶ Play";
        activePlayBtn.classList.remove("playing");
    }

    audioPlayer.src = src;
    audioPlayer.play();
    btn.textContent = "⏸ Pause";
    btn.classList.add("playing");
    activePlayBtn = btn;

    audioPlayer.onended = () => {
        btn.textContent = "▶ Play";
        btn.classList.remove("playing");
        activePlayBtn = null;
    };
}

// =============================================================================
// CUSTOM DECK BUILDER
// =============================================================================

let customDeckCards    = [];
let customDeckCoverUrl = null;
let customDeckType     = 'tarot';
let customDeckTab      = 'tarot';
let editingDeckId      = null;
let activeDeckCarouselApi = null;

const CUSTOM_DECKS_STORAGE_KEY = 'customDecks';
const CUSTOM_DECKS_DB_NAME = 'white-sage-custom-decks';
const CUSTOM_DECKS_DB_VERSION = 1;
const CUSTOM_DECKS_STORE_NAME = 'decks';

function requestToPromise(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('Storage request failed'));
    });
}

function openCustomDecksDb() {
    return new Promise((resolve, reject) => {
        if (!('indexedDB' in window)) {
            reject(new Error('IndexedDB is not available'));
            return;
        }

        const request = indexedDB.open(CUSTOM_DECKS_DB_NAME, CUSTOM_DECKS_DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(CUSTOM_DECKS_STORE_NAME)) {
                db.createObjectStore(CUSTOM_DECKS_STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('Unable to open deck storage'));
    });
}

async function saveCustomDecksToStorage(decks) {
    if ('indexedDB' in window) {
        try {
            const db = await openCustomDecksDb();
            const tx = db.transaction(CUSTOM_DECKS_STORE_NAME, 'readwrite');
            const store = tx.objectStore(CUSTOM_DECKS_STORE_NAME);

            decks.forEach(deck => store.put(deck));
            await new Promise((resolve, reject) => {
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error || new Error('Unable to save deck storage'));
                tx.onabort = () => reject(tx.error || new Error('Deck storage save aborted'));
            });
            db.close();
            return;
        } catch (err) {
            console.warn('IndexedDB custom deck save failed, falling back to localStorage:', err);
        }
    }

    localStorage.setItem(CUSTOM_DECKS_STORAGE_KEY, JSON.stringify(decks));
}

async function getStoredCustomDecks() {
    if ('indexedDB' in window) {
        try {
            const db = await openCustomDecksDb();
            const tx = db.transaction(CUSTOM_DECKS_STORE_NAME, 'readonly');
            const store = tx.objectStore(CUSTOM_DECKS_STORE_NAME);
            const decks = await requestToPromise(store.getAll());
            db.close();
            return Array.isArray(decks) ? decks : [];
        } catch (err) {
            console.warn('Unable to load custom decks from IndexedDB:', err);
        }
    }

    return JSON.parse(localStorage.getItem(CUSTOM_DECKS_STORAGE_KEY) || '[]');
}

// Decks saved before cards had stable ids only have {name, dataUrl}. Assign
// each an id in place so old decks stop relying on name-based identity —
// this is what causes duplicated/ghost cards, since a display name is
// user-editable and easy to collide (e.g. two cards renamed identically, or
// a new slot's auto-generated name matching an already-used one).
function migrateLegacyDeckCards(deckData) {
    let changed = false;
    deckData.cards = (deckData.cards || []).map(c => {
        if (c.id) return c;
        changed = true;
        return { id: generateCardId(), name: c.name, dataUrl: c.dataUrl };
    });
    return changed;
}

async function loadCustomDecksFromStorage() {
    const saved = await getStoredCustomDecks();
    if (Array.isArray(saved) && saved.length > 0) {
        const anyChanged = saved.map(migrateLegacyDeckCards).some(Boolean);
        if (anyChanged) {
            try { await saveCustomDecksToStorage(saved); }
            catch (err) { console.warn('Unable to persist card-id migration:', err); }
        }
        saved.forEach(deckData => registerCustomDeck(deckData));
        return;
    }

    const legacyDecks = JSON.parse(localStorage.getItem(CUSTOM_DECKS_STORAGE_KEY) || '[]');
    const anyChanged = legacyDecks.map(migrateLegacyDeckCards).some(Boolean);
    if (anyChanged) {
        try { await saveCustomDecksToStorage(legacyDecks); }
        catch (err) { console.warn('Unable to persist card-id migration:', err); }
    }
    legacyDecks.forEach(deckData => registerCustomDeck(deckData));
}

function resetCustomDeckForm() {
    customDeckCards    = [];
    customDeckCoverUrl = null;
    customDeckType     = 'tarot';
    customDeckTab      = 'tarot';
    editingDeckId      = null;

    document.getElementById('customDeckName').value           = '';
    document.getElementById('customDeckCoverName').textContent = 'No file chosen';
    document.getElementById('customDeckCoverPreview').style.display = 'none';
    document.getElementById('customDeckSaveBtn').disabled      = true;
    document.getElementById('customDeckSaveBtn').textContent   = 'Create Deck';

    document.querySelectorAll('.customDeckTypeBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.type === 'tarot');
    });
    document.querySelectorAll('.customDeckTabBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === 'tarot');
    });

    activeDeckCarouselApi = createCarousel('createCarousel', [], customDeckType, (filledCards) => {
        customDeckCards = filledCards;
        checkCustomDeckReady();
    });
}

function openCustomDeckBuilder() {
    resetCustomDeckForm();
    switchDeckModalTab('create', document.querySelector('.customDeckTabSwitch[data-tab="create"]'));
    document.getElementById('customDeckOverlay').classList.add('open');
}

function startNewDeck() {
    resetCustomDeckForm();
    switchDeckModalTab('create', document.querySelector('.customDeckTabSwitch[data-tab="create"]'));
}

function closeCustomDeckBuilder() {
    document.getElementById('customDeckOverlay').classList.remove('open');
}

// =============================================================================
// DECK CARD CAROUSEL
// =============================================================================

const CAROUSEL_VISIBLE = 3;

function getAutoCardName(idx, type) {
    if (type === 'tarot' && STANDARD_78[idx]) return STANDARD_78[idx];
    return `Card ${idx + 1}`;
}

// Cards are identified internally by this id, not by their (freely editable,
// collision-prone) display name — see generateCardId() usage below.
let cardIdCounter = 0;
function generateCardId() {
    cardIdCounter += 1;
    return `card_${Date.now()}_${cardIdCounter}_${Math.random().toString(36).slice(2, 8)}`;
}

function readFileAsDataUrl(file, options = {}) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const maxWidth = options.maxWidth || 900;
                const maxHeight = options.maxHeight || 1400;
                const scale = Math.min(1, maxWidth / img.naturalWidth, maxHeight / img.naturalHeight);
                const width = Math.max(1, Math.round(img.naturalWidth * scale));
                const height = Math.max(1, Math.round(img.naturalHeight * scale));

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                const mimeType = options.mimeType || 'image/png';
                const quality = options.quality;
                resolve(canvas.toDataURL(mimeType, quality));
            };
            img.onerror = () => reject(new Error('Unable to process image'));
            img.src = event.target.result;
        };
        reader.onerror = () => reject(new Error('Unable to read file'));
        reader.readAsDataURL(file);
    });
}

function createCarousel(containerId, initialCards, deckType, onUpdate) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let cards = initialCards.length > 0
        ? [...initialCards, { id: null, name: getAutoCardName(initialCards.length, deckType), dataUrl: null }]
        : [{ id: null, name: getAutoCardName(0, deckType), dataUrl: null }];

    let offset      = 0;
    let pendingSlot = null;

    const fileInput = document.createElement('input');
    fileInput.type    = 'file';
    fileInput.accept  = 'image/*';
    fileInput.style.display = 'none';
    container.appendChild(fileInput);

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file || pendingSlot === null) return;
        try {
            const dataUrl = await readFileAsDataUrl(file, { maxWidth: 560, maxHeight: 900, mimeType: 'image/jpeg', quality: 0.8 });
            cards[pendingSlot].dataUrl = dataUrl;
            cards[pendingSlot].id      = cards[pendingSlot].id || generateCardId();
            ensureEmptySlot();
            render();
            onUpdate(getFilledCards());
            if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
        } catch (err) {
            console.error(err);
        }
        fileInput.value = '';
    });

    function getFilledCards() {
        return cards.filter(c => c.dataUrl !== null);
    }

    function ensureEmptySlot() {
        const filledCards = cards.filter(c => c.dataUrl !== null);
        cards = [...filledCards, { id: null, name: getAutoCardName(filledCards.length, deckType), dataUrl: null }];
    }

    function triggerUpload(idx) {
        pendingSlot = idx;
        fileInput.click();
    }

    const api = {
        replaceCards(nextCards) {
            cards = (nextCards.length > 0 ? nextCards : [{ id: null, name: getAutoCardName(0, deckType), dataUrl: null }])
                .map((card, idx) => ({
                    id: card.dataUrl ? (card.id || generateCardId()) : null,
                    name: card.name || getAutoCardName(idx, deckType),
                    dataUrl: card.dataUrl || null,
                }));
            offset = 0;
            ensureEmptySlot();
            render();
            onUpdate(getFilledCards());
            if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
        }
    };

    function deleteCard(idx) {
        if (cards.filter(c => c.dataUrl).length <= 1 && cards[idx].dataUrl) {
            cards[idx].dataUrl = null;
        } else {
            cards.splice(idx, 1);
        }
        offset = Math.min(offset, Math.max(0, cards.length - CAROUSEL_VISIBLE));
        ensureEmptySlot();
        render();
        onUpdate(getFilledCards());
        if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
    }

    function slide(dir) {
        offset = Math.max(0, Math.min(offset + dir, cards.length - CAROUSEL_VISIBLE));
        render();
    }

    function render() {
        container.innerHTML = '';
        container.appendChild(fileInput);
        container.className = 'deckCarousel';

        const counter = document.createElement('div');
        counter.className = 'carousel-counter';
        const filled = cards.filter(c => c.dataUrl).length;
        counter.textContent = `${filled} card${filled !== 1 ? 's' : ''} uploaded`;
        container.appendChild(counter);

        const row = document.createElement('div');
        row.className = 'carousel-row';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-arrow';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.disabled  = offset === 0;
        prevBtn.onclick   = () => slide(-1);

        const cardsEl = document.createElement('div');
        cardsEl.className = 'carousel-cards';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-arrow';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.disabled  = offset >= cards.length - CAROUSEL_VISIBLE;
        nextBtn.onclick   = () => slide(1);

        const visible = cards.slice(offset, offset + CAROUSEL_VISIBLE);
        while (visible.length < CAROUSEL_VISIBLE) visible.push(null);

        visible.forEach((card, vi) => {
            const realIdx = offset + vi;
            const col = document.createElement('div');
            col.className = 'carousel-card';

            if (!card) { cardsEl.appendChild(col); return; }

            const slot = document.createElement('div');
            slot.className = 'card-slot' + (card.dataUrl ? ' filled' : '');

            if (card.dataUrl) {
                const img = document.createElement('img');
                img.src = card.dataUrl;
                slot.appendChild(img);

                const overlay = document.createElement('div');
                overlay.className = 'card-slot-overlay';

                const replBtn = document.createElement('button');
                replBtn.textContent = 'Replace';
                replBtn.onclick = () => triggerUpload(realIdx);

                const delBtn = document.createElement('button');
                delBtn.textContent = 'Remove';
                delBtn.className   = 'del-btn';
                delBtn.onclick     = () => deleteCard(realIdx);

                overlay.appendChild(replBtn);
                overlay.appendChild(delBtn);
                slot.appendChild(overlay);
            } else {
                const ph = document.createElement('div');
                ph.className = 'card-slot-placeholder';
                ph.innerHTML = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 32V16M24 16L18 22M24 16L30 22" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 36a8 8 0 01-1.5-15.8A10 10 0 1132 28h2a6 6 0 000-12h-1A10 10 0 0012 28v8z" stroke="white" stroke-width="2" fill="none"/>
                </svg><span>Click or drop</span>`;
                slot.appendChild(ph);
                slot.onclick = () => triggerUpload(realIdx);

                slot.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    slot.style.borderColor = '#fff';
                });
                slot.addEventListener('dragleave', () => {
                    slot.style.borderColor = '';
                });
                slot.addEventListener('drop', (e) => {
                    e.preventDefault();
                    slot.style.borderColor = '';
                    const file = e.dataTransfer.files[0];
                    if (!file || !file.type.startsWith('image/')) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        cards[realIdx].dataUrl = ev.target.result;
                        cards[realIdx].id      = cards[realIdx].id || generateCardId();
                        ensureEmptySlot();
                        render();
                        onUpdate(getFilledCards());
                    };
                    reader.readAsDataURL(file);
                });
            }

            const nameInput = document.createElement('input');
            nameInput.type        = 'text';
            nameInput.className   = 'card-name-input';
            nameInput.value       = card.name;
            nameInput.placeholder = `Card ${realIdx + 1}`;
            nameInput.oninput     = () => {
                cards[realIdx].name = nameInput.value;
                onUpdate(getFilledCards());
            };

            col.appendChild(slot);
            col.appendChild(nameInput);
            cardsEl.appendChild(col);
        });

        row.appendChild(prevBtn);
        row.appendChild(cardsEl);
        row.appendChild(nextBtn);
        container.appendChild(row);

        const dotsEl = document.createElement('div');
        dotsEl.className = 'carousel-dots';
        const totalPages = Math.max(1, cards.length - CAROUSEL_VISIBLE + 1);
        for (let i = 0; i < Math.min(totalPages, 8); i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === offset ? ' active' : '');
            dotsEl.appendChild(dot);
        }
        container.appendChild(dotsEl);
    }

    render();
    return api;
}

async function handleBulkCardUpload(event) {
    const files = Array.from(event.target.files || []).filter(file => file.type.startsWith('image/'));
    if (!files.length || !activeDeckCarouselApi) return;

    const preparedCards = [];
    for (const [idx, file] of files.entries()) {
        const dataUrl = await readFileAsDataUrl(file, {
            maxWidth: 560,
            maxHeight: 900,
            mimeType: 'image/jpeg',
            quality: 0.8,
        });
        preparedCards.push({
            name: getAutoCardName(idx, customDeckType),
            dataUrl,
        });
    }

    activeDeckCarouselApi.replaceCards(preparedCards);
    if (typeof checkCustomDeckReady === 'function') checkCustomDeckReady();
    event.target.value = '';
}

function switchDeckModalTab(tab, btn) {
    document.querySelectorAll('.customDeckTabSwitch').forEach(b => b.classList.remove('active'));
    (btn || document.querySelector(`.customDeckTabSwitch[data-tab="${tab}"]`))?.classList.add('active');

    document.getElementById('customDeckViewCreate').style.display   = tab === 'create' ? 'flex' : 'none';
    document.getElementById('customDeckViewMyDecks').style.display  = tab === 'manage' ? 'flex' : 'none';

    if (tab === 'manage') renderMyDecksList();
}

function setCustomDeckType(btn) {
    customDeckType = btn.dataset.type;
    document.querySelectorAll('.customDeckTypeBtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function setCustomDeckTab(btn) {
    customDeckTab = btn.dataset.tab;
    document.querySelectorAll('.customDeckTabBtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

async function handleCoverUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
        customDeckCoverUrl = await readFileAsDataUrl(file, {
            maxWidth: 480,
            maxHeight: 720,
            mimeType: 'image/jpeg',
            quality: 0.8,
        });
        document.getElementById('customDeckCoverName').textContent = file.name;
        const preview = document.getElementById('customDeckCoverPreview');
        preview.src = customDeckCoverUrl;
        preview.style.display = 'block';
        checkCustomDeckReady();
    } catch (err) {
        console.error(err);
    }
}

function checkCustomDeckReady() {
    const name  = document.getElementById('customDeckName').value.trim();
    const ready = name.length > 0 && customDeckCoverUrl && customDeckCards.length > 0;
    document.getElementById('customDeckSaveBtn').disabled = !ready;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('customDeckName').addEventListener('input', checkCustomDeckReady);
});

async function saveCustomDeck() {
    const name = document.getElementById('customDeckName').value.trim();
    const id   = editingDeckId || ('customdeck_' + Date.now());
    const isEdit = !!editingDeckId;

    const deckData = {
        id,
        name,
        type:     customDeckTab,
        deckType: customDeckType,
        cover:    customDeckCoverUrl,
        cards:    customDeckCards,
    };

    try {
        const existing = await getStoredCustomDecks();
        const idx = existing.findIndex(d => d.id === id);
        if (idx > -1) existing[idx] = deckData; else existing.push(deckData);
        await saveCustomDecksToStorage(existing);
    } catch (err) {
        console.error('Unable to save custom deck:', err);
        alert('Unable to save the custom deck. Please reduce image size, use fewer cards, or try again in a supported browser.');
        return;
    }

    if (isEdit) {
        updateRegisteredCustomDeck(deckData);
    } else {
        registerCustomDeck(deckData);
    }
    editingDeckId = null;
    closeCustomDeckBuilder();
}

// Cards are keyed by their stable id (not their editable name) so a renamed
// or accidentally-duplicated name can never make two cards collide into one
// slot, or leave a card's id in the draw list with no matching image.
function buildDeckConfigEntry(deckData) {
    const validCards = deckData.cards.filter(c => c.id && c.dataUrl);
    if (validCards.length !== deckData.cards.length) {
        console.warn(`Deck "${deckData.name}" has ${deckData.cards.length - validCards.length} card(s) with missing image data — skipping them.`);
    }

    return {
        cards:   validCards.map(c => c.id),
        cover:   deckData.cover,
        type:    deckData.type,
        custom:  true,
        cardMap:  Object.fromEntries(validCards.map(c => [c.id, c.dataUrl])),
        nameMap:  Object.fromEntries(validCards.map(c => [c.id, c.name])),
    };
}

function registerCustomDeck(deckData) {
    if (deckConfig[deckData.id]) return;

    deckConfig[deckData.id] = buildDeckConfigEntry(deckData);

    addCustomDeckButton(deckData);
}

function updateRegisteredCustomDeck(deckData) {
    deckConfig[deckData.id] = buildDeckConfigEntry(deckData);

    const btn = deckSelector.querySelector(`.deckButton[data-custom-id="${deckData.id}"]`);
    if (btn) {
        btn.title = deckData.name;
        btn.dataset.type = deckData.type;
        btn.style.backgroundImage = `url('${deckData.cover}')`;
    }
    updateDeckPagination();

    if (currentDeckName === deckData.id) {
        currentDeck = [...deckConfig[deckData.id].cards];
        createDeck();
    }
}

// =============================================================================
// MANAGE CUSTOM DECKS — "My Decks" tab
// =============================================================================

async function renderMyDecksList() {
    const grid  = document.getElementById('myDecksGrid');
    const empty = document.getElementById('myDecksEmpty');
    const count = document.getElementById('myDecksCount');
    if (!grid) return;

    const decks = await getStoredCustomDecks();
    grid.innerHTML = '';

    count.textContent = `${decks.length} deck${decks.length !== 1 ? 's' : ''}`;

    if (!decks.length) {
        empty.style.display = 'block';
        grid.style.display  = 'none';
        return;
    }
    empty.style.display = 'none';
    grid.style.display  = 'grid';

    decks.forEach(deckData => {
        const item = document.createElement('div');
        item.className = 'myDeckItem';

        const cover = document.createElement('div');
        cover.className = 'myDeckCover';
        if (deckData.cover) cover.style.backgroundImage = `url('${deckData.cover}')`;
        item.appendChild(cover);

        const info = document.createElement('div');
        info.className = 'myDeckInfo';

        const nameEl = document.createElement('div');
        nameEl.className = 'myDeckName';
        nameEl.textContent = deckData.name;

        const metaEl = document.createElement('div');
        metaEl.className = 'myDeckMeta';
        metaEl.textContent = `${deckData.type === 'oracle' ? 'Oracle' : 'Tarot'} tab · ${deckData.cards.length} card${deckData.cards.length !== 1 ? 's' : ''}`;

        info.appendChild(nameEl);
        info.appendChild(metaEl);
        item.appendChild(info);

        const actions = document.createElement('div');
        actions.className = 'myDeckActions';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => startEditDeck(deckData.id);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className   = 'myDeckDeleteBtn';
        delBtn.onclick = () => confirmDeleteCustomDeck(deckData.id);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        item.appendChild(actions);

        grid.appendChild(item);
    });
}

async function startEditDeck(id) {
    const decks    = await getStoredCustomDecks();
    const deckData = decks.find(d => d.id === id);
    if (!deckData) return;

    editingDeckId       = id;
    customDeckType      = deckData.deckType;
    customDeckTab       = deckData.type;
    customDeckCoverUrl  = deckData.cover;
    customDeckCards     = [...deckData.cards];

    document.getElementById('customDeckName').value = deckData.name;
    document.getElementById('customDeckCoverName').textContent = 'Current cover image';
    const preview = document.getElementById('customDeckCoverPreview');
    preview.src = deckData.cover;
    preview.style.display = 'block';

    document.querySelectorAll('.customDeckTypeBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.type === customDeckType);
    });
    document.querySelectorAll('.customDeckTabBtn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === customDeckTab);
    });

    activeDeckCarouselApi = createCarousel('createCarousel', deckData.cards, customDeckType, (filledCards) => {
        customDeckCards = filledCards;
        checkCustomDeckReady();
    });

    document.getElementById('customDeckSaveBtn').textContent = 'Save Changes';
    checkCustomDeckReady();

    switchDeckModalTab('create', document.querySelector('.customDeckTabSwitch[data-tab="create"]'));
}

async function confirmDeleteCustomDeck(id) {
    if (!confirm('Delete this custom deck? This cannot be undone.')) return;

    const btnEl = deckSelector.querySelector(`.deckButton[data-custom-id="${id}"]`);
    await deleteCustomDeck(id, btnEl);

    if (editingDeckId === id) {
        resetCustomDeckForm();
    }

    renderMyDecksList();
}

function addCustomDeckButton(deckData) {
    const btn = document.createElement('div');
    btn.className        = 'deckButton';
    btn.title            = deckData.name;
    btn.dataset.type     = deckData.type;
    btn.dataset.customId = deckData.id;
    btn.style.backgroundImage = `url('${deckData.cover}')`;
    btn.onclick = () => selectDeck(deckData.id);
    deckButtonGrid.appendChild(btn);
    updateDeckPagination();
}

async function deleteCustomDeck(id, btnEl) {
    try {
        const existing = await getStoredCustomDecks();
        const updated  = existing.filter(d => d.id !== id);
        await saveCustomDecksToStorage(updated);
    } catch (err) {
        console.error('Unable to delete custom deck:', err);
    }

    delete deckConfig[id];
    if (btnEl && btnEl.remove) btnEl.remove();
    updateDeckPagination();
    if (currentDeckName === id) {
        currentDeckName = null;
        currentDeck = [];
        createDeck();
    }
}

// =============================================================================
// DECK LOGIC
// =============================================================================

// Switching decks keeps whatever is already placed on the table and the
// current layoutIndex, so cards drawn from different decks can share one
// reading — the layout's position cap (drawOrder.length) still applies
// across all of them combined. Use refreshReading() to start over.
function selectDeck(deckName) {
    currentDeckName = deckName;
    currentDeck     = [...deckConfig[deckName].cards];
    createDeck();
}

function shuffleDeck() {
    for (let i = currentDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
    }
    layoutIndex = 0;
    document.getElementById("table").innerHTML = "";
    createDeck();
}

function createDeck() {
    const deckArea = document.getElementById("deck");
    if (!deckArea) return;

    if (!currentDeckName || !deckConfig[currentDeckName]) {
        deckArea.innerHTML = "";
        return;
    }

    const deckConfigEntry = deckConfig[currentDeckName];
    const existingChildren = Array.from(deckArea.children);
    const fragment = document.createDocumentFragment();
    const totalCards = currentDeck.length;
    const maxWidth = Math.max(220, deckArea.offsetWidth - 220);
    const spacing = Math.min(22, maxWidth / Math.max(1, totalCards));
    const deckWidth = totalCards * spacing;

    currentDeck.forEach((card, index) => {
        let cardBack = existingChildren[index];
        if (!cardBack) {
            cardBack = document.createElement("div");
            fragment.appendChild(cardBack);
        }
        cardBack.onclick = () => drawCard(cardBack, card, currentDeckName);

        const isCircular = deckConfigEntry.circular;
        cardBack.className = "deckCard" + (isCircular ? " circular" : "");
        cardBack.style.backgroundImage = `url('${deckConfigEntry.cover}')`;
        cardBack.style.left = `calc(50% + ${index * spacing - deckWidth / 2}px)`;
        cardBack.style.zIndex = index;
        cardBack.dataset.cardId = card;
    });

    existingChildren.slice(totalCards).forEach(child => child.remove());

    if (fragment.childNodes.length) {
        deckArea.appendChild(fragment);
    }
}

// =============================================================================
// DRAW CARD
// =============================================================================

function drawCard(cardElement, cardId, deckName) {
    cardElement.remove();

    const index = currentDeck.indexOf(cardId);
    if (index > -1) currentDeck.splice(index, 1);

    if (layoutIndex >= drawOrder.length) {
        currentDeck.push(cardId);
        createDeck();
        return;
    }

    const cardDiv = document.createElement("div");
    const isCircular = deckConfig[deckName].circular;
    cardDiv.className = "card" + (isCircular ? " circular" : "");

    const imgSrc = getCardImagePath(deckName, cardId);

    if (imgSrc) {
        const safePath = imgSrc.replace(/ /g, "%20");
        cardDiv.style.backgroundImage    = `url("${safePath}")`;
        cardDiv.style.backgroundSize     = isCircular ? "160%" : "cover";
        cardDiv.style.backgroundPosition = "center";
    } else {
        // Should not happen — buildDeckConfigEntry() filters out cards with
        // no image before they ever reach the draw list. Kept as a safe
        // display-only fallback rather than letting a broken card vanish
        // silently mid-reading.
        const displayName = deckConfig[deckName]?.nameMap?.[cardId] || "Unknown Card";
        cardDiv.classList.add("missingCardImage");
        cardDiv.innerText = displayName;
    }

    cardDiv.style.position = "absolute";

    const cardNum = drawOrder[layoutIndex];
    const pos     = positions[cardNum];
    const size    = layouts[currentLayout].cardSize;
    cardDiv.style.left      = pos.x;
    cardDiv.style.top       = pos.y;
    cardDiv.style.width     = size.width;
    cardDiv.style.height    = isCircular ? size.width : size.height;
    const rotate = pos.rotate || 0;
    cardDiv.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
    layoutIndex++;

    document.getElementById("table").appendChild(cardDiv);
}

function refreshReading() {
    document.getElementById("table").innerHTML = "";
    currentDeck = [...deckConfig[currentDeckName].cards];
    layoutIndex = 0;
    createDeck();
}

// =============================================================================
// INIT
// =============================================================================

createDeck();
loadCustomDecksFromStorage();