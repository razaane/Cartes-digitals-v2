let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const container = document.getElementById("favoritesContainer");

function renderFavorites() {
    container.innerHTML = "";

    if (favorites.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-white text-lg">Vous n'avez aucun favori.</p>`;
        return;
    }

    favorites.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("text-center", "bg-cards", "p-4", "rounded-lg", "flex", "flex-col", "items-center");

        div.innerHTML = `
            <img src="${card.img}" alt="${card.name}" class="w-full max-w-[200px] h-48 object-cover mb-2">
            <h3 class="text-lg font-display font-bold mb-1">${card.name}</h3>
            <p class="mb-2 font-tet">${card.price} €</p>
            <button class="delete-btn bg-red-600 hover:bg-red-500 px-3 py-1 rounded" data-id="${card.id}">
                Supprimer
            </button>
        `;

        container.appendChild(div);
    });

    container.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            favorites = favorites.filter(c => c.id !== id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            renderFavorites();
        });
    });
}

renderFavorites();
