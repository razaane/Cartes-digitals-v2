document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});

// Cards data with rarity
const cards = [
  { id: 1, name: "Sentinelle Cybernétique", description: "Une défenseuse avec le feux de tech.", img: "./images/card11.png", price: 25.50, rarity: "rare" },
  { id: 2, name: "Void Witch", description: "Une créature de pure énergie.", img: "./images/card2.png", price: 25.50, rarity: "legendary" },
  { id: 3, name: "Spectre de Néon", description: "Une entitée insaisissable qui hante le réseau.", img: "./images/card3.png", price: 25.50, rarity: "commun" },
  { id: 4, name: "Chimère des Étoiles", description: "Une fusion de bêtes imprévisible.", img: "./images/card4.png", price: 25.50, rarity: "rare" },
  { id: 5, name: "Phénix Binaire", description: "Renaissant de ses cendres numériques.", img: "./images/card5.png", price: 25.50, rarity: "legendary" },
  { id: 6, name: "Golem de Quantum", description: "Un colosse instable, capable de manipuler la réalité.", img: "./images/card6.png", price: 25.50, rarity: "commun" }
];

const container = document.getElementById("cardsContainer");
const cardsPerPage = 4;
let currentPage = 1;
const totalPages = Math.ceil(cards.length / cardsPerPage);

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCards(page) {
  container.innerHTML = "";
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageCards = cards.slice(start, end);

  pageCards.forEach(c => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("flex", "flex-col", "items-center", "text-center");

    cardDiv.innerHTML = `
      <img src="${c.img}" alt="${c.name}" class="w-full max-w-[250px] mx-auto">
      <div class="grid grid-rows-4 bg-cards font-tet p-2 text-white text-left h-80 border-l-2 border-r-2 border-b-2 border-[#7B2CBF] w-full max-w-[250px]">
        <h3 class="text-[25px] text-center">${c.name}</h3>
        <div class="flex flex-col gap-[20px] h-[60px] text-center">
          <p class="w-[100%] font-display">${c.description}</p>
          <span>1/100 - ${c.rarity}</span>
        </div>
        <p class="flex items-end pb-[10px] justify-center">${c.price} €</p>
        <div class="flex justify-between h-[50px]">
          <button class="bg-btn hover:bg-purple-500 px-2 py-1 rounded-lg font-tet add-cart-btn">Ajouter au panier</button>
          <button class="rounded-lg bg-btn2 px-4 hover:bg-gray-400 transition fav-btn">❤️</button>
        </div>
      </div>
    `;

    // Favorite button
    const favBtn = cardDiv.querySelector(".fav-btn");
    favBtn.addEventListener("click", () => {
      if (!favorites.some(f => f.id === c.id)) {
        favorites.push(c);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${c.name} ajouté aux favoris !`);
      } else {
        alert(`${c.name} est déjà dans vos favoris.`);
      }
    });

    // Cart button
    const cartBtn = cardDiv.querySelector(".add-cart-btn");
    cartBtn.addEventListener("click", () => {
      const existing = cart.find(item => item.id === c.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...c, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${c.name} ajouté au panier !`);
    });

    container.appendChild(cardDiv);
  });

  updatePagination();
}

// Pagination logic
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumbers = document.getElementById("pageNumbers");

function updatePagination() {
  pageNumbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("px-3", "py-1", "rounded");
    if (i === currentPage) btn.classList.add("bg-btn", "font-bold");
    else btn.classList.add("bg-btn2");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderCards(currentPage);
    });
    pageNumbers.appendChild(btn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCards(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderCards(currentPage);
  }
});

// Initial render
renderCards(currentPage);
