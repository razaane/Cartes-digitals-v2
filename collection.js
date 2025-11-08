const collectionContainer = document.getElementById("collectionContainer");
let collection = JSON.parse(localStorage.getItem("collection")) || [];

const filterBtns = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

function renderCollection(filter = "all") {
    collectionContainer.innerHTML = "";

    let filtered = collection;
    if(filter !== "all") {
        filtered = collection.filter(c => c.rarity === filter);
    }

    if (filtered.length === 0) {
        collectionContainer.innerHTML = `<p class="col-span-full text-center text-white text-lg">Aucune carte trouvée pour ce filtre.</p>`;
        return;
    }

    filtered.forEach(c => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add(
            "text-center",
            "bg-cards",
            "p-4",
            "rounded-lg",
            "flex",
            "flex-col",
            "items-center"
        );

        cardDiv.innerHTML = `
            <img src="${c.img}" alt="${c.name}" class="w-full max-w-[200px] h-48 object-cover mb-2">
            <h3 class="text-lg font-display font-bold mb-1">${c.name}</h3>
            <p class="mb-1 font-tet">${c.description || ''}</p>
            <p class="mb-1 font-tet">${c.price} €</p>
            <p class="mb-2 font-tet font-bold" style="color: ${getRarityColor(c.rarity)};">${capitalizeRarity(c.rarity)}</p>
        `;

        collectionContainer.appendChild(cardDiv);
    });
}

function getRarityColor(rarity) {
    switch(rarity) {
        case "commun": return "#3B82F6";
        case "rare": return "#A855F7";
        case "legendary": return "#F59E0B";
        default: return "#FFFFFF";
    }
}

function capitalizeRarity(rarity) {
    if(!rarity) return "";
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
    
        filterBtns.forEach(b => b.classList.replace("bg-btn", "bg-btn2"));
        
        btn.classList.replace("bg-btn2", "bg-btn");

        currentFilter = btn.dataset.filter;
        renderCollection(currentFilter);
    });
});

renderCollection(currentFilter);
